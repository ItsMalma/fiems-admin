import { Button, Modal, Search, Table } from "@/components/Elements";
import { Form, FormDate, FormSelect } from "@/components/Forms";
import { trpc } from "@/libs/trpc";
import {
  JobOrderConfirmationForm,
  JobOrderPindahKapalForm,
  jobOrderConfirmationValidationSchema1,
  jobOrderPindahKapalValidationSchema,
} from "@/server/dtos/jobOrder.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import {
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import { useForm } from "react-hook-form";

function Confirm({ jobOrderNumber }: { jobOrderNumber: string }) {
  const { setModal } = useModal();

  const methods = useForm<JobOrderConfirmationForm>({
    resolver: zodResolver(jobOrderConfirmationValidationSchema1),
    defaultValues: {
      td: new Date(),
    },
  });
  const values = methods.watch();

  const confirmMutation = trpc.jobOrders.confirm.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await confirmMutation.mutateAsync({
      number: jobOrderNumber,
      td: data.td,
    });

    setModal(null);
  });

  return (
    <Modal
      title="Confirm Job Order"
      type="save"
      onDone={onSubmit}
      isLoading={!values}
    >
      <Form
        methods={methods}
        singleTab
        controls={[
          {
            type: "input",
            id: "td",
            label: "TD",
            input: <FormDate name="td" />,
          },
        ]}
      />
    </Modal>
  );
}

function PindahKapal({ jobOrderNumber }: { jobOrderNumber: string }) {
  const { setModal } = useModal();

  const methods = useForm<JobOrderPindahKapalForm>({
    resolver: zodResolver(jobOrderPindahKapalValidationSchema),
  });
  const { setValue } = methods;
  const values = methods.watch();

  const pindahKapalMutation = trpc.jobOrders.pindahKapal.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await pindahKapalMutation.mutateAsync({
      number: jobOrderNumber,
      ...data,
    });

    setModal(null);
  });

  const shippingOptionsQuery = trpc.inquiries.getShippingOptions.useQuery();
  React.useEffect(() => {
    if (!shippingOptionsQuery.data) return;

    if (shippingOptionsQuery.data.length === 1) {
      setValue("shipping", shippingOptionsQuery.data[0].value);
    }
  }, [shippingOptionsQuery.data, setValue]);

  const vesselOptionsQuery = trpc.inquiries.getVesselOptions.useQuery({
    shipping: values.shipping,
  });
  React.useEffect(() => {
    if (!vesselOptionsQuery.data) return;

    if (vesselOptionsQuery.data.length === 1) {
      setValue("vessel", vesselOptionsQuery.data[0].value);
    }
  }, [vesselOptionsQuery.data, setValue]);

  const voyageOptionsQuery = trpc.inquiries.getVoyageOptions.useQuery({
    shipping: values.shipping,
    vessel: values.vessel,
  });
  React.useEffect(() => {
    if (!voyageOptionsQuery.data) return;

    if (voyageOptionsQuery.data.length === 1) {
      setValue("voyage", voyageOptionsQuery.data[0].value);
    }
  }, [voyageOptionsQuery.data, setValue]);

  const vesselScheduleQuery = trpc.inquiries.getVesselSchedule.useQuery({
    shipping: values.shipping,
    vessel: values.vessel,
    voyage: values.voyage,
  });
  React.useEffect(() => {
    if (!vesselScheduleQuery.data) return;

    setValue("etd", vesselScheduleQuery.data.etd);
    setValue("eta", vesselScheduleQuery.data.eta);
  }, [vesselScheduleQuery.data, setValue]);

  return (
    <Modal
      title="Pindah Kapal Job Order"
      type="save"
      onDone={onSubmit}
      isLoading={!values}
      className="w-1/2"
    >
      <Form
        methods={methods}
        singleTab
        controls={[
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
        ]}
      />
    </Modal>
  );
}

export default function InquiryPage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Job Order");
    setActive(2, 1, 0);
  }, [setTitle, setActive]);

  const { setModal, current } = useModal();

  const router = useRouter();

  const [search, setSearch] = React.useState("");
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.jobOrders.getTableRows.useQuery({});
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const reviceMutation = trpc.jobOrders.revice.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Job Order" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Import"
            icon={<FileEarmarkArrowDownFill />}
            variant="outlined"
          />
          <Button
            text="Export"
            icon={<FileEarmarkArrowUpFill />}
            variant="outlined"
            onClick={() => {}}
          />
        </div>
      </div>
      <Table
        className="p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm"
        isSelectable
        columns={[
          {
            id: "number",
            header: "Job Order Number",
            type: "code",
            isSortable: true,
          },
          {
            id: "createDate",
            header: "Confirm Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "inquiryNumber",
            header: "Inquiry Number",
            type: "code",
            isSortable: true,
          },
          {
            id: "inquiryDate",
            header: "Inquiry Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "sales",
            header: "Sales",
            type: "text",
          },
          {
            id: "shipping",
            header: "Shipping",
            type: "text",
          },
          {
            id: "vessel",
            header: "Vessel",
            type: "text",
          },
          {
            id: "voyage",
            header: "Voyage",
            type: "text",
          },
          {
            id: "etd",
            header: "ETD",
            type: "date",
            isSortable: true,
          },
          {
            id: "eta",
            header: "ETA",
            type: "date",
            isSortable: true,
          },
          {
            id: "loadDate",
            header: "Load Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "route",
            header: "Route",
            type: "text",
          },
          {
            id: "factory",
            header: "Factory",
            type: "text",
          },
          {
            id: "factoryAddress",
            header: "Factory Address",
            type: "text",
          },
          {
            id: "deliveryTo",
            header: "Delivery To",
            type: "text",
          },
          {
            id: "deliveryToCity",
            header: "Delivery To City",
            type: "text",
          },
          {
            id: "containerSize",
            header: "Container Size",
            type: "text",
          },
          {
            id: "containerType",
            header: "Container Type",
            type: "text",
          },
          {
            id: "typeOrder",
            header: "Type Order",
            type: "text",
          },
          {
            id: "roNumber",
            header: "RO Number",
            type: "text",
          },
          {
            id: "consignee",
            header: "Consignee",
            type: "text",
          },
          {
            id: "consigneeAddress",
            header: "Consignee Address",
            type: "text",
          },
          {
            id: "consigneeCity",
            header: "Consignee City",
            type: "text",
          },
          {
            id: "consigneeEmail",
            header: "Consignee Email",
            type: "text",
          },
          {
            id: "consigneeTelephone",
            header: "Consignee Telephone",
            type: "text",
          },
          {
            id: "stuffingDate",
            header: "Stuffing Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "trackingRoute",
            header: "Tracking Route",
            type: "text",
          },
          {
            id: "vendor",
            header: "Tracking",
            type: "text",
          },
          {
            id: "driverName",
            header: "Driver Name",
            type: "text",
          },
          {
            id: "driverPhoneNumber",
            header: "Driver Phone Number",
            type: "text",
          },
          {
            id: "vehicle",
            header: "Truck",
            type: "text",
          },
          {
            id: "vehicleType",
            header: "Truck Type",
            type: "text",
          },
          {
            id: "containerNumber1",
            header: "Container Number 1",
            type: "text",
          },
          {
            id: "sealNumber1",
            header: "Seal Number 1",
            type: "text",
          },
          {
            id: "containerNumber2",
            header: "Container Number 2",
            type: "text",
          },
          {
            id: "sealNumber2",
            header: "Seal Number 2",
            type: "text",
          },
        ]}
        search={search}
        dateRangeColumn="createDate"
        rows={tableRowsQuery.data ?? []}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onRevice={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const jobOrder = tableRowsQuery.data[selectedRowIndex];

          // Hapus price vendor yang dipilih di table
          await reviceMutation.mutateAsync(jobOrder.number);

          // Karena price vendor yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
        onConfirm={async () => {
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const jobOrder = tableRowsQuery.data[selectedRowIndex];

          setModal(<Confirm jobOrderNumber={jobOrder.number} />);
        }}
        onPindahKapal={async () => {
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const jobOrder = tableRowsQuery.data[selectedRowIndex];

          setModal(<PindahKapal jobOrderNumber={jobOrder.number} />);
        }}
      />
    </>
  );
}
