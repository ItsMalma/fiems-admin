import { Button, Search, Table } from "@/components/Elements";
import { trpc } from "@/libs/trpc";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { useRouter } from "next/router";
import React from "react";
import {
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";

export default function InquiryPage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Operational | Inquiry Container");
    setActive(2, 0, 0);
  }, [setTitle, setActive]);

  const { setModal, current } = useModal();

  const router = useRouter();

  const [search, setSearch] = React.useState("");
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.inquiries.getTableRows.useQuery({});
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Inquiry" onChange={setSearch} />
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
            header: "Inquiry Number",
            type: "code",
            isSortable: true,
          },
          {
            id: "createDate",
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
            id: "factory",
            header: "Factory",
            type: "text",
          },
          {
            id: "factoryGroup",
            header: "Factory Group",
            type: "text",
          },
          {
            id: "factoryAddress",
            header: "Factory Address",
            type: "text",
          },
          {
            id: "factoryCity",
            header: "Factory City",
            type: "text",
          },
          {
            id: "purchase",
            header: "Purchase",
            type: "text",
          },
          {
            id: "purchaseAddress",
            header: "Purchase Address",
            type: "text",
          },
          {
            id: "purchaseCity",
            header: "Purchase City",
            type: "text",
          },
          {
            id: "jobOrder",
            header: "Job Order",
            type: "text",
          },
          {
            id: "typeOrder",
            header: "Type Order",
            type: "text",
          },
          {
            id: "loadDate",
            header: "Load Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "deliveryTo",
            header: "Delivery To",
            type: "text",
          },
          {
            id: "deliveryToCity",
            header: "Delivery To (City)",
            type: "text",
          },
          {
            id: "route",
            header: "Route",
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
            id: "serviceType",
            header: "Service Type",
            type: "text",
          },
          {
            id: "ppn",
            header: "PPN",
            type: "text",
          },
          {
            id: "nilaiInsurance",
            header: "Insurance",
            type: "money",
            isSortable: true,
          },
          {
            id: "insurance",
            header: "Insurance Status",
            type: "text",
          },
          {
            id: "nilaiPPFTZ",
            header: "PPFTZ",
            type: "money",
            isSortable: true,
          },
          {
            id: "ppftz",
            header: "PPFTZ Status",
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
        ]}
        search={search}
        dateRangeColumn="createDate"
        rows={tableRowsQuery.data ?? []}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onConfirm={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const inquiry = tableRowsQuery.data[selectedRowIndex];

          // Redirect ke halaman save price vendor
          router.push(`/operational/job_order/save?id=${inquiry.detailID}`);
        }}
      />
    </>
  );
}
