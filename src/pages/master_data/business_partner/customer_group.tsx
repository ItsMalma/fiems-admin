import React from "react";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import Modal from "@/components/Elements/Modal";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import Search from "@/components/Elements/Search";
import Button from "@/components/Elements/Button";
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

export function Save() {
  return (
    <Modal title="Add New Customer Group" type="save" onDone={() => {}}>
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="Create Date" />
            <InputText placeholder="" disabled className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Group Code" />
            <InputText placeholder="" disabled className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Name" />
            <InputText placeholder="Enter group name" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Description" />
            <InputText
              placeholder="Enter group description"
              className="basis-2/3"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default function CustomerGroup() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  const { setModal } = useModal();

  React.useEffect(() => {
    setTitle("Master Data | Customer Group");
    setActive(1, 0, 0);
  }, []);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Group"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() => setModal(<Save />)}
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
              icon={Calendar}
              placeholder="Date Range"
              options={[
                { label: "Today", value: "today" },
                { label: "Yesterday", value: "yesterday" },
                { label: "Weeks Ago", value: "weeksAgo" },
              ]}
              onChange={() => {}}
              isSearchable
            />
            <Select
              icon={Filter}
              placeholder="Filter"
              options={[
                { label: "Create", value: "create" },
                { label: "Group Code", value: "groupCode" },
                { label: "Group Name", value: "groupName" },
                { label: "Description", value: "description" },
              ]}
              onChange={() => {}}
              isSearchable
              isMulti
            />
            <Select
              options={[
                { label: "Show 10 entries", value: 10 },
                { label: "Show 25 entries", value: 25 },
                { label: "Show 50 entries", value: 50 },
              ]}
              defaultValue={{ label: "Show 10 entries", value: 10 }}
              onChange={() => {}}
              isSearchable
            />
          </div>
        </div>
        <Table
          fields={[
            { type: "option" },
            { type: "date", name: "Create Date", isSortable: true },
            { type: "link", name: "Group Code", isSortable: true },
            { type: "text", name: "Name", isSortable: true },
            { type: "text", name: "Description" },
          ]}
          records={[
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
          ]}
        />
        <div className="flex mt-auto">
          <p className="font-medium text-gray-500">Showing 10 entries</p>
        </div>
      </div>
    </>
  );
}
