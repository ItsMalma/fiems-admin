import { Button, Search, Table } from "@/components/Elements";
import { trpc } from "@/libs/trpc";
import { PriceVendorTableRow } from "@/server/dtos/price.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { useRouter } from "next/router";
import React from "react";
import {
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  PersonFillAdd,
} from "react-bootstrap-icons";

export default function PriceVendorPage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang aktif
  const { setModal, current } = useModal();

  // Effect untuk mengset judul header dan mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Price Vendor");
    setActive(0, 6, 1);
  }, [setTitle, setActive]);

  // State untuk search
  const [search, setSearch] = React.useState<string>("");

  // Mendapatkan router
  const router = useRouter();

  // State untuk menyimpan index dari baris yang dipilih di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.prices.getTableRows.useQuery("Vendor");
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.prices.deleteVendor.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Price Vendor" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Price Vendor"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() => router.push("/master_data/prices/vendor/save")}
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
            id: "port",
            header: "Port",
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
            id: "containerType",
            header: "Container Type",
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
            id: "tracking",
            header: "Tracking",
            type: "money",
            isSortable: true,
          },
          {
            id: "buruh",
            header: "Buruh",
            type: "money",
            isSortable: true,
          },
          {
            id: "thcOPT",
            header: "THC OPT",
            type: "money",
            isSortable: true,
          },
          {
            id: "thcOPP",
            header: "THC OPP",
            type: "money",
            isSortable: true,
          },
          {
            id: "adminBL",
            header: "Admin BL",
            type: "money",
            isSortable: true,
          },
          {
            id: "cleaning",
            header: "Cleaning",
            type: "money",
            isSortable: true,
          },
          {
            id: "materai",
            header: "Materai",
            type: "money",
            isSortable: true,
          },
          {
            id: "total",
            header: "Total",
            type: "money",
            isSortable: true,
          },
          {
            id: "status",
            header: "Description",
            type: "status",
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

          const priceVendor = tableRowsQuery.data[selectedRowIndex];

          // Redirect ke halaman save price vendor
          router.push(`/master_data/prices/vendor/save?id=${priceVendor.id}`);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const priceVendor = tableRowsQuery.data[
            selectedRowIndex
          ] as PriceVendorTableRow;

          // Hapus price vendor yang dipilih di table
          await deleteMutation.mutateAsync(priceVendor.detailId);

          // Karena price vendor yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
