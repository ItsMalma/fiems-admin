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
import { PriceShippingForm, priceShippingInput } from "@/server/dtos/price.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
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
    setActive(0, 6, 2);
  }, [setTitle, setActive]);

  const { addToasts } = useToast();

  // Mendapatkan router
  const router = useRouter();

  const queryID = useQuery("id");

  const methods = useForm<PriceShippingForm>({
    defaultValues: PriceShippingForm.initial(),
    resolver: zodResolver(priceShippingInput),
  });
  const { reset, setValue } = methods;
  const value = methods.watch();

  const routesOptions = trpc.routes.getOptions.useQuery();
  const shippingsOptions = trpc.customers.getOptions.useQuery("Shipping");
  const portsOptions = trpc.ports.getOptions.useQuery();

  const [isDefault, setIsDefault] = React.useState(true);
  const formQuery = trpc.prices.getFormShipping.useQuery({
    id: queryID,
    shipping: value.shipping,
    details: filterValidObject(value.details),
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

  const saveMutation = trpc.prices.saveShipping.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation
      .mutateAsync({
        ...data,
        id: queryID,
      })
      .then(async () => {
        await router.push("/master_data/prices/shipping");
      })
      .catch((err) => {
        if (err instanceof TRPCClientError) {
          addToasts({ type: "error", message: err.message });
        }
      });
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
                    options={shippingsOptions.data ?? []}
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
                  <FormSelect name="route" options={routesOptions.data ?? []} />
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
                  <FormSelect name="port" options={portsOptions.data ?? []} />
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
