import {
  Form,
  FormCode,
  FormCounter,
  FormDate,
  FormEmail,
  FormPhone,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import { CustomerForm, CustomerType } from "@/server/dtos/customer.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function CustomerSavePage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Customer");
    setActive(1, 0, 1);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  const queryCode = useQuery("code");
  const queryType = (useQuery("type") ?? "Factory") as CustomerType;

  const methods = useForm<CustomerForm>({
    defaultValues: CustomerForm.initial(queryType),
  });
  const { reset, setValue } = methods;

  const customerType = methods.watch("type");
  const province = methods.watch("province");
  React.useEffect(() => {
    if (!province) setValue("city", "");
  }, [province, setValue]);

  const formQuery = trpc.customers.getForm.useQuery({
    code: queryCode,
    type: customerType,
    province,
  });
  React.useEffect(() => {
    if (formQuery.data?.defaultValue && reset) {
      reset(formQuery.data.defaultValue, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [formQuery.data?.defaultValue, reset]);

  const saveMutation = trpc.customers.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      code: queryCode,
    });

    await router.push("/master_data/business_partner/customer");
  });

  return (
    <SaveLayout
      onSave={onSubmit}
      title="Input Customer Data"
      isLoading={!formQuery.data?.defaultValue}
    >
      <Form
        methods={methods}
        tabs={[
          {
            id: "generalInformation",
            name: "General Information",
            controls: [
              {
                type: "input",
                id: "createDate",
                label: "Create Date",
                input: <FormDate name="createDate" isDefault />,
              },
              { type: "blank" },
              {
                type: "input",
                id: "type",
                label: "Customer Type",
                input: (
                  <FormSelect
                    name="type"
                    options={CustomerForm.typeOptions}
                    readOnly={!!queryCode}
                  />
                ),
              },
              {
                type: "input",
                id: "code",
                label: `${customerType} Code`,
                input: <FormCode name="code" readOnly />,
              },
              {
                type: "separator",
              },
              {
                type: "input",
                id: "group",
                label: "Factory Group",
                input: (
                  <FormSelect
                    name="group"
                    options={formQuery.data?.groups ?? []}
                  />
                ),
                isHidden: customerType !== "Factory",
              },
              {
                type: "blank",
                isHidden: customerType !== "Factory",
              },
              {
                type: "input",
                id: "name",
                label: `${customerType} Name`,
                input: <FormText name="name" />,
              },
              {
                type: "input",
                id: "address",
                label: "Address",
                input: <FormText name="address" />,
              },
              {
                type: "input",
                id: "province",
                label: "Province",
                input: (
                  <FormSelect
                    name="province"
                    options={formQuery.data?.provinces ?? []}
                  />
                ),
              },
              {
                type: "input",
                id: "city",
                label: "City",
                input: (
                  <FormSelect
                    name="city"
                    options={
                      formQuery.data?.cities && province
                        ? formQuery.data?.cities
                        : []
                    }
                    readOnly={!province}
                  />
                ),
              },
              {
                type: "input",
                id: "telephone",
                label: "Telephone",
                input: <FormPhone name="telephone" />,
              },
              {
                type: "input",
                id: "fax",
                label: "Fax",
                input: <FormPhone name="fax" />,
              },
              {
                type: "input",
                id: "email",
                label: "Email",
                input: <FormEmail name="email" />,
              },
              {
                type: "input",
                id: "top",
                label: "TOP",
                input: <FormCounter name="top" min={0} />,
              },
              {
                type: "input",
                id: "currency",
                label: "Currency",
                input: (
                  <FormText
                    name="currency"/>
                  // di ubah menjadi form text sementara untuk mengecek
                ),
              },
            ],
          },
          {
            id: "picInformation",
            name: "PIC Information",
            controls: [
              {
                type: "input",
                id: "purchasing.name",
                label: "Purchasing",
                input: <FormText name="purchasing.name" />,
              },
              {
                type: "input",
                id: "purchasing.email",
                label: "Email",
                input: <FormEmail name="purchasing.email" />,
              },
              {
                type: "input",
                id: "purchasing.phoneNumber",
                label: "Phone Number",
                input: <FormPhone name="purchasing.phoneNumber" />,
              },
              {
                type: "input",
                id: "purchasing.telephone",
                label: "Telephone",
                input: <FormPhone name="purchasing.telephone" />,
              },
              {
                type: "input",
                id: "purchasing.fax",
                label: "Fax",
                input: <FormPhone name="purchasing.fax" />,
              },
              {
                type: "blank",
              },
              {
                type: "separator",
              },
              {
                type: "input",
                id: "operation.name",
                label: "Operation",
                input: <FormText name="operation.name" />,
              },
              {
                type: "input",
                id: "operation.email",
                label: "Email",
                input: <FormEmail name="operation.email" />,
              },
              {
                type: "input",
                id: "operation.phoneNumber",
                label: "Phone Number",
                input: <FormPhone name="operation.phoneNumber" />,
              },
              {
                type: "input",
                id: "operation.telephone",
                label: "Telephone",
                input: <FormPhone name="operation.telephone" />,
              },
              {
                type: "input",
                id: "operation.fax",
                label: "Fax",
                input: <FormPhone name="operation.fax" />,
              },
              {
                type: "blank",
              },
              {
                type: "separator",
              },
              {
                type: "input",
                id: "finance.name",
                label: "Finance",
                input: <FormText name="finance.name" />,
              },
              {
                type: "input",
                id: "finance.email",
                label: "Email",
                input: <FormEmail name="finance.email" />,
              },
              {
                type: "input",
                id: "finance.phoneNumber",
                label: "Phone Number",
                input: <FormPhone name="finance.phoneNumber" />,
              },
              {
                type: "input",
                id: "finance.telephone",
                label: "Telephone",
                input: <FormPhone name="finance.telephone" />,
              },
              {
                type: "input",
                id: "finance.fax",
                label: "Fax",
                input: <FormPhone name="finance.fax" />,
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
