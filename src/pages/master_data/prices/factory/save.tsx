import {
  Form,
  FormDate,
  FormMoney,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import { PriceFactoryForm } from "@/server/dtos/price.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useToast from "@/stores/toast";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function SavePriceFactoryPage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Price Factory");
    setActive(1, 6, 0);
  }, [setTitle, setActive]);

  const { addToasts } = useToast();

  // Mendapatkan router
  const router = useRouter();

  const queryID = useQuery("id");

  const methods = useForm<PriceFactoryForm>({
    defaultValues: PriceFactoryForm.initial(),
  });
  const { reset, setValue } = methods;
  const values = methods.watch();

  const defaultForm = trpc.prices.getFactoryDefaultForm.useQuery(queryID);
  React.useEffect(() => {
    if (defaultForm.data) {
      reset(defaultForm.data);
    }
  }, [defaultForm.data, reset]);

  const quotationQuery = trpc.quotations.getOptions.useQuery();

  const routeQuery = trpc.prices.getFactoryRouteOptions.useQuery({
    quotation: values.quotation,
  });
  React.useEffect(() => {
    if (!routeQuery.data) return;

    if (routeQuery.data.length === 1) {
      setValue("route", routeQuery.data[0].value);
    }
  }, [routeQuery.data, setValue]);

  const containerSizeQuery =
    trpc.prices.getFactoryContainerSizeOptions.useQuery({
      quotation: values.quotation,
      route: values.route,
    });
  React.useEffect(() => {
    if (!containerSizeQuery.data) return;

    if (containerSizeQuery.data.length === 1) {
      setValue("containerSize", containerSizeQuery.data[0].value);
    }
  }, [containerSizeQuery.data, setValue]);

  const quotationDetailQuery = trpc.prices.getFactoryQuotationDetail.useQuery({
    quotation: values.quotation,
    route: values.route,
    containerSize: values.containerSize,
  });
  React.useEffect(() => {
    if (!quotationDetailQuery.data) return;

    setValue(
      "factory",
      `${quotationDetailQuery.data.factory.code} (${quotationDetailQuery.data.factory.name})`
    );
    setValue(
      "effectiveStartDate",
      quotationDetailQuery.data.quotation.effectiveStartDate
    );
    setValue(
      "effectiveEndDate",
      quotationDetailQuery.data.quotation.effectiveEndDate
    );
    setValue("serviceType", quotationDetailQuery.data.quotation.serviceType);
    setValue("containerType", quotationDetailQuery.data.containerType);
    setValue(
      "effectiveEndDate",
      quotationDetailQuery.data.quotation.effectiveEndDate
    );
    setValue(
      "port",
      `${quotationDetailQuery.data.port.code} (${quotationDetailQuery.data.port.name})`
    );
  }, [quotationDetailQuery.data, setValue]);

  const hppQuery = trpc.quotations.getHPP.useQuery(
    quotationDetailQuery.data?.id
  );
  React.useEffect(() => {
    if (!hppQuery.data) return;

    setValue("hpp", hppQuery.data);
  }, [hppQuery.data, setValue]);

  React.useEffect(() => {
    setValue("hppAfter", values.hpp + values.etcCost);
  }, [values.hpp, values.etcCost, setValue]);

  const saveMutation = trpc.prices.saveFactory.useMutation();
  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation
      .mutateAsync({
        ...data,
        id: queryID,
      })
      .then(async () => {
        await router.push("/master_data/prices/factory");
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
      title="Input Price Factory"
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
                id: "createDate",
                label: "Create Date",
                input: <FormDate name="createDate" isDefault />,
              },
              {
                type: "separator",
              },
              {
                type: "input",
                id: "quotation",
                label: "Quotation",
                input: (
                  <FormSelect
                    name="quotation"
                    options={quotationQuery.data ?? []}
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
                    options={routeQuery.data ?? []}
                    readOnly={!routeQuery.data || routeQuery.data.length <= 1}
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "factory",
                label: "Delivery To",
                input: <FormText name="factory" readOnly />,
              },
              {
                type: "input",
                id: "effectiveStartDate",
                label: "Effective Start Date",
                input: <FormDate name="effectiveStartDate" readOnly />,
              },
              {
                type: "input",
                id: "effectiveEndDate",
                label: "Effective End Date",
                input: <FormDate name="effectiveEndDate" readOnly />,
              },
              {
                type: "input",
                id: "containerSize",
                label: "Container Size",
                input: (
                  <FormSelect
                    name="containerSize"
                    options={containerSizeQuery.data ?? []}
                    readOnly={
                      !containerSizeQuery.data ||
                      containerSizeQuery.data.length <= 1
                    }
                  />
                ),
              },
              {
                type: "input",
                id: "port",
                label: "Port",
                input: <FormText name="port" readOnly />,
              },
              {
                type: "input",
                id: "serviceType",
                label: "Service Type",
                input: <FormText name="serviceType" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "containerType",
                label: "Container Type",
                input: <FormText name="containerType" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "etcCost",
                label: "ETC Cost",
                input: <FormMoney name="etcCost" />,
              },
              {
                type: "input",
                id: "hpp",
                label: "HPP",
                input: <FormMoney name="hpp" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "hppAfter",
                label: "HPP after ETC Cost",
                input: <FormMoney name="hppAfter" readOnly />,
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
