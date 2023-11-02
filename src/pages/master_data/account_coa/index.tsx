import { Button, Label, Modal, Search, Select, Table } from "@/components/Elements";
import { trpc } from "@/libs/trpc";
import { AccountType } from "@/server/dtos/coa.dto";
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
    setActive(1, 10, 0);
  }, [setTitle, setActive]);

  // State untuk menyimpan index dari baris yang dipilih di table
  // State untuk menyimpan index dari baris yang dipilih di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.coa.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.coa.delete.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
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
            id: "description",
            header: "Main COA",
            type: "text",
            isSortable: true,
          },
          {
            id: "coa1Description",
            header: "Sub COA1",
            type: "text",
            isSortable: true,
          },
          {
            id: "coa2description",
            header: "Sub COA2",
            type: "text",
            isSortable: true,
          },
          {
            id: "number",
            header: "Account Number",
            type: "code",
            isSortable: true,
          },
          {
            id: "type",
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

          const coa = tableRowsQuery.data[selectedRowIndex];

          // Redirect ke halaman save customer
          router.push(
            `/master_data/business_partner/account_coa/save?number=${coa.number}&type=${coa.accountType}`
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
            type: coa.accountType as AccountType,
            number: coa.number,
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
