import {
  Form,
  FormCode,
  FormDate,
  FormMoney,
  FormRadio,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { useQuery } from "@/libs/hooks";
import { QuotationStatus } from "@/libs/options";
import { trpc } from "@/libs/trpc";
import {
  InquiryForm,
  defaultInquiryDetailForm,
  defaultInquiryForm,
  inquiryJobOrderOptions,
  inquiryTypeOrderOptions,
  inquiryValidationSchema,
} from "@/server/dtos/inquiry.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function InquiryPage() {
  const queryNumber = useQuery("number");
  const queryID = useQuery("id");

  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Marketing | Inquiry Container");
    setActive(1, 2, queryID ? 1 : 0);
  }, [setTitle, setActive, queryID]);

  const router = useRouter();

  const { setModal } = useModal();

  const { addToasts } = useToast();

  const [appendIndex, setAppendIndex] = React.useState(0);

  const methods = useForm<InquiryForm>({
    defaultValues: defaultInquiryForm,
    resolver: zodResolver(inquiryValidationSchema),
  });
  const { reset, setValue } = methods;
  const values = methods.watch();

  const defaultFormQuery = trpc.inquiries.getDefaultForm.useQuery(queryNumber);
  React.useEffect(() => {
    if (defaultFormQuery.data) {
      if (queryID) {
        reset({
          ...defaultFormQuery.data,
          details: [
            defaultFormQuery.data.details.find(
              (detail) => detail.id === queryID
            ),
          ],
        });
      } else {
        reset(defaultFormQuery.data);
      }
    }
  }, [defaultFormQuery.data, reset, queryID]);

  // Memo untuk menyimpan value detail dari append yang dipilih
  const detail = React.useMemo(
    () =>
      appendIndex < values.details.length
        ? values.details[appendIndex]
        : undefined,
    [values.details, appendIndex]
  );

  const nextNumberQuery = trpc.inquiries.getNextNumber.useQuery();
  React.useEffect(() => {
    if (nextNumberQuery.data && !queryNumber) {
      setValue("number", nextNumberQuery.data);
    }
  }, [nextNumberQuery.data, queryNumber, setValue]);

  const salesOptionsQuery = trpc.sales.getOptions.useQuery();

  const inquiryFactoriesOptionsQuery =
    trpc.inquiries.getFactoryOptions.useQuery();

  const factoryQuery = trpc.customers.getSingle.useQuery({
    code: values.factory,
    type: "Factory",
  });
  React.useEffect(() => {
    if (factoryQuery.data && "group" in factoryQuery.data) {
      setValue(
        "factoryGroup",
        `${factoryQuery.data.group.code} (${factoryQuery.data.group.name})`
      );
      setValue("factoryAddress", factoryQuery.data.address);
      setValue("factoryCity", factoryQuery.data.city);
    }
  }, [factoryQuery.data, setValue]);

  const factoriesOptionsQuery = trpc.customers.getOptions.useQuery("Factory");

  const purchaseQuery = trpc.customers.getSingle.useQuery({
    code: values.purchase,
    type: "Factory",
  });
  React.useEffect(() => {
    if (purchaseQuery.data && "group" in purchaseQuery.data) {
      setValue("purchaseAddress", purchaseQuery.data.address);
      setValue("purchaseCity", purchaseQuery.data.city);
    }
  }, [purchaseQuery.data, setValue]);

  const routesOptionsQuery = trpc.inquiries.getRouteOptions.useQuery({
    factory: values.factory,
  });
  React.useEffect(() => {
    if (!routesOptionsQuery.data) return;

    if (routesOptionsQuery.data.length === 1) {
      setValue(
        `details.${appendIndex}.route`,
        routesOptionsQuery.data[0].value
      );
    }
  }, [routesOptionsQuery.data, setValue, appendIndex]);

  const containerSizesOptionsQuery =
    trpc.inquiries.getContainerSizeOptions.useQuery({
      factory: values.factory,
      route: detail?.route,
    });
  React.useEffect(() => {
    if (!containerSizesOptionsQuery.data) return;

    if (containerSizesOptionsQuery.data.length === 1) {
      setValue(
        `details.${appendIndex}.containerSize`,
        containerSizesOptionsQuery.data[0].value
      );
    }
  }, [containerSizesOptionsQuery.data, setValue, appendIndex]);

  const quotationDetailQuery = trpc.inquiries.getQuotationDetail.useQuery({
    route: detail?.route,
    containerSize: detail?.containerSize,
  });
  React.useEffect(() => {
    if (!quotationDetailQuery.data) return;

    setValue(
      `details.${appendIndex}.serviceType`,
      quotationDetailQuery.data.quotation.serviceType
    );
    setValue(
      `details.${appendIndex}.containerType`,
      quotationDetailQuery.data.containerType
    );
    setValue(
      `details.${appendIndex}.factory`,
      `${quotationDetailQuery.data.factory.code} (${quotationDetailQuery.data.factory.name})`
    );
    setValue(
      `details.${appendIndex}.factoryCity`,
      quotationDetailQuery.data.factory.city
    );
    setValue(
      `details.${appendIndex}.ppn`,
      quotationDetailQuery.data.summaryDetail!.ppn
    );
    setValue(
      `details.${appendIndex}.insurance`,
      quotationDetailQuery.data.summaryDetail!.insurance
    );
    setValue(
      `details.${appendIndex}.nilaiInsurance`,
      quotationDetailQuery.data.summaryDetail!.nilaiInsurance / 1000 +
        quotationDetailQuery.data.summaryDetail!.biayaAdmin
    );
    setValue(
      `details.${appendIndex}.ppftz`,
      quotationDetailQuery.data.summaryDetail!.ppftz
    );
    setValue(
      `details.${appendIndex}.nilaiPPFTZ`,
      quotationDetailQuery.data.summaryDetail!.nilaiPPFTZ
    );
  }, [quotationDetailQuery.data, setValue, appendIndex]);

  const shippingOptionsQuery = trpc.inquiries.getShippingOptions.useQuery();
  React.useEffect(() => {
    if (!shippingOptionsQuery.data) return;

    if (shippingOptionsQuery.data.length === 1) {
      setValue(
        `details.${appendIndex}.shipping`,
        shippingOptionsQuery.data[0].value
      );
    }
  }, [shippingOptionsQuery.data, setValue, appendIndex]);

  const vesselOptionsQuery = trpc.inquiries.getVesselOptions.useQuery({
    shipping: detail?.shipping,
  });
  React.useEffect(() => {
    if (!vesselOptionsQuery.data) return;

    if (vesselOptionsQuery.data.length === 1) {
      setValue(
        `details.${appendIndex}.vessel`,
        vesselOptionsQuery.data[0].value
      );
    }
  }, [vesselOptionsQuery.data, setValue, appendIndex]);

  const voyageOptionsQuery = trpc.inquiries.getVoyageOptions.useQuery({
    shipping: detail?.shipping,
    vessel: detail?.vessel,
  });
  React.useEffect(() => {
    if (!voyageOptionsQuery.data) return;

    if (voyageOptionsQuery.data.length === 1) {
      setValue(
        `details.${appendIndex}.voyage`,
        voyageOptionsQuery.data[0].value
      );
    }
  }, [voyageOptionsQuery.data, setValue, appendIndex]);

  const vesselScheduleQuery = trpc.inquiries.getVesselSchedule.useQuery({
    shipping: detail?.shipping,
    vessel: detail?.vessel,
    voyage: detail?.voyage,
  });
  React.useEffect(() => {
    if (!vesselScheduleQuery.data) return;

    setValue(`details.${appendIndex}.etd`, vesselScheduleQuery.data.etd);
    setValue(`details.${appendIndex}.eta`, vesselScheduleQuery.data.eta);
  }, [vesselScheduleQuery.data, setValue, appendIndex]);

  const saveMutation = trpc.inquiries.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation
      .mutateAsync({
        ...data,
        number: queryNumber,
      })
      .then(async () => {
        await router.push(
          queryID ? "/marketing/inquiry/reviced" : "/marketing/inquiry"
        );
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
      title="Input Inquiry Container"
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
                label: "Inquiry Number",
                input: <FormCode name="number" readOnly />,
              },
              {
                type: "input",
                id: "createDate",
                label: "Inquiry Date",
                input: <FormDate name="createDate" isDefault />,
              },
              {
                type: "input",
                id: "sales",
                label: "Sales",
                input: (
                  <FormSelect name="sales" options={salesOptionsQuery.data} />
                ),
              },
              {
                type: "separator",
              },
              {
                type: "input",
                id: "factory",
                label: "Factory",
                input: (
                  <FormSelect
                    name="factory"
                    options={inquiryFactoriesOptionsQuery.data}
                  />
                ),
              },
              {
                type: "input",
                id: "factoryGroup",
                label: "Group",
                input: <FormText name="factoryGroup" readOnly />,
              },
              {
                type: "input",
                id: "factoryAddress",
                label: "Address",
                input: <FormText name="factoryAddress" readOnly />,
              },
              {
                type: "input",
                id: "factoryCity",
                label: "City",
                input: <FormText name="factoryCity" readOnly />,
              },
              {
                type: "separator",
              },
              {
                type: "input",
                id: "purchase",
                label: "Purchase",
                input: (
                  <FormSelect
                    name="purchase"
                    options={factoriesOptionsQuery.data}
                  />
                ),
              },
              {
                type: "input",
                id: "purchaseAddress",
                label: "Address",
                input: <FormText name="purchaseAddress" readOnly />,
              },
              {
                type: "input",
                id: "purchaseCity",
                label: "City",
                input: <FormText name="purchaseCity" readOnly />,
              },
            ],
          },
          {
            id: "detailOrder",
            name: "Detail Order",
            controls: [
              {
                type: "input",
                id: "jobOrder",
                label: "Job Order",
                input: (
                  <FormSelect
                    name="jobOrder"
                    options={inquiryJobOrderOptions}
                  />
                ),
              },
              {
                type: "input",
                id: "typeOrder",
                label: "Type Order",
                input: (
                  <FormSelect
                    name="typeOrder"
                    options={inquiryTypeOrderOptions}
                  />
                ),
              },
              {
                type: "input",
                id: "loadDate",
                label: "Load Date",
                input: <FormDate name="loadDate" />,
              },
              {
                type: "separator",
              },
              {
                type: "input",
                id: "route",
                label: "Route",
                input: (
                  <FormSelect
                    name="route"
                    options={routesOptionsQuery.data}
                    readOnly={
                      !routesOptionsQuery.data ||
                      routesOptionsQuery.data.length <= 1
                    }
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
                    options={containerSizesOptionsQuery.data}
                    readOnly={
                      !containerSizesOptionsQuery.data ||
                      containerSizesOptionsQuery.data.length <= 1
                    }
                  />
                ),
              },
              {
                type: "input",
                id: "serviceType",
                label: "Service Type",
                input: <FormText name="serviceType" readOnly />,
              },
              {
                type: "input",
                id: "containerType",
                label: "Container Type",
                input: <FormText name="containerType" readOnly />,
              },
              {
                type: "input",
                id: "factory",
                label: "Delivery To",
                input: <FormText name="factory" readOnly />,
              },
              {
                type: "input",
                id: "factoryCity",
                label: "City",
                input: <FormText name="factoryCity" readOnly />,
              },
              {
                type: "separator",
              },
              {
                type: "input",
                id: "ppn",
                label: "PPN",
                input: (
                  <FormRadio
                    name="ppn"
                    options={QuotationStatus.slice(0, 2)}
                    readOnly
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "insurance",
                label: "Insurance",
                input: (
                  <FormRadio
                    name="insurance"
                    options={QuotationStatus}
                    readOnly
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "nilaiInsurance",
                label: "",
                input: <FormMoney name="nilaiInsurance" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "ppftz",
                label: "PPFTZ",
                input: (
                  <FormRadio name="ppftz" options={QuotationStatus} readOnly />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "nilaiPPFTZ",
                label: "",
                input: <FormMoney name="nilaiPPFTZ" readOnly />,
              },
              {
                type: "separator",
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
                type: "blank",
              },
              {
                type: "input",
                id: "eta",
                label: "ETA",
                input: <FormDate name="eta" readOnly />,
              },
              {
                type: "input",
                id: "etd",
                label: "ETD",
                input: <FormDate name="etd" readOnly />,
              },
            ],
            isAppend: true,
            itemName: "Detail",
            fieldName: "details",
            onChangeItem: (index) => setAppendIndex(index),
            defaultValue: defaultInquiryDetailForm,
            hideItems: !!queryID,
          },
        ]}
      />
    </SaveLayout>
  );
}
