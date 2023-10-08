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
import Upload from "@/components/Elements/Upload";
import {
  GeoAltFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import Table from "@/components/Elements/NewTable";
import { deleteUangJalan, useListUangJalan } from "@/api/uang_jalan";

function Export() {
  return (
    <Modal title="Export Data" type="save" onDone={() => {}}>
      <form>
        <div className="flex gap-6 items-center justify-between">
          <Label name="File Type" />
          <Select
            className="basis-3/5"
            placeholder="Choose city"
            options={[{ label: "Excel", value: "excel" }]}
            onChange={() => {}}
          />
        </div>
      </form>
    </Modal>
  );
}

function Import() {
  return (
    <Modal title="Export Data" type="save" onDone={() => {}}>
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="File Type" />
            <Select
              className="basis-2/3"
              placeholder="Choose file type"
              options={[{ label: "Excel", value: "excel" }]}
              onChange={() => {}}
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Upload File" />
            <Upload className="basis-2/3" />
          </div>
        </div>
      </form>
    </Modal>
  );
}

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

  // Pemanggilan api untuk mendapatkan semua data uang jalan
  const { listUangJalan, isLoading, error } = useListUangJalan([current]);

  // Cek apakah pemanggilan api untuk mendapatkan semua data uang jalan
  // masih loading atau data nya masih belum terload
  if (isLoading || !listUangJalan) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua data uang jalan terdapat error
  if (error) {
    throw error;
  }

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
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
            onClick={() => setModal(<Import />)}
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
            id: "customer.name",
            header: "Customer Name",
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
            id: "fuelOil",
            header: "Fuel Oil",
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
            id: "labourCosts",
            header: "Labour Costs",
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
            id: "status",
            header: "Status",
            type: "status",
          },
        ]}
        rows={listUangJalan}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Redirect ke halaman save uang jalan
          router.push(
            `/master_data/uang_jalan/save?id=${listUangJalan[selectedRowIndex].id}`
          );
        }}
        onDelete={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Hapus uang jalan yang dipilih di table
          await deleteUangJalan(listUangJalan[selectedRowIndex].id);

          // Karena uang jalan yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
