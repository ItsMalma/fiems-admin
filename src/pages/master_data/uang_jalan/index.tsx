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
  GeoAltFill,
} from "react-bootstrap-icons";

export default function MasterUangJalan() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang aktif
  const { setModal, current } = useModal();

  // Effect untuk mengset judul header dan mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Master Uang Jalan");
    setActive(1, 7, 0);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  // State untuk menyimpan index dari baris yang dipilih di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.uangJalan.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.uangJalan.delete.useMutation();
  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Uang Jalan" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Uang Jalan"
            icon={<GeoAltFill />}
            variant="filled"
            onClick={() => router.push("/master_data/uang_jalan/save")}
          />
          <Button
            text="Import"
            icon={<FileEarmarkArrowDownFill />}
            variant="outlined"
            onClick={() => {}}
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
            id: "vendor",
            header: "Vendor",
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
            id: "truckType",
            header: "Truck Type",
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
            id: "bbm",
            header: "BBM",
            type: "money",
            isSortable: true,
          },
          {
            id: "toll",
            header: "Toll",
            type: "money",
            isSortable: true,
          },
          {
            id: "labourCost",
            header: "Biaya Buruh",
            type: "money",
            isSortable: true,
          },
          {
            id: "meal",
            header: "Meal",
            type: "money",
            isSortable: true,
          },
          {
            id: "etc",
            header: "Etc",
            type: "money",
            isSortable: true,
          },
          {
            id: "total",
            header: "Total",
            type: "money",
            isSortable: true,
          },
        ]}
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

          // Redirect ke halaman save sales
          router.push(
            `/master_data/uangJalan/save?id=${tableRowsQuery.data[selectedRowIndex].id}`
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

          // Hapus uang jalan yang dipilih di table
          await deleteMutation.mutateAsync({
            id: tableRowsQuery.data[selectedRowIndex].id,
          });

          // Karena uang jalan yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
