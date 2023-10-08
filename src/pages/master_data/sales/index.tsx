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
  PersonFillAdd,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import Table from "@/components/Elements/NewTable";
import { deleteSales, useListSales } from "@/api/sales";
import { toTitleCase } from "@/libs/utils";

export function Export() {
  return (
    <Modal className="w-2/5" title="Export Data" type="save" onDone={() => {}}>
      <form>
        <div className="flex gap-6 items-center justify-between">
          <Label name="File Type" />
          <Select
            placeholder="Choose city"
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

export default function SalesPage() {
  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang aktif
  const { setModal, current } = useModal();

  // Effect untuk mengset judul header dan mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Sales");
    setActive(1, 3, 0);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  // State untuk menyimpan index dari baris yang dipilih di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  // Pemanggilan api untuk mendapatkan semua data sales
  const { listSales, isLoading, error } = useListSales([current]);

  // Cek apakah pemanggilan api untuk mendapatkan semua data sales
  // masih loading atau data nya masih belum terload
  if (isLoading || !listSales) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua data sales terdapat error
  if (error) {
    throw error;
  }

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Sales Code" />
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
            id: "cabang",
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
            header: "Description",
            type: "status",
          },
        ]}
        rows={listSales.map((sales) => ({
          ...sales,
          jobPosition: toTitleCase(sales.jobPosition),
        }))}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Redirect ke halaman save sales
          router.push(
            `/master_data/sales/save?code=${listSales[selectedRowIndex].code}`
          );
        }}
        onDelete={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Hapus sales yang dipilih di table
          await deleteSales(listSales[selectedRowIndex].code);

          // Karena sales yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
