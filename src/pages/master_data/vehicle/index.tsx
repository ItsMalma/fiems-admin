import React from "react";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { useRouter } from "next/router";
import Search from "@/components/Elements/Search";
import Button from "@/components/Elements/Button";
import Modal from "@/components/Elements/Modal";
import Label from "@/components/Elements/Label";
import Select from "@/components/Elements/Select";
import {
  TruckFrontFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import Table from "@/components/Elements/NewTable";
import { deleteVehicle, useVehicles } from "@/api/vehicles";

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

  // Pemanggilan api untuk mendapatkan semua data vehicle
  const { vehicles, isLoading, error } = useVehicles([current]);

  // Cek apakah pemanggilan api untuk mendapatkan semua data vehicle
  // masih loading atau data nya masih belum terload
  if (isLoading || !vehicles) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua data vehicle terdapat error
  if (error) {
    throw error;
  }

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
            id: "vendor.name",
            header: "Vendor Name",
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
            id: "truckType",
            header: "Truck Type",
            type: "text",
            isSortable: true,
          },
          {
            id: "engineNumber",
            header: "Engine Number",
            type: "text",
            isSortable: true,
          },
          {
            id: "chassisNumber",
            header: "Chassis Number",
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
            header: "Description",
            type: "status",
          },
        ]}
        rows={vehicles}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Redirect ke halaman save vehicle
          router.push(
            `/master_data/vehicle/save?code=${vehicles[selectedRowIndex].truckNumber}`
          );
        }}
        onDelete={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Hapus vehicle yang dipilih di table
          await deleteVehicle(vehicles[selectedRowIndex].truckNumber);

          // Karena vehicle yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
