import {
  Form,
  FormDate,
  FormMoney,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { filterValidObject, setValues } from "@/libs/functions";
import { useQuery } from "@/libs/hooks";
import { ContainerSizes, ContainerTypes, ServiceTypes } from "@/libs/options";
import { trpc } from "@/libs/trpc";
import { PriceShippingForm } from "@/server/dtos/price.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function SavePriceShippingPage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Price Shipping");
    setActive(1, 6, 2);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  const queryID = useQuery("id");

  const methods = useForm<PriceShippingForm>({
    defaultValues: PriceShippingForm.initial(),
  });
  const { reset, setValue } = methods;
  const value = methods.watch();

  const [isDefault, setIsDefault] = React.useState(true);
  const formQuery = trpc.prices.getFormShipping.useQuery({
    id: queryID,
    shipping: value.shipping,
    details: filterValidObject(value.details),
    isDefault,
  });

  const shippingOptionsQuery = trpc.customers.getOptions.useQuery("Shipping");
  const routeOptionsQuery = trpc.routes.getOptions.useQuery();
  const portOptionsQuery = trpc.ports.getOptions.useQuery();

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

  const saveMutation = trpc.prices.saveShipping.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      id: queryID,
    });

    await router.push("/master_data/prices/shipping");
  });

  return (
    <SaveLayout
      onSave={onSubmit}
      title="Input Price Shipping"
      isLoading={!value}
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
              {
                type: "separator",
              },
              {
                type: "input",
                id: "effectiveStartDate",
                label: "Effective Start Date",
                input: <FormDate name="effectiveStartDate" />,
              },
              {
                type: "input",
                id: "effectiveEndDate",
                label: "Effective End Date",
                input: <FormDate name="effectiveEndDate" />,
              },
              {
                type: "input",
                id: "shipping",
                label: "Shipping",
                input: (
                  <FormSelect
                    name="shipping"
                    options={shippingOptionsQuery.data ?? []}
                  />
                ),
              },
              {
                type: "input",
                id: "shippingAddress",
                label: "Shipping Address",
                input: <FormText name="shippingAddress" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "shippingProvince",
                label: "Shipping Province",
                input: <FormText name="shippingProvince" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "shippingCity",
                label: "Shipping City",
                input: <FormText name="shippingCity" readOnly />,
              },
              {
                type: "input",
                id: "containerSize",
                label: "Container Size",
                input: (
                  <FormSelect name="containerSize" options={ContainerSizes} />
                ),
              },
              {
                type: "input",
                id: "containerType",
                label: "Container Type",
                input: (
                  <FormSelect name="containerType" options={ContainerTypes} />
                ),
              },
              {
                type: "input",
                id: "serviceType",
                label: "Service Type",
                input: <FormSelect name="serviceType" options={ServiceTypes} />,
              },
            ],
          },
          {
            id: "priceDetails",
            name: "Price Details",
            controls: [
              {
                type: "input",
                id: "route",
                label: "Route",
                input: (
                  <FormSelect
                    name="route"
                    options={routeOptionsQuery.data ?? []}
                  />
                ),
              },
              {
                type: "input",
                id: "routeDescription",
                label: "Route Description",
                input: <FormText name="routeDescription" readOnly />,
              },
              {
                type: "input",
                id: "containerSize",
                label: "Container Size",
                input: (
                  <FormSelect name="containerSize" options={ContainerSizes} />
                ),
              },
              {
                type: "input",
                id: "containerType",
                label: "Container Type",
                input: (
                  <FormSelect name="containerType" options={ContainerTypes} />
                ),
              },
              {
                type: "input",
                id: "serviceType",
                label: "Service Type",
                input: <FormSelect name="serviceType" options={ServiceTypes} />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "port",
                label: "Port",
                input: (
                  <FormSelect
                    name="port"
                    options={portOptionsQuery.data ?? []}
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                id: "freight",
                label: "Freight",
                type: "input",
                input: <FormMoney name="freight" />,
              },
              {
                id: "thcOPT",
                label: "THC OPT",
                type: "input",
                input: <FormMoney name="thcOPT" />,
              },
              {
                id: "thcOPP",
                label: "THC OPP",
                type: "input",
                input: <FormMoney name="thcOPP" />,
              },
              {
                id: "adminBL",
                label: "Admin BL",
                type: "input",
                input: <FormMoney name="adminBL" />,
              },
              {
                id: "cleaning",
                label: "Cleaning",
                type: "input",
                input: <FormMoney name="cleaning" />,
              },
              {
                id: "alihKapal",
                label: "Alih Kapal",
                type: "input",
                input: <FormMoney name="alihKapal" />,
              },
              {
                id: "materai",
                label: "Materai",
                type: "input",
                input: <FormMoney name="materai" />,
              },
              {
                id: "lolo",
                label: "LOLO",
                type: "input",
                input: <FormMoney name="lolo" />,
              },
              {
                id: "segel",
                label: "Segel",
                type: "input",
                input: <FormMoney name="segel" />,
              },
              {
                id: "rc",
                label: "RC",
                type: "input",
                input: <FormMoney name="rc" />,
              },
              {
                id: "lss",
                label: "LSS",
                type: "input",
                input: <FormMoney name="lss" />,
              },
              {
                type: "input",
                id: "total",
                label: "Total",
                input: <FormMoney name="total" readOnly />,
              },
            ],
            isAppend: true,
            itemName: "Detail",
            fieldName: "details",
            defaultValue: PriceShippingForm.initialDetail(),
          },
        ]}
      />
    </SaveLayout>
  );
}
