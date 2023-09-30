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
import { deleteCustomer, useCustomers } from "@/api/customers";
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

export default function CustomersPage() {
  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang aktif
  const { setModal, current } = useModal();

  // Effect untuk mengset judul header dan mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Customers");
    setActive(1, 0, 1);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  // State untuk menyimpan index dari baris yang dipilih di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  // Pemanggilan api untuk mendapatkan semua data customer
  const { customers, isLoading, error } = useCustomers([current]);

  // Cek apakah pemanggilan api untuk mendapatkan semua data customer
  // masih loading atau data nya masih belum terload
  if (isLoading || !customers) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua data customer terdapat error
  if (error) {
    throw error;
  }

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Customer Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Customer"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() =>
              router.push("/master_data/business_partner/customers/save")
            }
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
            id: "type",
            header: "Customer Type",
            type: "text",
            isSortable: true,
          },
          {
            id: "code",
            header: "Customer Code",
            type: "code",
            isSortable: true,
          },
          {
            id: "name",
            header: "Name",
            type: "text",
            isSortable: true,
          },
          {
            id: "group",
            header: "Group",
            type: "text",
            isSortable: true,
          },
          {
            id: "address",
            header: "Address",
            type: "text",
            isSortable: true,
          },
          {
            id: "province",
            header: "Province",
            type: "text",
            isSortable: true,
          },
          {
            id: "city",
            header: "City",
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
            id: "pic.purchasing",
            header: "Purchasing",
            type: "group",
            columns: [
              {
                id: "name",
                header: "Name",
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
              { id: "fax", header: "Fax", type: "text", isSortable: true },
              { id: "email", header: "Email", type: "text", isSortable: true },
            ],
          },
          {
            id: "pic.operation",
            header: "Operation",
            type: "group",
            columns: [
              {
                id: "name",
                header: "Name",
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
              { id: "fax", header: "Fax", type: "text", isSortable: true },
              { id: "email", header: "Email", type: "text", isSortable: true },
            ],
          },
          {
            id: "pic.finance",
            header: "Finance",
            type: "group",
            columns: [
              {
                id: "name",
                header: "Name",
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
              { id: "fax", header: "Fax", type: "text", isSortable: true },
              { id: "email", header: "Email", type: "text", isSortable: true },
            ],
          },
          {
            id: "status",
            header: "Description",
            type: "status",
          },
        ]}
        rows={customers.map((customer) => ({
          ...customer,
          type: toTitleCase(customer.type),
        }))}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Redirect ke halaman save customer
          router.push(
            `/master_data/business_partner/customers/save?code=${customers[selectedRowIndex].code}`
          );
        }}
        onDelete={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Hapus customer yang dipilih di table
          await deleteCustomer(customers[selectedRowIndex].code);

          // Karena customer yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
