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
  TruckFrontFill,
} from "react-bootstrap-icons";

export default function MasterVehicle() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang aktif
  const { setModal, current } = useModal();

  // Gunakan store useToast untuk menambahkan toasts
  const { addToasts } = useToast();

  // Effect untuk mengset judul header dan mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Vehicle");
    setActive(0, 4, 0);
  }, [setTitle, setActive]);

  // State untuk search
  const [search, setSearch] = React.useState("");

  // Mendapatkan router
  const router = useRouter();

  // State untuk menyimpan index dari baris yang dipilih di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.vehicles.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.vehicles.delete.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Vehicle" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Vehicle"
            icon={<TruckFrontFill />}
            variant="filled"
            onClick={() => router.push("/master_data/vehicle/save")}
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
            id: "truckNumber",
            header: "Truck Number",
            type: "text",
            isSortable: true,
          },
          {
            id: "brand",
            header: "Brand",
            type: "text",
            isSortable: true,
          },
          {
            id: "type",
            header: "Truck Type",
            type: "text",
            isSortable: true,
          },
          {
            id: "machineNumber",
            header: "Machine Number",
            type: "text",
            isSortable: true,
          },
          {
            id: "frameNumber",
            header: "Frame Number",
            type: "text",
            isSortable: true,
          },
          {
            id: "cylinder",
            header: "Cylinder",
            type: "text",
            isSortable: true,
          },
          {
            id: "color",
            header: "Color",
            type: "text",
            isSortable: true,
          },
          {
            id: "stnkExpired",
            header: "STNK Expired",
            type: "date",
            isSortable: true,
          },
          {
            id: "taxExpired",
            header: "Tax Expired",
            type: "date",
            isSortable: true,
          },
          {
            id: "keurExpired",
            header: "KEUR Expired",
            type: "date",
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

          // Redirect ke halaman save vehicle
          router.push(
            `/master_data/vehicle/save?id=${tableRowsQuery.data[selectedRowIndex].id}`
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

          // Hapus vehicle yang dipilih di table
          await deleteMutation
            .mutateAsync({
              id: tableRowsQuery.data[selectedRowIndex].id,
            })
            .catch((err) => {
              if (err instanceof TRPCClientError) {
                addToasts({ type: "error", message: err.message });
              }
            });

          // Karena vehicle yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
