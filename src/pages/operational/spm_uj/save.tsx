import {
  Form,
  FormCode,
  FormDate,
  FormMoney,
  FormPhone,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { trpc } from "@/libs/trpc";
import { SPMForm, spmValidationSchema } from "@/server/dtos/spm.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function SuratPerintahMuatDanUangJalanSavePage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Surat Perintah Muat & Uang Jalan");
    setActive(3, 2, 0);
  }, [setTitle, setActive]);

  const { addToasts } = useToast();

  const router = useRouter();

  const methods = useForm<SPMForm>({
    resolver: zodResolver(spmValidationSchema),
  });
  const { reset, setValue } = methods;
  const values = methods.watch();

  const nextNumberQuery = trpc.spm.getNextNumber.useQuery();
  React.useEffect(() => {
    if (!nextNumberQuery.data) return;

    setValue("number", nextNumberQuery.data);
  }, [nextNumberQuery.data, setValue]);

  const jobOrderOptionsQuery = trpc.spm.getJobOrderOptions.useQuery();

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
    setValue("consignee", `${jo.consignee.code} (${jo.consignee.name})`);
    setValue("consigneeAddress", jo.consignee.address);
    setValue("stuffingDate", jo.stuffingDate);
    setValue(
      "vendor",
      `${jo.priceVendorDetail.priceVendor.vendor.code} (${jo.priceVendorDetail.priceVendor.vendor.name})`
    );
    setValue(
      "route",
      `${jo.priceVendorDetail.route.code} (${jo.priceVendorDetail.route.startDescription} - ${jo.priceVendorDetail.route.endDescription})`
    );
    setValue("vehicle", jo.vehicle.truckNumber);
    setValue("vehicleType", jo.vehicle.type);
    setValue("driverName", jo.driverName);
    setValue("driverPhoneNumber", jo.driverPhoneNumber);
    setValue("containerNumber1", jo.containerNumber1);
    setValue("sealNumber1", jo.sealNumber1);
    setValue("containerNumber2", jo.containerNumber2 ?? "");
    setValue("sealNumber2", jo.sealNumber2 ?? "");
  }, [jobOrderQuery.data, setValue]);

  const uangJalanQuery = trpc.spm.getUangJalan.useQuery({
    priceVendor: jobOrderQuery.data?.priceVendorDetail.id,
    truckType: jobOrderQuery.data?.vehicle.type,
  });

  React.useEffect(() => {
    if (!uangJalanQuery.error) return;

    addToasts({
      type: "error",
      message: uangJalanQuery.error.message,
    });
  }, [uangJalanQuery.error, addToasts]);

  React.useEffect(() => {
    if (!uangJalanQuery.data) return;

    setValue("uangJalan", uangJalanQuery.data.total);
  }, [uangJalanQuery.data, setValue]);

  const saveMutation = trpc.spm.save.useMutation();
  const onSubmit = methods.handleSubmit(async (data) => {
    if (!uangJalanQuery.data) return;

    await saveMutation.mutateAsync({
      ...data,
      uangJalan: uangJalanQuery.data.id,
    });

    await router.push("/operational/spm_uj");
  });

  return (
    <SaveLayout
      onSave={onSubmit}
      title="Input Surat Perintah Muat & Uang Jalan"
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
                label: "SPM Number",
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
              { type: "separator" },
              {
                type: "input",
                id: "stuffingDate",
                label: "Stuffing Date",
                input: <FormDate name="stuffingDate" readOnly />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "vendor",
                label: "Tracking",
                input: <FormText name="vendor" readOnly />,
              },
              {
                type: "input",
                id: "route",
                label: "Tracking Route",
                input: <FormText name="route" readOnly />,
              },
              {
                type: "input",
                id: "vehicle",
                label: "Truck",
                input: <FormText name="vehicle" readOnly />,
              },
              {
                type: "input",
                id: "vehicleType",
                label: "Truck Type",
                input: <FormText name="vehicleType" readOnly />,
              },
              {
                type: "input",
                id: "driverName",
                label: "Driver Name",
                input: <FormText name="driverName" readOnly />,
              },
              {
                type: "input",
                id: "driverPhoneNumber",
                label: "Driver Phone Number",
                input: <FormPhone name="driverPhoneNumber" readOnly />,
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
                id: "uangJalan",
                label: "Uang Jalan",
                input: <FormMoney name="uangJalan" readOnly />,
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
