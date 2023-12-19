import { Form, FormCode, FormDate, FormSelect } from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import { SalesForm, salesInput } from "@/server/dtos/sales.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { SalesJobPosition } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function SalesSave() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu mana yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Sales");
    setActive(0, 3, 0);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  const queryCode = useQuery("code");

  const methods = useForm<SalesForm>({
    defaultValues: SalesForm.initial,
    resolver: zodResolver(salesInput),
  });
  const { reset } = methods;

  const formQuery = trpc.sales.getForm.useQuery({
    code: queryCode,
  });
  React.useEffect(() => {
    if (formQuery.data?.value && reset) {
      reset(formQuery.data.value, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [formQuery.data?.value, reset]);

  const saveMutation = trpc.sales.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      jobPosition: data.jobPosition as SalesJobPosition,
      code: queryCode,
    });

    await router.push("/master_data/sales");
  });
  return (
    <SaveLayout
      onSave={onSubmit}
      title="Input Sales Data"
      isLoading={!formQuery.data?.value}
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
                input: (
                  <FormSelect
                    name="jobPosition"
                    options={SalesForm.typeOptions}
                    readOnly={!!queryCode}
                  />
                ),
              },
              {
                type: "separator",
              },
              {
                type: "input",
                id: "name",
                label: "Name",
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
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
