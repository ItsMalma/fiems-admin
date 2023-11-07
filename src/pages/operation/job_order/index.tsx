import useMenu from "@/stores/menu";
import React from "react";
import VerticalLine from "@/components/Icons/VerticalLine";
import useHeader from "@/stores/header";
import {
  PersonFillAdd,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";
import { useRouter } from "next/router";
import { Button, Search, Select, Table } from "@/components/Elements";

export default function InquiryContainer() {
  const router = useRouter();
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Operational | Job Order");
    setActive(3, 0, 0);
  }, [setTitle, setActive]);

  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
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
          />
        </div>
      </div>
      <Table
        className="p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm"
        isSelectable
        columns={[
          {
            id: "inquiryDate",
            header: "Inquiry Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "inquiryCode",
            header: "Inquiry Code",
            type: "code",
            isSortable: true,
          },
          {
            id: "sales",
            header: "Sales",
            type: "text",
            isSortable: true,
          },
          {
            id: "customer",
            header: "Customer",
            type: "text",
            isSortable: true,
          },
          {
            id: "customerGroup",
            header: "Customer Group",
            type: "text",
            isSortable: true,
          },
          {
            id: "customerAddress",
            header: "Customer Address",
            type: "text",
            isSortable: true,
          },
          {
            id: "purchase",
            header: "Purchase",
            type: "text",
            isSortable: true,
          },
          {
            id: "purchaseAddress",
            header: "Purchase Address",
            type: "text",
            isSortable: true,
          },
          {
            id: "jobOrderType",
            header: "J.O. Type",
            type: "text",
            isSortable: true,
          },
          {
            id: "customerTo",
            header: "Customer To",
            type: "text",
            isSortable: true,
          },
          {
            id: "city",
            header: "City",
            type: "text",
            isSortable: true,
          },
          {
            id: "route",
            header: "Route",
            type: "text",
            isSortable: true,
          },
          {
            id: "serviceType",
            header: "Service Type",
            type: "text",
            isSortable: true,
          },
          {
            id: "containerType",
            header: "Container Type",
            type: "text",
            isSortable: true,
          },
          {
            id: "containerSize",
            header: "Container Size",
            type: "text",
            isSortable: true,
          },
          {
            id: "ppn",
            header: "PPN",
            type: "text",
            isSortable: true,
          },
          {
            id: "insurance",
            header: "Insurance",
            type: "text",
            isSortable: true,
          },
          {
            id: "ppftz",
            header: "PPFTZ",
            type: "text",
            isSortable: true,
          },
          {
            id: "shipping",
            header: "Shipping",
            type: "text",
            isSortable: true,
          },
          {
            id: "vesselName",
            header: "Vessel Name",
            type: "text",
            isSortable: true,
          },
          {
            id: "voyage",
            header: "Voyage",
            type: "text",
            isSortable: true,
          },
          {
            id: "etd",
            header: "ETD",
            type: "text",
            isSortable: true,
          },
          {
            id: "eta",
            header: "ETA",
            type: "text",
            isSortable: true,
          },
        ]}
        rows={[]}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
      />
    </>
  );
}
