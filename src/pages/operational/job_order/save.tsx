import {
  Form,
  FormCode,
  FormDate,
  FormEmail,
  FormPhone,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { setValues } from "@/libs/functions";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import {
  JobOrderForm,
  defaultJobOrderForm,
  jobOrderValidationSchema,
} from "@/server/dtos/jobOrder.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function JobOrderSavePage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Job Order");
    setActive(3, 1, 0);
  }, [setTitle, setActive]);

  const router = useRouter();

  const { addToasts } = useToast();

  const queryNumber = useQuery("number");
  const queryID = useQuery("id");

  const methods = useForm<JobOrderForm>({
    defaultValues: defaultJobOrderForm,
    resolver: zodResolver(jobOrderValidationSchema),
  });
  const { reset, setValue } = methods;
  const values = methods.watch();

  const [isCombo, setIsCombo] = React.useState(false);

  const nextNumberQuery = trpc.jobOrders.getNextNumber.useQuery();
  React.useEffect(() => {
    if (nextNumberQuery.data && !queryNumber) {
      setValue("number", nextNumberQuery.data);
    }
  }, [nextNumberQuery.data, queryNumber, setValue]);

  const inquiryDetailQuery = trpc.jobOrders.getInquiryDetail.useQuery(queryID);
  React.useEffect(() => {
    if (inquiryDetailQuery.data) {
      setValues(inquiryDetailQuery.data, setValue);
    }
  }, [inquiryDetailQuery.data, setValue, queryID]);

  const vendorsOptionsQuery = trpc.customers.getOptions.useQuery("Vendor");

  const vendorQuery = trpc.customers.getSingle.useQuery({
    type: "Vendor",
    code: values.consignee,
  });
  React.useEffect(() => {
    if (!vendorQuery.data) return;

    setValue("consigneeEmail", vendorQuery.data.email);
    setValue("consigneeAddress", vendorQuery.data.address);
    setValue("consigneeCity", vendorQuery.data.city);
    setValue("consigneeTelephone", vendorQuery.data.telephone);
  }, [vendorQuery.data, setValue]);

  const trackingsQuery = trpc.jobOrders.getTrackingOptions.useQuery();

  const routesOptionsQuery = trpc.jobOrders.getRouteOptions.useQuery({
    tracking: values.vendor,
  });

  const vehiclesOptionsQuery = trpc.jobOrders.getTruckOptions.useQuery({
    tracking: values.vendor,
  });

  const vehicleQuery = trpc.vehicles.getSingle.useQuery(values.vehicle);
  React.useEffect(() => {
    if (!vehicleQuery.data) return;

    setValue("vehicleType", vehicleQuery.data.type);
  }, [vehicleQuery.data, setValue]);

  const saveMutation = trpc.jobOrders.save.useMutation();
  const onSubmit = methods.handleSubmit(async (data) => {
    if (queryID) {
      await saveMutation
        .mutateAsync({
          ...data,
          inquiryDetail: queryID,
        })
        .then(async () => {
          await router.push("/operational/job_order");
        })
        .catch((err) => {
          if (err instanceof TRPCClientError) {
            addToasts({ type: "error", message: err.message });
          }
        });
    } else if (queryNumber) {
      await saveMutation
        .mutateAsync({
          ...data,
          number: queryNumber,
        })
        .then(async () => {
          await router.push("/operational/job_order");
        })
        .catch((err) => {
          if (err instanceof TRPCClientError) {
            addToasts({ type: "error", message: err.message });
          }
        });
    }
  });

  return (
    <SaveLayout onSave={onSubmit} title="Input Job Order" isLoading={!values}>
      <Form
        methods={methods}
        tabs={[
          {
            id: "orderInformation",
            name: "Order Information",
            controls: [
              {
                type: "input",
                id: "number",
                label: "Job Order Number",
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
                id: "inquiryNumber",
                label: "Inquiry Number",
                input: <FormCode name="inquiryNumber" readOnly />,
              },
              {
                type: "input",
                id: "inquiryDate",
                label: "Inquiry Date",
                input: <FormDate name="inquiryDate" readOnly />,
              },
              {
                type: "input",
                id: "sales",
                label: "Sales",
                input: <FormText name="sales" readOnly />,
              },
              { type: "separator" },
              {
                type: "input",
                id: "shipping",
                label: "Shipping",
                input: <FormText name="shipping" readOnly />,
              },
              {
                type: "blank",
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
                id: "etd",
                label: "ETD",
                input: <FormDate name="etd" readOnly />,
              },
              {
                type: "input",
                id: "eta",
                label: "ETA",
                input: <FormDate name="eta" readOnly />,
              },
              { type: "separator" },
              {
                type: "input",
                id: "loadDate",
                label: "Load Date",
                input: <FormDate name="loadDate" readOnly />,
              },
              {
                type: "input",
                id: "route",
                label: "Route",
                input: <FormText name="route" readOnly />,
              },
              {
                type: "input",
                id: "factory",
                label: "Factory",
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
                id: "deliveryTo",
                label: "Delivery To",
                input: <FormText name="deliveryTo" readOnly />,
              },
              {
                type: "input",
                id: "deliveryToCity",
                label: "City",
                input: <FormText name="deliveryToCity" readOnly />,
              },
              {
                type: "input",
                id: "containerSize",
                label: "Container Size",
                input: <FormText name="containerSize" readOnly />,
              },
              {
                type: "input",
                id: "containerType",
                label: "Container Type",
                input: <FormText name="containerType" readOnly />,
              },
            ],
          },
          {
            id: "orderConfirmation",
            name: "Order Confirmation",
            controls: [
              {
                type: "input",
                id: "typeOrder",
                label: "Type Order",
                input: <FormText name="typeOrder" readOnly />,
              },
              {
                type: "input",
                id: "roNumber",
                label: "RO Number",
                input: <FormText name="roNumber" numeric />,
              },
              {
                type: "input",
                id: "consignee",
                label: "Consignee",
                input: (
                  <FormSelect
                    name="consignee"
                    options={vendorsOptionsQuery.data}
                  />
                ),
              },
              {
                type: "blank",
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
              {
                type: "input",
                id: "consigneeEmail",
                label: "Email",
                input: <FormEmail name="consigneeEmail" readOnly />,
              },
              {
                type: "input",
                id: "consigneeTelephone",
                label: "Telephone",
                input: <FormPhone name="consigneeTelephone" readOnly />,
              },
              { type: "separator" },
              {
                type: "input",
                id: "stuffingDate",
                label: "Stuffing Date",
                input: <FormDate name="stuffingDate" />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "vendor",
                label: "Tracking",
                input: (
                  <FormSelect name="vendor" options={trackingsQuery.data} />
                ),
              },
              {
                type: "input",
                id: "trackingRoute",
                label: "Tracking Route",
                input: (
                  <FormSelect
                    name="trackingRoute"
                    options={routesOptionsQuery.data}
                  />
                ),
              },
              {
                type: "input",
                id: "vehicle",
                label: "Truck",
                input: (
                  <FormSelect
                    name="vehicle"
                    options={vehiclesOptionsQuery.data}
                  />
                ),
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
                input: <FormText name="driverName" />,
              },
              {
                type: "input",
                id: "driverPhoneNumber",
                label: "Driver Phone Number",
                input: <FormPhone name="driverPhoneNumber" />,
              },
              {
                type: "input",
                id: "containerNumber1",
                label: "Container Number",
                input: <FormText name="containerNumber1" />,
              },
              {
                type: "input",
                id: "sealNumber1",
                label: "Seal Number",
                input: <FormText name="sealNumber1" />,
              },
              {
                type: "input",
                id: "containerNumber2",
                label: "Container Number",
                input: <FormText name="containerNumber2" />,
                isHidden: !isCombo,
              },
              {
                type: "input",
                id: "sealNumber2",
                label: "Seal Number",
                input: <FormText name="sealNumber2" />,
                isHidden: !isCombo,
              },
              {
                type: "button",
                text: "Convert to Combo",
                onClick: () => setIsCombo(!isCombo),
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
