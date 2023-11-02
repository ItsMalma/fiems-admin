import { Form, FormCounter, FormDate, FormSelect } from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import { UangJalanForm } from "@/server/dtos/uangJalan.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function UangJalanSavePage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu mana yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset judul header dan menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Master Uang Jalan");
    setActive(1, 7, 0);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  // Ambil id uang jalan dari query
  const queryId = useQuery("id");

  const methods = useForm<UangJalanForm>({
    defaultValues: UangJalanForm.initial,
  });
  const { reset } = methods;

  const formQuery = trpc.uangJalan.getForm.useQuery({
    id: queryId,
  });
  React.useEffect(() => {
    if (formQuery.data?.value && reset) {
      reset(formQuery.data.value, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [formQuery.data?.value, reset]);

  const saveMutation = trpc.uangJalan.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      id: queryId,
    });

    await router.push("/master_data/uang_jalan");
  });

  return (
    <SaveLayout
      onSave={onSubmit}
      title="Input Uang Jalan"
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
                type: "separator",
              },
              {
                type: "input",
                id: "vendor",
                label: "Customer",
                input: (
                  <FormSelect
                    name="vendor"
                    options={formQuery.data?.vendors ?? []}
                  />
                ),
              },
              {
                type: "input",
                id: "route",
                label: "Route",
                input: (
                  <FormSelect
                    name="route"
                    options={formQuery.data?.routes ?? []}
                  />
                ),
              },
              {
                type: "input",
                id: "truckType",
                label: "Truck Type",
                input: (
                  <FormSelect
                    name="truckType"
                    options={UangJalanForm.truckTypeOptions}
                  />
                ),
              },
              {
                type: "input",
                id: "containerSize",
                label: "Silinder",
                input: (
                  <FormSelect
                    name="containerSize"
                    options={UangJalanForm.containerSizeOptions}
                  />
                ),
              },
              {
                type: "input",
                id: "bbm",
                label: "BBM",
                input: <FormCounter name="bbm" />,
              },
              {
                type: "input",
                id: "toll",
                label: "Toll",
                input: <FormCounter name="toll" />,
              },
              {
                type: "input",
                id: "labourCost",
                label: "Biaya Buruh",
                input: <FormCounter name="labourCost" />,
              },
              {
                type: "input",
                id: "meal",
                label: "Meal",
                input: <FormCounter name="meal" />,
              },
              {
                type: "input",
                id: "etc",
                label: "Etc.",
                input: <FormCounter name="etc" />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "total",
                label: "Total Uang Jalan",
                input: <FormCounter name="total" readOnly />,
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
