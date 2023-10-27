import React from "react";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { useRouter } from "next/router";
import {
  TruckFrontFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import { Button, Label, Modal, Search, Select, Table } from "@/components/Elements";
import { trpc } from "@/libs/trpc";

export function Export() {
  return (
    <Modal className="w-2/5" title="Export Data" type="save" onDone={() => {}}>
      <form>
        <div className="flex gap-6 items-center justify-between">
          <Label name="File Type" />
          <Select
            placeholder="Choose file type"
            options={[{ label: "Excel", value: "excel" }]}
            value="excel"
            onChange={() => {}}
            className="basis-2/3"
          />
        </div>
      </form>
    </Modal>
  );
}

export default function MasterVehicle() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang aktif
  const { setModal, current } = useModal();

  // Effect untuk mengset judul header dan mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Vehicle");
    setActive(1, 4, 0);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  // State untuk menyimpan index dari baris yang dipilih di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.vehicle.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.vehicle.delete.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
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
            onClick={() => setModal(<Export />)}
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
          await deleteMutation.mutateAsync({
            id: tableRowsQuery.data[selectedRowIndex].id
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
