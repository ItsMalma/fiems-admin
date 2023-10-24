import {
  Button,
  Label,
  Modal,
  Search,
  Select,
  Table,
} from "@/components/Elements";
import { trpc } from "@/libs/trpc";
import { CustomerType } from "@/server/dtos/customer.dto";
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
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

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

  const tableRowsQuery = trpc.customers.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.customers.delete.useMutation();

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
            id: "purchasing",
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
            id: "operation",
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
            id: "finance",
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

          const customer = tableRowsQuery.data[selectedRowIndex];

          // Redirect ke halaman save customer
          router.push(
            `/master_data/business_partner/customers/save?code=${customer.code}&type=${customer.type}`
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

          const customer = tableRowsQuery.data[selectedRowIndex];

          // Hapus customer yang dipilih di table
          await deleteMutation.mutateAsync({
            type: customer.type as CustomerType,
            code: customer.code,
          });

          // Karena customer yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
