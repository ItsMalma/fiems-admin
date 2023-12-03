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
  PersonFillAdd,
} from "react-bootstrap-icons";
import useToast from '@/stores/toast';
import { TRPCClientError } from '@trpc/client';

export default function SalesPage() {
  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang aktif
  const { setModal, current } = useModal();

  const { addToasts } = useToast();

  // Effect untuk mengset judul header dan mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Sales");
    setActive(1, 3, 0);
  }, [setTitle, setActive]);

  // State untuk search
  const [search, setSearch] = React.useState("");

  // Mendapatkan router
  const router = useRouter();

  // State untuk menyimpan index dari baris yang dipilih di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.sales.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.sales.delete.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Sales" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Sales"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() => router.push("/master_data/sales/save")}
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
            onClick={() => { }}
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
            id: "jobPosition",
            header: "Job Position",
            type: "text",
            isSortable: true,
          },
          {
            id: "code",
            header: "Marketing Code",
            type: "code",
            isSortable: true,
          },
          {
            id: "name",
            header: "Marketing Name",
            type: "text",
            isSortable: true,
          },
          {
            id: "nik",
            header: "NIK",
            type: "text",
            isSortable: true,
          },
          {
            id: "area",
            header: "Cabang",
            type: "text",
            isSortable: true,
          },
          {
            id: "phoneNumber",
            header: "Phone Number",
            type: "text",
            isSortable: true,
          },
          {
            id: "telephone",
            header: "Telephone",
            type: "text",
            isSortable: true,
          },
          {
            id: "fax",
            header: "Fax",
            type: "text",
            isSortable: true,
          },
          {
            id: "email",
            header: "Email",
            type: "text",
            isSortable: true,
          },
          {
            id: "status",
            header: "Status",
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

          // Redirect ke halaman save sales
          router.push(
            `/master_data/sales/save?code=${tableRowsQuery.data[selectedRowIndex].code}`
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

          // Hapus sales yang dipilih di table
          await deleteMutation.mutateAsync({
            code: tableRowsQuery.data[selectedRowIndex].code,
          }).catch((err) => {
            if (err instanceof TRPCClientError) {
              addToasts({ type: "error", message: err.message });
            }
          });

          // Karena sales yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          //tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
