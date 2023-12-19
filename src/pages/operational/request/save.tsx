import {
  Form,
  FormCode,
  FormCounter,
  FormDate,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { trpc } from "@/libs/trpc";
import {
  RequestForm,
  defaultRequestDetailForm,
  defaultRequestForm,
  requestValidationSchema,
  typeRequests,
} from "@/server/dtos/request.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function RequestSavePage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Request Jalan");
    setActive(2, 8, 0);
  }, [setTitle, setActive]);

  const [appendIndex, setAppendIndex] = React.useState(0);

  const { addToasts } = useToast();

  const router = useRouter();

  const methods = useForm<RequestForm>({
    defaultValues: defaultRequestForm,
    resolver: zodResolver(requestValidationSchema),
  });
  const { reset, setValue } = methods;
  const values = methods.watch();

  const nextNumberQuery = trpc.requests.getNextNumber.useQuery();
  React.useEffect(() => {
    if (!nextNumberQuery.data) return;

    setValue("number", nextNumberQuery.data);
  }, [nextNumberQuery.data, setValue]);

  const productOptionsQuery = trpc.requests.getProductOptions.useQuery(
    values.typeRequest
  );

  const saveMutation = trpc.requests.save.useMutation();
  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync(data);

    await router.push("/operational/request");
  });

  return (
    <SaveLayout onSave={onSubmit} title="Input Request" isLoading={!values}>
      <Form
        methods={methods}
        tabs={[
          {
            id: "generalInformation",
            name: "General Information",
            controls: [
              {
                type: "input",
                id: "number",
                label: "Surat Jalan Number",
                input: <FormCode name="number" readOnly />,
              },
              {
                type: "input",
                id: "createDate",
                label: "Create Date",
                input: <FormDate name="createDate" isDefault />,
              },
              {
                type: "input",
                id: "typeRequest",
                label: "Type Request",
                input: <FormSelect name="typeRequest" options={typeRequests} />,
              },
            ],
          },
          {
            id: "detail",
            name: "Detail",
            controls: [
              {
                type: "input",
                id: "product",
                label: "Product",
                input: (
                  <FormSelect
                    name="product"
                    options={productOptionsQuery.data}
                  />
                ),
              },
              {
                type: "input",
                id: "qty",
                label: "Quantity",
                input: <FormCounter name="qty" min={0} />,
              },
              {
                type: "input",
                id: "remarks",
                label: "Remarks",
                input: <FormText name="remarks" />,
              },
            ],
            isAppend: true,
            itemName: "Detail",
            fieldName: "details",
            defaultValue: defaultRequestDetailForm,
            onChangeItem: (index) => setAppendIndex(index),
          },
        ]}
      />
    </SaveLayout>
  );
}
