import { Button, Search, Table } from "@/components/Elements";
import { trpc } from "@/libs/trpc";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import useToast from "@/stores/toast";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/router";
import React from "react";
import {
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  PersonFillAdd,
} from "react-bootstrap-icons";

export default function PriceFactoryPage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang aktif
  const { setModal, current } = useModal();

  const { addToasts } = useToast();

  // Effect untuk mengset judul header dan mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Price Factory");
    setActive(0, 6, 0);
  }, [setTitle, setActive]);

  // State untuk search
  const [search, setSearch] = React.useState<string>("");

  // Mendapatkan router
  const router = useRouter();

  // State untuk menyimpan index dari baris yang dipilih di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.prices.getTableRows.useQuery("Factory");
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.prices.deleteFactory.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Price Factory" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Price Factory"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() => router.push("/master_data/prices/factory/save")}
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
            id: "quotation",
            header: "Quotation",
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
            id: "factory",
            header: "Delivery To",
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
            id: "port",
            header: "Port",
            type: "text",
            isSortable: true,
          },
          {
            id: "etcCost",
            header: "ETC Cost",
            type: "money",
            isSortable: true,
          },
          {
            id: "hpp",
            header: "HPP",
            type: "money",
            isSortable: true,
          },
          {
            id: "hppAfter",
            header: "HPP after ETC Cost",
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

          const priceFactory = tableRowsQuery.data[selectedRowIndex];

          // Redirect ke halaman save price factory
          router.push(`/master_data/prices/factory/save?id=${priceFactory.id}`);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          const priceFactory = tableRowsQuery.data[selectedRowIndex];

          // Hapus price factory yang dipilih di table
          await deleteMutation.mutateAsync(priceFactory.id).catch((err) => {
            if (err instanceof TRPCClientError) {
              addToasts({ type: "error", message: err.message });
            }
          });

          // Karena price factory yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
