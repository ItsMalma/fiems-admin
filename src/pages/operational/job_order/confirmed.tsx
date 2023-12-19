import { Button, Modal, Search, Table } from "@/components/Elements";
import { Form, FormDate } from "@/components/Forms";
import { trpc } from "@/libs/trpc";
import {
  JobOrderConfirmationForm,
  jobOrderConfirmationValidationSchema2,
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

function Confirm({
  jobOrderNumber,
  td,
  ta,
  sandar,
}: {
  jobOrderNumber: string;
  td: string | null;
  ta: string | null;
  sandar: string | null;
}) {
  const { setModal } = useModal();

  const methods = useForm<JobOrderConfirmationForm>({
    resolver: zodResolver(jobOrderConfirmationValidationSchema2),
    defaultValues: {
      td: new Date(),
    },
  });
  const { setValue } = methods;
  const values = methods.watch();

  React.useEffect(() => {
    if (td) setValue("td", td);
    if (ta) setValue("ta", ta);
    if (sandar) setValue("sandar", sandar);
  }, [setValue, td, ta, sandar]);

  const confirmMutation = trpc.jobOrders.confirm.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await confirmMutation.mutateAsync({
      number: jobOrderNumber,
      ...data,
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
            input: <FormDate name="td" readOnly={!!td} />,
          },
          {
            type: "input",
            id: "ta",
            label: "TA",
            input: <FormDate name="ta" readOnly={!!ta} />,
          },
          {
            type: "input",
            id: "sandar",
            label: "Sandar",
            input: <FormDate name="sandar" readOnly={!!sandar} />,
          },
        ]}
      />
    </Modal>
  );
}

export default function ConfirmedJobOrderPage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Job Order");
    setActive(2, 1, 1);
  }, [setTitle, setActive]);

  const { setModal, current } = useModal();

  const router = useRouter();

  const [search, setSearch] = React.useState("");
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.jobOrders.getTableRows.useQuery({
    isConfirmed: true,
  });
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

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
          {
            id: "td",
            header: "TD",
            type: "date",
            isSortable: true,
          },
          {
            id: "ta",
            header: "TA",
            type: "date",
            isSortable: true,
          },
          {
            id: "sandar",
            header: "Sandar",
            type: "date",
            isSortable: true,
          },
        ]}
        search={search}
        dateRangeColumn="createDate"
        rows={tableRowsQuery.data ?? []}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onConfirm={async () => {
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const jobOrder = tableRowsQuery.data[selectedRowIndex];

          setModal(
            <Confirm
              jobOrderNumber={jobOrder.number}
              td={jobOrder.td}
              ta={jobOrder.ta}
              sandar={jobOrder.sandar}
            />
          );
        }}
      />
    </>
  );
}
