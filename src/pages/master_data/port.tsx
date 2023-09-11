import Button from "@/components/Elements/Button";
import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import Modal from "@/components/Elements/Modal";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import VerticalLine from "@/components/Icons/VerticalLine";
import useMenu from "@/stores/menu";
import useHeader from "@/stores/header";
import React from "react";
import useModal from "@/stores/modal";
import {
  BuildingFillAdd,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";

function Save() {
  return (
    <Modal title="Add New Customer Group" type="save" onDone={() => {}}>
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="Create Date" />
            <InputText placeholder="" disabled className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Port Code" />
            <InputText placeholder="" disabled className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="City" />
            <Select
              placeholder="Choose city"
              options={[
                { label: "Jakarta", value: 0 },
                { label: "Tangerang", value: 1 },
                { label: "Solo", value: 2 },
              ]}
              onChange={() => {}}
              isSearchable
              className="basis-2/3"
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Province" />
            <Select
              placeholder="Choose province"
              options={[
                { label: "Jawa Barat", value: 0 },
                { label: "Jakarta", value: 1 },
                { label: "Banten", value: 2 },
              ]}
              onChange={() => {}}
              isSearchable
              className="basis-2/3"
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Port Name" />
            <InputText placeholder="Enter port name" className="basis-2/3" />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export function Export() {
  return (
    <Modal title="Export Data" type="save" onDone={() => {}}>
      <form>
        <div className="flex gap-6 items-center justify-between">
          <Label name="File Type" />
          <Select
            placeholder="Choose file type"
            options={[{ label: "Excel", value: "excel" }]}
            onChange={() => {}}
            isSearchable
            className="basis-2/3"
          />
        </div>
      </form>
    </Modal>
  );
}

export default function MasterPort() {
  const { setActive: setIndex } = useMenu();
  const { setModal } = useModal();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Data | Master Port");
    setIndex(1, 2, 0);
  }, []);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Port Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Port"
            icon={<BuildingFillAdd />}
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
                { label: "Create Date", value: "createDate" },
                { label: "Port Code", value: "portCode" },
                { label: "Province", value: "province" },
                { label: "City", value: "city" },
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
            { type: "link", name: "Port Code", isSortable: true },
            { type: "text", name: "Province", isSortable: true },
            { type: "text", name: "City", isSortable: true },
            { type: "text", name: "Port Name" },
          ]}
          records={[
            [false, new Date(), "PC00001", "Banten", "Tangerang", "Port Name"],
          ]}
        />
        <div className="flex mt-auto">
          <p className="font-medium text-gray-500">Showing 10 entries</p>
        </div>
      </div>
    </>
  );
}
