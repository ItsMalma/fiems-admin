import { Button, Search, Table } from "@/components/Elements";
import { trpc } from "@/libs/trpc";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { useRouter } from "next/router";
import React from "react";
import {
  Box2,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";

export default function InquiryPage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Job Order");
    setActive(3, 0, 0);
  }, [setTitle, setActive]);

  const { setModal, current } = useModal();

  const router = useRouter();

  const [search, setSearch] = React.useState("");
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.jobOrders.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Job Order" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Job Order"
            icon={<Box2 />}
            variant="filled"
            onClick={() => router.push("/marketing/job_order/save")}
          />
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
            id: "vehicle",
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
      />
    </>
  );
}
