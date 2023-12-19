import {
  Form,
  FormCode,
  FormDate,
  FormMoney,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { trpc } from "@/libs/trpc";
import {
  InsuranceForm,
  insuranceValidationSchema,
} from "@/server/dtos/insurance.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function InsuranceSavePage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Insurance");
    setActive(2, 6, 0);
  }, [setTitle, setActive]);

  const { addToasts } = useToast();

  const router = useRouter();

  const methods = useForm<InsuranceForm>({
    resolver: zodResolver(insuranceValidationSchema),
  });
  const { reset, setValue } = methods;
  const values = methods.watch();

  const nextNumberQuery = trpc.insurances.getNextNumber.useQuery();
  React.useEffect(() => {
    if (!nextNumberQuery.data) return;

    setValue("number", nextNumberQuery.data);
  }, [nextNumberQuery.data, setValue]);

  const jobOrderOptionsQuery = trpc.insurances.getJobOrderOptions.useQuery();

  const jobOrderQuery = trpc.jobOrders.getSingle.useQuery(values.jobOrder);
  React.useEffect(() => {
    if (!jobOrderQuery.data) return;

    const jo = jobOrderQuery.data;
    setValue("jobOrder", jo.number);
    setValue(
      "factory",
      `${jo.inquiryDetail.priceFactory.quotationDetail.quotation.factory.code} (${jo.inquiryDetail.priceFactory.quotationDetail.quotation.factory.name})`
    );
    setValue(
      "factoryAddress",
      jo.inquiryDetail.priceFactory.quotationDetail.quotation.factory.address
    );
    setValue(
      "factoryCity",
      jo.inquiryDetail.priceFactory.quotationDetail.quotation.factory.city
    );
    setValue("consignee", `${jo.consignee.code} (${jo.consignee.name})`);
    setValue("consigneeAddress", jo.consignee.address);
    setValue("consigneeCity", jo.consignee.city);
    setValue("vehicle", jo.vehicle.truckNumber);
    setValue(
      "shipping",
      `${jo.inquiryDetail.vesselSchedule.shipping.code} (${jo.inquiryDetail.vesselSchedule.shipping.name})`
    );
    setValue("vessel", jo.inquiryDetail.vesselSchedule.vessel.name);
    setValue("voyage", jo.inquiryDetail.vesselSchedule.voyage);
    setValue("containerNumber1", jo.containerNumber1);
    setValue("sealNumber1", jo.sealNumber1);
    setValue("containerNumber2", jo.containerNumber2 ?? "");
    setValue("sealNumber2", jo.sealNumber2 ?? "");
  }, [jobOrderQuery.data, setValue]);

  React.useEffect(() => {
    const premi = Number(values.premi);

    setValue(
      "total",
      isNaN(premi) ? 0 : values.nilaiTertanggung * Number(values.premi)
    );
  }, [setValue, values.nilaiTertanggung, values.premi]);

  const saveMutation = trpc.insurances.save.useMutation();
  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync(data);

    await router.push("/operational/insurance");
  });

  return (
    <SaveLayout onSave={onSubmit} title="Input Insurance" isLoading={!values}>
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
                label: "Insurance Number",
                input: <FormCode name="number" readOnly />,
              },
              {
                type: "input",
                id: "createDate",
                label: "Confirm Date",
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
                type: "input",
                id: "factoryCity",
                label: "City",
                input: <FormText name="factoryCity" readOnly />,
              },
              {
                type: "blank",
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
              { type: "separator" },
              {
                type: "input",
                id: "nilaiTertanggung",
                label: "Nilai Tertanggung",
                input: <FormMoney name="nilaiTertanggung" />,
              },
              {
                type: "input",
                id: "premi",
                label: "Premi",
                input: <FormText name="premi" />,
              },
              {
                type: "input",
                id: "total",
                label: "Total",
                input: <FormMoney name="total" readOnly />,
              },
              {
                type: "input",
                id: "keterangan",
                label: "Keterangan",
                input: <FormText name="keterangan" />,
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
