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
import { PriceVendorForm } from "@/server/dtos/price.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function SavePriceVendorPage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Price Vendor");
    setActive(1, 6, 1);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  const queryID = useQuery("id");

  const methods = useForm<PriceVendorForm>({
    defaultValues: PriceVendorForm.initial(),
  });
  const { reset, setValue } = methods;
  const value = methods.watch();

  const [isDefault, setIsDefault] = React.useState(true);
  const formQuery = trpc.prices.getFormVendor.useQuery({
    id: queryID,
    vendor: value.vendor,
    details: filterValidObject(value.details),
    isDefault,
  });

  const vendorOptionsQuery = trpc.customers.getOptions.useQuery("Vendor");
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

  const saveMutation = trpc.prices.saveVendor.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      id: queryID,
    });

    await router.push("/master_data/prices/vendor");
  });

  return (
    <SaveLayout onSave={onSubmit} title="Input Price Vendor" isLoading={!value}>
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
                id: "vendor",
                label: "Vendor",
                input: (
                  <FormSelect
                    name="vendor"
                    options={vendorOptionsQuery.data ?? []}
                  />
                ),
              },
              {
                type: "input",
                id: "vendorAddress",
                label: "Vendor Address",
                input: <FormText name="vendorAddress" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "vendorProvince",
                label: "Vendor Province",
                input: <FormText name="vendorProvince" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "vendorCity",
                label: "Vendor City",
                input: <FormText name="vendorCity" readOnly />,
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
                type: "input",
                id: "tracking",
                label: "Tracking",
                input: <FormMoney name="tracking" />,
              },
              {
                type: "input",
                id: "buruh",
                label: "Buruh",
                input: <FormMoney name="buruh" />,
              },
              {
                type: "input",
                id: "thcOPT",
                label: "THC OPT",
                input: <FormMoney name="thcOPT" />,
              },
              {
                type: "input",
                id: "thcOPP",
                label: "THC OPP",
                input: <FormMoney name="thcOPP" />,
              },
              {
                type: "input",
                id: "adminBL",
                label: "Admin BL",
                input: <FormMoney name="adminBL" />,
              },
              {
                type: "input",
                id: "cleaning",
                label: "Cleaning",
                input: <FormMoney name="cleaning" />,
              },
              {
                type: "input",
                id: "materai",
                label: "Materai",
                input: <FormMoney name="materai" />,
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
            defaultValue: PriceVendorForm.initialDetail(),
          },
        ]}
      />
    </SaveLayout>
  );
}
