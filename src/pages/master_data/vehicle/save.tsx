import {
  Form,
  FormCounter,
  FormDate,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import { VehicleForm, vehicleInput } from "@/server/dtos/vehicle.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function VehicleSavePage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu mana yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset judul header dan menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Vehicle");
    setActive(1, 4, 0);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  const queryId = useQuery("id");

  const methods = useForm<VehicleForm>({
    defaultValues: VehicleForm.initial,
    resolver: zodResolver(vehicleInput),
  });
  const { reset } = methods;

  const formQuery = trpc.vehicle.getForm.useQuery({
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

  const saveMutation = trpc.vehicle.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      id: queryId,
    });

    await router.push("/master_data/vehicle");
  });

  return (
    <SaveLayout
      onSave={onSubmit}
      title="Input Vehicle Data"
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
                label: "Vendor",
                input: (
                  <FormSelect
                    name="vendor"
                    options={formQuery.data?.vendors ?? []}
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "brand",
                label: "Merk",
                input: (
                  <FormSelect name="brand" options={VehicleForm.brandOptions} />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "truckNumber",
                label: "Truck Number",
                input: <FormText name="truckNumber" />,
              },
              {
                type: "input",
                id: "type",
                label: "Truck Type",
                input: (
                  <FormSelect
                    name="type"
                    options={VehicleForm.truckTypeOptions}
                    isCreatable
                  />
                ),
              },
              {
                type: "input",
                id: "machineNumber",
                label: "Mesin Number",
                input: <FormText name="machineNumber" />,
              },
              {
                type: "input",
                id: "frameNumber",
                label: "Rangka Number",
                input: <FormText name="frameNumber" />,
              },
              {
                type: "input",
                id: "cylinder",
                label: "Silinder",
                input: <FormCounter name="cylinder" min={0} />,
              },
              {
                type: "input",
                id: "color",
                label: "Color",
                input: <FormText name="color" />,
              },
              {
                type: "input",
                id: "stnkExpired",
                label: "STNK Expired",
                input: <FormDate name="stnkExpired" />,
              },

              {
                type: "input",
                id: "taxExpired",
                label: "Pajak Expired",
                input: <FormDate name="taxExpired" />,
              },
              {
                type: "input",
                id: "keurExpired",
                label: "Keur Expired",
                input: <FormDate name="keurExpired" />,
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
