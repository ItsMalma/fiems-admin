import { Modal } from "@/components/Elements";
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
import {
  ContainerSizes,
  ContainerTypes,
  QuotationStatus,
  ServiceTypes,
} from "@/libs/options";
import { trpc } from "@/libs/trpc";
import {
  QuotationDetailShippingPrices,
  QuotationDetailTrackingPrices,
  QuotationForm,
  calculateOtherExpanses,
  calculateShippingTotal,
  calculateTrackingTotal,
  defaultQuotationDetailForm,
  defaultQuotationForm,
  quotationValidationSchema,
} from "@/server/dtos/quotation.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { PriceShippingDetail, PriceVendorDetail } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

function TrackingAsalDetail({
  priceVendorDetail,
}: {
  priceVendorDetail: PriceVendorDetail;
}) {
  const methods = useForm<QuotationDetailTrackingPrices>({
    defaultValues: priceVendorDetail,
  });

  return (
    <Modal title="Tracking Asal Detail" type="info" onDone={() => {}}>
      <Form
        methods={methods}
        singleTab={true}
        controls={[
          {
            type: "input",
            id: "tracking",
            label: "Tracking",
            input: <FormMoney name="tracking" readOnly />,
          },
          {
            type: "input",
            id: "buruh",
            label: "Buruh",
            input: <FormMoney name="buruh" readOnly />,
          },
          {
            type: "input",
            id: "thcOPT",
            label: "THC OPT",
            input: <FormMoney name="thcOPT" readOnly />,
          },
          {
            type: "input",
            id: "thc OPP",
            label: "THC OPP",
            input: <FormMoney name="thc OPP" readOnly />,
          },
          {
            type: "input",
            id: "adminBL",
            label: "Admin BL",
            input: <FormMoney name="adminBL" readOnly />,
          },
          {
            type: "input",
            id: "cleaning",
            label: "Cleaning",
            input: <FormMoney name="cleaning" readOnly />,
          },
          {
            type: "input",
            id: "materai",
            label: "Materai",
            input: <FormMoney name="materai" readOnly />,
          },
        ]}
      />
    </Modal>
  );
}

function TrackingTujuanDetail({
  priceVendorDetail,
}: {
  priceVendorDetail: PriceVendorDetail;
}) {
  const methods = useForm<QuotationDetailTrackingPrices>({
    defaultValues: priceVendorDetail,
  });

  return (
    <Modal title="Tracking Tujuan Detail" type="info" onDone={() => {}}>
      <Form
        methods={methods}
        singleTab={true}
        controls={[
          {
            type: "input",
            id: "tracking",
            label: "Tracking",
            input: <FormMoney name="tracking" readOnly />,
          },
          {
            type: "input",
            id: "buruh",
            label: "Buruh",
            input: <FormMoney name="buruh" readOnly />,
          },
          {
            type: "input",
            id: "thcOPT",
            label: "THC OPT",
            input: <FormMoney name="thcOPT" readOnly />,
          },
          {
            type: "input",
            id: "thc OPP",
            label: "THC OPP",
            input: <FormMoney name="thc OPP" readOnly />,
          },
          {
            type: "input",
            id: "adminBL",
            label: "Admin BL",
            input: <FormMoney name="adminBL" readOnly />,
          },
          {
            type: "input",
            id: "cleaning",
            label: "Cleaning",
            input: <FormMoney name="cleaning" readOnly />,
          },
          {
            type: "input",
            id: "materai",
            label: "Materai",
            input: <FormMoney name="materai" readOnly />,
          },
        ]}
      />
    </Modal>
  );
}

function ShippingDetail({
  priceShippingDetail,
}: {
  priceShippingDetail: PriceShippingDetail;
}) {
  const methods = useForm<QuotationDetailShippingPrices>({
    defaultValues: priceShippingDetail,
  });

  return (
    <Modal title="Shipping Detail" type="info" onDone={() => {}}>
      <Form
        methods={methods}
        singleTab={true}
        controls={[
          {
            type: "input",
            id: "freight",
            label: "Freight",
            input: <FormMoney name="freight" readOnly />,
          },
          {
            type: "input",
            id: "thcOPT",
            label: "THC OPT",
            input: <FormMoney name="thcOPT" readOnly />,
          },
          {
            type: "input",
            id: "thc OPP",
            label: "THC OPP",
            input: <FormMoney name="thc OPP" readOnly />,
          },
          {
            type: "input",
            id: "adminBL",
            label: "Admin BL",
            input: <FormMoney name="adminBL" readOnly />,
          },
          {
            type: "input",
            id: "cleaning",
            label: "Cleaning",
            input: <FormMoney name="cleaning" readOnly />,
          },
          {
            type: "input",
            id: "alihKapal",
            label: "Alih Kapal",
            input: <FormMoney name="alihKapal" readOnly />,
          },
          {
            type: "input",
            id: "materai",
            label: "Materai",
            input: <FormMoney name="materai" readOnly />,
          },
          {
            type: "input",
            id: "lolo",
            label: "LOLO",
            input: <FormMoney name="lolo" readOnly />,
          },
          {
            type: "input",
            id: "segel",
            label: "Segel",
            input: <FormMoney name="segel" readOnly />,
          },
          {
            type: "input",
            id: "rc",
            label: "RC",
            input: <FormMoney name="rc" readOnly />,
          },
          {
            type: "input",
            id: "lss",
            label: "LSS",
            input: <FormMoney name="lss" readOnly />,
          },
        ]}
      />
    </Modal>
  );
}

export default function SaveQuotationPage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Marketing | Price Calculation");
    setActive(2, 0, 0);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  const { setModal } = useModal();

  const { addToasts } = useToast();

  const queryNumber = useQuery("number");
  const queryID = useQuery("id");

  const [appendIndex, setAppendIndex] = React.useState(0);

  const methods = useForm<QuotationForm>({
    defaultValues: defaultQuotationForm,
    resolver: zodResolver(quotationValidationSchema),
  });
  const { reset, setValue } = methods;
  const values = methods.watch();

  const defaultFormQuery = trpc.quotations.getDefaultForm.useQuery(queryNumber);
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

  const nextNumberQuery = trpc.quotations.getNextNumber.useQuery();
  React.useEffect(() => {
    if (nextNumberQuery.data && !queryNumber) {
      setValue("number", nextNumberQuery.data);
    }
  }, [nextNumberQuery.data, queryNumber, setValue]);

  const salesOptionsQuery = trpc.sales.getOptions.useQuery();

  const factoriesOptionsQuery = trpc.customers.getOptions.useQuery("Factory");

  const factoryQuery = trpc.customers.getSingle.useQuery({
    code: values.factory,
    type: "Factory",
  });
  React.useEffect(() => {
    if (factoryQuery.data) {
      setValue("factoryAddress", factoryQuery.data.address);
    }
  }, [factoryQuery.data, setValue]);

  const routesOptionsQuery = trpc.routes.getOptions.useQuery();

  const detailFactoryQuery = trpc.customers.getSingle.useQuery({
    code: detail?.factory,
    type: "Factory",
  });
  React.useEffect(() => {
    if (detailFactoryQuery.data) {
      setValue(
        `details.${appendIndex}.factoryAddress`,
        detailFactoryQuery.data.address
      );
      setValue(
        `details.${appendIndex}.factoryCity`,
        detailFactoryQuery.data.city
      );
    }
  }, [appendIndex, detailFactoryQuery.data, setValue]);

  const portsOptionsQuery = trpc.ports.getOptions.useQuery();

  // Dari sini semuanya berkaitan dengan tracking asal
  // Kecuali untuk vendor yang dipakai juga di tracking tujuan
  const trackingVendorOptionsQuery =
    trpc.quotations.getTrackingVendorOptions.useQuery({
      port: detail?.port,
      containerSize: detail?.containerSize,
      containerType: detail?.containerType,
    });
  React.useEffect(() => {
    if (!trackingVendorOptionsQuery.data) return;

    if (
      detail?.trackingAsal.vendor &&
      !trackingVendorOptionsQuery.data.find(
        (option) => option.value === detail.trackingAsal.vendor
      )
    ) {
      setValue(`details.${appendIndex}.trackingAsal.vendor`, "");
      setValue(`details.${appendIndex}.trackingAsal.route`, "");
    }
    if (
      detail?.trackingTujuan.vendor &&
      !trackingVendorOptionsQuery.data.find(
        (option) => option.value === detail.trackingTujuan.vendor
      )
    ) {
      setValue(`details.${appendIndex}.trackingTujuan.vendor`, "");
      setValue(`details.${appendIndex}.trackingTujuan.route`, "");
    }
  }, [trackingVendorOptionsQuery.data, detail, setValue, appendIndex]);

  const trackingAsalRouteOptionsQuery =
    trpc.quotations.getTrackingRouteOptions.useQuery({
      vendor: detail?.trackingAsal.vendor,
      port: detail?.port,
      containerSize: detail?.containerSize,
      containerType: detail?.containerType,
    });
  React.useEffect(() => {
    if (!trackingAsalRouteOptionsQuery.data) return;

    if (
      detail?.trackingAsal.route &&
      !trackingAsalRouteOptionsQuery.data.find(
        (option) => option.value === detail.trackingAsal.route
      )
    ) {
      setValue(`details.${appendIndex}.trackingAsal.route`, "");
    }
  }, [trackingAsalRouteOptionsQuery.data, detail, setValue, appendIndex]);

  const trackingAsalDetailQuery = trpc.quotations.getTrackingDetail.useQuery({
    vendor: detail?.trackingAsal.vendor,
    route: detail?.trackingAsal.route,
    port: detail?.port,
    containerSize: detail?.containerSize,
    containerType: detail?.containerType,
  });
  React.useEffect(() => {
    if (trackingAsalDetailQuery.data !== undefined) {
      setValue(
        `details.${appendIndex}.trackingAsal.price`,
        trackingAsalDetailQuery.data
          ? calculateTrackingTotal(trackingAsalDetailQuery.data)
          : 0
      );
    }
  }, [trackingAsalDetailQuery.data, setValue, appendIndex]);

  // Dari sini semuanya berkaitan dengan tracking tujuan
  const trackingTujuanRouteOptionsQuery =
    trpc.quotations.getTrackingRouteOptions.useQuery({
      vendor: detail?.trackingTujuan.vendor,
      port: detail?.port,
      containerSize: detail?.containerSize,
      containerType: detail?.containerType,
    });
  React.useEffect(() => {
    if (!trackingTujuanRouteOptionsQuery.data) return;

    if (
      detail?.trackingTujuan.route &&
      !trackingTujuanRouteOptionsQuery.data.find(
        (option) => option.value === detail.trackingTujuan.route
      )
    ) {
      setValue(`details.${appendIndex}.trackingTujuan.route`, "");
    }
  }, [trackingTujuanRouteOptionsQuery.data, detail, setValue, appendIndex]);

  const trackingTujuanDetailQuery = trpc.quotations.getTrackingDetail.useQuery({
    vendor: detail?.trackingTujuan.vendor,
    route: detail?.trackingTujuan.route,
    port: detail?.port,
    containerSize: detail?.containerSize,
    containerType: detail?.containerType,
  });
  React.useEffect(() => {
    if (trackingTujuanDetailQuery.data !== undefined) {
      setValue(
        `details.${appendIndex}.trackingTujuan.price`,
        trackingTujuanDetailQuery.data
          ? calculateTrackingTotal(trackingTujuanDetailQuery.data)
          : 0
      );
    }
  }, [trackingTujuanDetailQuery.data, setValue, appendIndex]);

  // Dari sini semuanya berkaitan dengan shipping detail
  const shippingOptionsQuery = trpc.quotations.getShippingOptions.useQuery({
    port: detail?.port,
    containerSize: detail?.containerSize,
    containerType: detail?.containerType,
  });
  React.useEffect(() => {
    if (!shippingOptionsQuery.data) return;

    if (
      detail?.shippingDetail.shipping &&
      !shippingOptionsQuery.data.find(
        (option) => option.value === detail.shippingDetail.shipping
      )
    ) {
      setValue(`details.${appendIndex}.shippingDetail.shipping`, "");
      setValue(`details.${appendIndex}.shippingDetail.route`, "");
    }
  }, [shippingOptionsQuery.data, detail, setValue, appendIndex]);

  const shippingRouteOptionsQuery =
    trpc.quotations.getShippingRouteOptions.useQuery({
      shipping: detail?.shippingDetail.shipping,
      port: detail?.port,
      containerSize: detail?.containerSize,
      containerType: detail?.containerType,
    });
  React.useEffect(() => {
    if (!shippingRouteOptionsQuery.data) return;

    if (
      detail?.shippingDetail.route &&
      !shippingRouteOptionsQuery.data.find(
        (option) => option.value === detail.shippingDetail.route
      )
    ) {
      setValue(`details.${appendIndex}.shippingDetail.route`, "");
    }
  }, [shippingRouteOptionsQuery.data, detail, setValue, appendIndex]);

  const shippingDetailQuery = trpc.quotations.getShippingDetail.useQuery({
    shipping: detail?.shippingDetail.shipping,
    route: detail?.shippingDetail.route,
    port: detail?.port,
    containerSize: detail?.containerSize,
    containerType: detail?.containerType,
  });
  React.useEffect(() => {
    if (shippingDetailQuery.data !== undefined) {
      setValue(
        `details.${appendIndex}.shippingDetail.price`,
        shippingDetailQuery.data
          ? calculateShippingTotal(shippingDetailQuery.data)
          : 0
      );
    }
  }, [shippingDetailQuery.data, setValue, appendIndex]);

  // Dari sini semuanya berkaitan dengan other expanses
  React.useEffect(() => {
    if (detail) {
      setValue(
        `details.${appendIndex}.otherExpanses.price`,
        calculateOtherExpanses(detail.otherExpanses)
      );
    }
  }, [
    detail,
    setValue,
    appendIndex,
    detail?.otherExpanses.adminBL,
    detail?.otherExpanses.cleaning,
    detail?.otherExpanses.alihKapal,
    detail?.otherExpanses.materai,
    detail?.otherExpanses.biayaBuruh,
    detail?.otherExpanses.stuffingDalam,
    detail?.otherExpanses.stuffingLuar,
    detail?.otherExpanses.biayaCetakRC,
    detail?.otherExpanses.biayaCetakIR,
  ]);

  // Dari sini semuanya berkaitan dengan summary detail
  React.useEffect(() => {
    if (detail && detail?.summaryDetail.ppftz === "TidakAda")
      setValue(`details.${appendIndex}.summaryDetail.nilaiPPFTZ`, 0);
  }, [detail, detail?.summaryDetail.ppftz, appendIndex, setValue]);
  React.useEffect(() => {
    if (detail && detail?.summaryDetail.insurance === "TidakAda") {
      setValue(`details.${appendIndex}.summaryDetail.nilaiInsurance`, 0);
      setValue(`details.${appendIndex}.summaryDetail.biayaAdmin`, 0);
    }
  }, [detail, detail?.summaryDetail.insurance, appendIndex, setValue]);
  React.useEffect(() => {
    if (detail) {
      setValue(
        `details.${appendIndex}.summaryDetail.insuranceSum`,
        (detail?.summaryDetail.nilaiInsurance ?? 0) / 1000 +
          (detail?.summaryDetail.biayaAdmin ?? 0)
      );
    }
  }, [
    detail,
    setValue,
    appendIndex,
    detail?.summaryDetail.nilaiInsurance,
    detail?.summaryDetail.biayaAdmin,
  ]);
  React.useEffect(() => {
    if (detail) {
      setValue(
        `details.${appendIndex}.summaryDetail.hpp`,
        (detail?.trackingAsal.price ?? 0) +
          (detail?.trackingTujuan.price ?? 0) +
          (detail?.shippingDetail.price ?? 0) +
          (detail?.otherExpanses.price ?? 0) +
          (detail?.summaryDetail.nilaiPPFTZ ?? 0) +
          (detail?.summaryDetail.insuranceSum ?? 0)
      );
    }
  }, [
    setValue,
    appendIndex,
    detail,
    detail?.trackingAsal.price,
    detail?.trackingTujuan.price,
    detail?.shippingDetail.price,
    detail?.otherExpanses.price,
    detail?.summaryDetail.nilaiPPFTZ,
    detail?.summaryDetail.insuranceSum,
  ]);
  React.useEffect(() => {
    if (detail) {
      const hargaJual3 =
        detail?.summaryDetail.ppn === "Include"
          ? (detail.summaryDetail.hargaJual ?? 0) / 1.011
          : detail?.summaryDetail.hargaJual ?? 0;
      const hargaJual2 = (hargaJual3 * 11) / 1000;
      setValue(`details.${appendIndex}.summaryDetail.hargaJual3`, hargaJual3);
      setValue(`details.${appendIndex}.summaryDetail.hargaJual2`, hargaJual2);
      setValue(
        `details.${appendIndex}.summaryDetail.profit`,
        hargaJual3 - (detail?.summaryDetail.hpp ?? 0)
      );
    }
  }, [
    detail,
    detail?.summaryDetail.ppn,
    detail?.summaryDetail.hargaJual,
    setValue,
    detail?.summaryDetail.hpp,
    appendIndex,
  ]);

  const saveMutation = trpc.quotations.saveQuotation.useMutation();
  const confirmMutation = trpc.quotations.confirmDetail.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    if (queryID && detail?.id) {
      await confirmMutation.mutateAsync(detail.id);
      await router.push("/marketing/quotation");
    } else {
      await saveMutation
        .mutateAsync({
          ...data,
          number: queryNumber,
        })
        .then(async () => {
          await router.push("/marketing/quotation");
        })
        .catch((err) => {
          if (err instanceof TRPCClientError) {
            addToasts({ type: "error", message: err.message });
          }
        });
    }
  });

  return (
    <SaveLayout
      onSave={onSubmit}
      title="Price Calculation"
      isLoading={!values}
      isConfirm={!!queryID}
      onEdit={async () => {
        await router.push(`/marketing/quotation/save?number=${queryNumber}`);
      }}
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
                label: "Quotation Number",
                input: <FormCode name="number" readOnly />,
              },
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
                id: "serviceType",
                label: "Service Type",
                input: (
                  <FormSelect
                    name="serviceType"
                    options={ServiceTypes}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "sales",
                label: "Sales",
                input: (
                  <FormSelect
                    name="sales"
                    options={salesOptionsQuery.data ?? []}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "effectiveStartDate",
                label: "Effective Start Date",
                input: (
                  <FormDate name="effectiveStartDate" readOnly={!!queryID} />
                ),
              },
              {
                type: "input",
                id: "effectiveEndDate",
                label: "Effective End Date",
                input: (
                  <FormDate name="effectiveEndDate" readOnly={!!queryID} />
                ),
              },
              {
                type: "input",
                id: "factory",
                label: "Factory",
                input: (
                  <FormSelect
                    name="factory"
                    options={factoriesOptionsQuery.data ?? []}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "input",
                id: "factoryAddress",
                label: "Address",
                input: <FormText name="factoryAddress" readOnly />,
              },
            ],
          },
          {
            id: "detailQuotation",
            name: "Detail Quotation",
            controls: [
              {
                type: "input",
                id: "route",
                label: "Route",
                input: (
                  <FormSelect
                    name="route"
                    options={routesOptionsQuery.data ?? []}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "input",
                id: "factory",
                label: "Delivery To",
                input: (
                  <FormSelect
                    name="factory"
                    options={factoriesOptionsQuery.data ?? []}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "factoryAddress",
                label: "Address",
                input: <FormText name="factoryAddress" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "factoryCity",
                label: "City",
                input: <FormText name="factoryCity" readOnly />,
              },
              {
                type: "input",
                id: "port",
                label: "Port",
                input: (
                  <FormSelect
                    name="port"
                    options={portsOptionsQuery.data ?? []}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "containerSize",
                label: "Container Size",
                input: (
                  <FormSelect
                    name="containerSize"
                    options={ContainerSizes}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "input",
                id: "containerType",
                label: "Container Type",
                input: (
                  <FormSelect
                    name="containerType"
                    options={ContainerTypes}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "separator",
                label: "Tracking Asal",
              },
              {
                type: "input",
                id: "trackingAsal.vendor",
                label: "Vendor",
                input: (
                  <FormSelect
                    name="trackingAsal.vendor"
                    options={trackingVendorOptionsQuery.data ?? []}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "input",
                id: "trackingAsal.route",
                label: "Route",
                input: (
                  <FormSelect
                    name="trackingAsal.route"
                    options={trackingAsalRouteOptionsQuery.data ?? []}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "input",
                id: "trackingAsal.price",
                label: "Price",
                input: <FormMoney name="trackingAsal.price" readOnly />,
                detail: () => {
                  if (trackingAsalDetailQuery.data) {
                    setModal(
                      <TrackingAsalDetail
                        priceVendorDetail={trackingAsalDetailQuery.data}
                      />
                    );
                  }
                },
              },
              {
                type: "separator",
                label: "Tracking Tujuan",
              },
              {
                type: "input",
                id: "trackingTujuan.vendor",
                label: "Vendor",
                input: (
                  <FormSelect
                    name="trackingTujuan.vendor"
                    options={trackingVendorOptionsQuery.data ?? []}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "input",
                id: "trackingTujuan.route",
                label: "Route",
                input: (
                  <FormSelect
                    name="trackingTujuan.route"
                    options={trackingTujuanRouteOptionsQuery.data ?? []}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "input",
                id: "trackingTujuan.price",
                label: "Price",
                input: <FormMoney name="trackingTujuan.price" readOnly />,
                detail: () => {
                  if (trackingTujuanDetailQuery.data) {
                    setModal(
                      <TrackingTujuanDetail
                        priceVendorDetail={trackingTujuanDetailQuery.data}
                      />
                    );
                  }
                },
              },
              {
                type: "separator",
                label: "Shipping Detail",
              },
              {
                type: "input",
                id: "shippingDetail.shipping",
                label: "Shipping",
                input: (
                  <FormSelect
                    name="shippingDetail.shipping"
                    options={shippingOptionsQuery.data ?? []}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "input",
                id: "shippingDetail.route",
                label: "Route",
                input: (
                  <FormSelect
                    name="shippingDetail.route"
                    options={shippingRouteOptionsQuery.data ?? []}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "input",
                id: "shippingDetail.price",
                label: "Price",
                input: <FormMoney name="shippingDetail.price" readOnly />,
                detail: () => {
                  if (shippingDetailQuery.data) {
                    setModal(
                      <ShippingDetail
                        priceShippingDetail={shippingDetailQuery.data}
                      />
                    );
                  }
                },
              },
              {
                type: "separator",
                label: "Other Expanses",
              },
              {
                id: "otherExpanses.adminBL",
                label: "Admin BL",
                type: "input",
                input: (
                  <FormMoney
                    name="otherExpanses.adminBL"
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                id: "otherExpanses.cleaning",
                label: "Cleaning",
                type: "input",
                input: (
                  <FormMoney
                    name="otherExpanses.cleaning"
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                id: "otherExpanses.alihKapal",
                label: "Alih Kapal",
                type: "input",
                input: (
                  <FormMoney
                    name="otherExpanses.alihKapal"
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                id: "otherExpanses.materai",
                label: "Materai",
                type: "input",
                input: (
                  <FormMoney
                    name="otherExpanses.materai"
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                id: "otherExpanses.biayaBuruh",
                label: "Biaya Buruh",
                type: "input",
                input: (
                  <FormMoney
                    name="otherExpanses.biayaBuruh"
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                id: "otherExpanses.stuffingDalam",
                label: "Stuffing Dalam",
                type: "input",
                input: (
                  <FormMoney
                    name="otherExpanses.stuffingDalam"
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                id: "otherExpanses.stuffingLuar",
                label: "Stuffing Luar",
                type: "input",
                input: (
                  <FormMoney
                    name="otherExpanses.stuffingLuar"
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                id: "otherExpanses.biayaCetakRC",
                label: "Biaya Cetak RC",
                type: "input",
                input: (
                  <FormMoney
                    name="otherExpanses.biayaCetakRC"
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                id: "otherExpanses.biayaCetakIR",
                label: "Biaya Cetak IR",
                type: "input",
                input: (
                  <FormMoney
                    name="otherExpanses.biayaCetakIR"
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                id: "otherExpanses.price",
                type: "input",
                label: "Price",
                input: <FormMoney name="otherExpanses.price" readOnly />,
              },
              {
                type: "separator",
                label: "Summary Detail",
              },
              {
                type: "input",
                id: "summaryDetail.ppftz",
                label: "PPFTZ",
                input: (
                  <FormRadio
                    name="summaryDetail.ppftz"
                    options={QuotationStatus}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "summaryDetail.nilaiPPFTZ",
                label: "",
                input: (
                  <FormMoney
                    name="summaryDetail.nilaiPPFTZ"
                    readOnly={
                      detail?.summaryDetail.ppftz === "TidakAda" || !!queryID
                    }
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "summaryDetail.insurance",
                label: "Insurance",
                input: (
                  <FormRadio
                    name="summaryDetail.insurance"
                    options={QuotationStatus}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "summaryDetail.nilaiInsurance",
                label: "",
                input: (
                  <FormMoney
                    name="summaryDetail.nilaiInsurance"
                    readOnly={
                      detail?.summaryDetail.insurance === "TidakAda" ||
                      !!queryID
                    }
                  />
                ),
              },
              {
                type: "input",
                id: "summaryDetail.rate",
                label: "x Rate",
                input: <FormText name="summaryDetail.rate" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "summaryDetail.biayaAdmin",
                label: "+ Biaya Admin",
                input: (
                  <FormMoney
                    name="summaryDetail.biayaAdmin"
                    readOnly={
                      detail?.summaryDetail.insurance === "TidakAda" ||
                      !!queryID
                    }
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "summaryDetail.insuranceSum",
                label: "= Sum Off",
                input: <FormMoney name="summaryDetail.insuranceSum" readOnly />,
              },
              {
                type: "input",
                id: "summaryDetail.hpp",
                label: "HPP",
                input: <FormMoney name="summaryDetail.hpp" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "summaryDetail.ppn",
                label: "PPN",
                input: (
                  <FormRadio
                    name="summaryDetail.ppn"
                    options={QuotationStatus.slice(0, 2)}
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "summaryDetail.hargaJual",
                label: "Harga Jual",
                input: (
                  <FormMoney
                    name="summaryDetail.hargaJual"
                    readOnly={!!queryID}
                  />
                ),
              },
              {
                type: "input",
                id: "summaryDetail.profit",
                label: "Profit",
                input: <FormMoney name="summaryDetail.profit" readOnly />,
              },
              {
                type: "input",
                id: "summaryDetail.hargaJual2",
                label: "",
                input: <FormMoney name="summaryDetail.hargaJual2" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "summaryDetail.hargaJual3",
                label: "",
                input: <FormMoney name="summaryDetail.hargaJual3" readOnly />,
                isHidden: detail?.summaryDetail.ppn === "Exclude",
              },
            ],
            isAppend: true,
            itemName: "Detail",
            fieldName: "details",
            onChangeItem: (index) => setAppendIndex(index),
            defaultValue: defaultQuotationDetailForm,
            readOnly: !!queryID,
            hideItems: !!queryID,
          },
        ]}
      />
    </SaveLayout>
  );
}
