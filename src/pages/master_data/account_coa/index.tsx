import { deleteCOA, useCOAs } from "@/api/coas";
import Button from "@/components/Elements/Button";
import Label from "@/components/Elements/Label";
import Modal from "@/components/Elements/Modal";
import Table from "@/components/Elements/NewTable";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import { formatCOANumber, normalizeMainOutput } from "@/models/coa.model";
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
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const { coas, error } = useCOAs([current]);

  const normalizeCOAs = React.useMemo(
    () =>
      coas
        ? coas.flatMap((coa) =>
            normalizeMainOutput(coa).map((output) => ({
              ...output,
              accountNumber: formatCOANumber(
                output.main.accountNumber,
                output.sub1?.accountNumber,
                output.sub2?.accountNumber
              ),
            }))
          )
        : [],
    [coas]
  );

  if (error) {
    throw error;
  }

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
            id: "main.accountName",
            header: "Main COA",
            type: "text",
            isSortable: true,
          },
          {
            id: "sub1.description",
            header: "Sub COA1",
            type: "text",
            isSortable: true,
          },
          {
            id: "sub2.description",
            header: "Sub COA2",
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
        ]}
        rows={normalizeCOAs}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (selectedRowIndex === undefined) {
            return;
          }

          const selectedCOA = normalizeCOAs[selectedRowIndex];

          // Redirect ke halaman save coa
          router.push(
            `/master_data/account_coa/save?number=${formatCOANumber(
              selectedCOA.main.accountNumber,
              selectedCOA.sub1?.accountNumber,
              selectedCOA.sub2?.accountNumber
            )}`
          );
        }}
        onDelete={async () => {
          // Cek apakah tidak ada baris yang dipilih dari table
          if (selectedRowIndex === undefined) {
            return;
          }

          const selectedCOA = normalizeCOAs[selectedRowIndex];

          // Hapus customer yang dipilih di table
          await deleteCOA(
            formatCOANumber(
              selectedCOA.main.accountNumber,
              selectedCOA.sub1?.accountNumber,
              selectedCOA.sub2?.accountNumber
            )
          );

          // Karena customer yang dipilih telah dihapus, maka set ulang baris yang dipilih di table
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
