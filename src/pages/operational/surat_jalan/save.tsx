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
import { ProductForm } from "@/server/dtos/product.dto";
import {
  SuratJalanForm,
  defaultSuratJalanDetailProductForm,
  defaultSuratJalanForm,
  suratJalanTypeProducts,
  suratJalanValidationSchema,
} from "@/server/dtos/suratJalan.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function SuratJalanSavePage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Surat Jalan");
    setActive(3, 3, 0);
  }, [setTitle, setActive]);

  const [appendIndex, setAppendIndex] = React.useState(0);

  const { addToasts } = useToast();

  const router = useRouter();

  const methods = useForm<SuratJalanForm>({
    defaultValues: defaultSuratJalanForm,
    resolver: zodResolver(suratJalanValidationSchema),
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

  const jobOrderOptionsQuery = trpc.suratJalan.getJobOrderOptions.useQuery();

  const jobOrderQuery = trpc.jobOrders.getSingle.useQuery(values.jobOrder);
  React.useEffect(() => {
    if (!jobOrderQuery.data) return;

    const jo = jobOrderQuery.data;
    setValue(
      "factory",
      `${jo.inquiryDetail.priceFactory.quotationDetail.quotation.factory.code} (${jo.inquiryDetail.priceFactory.quotationDetail.quotation.factory.name})`
    );
    setValue(
      "factoryAddress",
      jo.inquiryDetail.priceFactory.quotationDetail.quotation.factory.address
    );
    setValue(
      "factoryAddress",
      jo.inquiryDetail.priceFactory.quotationDetail.quotation.factory.city
    );
    setValue("consignee", `${jo.consignee.code} (${jo.consignee.name})`);
    setValue("consigneeAddress", jo.consignee.address);
    setValue("consigneeCity", jo.consignee.city);
    setValue("vehicle", jo.vehicle.truckNumber);
    setValue("containerNumber1", jo.containerNumber1);
    setValue("sealNumber1", jo.sealNumber1);
    setValue("containerNumber2", jo.containerNumber2 ?? "");
    setValue("sealNumber2", jo.sealNumber2 ?? "");
  }, [jobOrderQuery.data, setValue]);

  const productOptionsQuery = trpc.suratJalan.getProductOptions.useQuery();

  const productQuery = trpc.products.getSingle.useQuery(detail.product);
  const productUnitOptions = React.useMemo(() => {
    if (!productQuery.data) return [];

    switch (productQuery.data.type) {
      case "Product":
        return ProductForm.productUnitOptions;
      case "Sparepart":
        return ProductForm.sparepartUnitOptions;
      case "ATK":
        return ProductForm.atkUnitOptions;
    }
  }, [productQuery.data]);

  const saveMutation = trpc.suratJalan.save.useMutation();
  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync(data);

    await router.push("/operational/surat_jalan");
  });

  return (
    <SaveLayout onSave={onSubmit} title="Input Surat Jalan" isLoading={!values}>
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
                label: "Surat Jalan Number",
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
                id: "jobOrder",
                label: "Job Order",
                input: (
                  <FormSelect
                    name="jobOrder"
                    options={jobOrderOptionsQuery.data}
                  />
                ),
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
                id: "shipmentOrDO",
                label: "Shipment / DO",
                input: <FormCounter name="shipmentOrDO" min={0} />,
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
              { type: "separator" },
              {
                type: "input",
                id: "typeProduct",
                label: "Type Product",
                input: (
                  <FormSelect
                    name="typeProduct"
                    options={suratJalanTypeProducts}
                  />
                ),
              },
            ],
          },
          {
            id: "detailProduct",
            name: "Detail Product",
            controls: [
              {
                type: "input",
                id: "product",
                label: "Product",
                input: (
                  <FormSelect
                    name="product"
                    options={productOptionsQuery.data}
                  />
                ),
              },
              {
                type: "input",
                id: "qty",
                label: "Quantity",
                input: <FormCounter name="qty" min={0} />,
              },
              {
                type: "input",
                id: "unit",
                label: "Satuan",
                input: <FormSelect name="unit" options={productUnitOptions} />,
              },
            ],
            isAppend: true,
            itemName: "Detail",
            fieldName: "details",
            defaultValue: defaultSuratJalanDetailProductForm,
            onChangeItem: (index) => setAppendIndex(index),
          },
        ]}
      />
    </SaveLayout>
  );
}
