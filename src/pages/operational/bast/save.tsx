import {
  Form,
  FormCode,
  FormCounter,
  FormDate,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { trpc } from "@/libs/trpc";
import {
  BASTForm,
  bastValidationSchema,
  defaultBASTForm,
} from "@/server/dtos/bast.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function BASTSavePage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Berita Acara Serah Terima");
    setActive(2, 4, 0);
  }, [setTitle, setActive]);

  const { addToasts } = useToast();

  const router = useRouter();

  const methods = useForm<BASTForm>({
    defaultValues: defaultBASTForm,
    resolver: zodResolver(bastValidationSchema),
  });
  const { reset, setValue } = methods;
  const values = methods.watch();

  const nextNumberQuery = trpc.bast.getNextNumber.useQuery();
  React.useEffect(() => {
    if (!nextNumberQuery.data) return;

    setValue("number", nextNumberQuery.data);
  }, [nextNumberQuery.data, setValue]);

  const suratJalanOptionsQuery = trpc.bast.getSuratJalanOptions.useQuery();

  const suratJalanQuery = trpc.suratJalan.getSingle.useQuery(values.suratJalan);
  React.useEffect(() => {
    if (!suratJalanQuery.data) return;

    const sj = suratJalanQuery.data;
    setValue("shipmentOrDO", sj.shipmentOrDO);
    setValue("jobOrder", sj.jobOrderConfirmation.number);
    setValue(
      "factory",
      `${sj.jobOrderConfirmation.inquiryDetail.priceFactory.quotationDetail.quotation.factory.code} (${sj.jobOrderConfirmation.inquiryDetail.priceFactory.quotationDetail.quotation.factory.name})`
    );
    setValue(
      "factoryAddress",
      sj.jobOrderConfirmation.inquiryDetail.priceFactory.quotationDetail
        .quotation.factory.address
    );
    setValue(
      "factoryCity",
      sj.jobOrderConfirmation.inquiryDetail.priceFactory.quotationDetail
        .quotation.factory.city
    );
    setValue(
      "consignee",
      `${sj.jobOrderConfirmation.consignee.code} (${sj.jobOrderConfirmation.consignee.name})`
    );
    setValue("consigneeAddress", sj.jobOrderConfirmation.consignee.address);
    setValue("consigneeCity", sj.jobOrderConfirmation.consignee.city);
    setValue("vehicle", sj.jobOrderConfirmation.vehicle.truckNumber);
    setValue(
      "shipping",
      `${sj.jobOrderConfirmation.inquiryDetail.vesselSchedule.shipping.code} (${sj.jobOrderConfirmation.inquiryDetail.vesselSchedule.shipping.name})`
    );
    setValue(
      "vessel",
      sj.jobOrderConfirmation.inquiryDetail.vesselSchedule.vessel.name
    );
    setValue(
      "voyage",
      sj.jobOrderConfirmation.inquiryDetail.vesselSchedule.voyage
    );
    setValue("containerNumber1", sj.jobOrderConfirmation.containerNumber1);
    setValue("sealNumber1", sj.jobOrderConfirmation.sealNumber1);
    setValue(
      "containerNumber2",
      sj.jobOrderConfirmation.containerNumber2 ?? ""
    );
    setValue("sealNumber2", sj.jobOrderConfirmation.sealNumber2 ?? "");
    console.log("S");
    sj.detailProducts.forEach((dp, i) => {
      setValue(`details.${i}.id`, dp.id);
      setValue(
        `details.${i}.product`,
        `${dp.product.skuCode} (${dp.product.name})`
      );
      setValue(`details.${i}.qty`, dp.qty);
      setValue(`details.${i}.unit`, dp.unit);
    });
  }, [suratJalanQuery.data, setValue]);
  console.log(values.details);

  const saveMutation = trpc.bast.save.useMutation();
  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync(data);

    await router.push("/operational/bast");
  });

  return (
    <SaveLayout onSave={onSubmit} title="Input BAST" isLoading={!values}>
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
                label: "BAST Number",
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
                id: "suratJalan",
                label: "Surat Jalan",
                input: (
                  <FormSelect
                    name="suratJalan"
                    options={suratJalanOptionsQuery.data}
                  />
                ),
              },
              {
                type: "input",
                id: "jobOrder",
                label: "Job Order",
                input: <FormText name="jobOrder" readOnly />,
              },
              {
                type: "input",
                id: "shipmentOrDO",
                label: "Shipment / DO",
                input: <FormCounter name="shipmentOrDO" min={0} readOnly />,
              },
              { type: "separator" },
              {
                type: "input",
                id: "factory",
                label: "Customer",
                input: <FormText name="factory" readOnly />,
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
                id: "consignee",
                label: "Consignee",
                input: <FormText name="consignee" readOnly />,
              },
              {
                type: "input",
                id: "consigneeAddress",
                label: "Address",
                input: <FormText name="consigneeAddress" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "consigneeCity",
                label: "City",
                input: <FormText name="consigneeCity" readOnly />,
              },
              { type: "separator" },
              {
                type: "input",
                id: "vehicle",
                label: "Truck",
                input: <FormText name="vehicle" readOnly />,
              },
              {
                type: "input",
                id: "shipping",
                label: "Shipping",
                input: <FormText name="shipping" readOnly />,
              },
              {
                type: "input",
                id: "vessel",
                label: "Vessel",
                input: <FormText name="vessel" readOnly />,
              },
              {
                type: "input",
                id: "voyage",
                label: "Voyage",
                input: <FormText name="voyage" readOnly />,
              },
              {
                type: "input",
                id: "containerNumber1",
                label: "Container Number",
                input: <FormText name="containerNumber1" readOnly />,
              },
              {
                type: "input",
                id: "sealNumber1",
                label: "Seal Number",
                input: <FormText name="sealNumber1" readOnly />,
              },
              {
                type: "input",
                id: "containerNumber2",
                label: "Container Number",
                input: <FormText name="containerNumber2" readOnly />,
              },
              {
                type: "input",
                id: "sealNumber2",
                label: "Seal Number",
                input: <FormText name="sealNumber2" readOnly />,
              },
              {
                type: "input",
                id: "details.0.product",
                label: "Seal Number",
                input: <FormText name="details.0.product" readOnly />,
              },
              { type: "separator" },
              {
                type: "table",
                id: "details",
                columns: [
                  {
                    id: "product",
                    label: "Product",
                    input: <FormText name="product" readOnly />,
                  },
                  {
                    id: "qty",
                    label: "Quantity",
                    input: <FormCounter name="qty" min={0} readOnly />,
                  },
                  {
                    id: "unit",
                    label: "Satuan",
                    input: <FormText name="unit" readOnly />,
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
