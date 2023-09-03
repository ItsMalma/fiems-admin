import React from "react";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import useHeader from "@/stores/header";
import { useRouter } from "next/router";
import Button from "@/components/Elements/Button";
import Modal from "@/components/Elements/Modal";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import VerticalLine from "@/components/Icons/VerticalLine";
import {
  PersonFillAdd,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";
import Label from "@/components/Elements/Label";

export function Export() {
  return (
    <Modal className="w-2/5" title="Export Data" type="save" onDone={() => {}}>
      <form>
        <div className="flex gap-6 items-center justify-between">
          <Label name="File Type" />
          <Select
            placeholder="Choose file type"
            options={["Excel", "Tangerang", "Solo"]}
            value={1}
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
  const { setModal } = useModal();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Data | Account COA");
    setActive(1, 10, 0);
  }, []);

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
      <div className="flex flex-col p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm gap-[18px] 2xl:gap-6 grow overflow-auto">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Button
              text="Edit"
              icon={<Pencil />}
              iconPosition="left"
              variant="normal"
              className="!border-gray-300 !text-gray-300"
            />
            <VerticalLine />
            <Button
              text="Delete"
              icon={<Trash />}
              iconPosition="left"
              variant="normal"
              className="!border-gray-300 !text-gray-300"
            />
          </div>
          <div className="flex gap-4 items-center">
            <Select
              className="w-40"
              icon={<Calendar />}
              placeholder="Date Range"
              options={["Today", "Yesterday", "Weeks Ago"]}
              value={0}
              onChange={() => {}}
            />
            <Select
              className="w-36"
              icon={<Filter />}
              placeholder="Filter"
              options={["Create", "Group Code", "Group Name", "Description"]}
              value={0}
              onChange={() => {}}
              multi={true}
            />
            <Select
              className="w-44"
              options={[
                "Show 10 entries",
                "Show 25 entries",
                "Show 50 entries",
              ]}
              value={0}
              onChange={() => {}}
            />
          </div>
        </div>
        <Table
          fields={[
            { type: "option" },
            { type: "date", name: "Create Date", isSortable: true },
            { type: "text", name: "Main COA", isSortable: true },
            { type: "text", name: "Sub COA1", isSortable: true },
            { type: "text", name: "Sub COA2", isSortable: true },
            { type: "link", name: "Account Number", isSortable: true },
            { type: "text", name: "Account Type", isSortable: true },
            { type: "text", name: "Category", isSortable: true },
            { type: "text", name: "Transaction", isSortable: true },
            { type: "text", name: "Currency", isSortable: true },
          ]}
          records={[
            [
              false,
              new Date(),
              "Aktiva",
              "",
              "",
              "100000",
              "Aktiva",
              "Aktiva",
              "IDR",
            ],
            [
              false,
              new Date(),
              "Aktiva",
              "Aktiva Lancar",
              "",
              "101000",
              "Aktiva",
              "Aktiva",
              "IDR",
            ],
            [
              false,
              new Date(),
              "Aktiva",
              "Aktiva Lancar",
              "Kas Besar",
              "101010",
              "Aktiva",
              "Kas",
              "IDR",
            ],
          ]}
        />
        <div className="flex mt-auto">
          <p className="font-medium text-gray-500">Showing 10 entries</p>
        </div>
      </div>
    </>
  );
}
