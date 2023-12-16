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

export default function VesselSchedulePage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  React.useEffect(() => {
    setTitle("Marketing | Vessel Schedule");
    setActive(2, 3, 0);
  }, [setTitle, setActive]);

  const { setModal, current } = useModal();

  const router = useRouter();

  const [search, setSearch] = React.useState("");
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.vesselSchedules.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.vesselSchedules.delete.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Vessel Schedule" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Vessel Schedule"
            icon={<Box2 />}
            variant="filled"
            onClick={() => router.push("/marketing/vessel_schedule/save")}
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
            id: "createDate",
            header: "Create Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "month",
            header: "Month",
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
            id: "vessel",
            header: "Vessel",
            type: "text",
            isSortable: true,
          },
          {
            id: "vesselCapacity",
            header: "Vessel Capacity",
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
            id: "quota",
            header: "Quota",
            type: "text",
            isSortable: true,
          },
          {
            id: "portOrigin",
            header: "Port Origin",
            type: "text",
            isSortable: true,
          },
          {
            id: "portDestination",
            header: "Port Destination",
            type: "text",
            isSortable: true,
          },
          {
            id: "openStackDate",
            header: "Open Stack Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "closingRC",
            header: "Closing RC",
            type: "date",
            isSortable: true,
          },
          {
            id: "rcClosingTime",
            header: "RC Closing Time",
            type: "text",
            isSortable: true,
          },
          {
            id: "closingDate",
            header: "Closing Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "vesselClosingTime",
            header: "Vessel Closing Time",
            type: "text",
            isSortable: true,
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
        onEdit={() => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const vesselSchedule = tableRowsQuery.data[selectedRowIndex];

          // Redirect ke halaman save price vendor
          router.push(
            `/marketing/vessel_schedule/save?id=${vesselSchedule.id}`
          );
        }}
        onDelete={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const vesselSchedule = tableRowsQuery.data[selectedRowIndex];

          // Hapus price vendor yang dipilih di table
          await deleteMutation.mutateAsync(vesselSchedule.id);

          // Karena price vendor yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
