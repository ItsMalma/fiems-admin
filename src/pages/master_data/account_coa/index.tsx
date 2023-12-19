import {
  Button,
  Label,
  Modal,
  Search,
  Select,
  Table,
} from "@/components/Elements";
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

export default function MasterAccountCOA() {
  const router = useRouter();
  const { setActive } = useMenu();
  const { setModal, current } = useModal();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Data | Account COA");
    setActive(0, 10, 0);
  }, [setTitle, setActive]);

  // State untuk search
  const [search, setSearch] = React.useState("");

  // State untuk menyimpan index dari baris yang dipilih di table
  // State untuk menyimpan index dari baris yang dipilih di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.coas.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.coas.delete.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search COA" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Account COA"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() => router.push("/master_data/account_coa/save")}
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
            id: "mainCOA",
            header: "Main COA",
            type: "text",
            isSortable: true,
          },
          {
            id: "sub1COA",
            header: "Sub 1 COA",
            type: "text",
            isSortable: true,
          },
          {
            id: "sub2COA",
            header: "Sub 2 COA",
            type: "text",
            isSortable: true,
          },
          {
            id: "accountNumber",
            header: "Account Number",
            type: "code",
            isSortable: true,
          },
          {
            id: "accountType",
            header: "Account Type",
            type: "text",
            isSortable: true,
          },
          {
            id: "category",
            header: "Category",
            type: "text",
            isSortable: true,
          },
          {
            id: "transaction",
            header: "Transaction",
            type: "text",
            isSortable: true,
          },
          {
            id: "currency",
            header: "Currency",
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

          const coa = tableRowsQuery.data[selectedRowIndex];

          // Redirect ke halaman save coa
          router.push(
            `/master_data/account_coa/save?number=${coa.accountNumber}`
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

          const coa = tableRowsQuery.data[selectedRowIndex];

          // Hapus coa yang dipilih di table
          await deleteMutation.mutateAsync({
            number: coa.accountNumber,
          });

          // Karena coa yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
