import {
  Form,
  FormDate,
  FormSelect,
  FormText,
  FormTime,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { setValues } from "@/libs/functions";
import { useQuery } from "@/libs/hooks";
import { Months } from "@/libs/options";
import { trpc } from "@/libs/trpc";
import {
  VesselScheduleForm,
  defaultVesselScheduleForm,
  vesselScheduleValidationSchema,
} from "@/server/dtos/vesselSchedule.dto";
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
    setTitle("Marketing | Vessel Schedule");
    setActive(2, 3, 0);
  }, [setTitle, setActive]);

  const router = useRouter();

  const { addToasts } = useToast();

  const queryID = useQuery("id");

  const methods = useForm<VesselScheduleForm>({
    defaultValues: defaultVesselScheduleForm,
    resolver: zodResolver(vesselScheduleValidationSchema),
  });
  const { reset, setValue } = methods;
  const values = methods.watch();

  const defaultFormQuery =
    trpc.vesselSchedules.getDefaultForm.useQuery(queryID);
  React.useEffect(() => {
    if (defaultFormQuery.data) {
      setValues(defaultFormQuery.data, setValue);
    }
  }, [defaultFormQuery.data, setValue]);

  const shippingsOptionsQuery =
    trpc.vesselSchedules.getShippingOptions.useQuery();

  const vesselsOptionsQuery = trpc.vesselSchedules.getVesselOptions.useQuery({
    shipping: values.shipping,
  });
  React.useEffect(() => {
    if (vesselsOptionsQuery.data && vesselsOptionsQuery.data.length === 1) {
      setValue("vessel", vesselsOptionsQuery.data[0].value);
    }
  }, [vesselsOptionsQuery.data, setValue]);

  const vesselQuery = trpc.vessels.getSingle.useQuery(values.vessel);
  React.useEffect(() => {
    console.log(vesselQuery.data);
    if (!vesselQuery.data) {
      setValue("vesselCapacity", 0);
    } else {
      setValue("vesselCapacity", vesselQuery.data.capacity);
    }
  }, [vesselQuery.data, setValue]);

  const portsOptionsQuery = trpc.ports.getOptions.useQuery();

  const saveMutation = trpc.vesselSchedules.save.useMutation();
  const onSubmit = methods.handleSubmit(async (data) => {
    if (queryID) {
      await saveMutation
        .mutateAsync({
          ...data,
          id: queryID,
        })
        .then(async () => {
          await router.push("/marketing/vessel_schedule");
        })
        .catch((err) => {
          if (err instanceof TRPCClientError) {
            addToasts({ type: "error", message: err.message });
          }
        });
    } else {
      await saveMutation
        .mutateAsync({
          ...data,
        })
        .then(async () => {
          await router.push("/marketing/vessel_schedule");
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
      title="Input Vessel Schedule"
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
                type: "blank",
              },
              {
                type: "input",
                id: "month",
                label: "Month",
                input: <FormSelect name="month" options={Months} />,
              },
              {
                type: "input",
                id: "shipping",
                label: "Shipping",
                input: (
                  <FormSelect
                    name="shipping"
                    options={shippingsOptionsQuery.data}
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
                    options={vesselsOptionsQuery.data}
                    readOnly={
                      !vesselsOptionsQuery.data ||
                      vesselsOptionsQuery.data.length <= 1
                    }
                  />
                ),
              },
              {
                type: "input",
                id: "vesselCapacity",
                label: "Vessel Capacity",
                input: <FormText name="vesselCapacity" readOnly />,
              },
              {
                type: "input",
                id: "voyage",
                label: "Voyage",
                input: <FormText name="voyage" />,
              },
              {
                type: "input",
                id: "quota",
                label: "Quota",
                input: <FormText name="quota" />,
              },
              {
                type: "input",
                id: "portOrigin",
                label: "Port Origin",
                input: (
                  <FormSelect
                    name="portOrigin"
                    options={portsOptionsQuery.data}
                  />
                ),
              },
              {
                type: "input",
                id: "portDestination",
                label: "Port Destination",
                input: (
                  <FormSelect
                    name="portDestination"
                    options={portsOptionsQuery.data}
                  />
                ),
              },
            ],
          },
          {
            id: "detailSchedule",
            name: "Detail Schedule",
            controls: [
              {
                type: "input",
                id: "openStackDate",
                label: "Open Stack Date",
                input: <FormDate name="openStackDate" />,
              },
              {
                type: "blank",
              },
              {
                type: "input",
                id: "closingRC",
                label: "Closing RC",
                input: <FormDate name="closingRC" />,
              },
              {
                type: "input",
                id: "rcClosingTime",
                label: "Closing RC Time",
                input: <FormTime name="rcClosingTime" />,
              },
              {
                type: "input",
                id: "closingDate",
                label: "Vessel Closing Date",
                input: <FormDate name="closingDate" />,
              },
              {
                type: "input",
                id: "vesselClosingTime",
                label: "Vessel Closing Time",
                input: <FormTime name="vesselClosingTime" />,
              },
              {
                type: "input",
                id: "etd",
                label: "ETD",
                input: <FormDate name="etd" />,
              },
              {
                type: "input",
                id: "eta",
                label: "ETA",
                input: <FormDate name="eta" />,
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
