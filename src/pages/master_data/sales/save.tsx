import {
  Form,
  FormCode,
  FormDate,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout, { InputRow } from "@/components/Layouts/SaveLayout";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import { SalesForm } from "@/server/dtos/sales.dto";
import useMenu from "@/stores/menu";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function SalesSave() {
  // Gunakan store useMenu untuk mengset menu mana yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset menu yang aktif
  React.useEffect(() => {
    setActive(1, 3, 0);
  }, [setActive]);

  // Mendapatkan router
  const router = useRouter();

  const queryCode = useQuery("code");

  const methods = useForm<SalesForm>({
    defaultValues: SalesForm.initial,
  });
  const { reset, setValue } = methods;

  const formQuery = trpc.sales.getForm.useQuery({
    code: queryCode
  });
  React.useEffect(() => {
    if (formQuery.data?.defaultValue && reset) {
      reset(formQuery.data.defaultValue, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [formQuery.data?.defaultValue, reset]);

  const saveMutation = trpc.sales.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      code: queryCode,
    });

    await router.push("/master_data/sales");
  });
  return (
      <SaveLayout
        onSave={onSubmit}
        title="Input Sales Data"
        isLoading={!formQuery.data?.defaultValue}
      >
        <Form
          methods={methods}
          tabs={[
            {
              id: "generalInformation",
              name: "General Information",
              controls :[
                {
                  type: "input",
                  id: "createDate",
                  label: "Create Date",
                  input: <FormDate name="createDate" readOnly />,
                },
                {
                  type: "input",
                  id: "code",
                  label: "Sales Code",
                  input: <FormCode name="code" readOnly />,
                },
                {
                  type: "input",
                  id: "jobPosition",
                  label: "Job Position",
                  input: <FormSelect name="jobPosition" options={SalesForm.typeOptions} readOnly={!!queryCode}/>,
                },
                {
                  type: "separator",
                },
                {
                  type: "input",
                  id: "name",
                  label: "Marketing Name",
                  input: <FormCode name="name" />,
                },
                {
                  type: "input",
                  id: "telephone",
                  label: "Telephone",
                  input: <FormCode name="telephone" />,
                },
                {
                  type: "input",
                  id: "nik",
                  label: "NIK",
                  input: <FormCode name="nik" />,
                },
                {
                  type: "input",
                  id: "fax",
                  label: "Fax",
                  input: <FormCode name="fax" />,
                },
                {
                  type: "input",
                  id: "area",
                  label: "Cabang",
                  input: <FormCode name="area" />,
                },
                {
                  type: "input",
                  id: "email",
                  label: "Email",
                  input: <FormCode name="email" />,
                },
                {
                  type: "input",
                  id: "phoneNumber",
                  label: "Phone Number",
                  input: <FormCode name="phoneNumber" />,
                },
              ]
            }
          ]}
        />
      </SaveLayout>
  );
}
