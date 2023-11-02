import { Form, FormDate, FormMoney, FormSelect } from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { setValues } from "@/libs/functions";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import { UangJalanForm, uangJalanInput } from "@/server/dtos/uangJalan.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const queryID = useQuery("id");

  const methods = useForm<UangJalanForm>({
    defaultValues: UangJalanForm.initial,
    resolver: zodResolver(uangJalanInput),
  });
  const { setValue, reset } = methods;

  const value = methods.watch();

  const [isDefault, setIsDefault] = React.useState(true);
  const formQuery = trpc.uangJalan.getForm.useQuery({
    ...value,
    id: queryID,
    isDefault,
  });

  React.useEffect(() => {
    if (formQuery.data?.value && setValue) {
      setValues(formQuery.data.value, (name, value) => {
        setValue(name, value);
      });
    }
  }, [formQuery.data?.value, setValue]);

  React.useEffect(() => {
    if (formQuery.data?.defaultValue && reset) {
      reset(formQuery.data.defaultValue);
      setIsDefault(false);
    }
  }, [formQuery.data?.defaultValue, reset]);

  const saveMutation = trpc.uangJalan.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      id: queryID,
    });

    await router.push("/master_data/uang_jalan");
  });

  return (
    <SaveLayout onSave={onSubmit} title="Input Uang Jalan" isLoading={!value}>
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
                label: "Vendor",
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
                    readOnly={!value.vendor}
                  />
                ),
              },
              {
                type: "input",
                id: "containerSize",
                label: "Container Size",
                input: (
                  <FormSelect
                    name="containerSize"
                    options={formQuery.data?.containerSizes ?? []}
                    readOnly={!value.route}
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
                id: "bbm",
                label: "BBM",
                input: <FormMoney name="bbm" />,
              },
              {
                type: "input",
                id: "toll",
                label: "Toll",
                input: <FormMoney name="toll" />,
              },
              {
                type: "input",
                id: "labourCost",
                label: "Biaya Buruh",
                input: <FormMoney name="labourCost" />,
              },
              {
                type: "input",
                id: "meal",
                label: "Meal",
                input: <FormMoney name="meal" />,
              },
              {
                type: "input",
                id: "etc",
                label: "Etc.",
                input: <FormMoney name="etc" />,
              },
              {
                type: "input",
                id: "total",
                label: "Total",
                input: <FormMoney name="total" readOnly />,
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
