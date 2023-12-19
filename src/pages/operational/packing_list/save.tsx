import {
  Form,
  FormCode,
  FormDate,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { trpc } from "@/libs/trpc";
import {
  PackingListForm,
  defaultPackingListForm,
  packingListValidationSchema,
} from "@/server/dtos/packingList.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function PackingListSavePage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Packing List");
    setActive(2, 5, 0);
  }, [setTitle, setActive]);

  const [appendIndex, setAppendIndex] = React.useState(0);

  const { addToasts } = useToast();

  const router = useRouter();

  const methods = useForm<PackingListForm>({
    defaultValues: defaultPackingListForm,
    resolver: zodResolver(packingListValidationSchema),
  });
  const { reset, setValue } = methods;
  const values = methods.watch();

  const detail = React.useMemo(
    () => values.details[appendIndex],
    [values.details, appendIndex]
  );

  const nextNumberQuery = trpc.suratJalan.getNextNumber.useQuery();
  React.useEffect(() => {
    if (!nextNumberQuery.data) return;

    setValue("number", nextNumberQuery.data);
  }, [nextNumberQuery.data, setValue]);

  const shippingOptionsQuery = trpc.packingLists.getShippingOptions.useQuery();
  React.useEffect(() => {
    if (!shippingOptionsQuery.data) return;

    if (shippingOptionsQuery.data.length === 1) {
      setValue("shipping", shippingOptionsQuery.data[0].value);
    }
  }, [shippingOptionsQuery.data, setValue, appendIndex]);

  const vesselOptionsQuery = trpc.packingLists.getVesselOptions.useQuery({
    shipping: values.shipping,
  });
  React.useEffect(() => {
    if (!vesselOptionsQuery.data) return;

    if (vesselOptionsQuery.data.length === 1) {
      setValue("vessel", vesselOptionsQuery.data[0].value);
    }
  }, [vesselOptionsQuery.data, setValue, appendIndex]);

  const voyageOptionsQuery = trpc.packingLists.getVoyageOptions.useQuery({
    shipping: values.shipping,
    vessel: values.vessel,
  });
  React.useEffect(() => {
    if (!voyageOptionsQuery.data) return;

    if (voyageOptionsQuery.data.length === 1) {
      setValue("voyage", voyageOptionsQuery.data[0].value);
    }
  }, [voyageOptionsQuery.data, setValue, appendIndex]);

  const detailRealisationsQuery =
    trpc.packingLists.getDetailRealisations.useQuery({
      shipping: values.shipping,
      vessel: values.vessel,
      voyage: values.voyage,
    });
  React.useEffect(() => {
    if (!detailRealisationsQuery.data) return;

    setValue("details", detailRealisationsQuery.data);
  }, [detailRealisationsQuery.data, setValue]);

  const saveMutation = trpc.packingLists.save.useMutation();
  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync(data);

    await router.push("/operational/packing_list");
  });

  return (
    <SaveLayout
      onSave={onSubmit}
      title="Input Packing List"
      isLoading={!values}
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
                id: "number",
                label: "Packing List Number",
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
                id: "shipping",
                label: "Shipping",
                input: (
                  <FormSelect
                    name="shipping"
                    options={shippingOptionsQuery.data}
                    readOnly={
                      !shippingOptionsQuery.data ||
                      shippingOptionsQuery.data.length <= 1
                    }
                  />
                ),
              },
              {
                type: "input",
                id: "vessel",
                label: "Vessel",
                input: (
                  <FormSelect
                    name="vessel"
                    options={vesselOptionsQuery.data}
                    readOnly={
                      !vesselOptionsQuery.data ||
                      vesselOptionsQuery.data.length <= 1
                    }
                  />
                ),
              },
              {
                type: "input",
                id: "voyage",
                label: "Voyage",
                input: (
                  <FormSelect
                    name="voyage"
                    options={voyageOptionsQuery.data}
                    readOnly={
                      !voyageOptionsQuery.data ||
                      voyageOptionsQuery.data.length <= 1
                    }
                  />
                ),
              },
              {
                type: "separator",
              },
              {
                type: "table",
                id: "details",
                columns: [
                  {
                    id: "factory",
                    label: "Customer",
                    input: <FormText name="factory" readOnly />,
                  },
                  {
                    id: "factoryCity",
                    label: "City",
                    input: <FormText name="factoryCity" readOnly />,
                  },
                  {
                    id: "deliveryTo",
                    label: "Delivery To",
                    input: <FormText name="deliveryTo" readOnly />,
                  },
                  {
                    id: "deliveryToCity",
                    label: "City",
                    input: <FormText name="deliveryToCity" readOnly />,
                  },
                  {
                    id: "consignee",
                    label: "Consignee",
                    input: <FormText name="consignee" readOnly />,
                  },
                  {
                    id: "portOrigin",
                    label: "Port Origin",
                    input: <FormText name="portOrigin" readOnly />,
                  },
                  {
                    id: "portDestination",
                    label: "Port Destination",
                    input: <FormText name="portDestination" readOnly />,
                  },
                  {
                    id: "serviceType",
                    label: "Service Type",
                    input: <FormText name="serviceType" readOnly />,
                  },
                  {
                    id: "containerNumber1",
                    label: "Container Number",
                    input: <FormText name="containerNumber1" readOnly />,
                  },
                  {
                    id: "sealNumber1",
                    label: "Seal Number",
                    input: <FormText name="sealNumber1" readOnly />,
                  },
                  {
                    id: "containerNumber2",
                    label: "Container Number",
                    input: <FormText name="containerNumber2" readOnly />,
                  },
                  {
                    id: "sealNumber2",
                    label: "Seal Number",
                    input: <FormText name="sealNumber2" readOnly />,
                  },
                  {
                    id: "suratJalan",
                    label: "Surat Jalan",
                    input: <FormText name="suratJalan" readOnly />,
                  },
                  {
                    id: "bast",
                    label: "BAST",
                    input: <FormText name="bast" readOnly />,
                  },
                ],
                disableAdd: true,
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
