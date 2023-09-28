import React from "react";
import useModal from "@/stores/modal";
import useMenu from "@/stores/menu";
import useHeader from "@/stores/header";
import Button from "@/components/Elements/Button";
import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import Modal from "@/components/Elements/Modal";
import Radio from "@/components/Elements/Radio";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import VerticalLine from "@/components/Icons/VerticalLine";
import {
  BoxFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";

export function Save() {
  const [type, setType] = React.useState(0);

  return (
    <Modal title="Add New Product" type="save" onDone={() => {}}>
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="Type Barang" />
            <Radio name="barang" value="Product" onChange={() => setType(0)} />
            <Radio
              name="barang"
              value="SparePart"
              onChange={() => setType(1)}
            />
            <Radio name="barang" value="ATK" onChange={() => setType(2)} />
          </div>
          <hr></hr>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Create Date" />
            <InputText placeholder="" disabled className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="SKU Code" />
            <InputText placeholder="Enter SKU code" className="basis-2/3" />
          </div>
          {type == 0 && (
            <>
              <div className="flex gap-6 items-center justify-between">
                <Label name="Product Category" />
                <Select
                  className="basis-2/3"
                  placeholder="Choose Category"
                  options={[
                    { label: "Directur", value: "directur" },
                    { label: "Marketing", value: "marketing" },
                  ]}
                  onChange={() => {}}
                  isSearchable
                />
              </div>
              <div className="flex gap-6 items-center justify-between">
                <Label name="Product Name" />
                <InputText
                  className="basis-2/3"
                  placeholder="Enter product name"
                />
              </div>
            </>
          )}
          {type == 1 && (
            <>
              <div className="flex gap-6 items-center justify-between">
                <Label name="SparePart Name" />
                <InputText
                  className="basis-2/3"
                  placeholder="Enter sparepart name"
                />
              </div>
            </>
          )}
          {type == 2 && (
            <>
              <div className="flex gap-6 items-center justify-between">
                <Label name="ATK Name" />
                <InputText placeholder="Enter atk name" className="basis-2/3" />
              </div>
            </>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default function MasterProductATK() {
  const { setModal } = useModal();
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Data | Master Product");
    setActive(1, 9, 2);
  }, [setTitle, setActive]);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Product"
            icon={<BoxFill />}
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
                { label: "Create Date", value: "createDate" },
                { label: "SKU Code", value: "skuCode" },
                { label: "ATK Name", value: "atkName" },
                { label: "Satuan", value: "satuan" },
              ]}
              onChange={() => {}}
              isMulti
              isSearchable
            />
            <Select
              options={[
                { label: "Show 10 entries", value: 10 },
                { label: "Show 25 entries", value: 25 },
                { label: "Show 50 entries", value: 50 },
              ]}
              value={10}
              onChange={() => {}}
              isSearchable
            />
          </div>
        </div>
        <Table
          fields={[
            { type: "option" },
            { type: "date", name: "Create Date", isSortable: true },
            { type: "link", name: "SKU Code", isSortable: true },
            { type: "text", name: "ATK Name", isSortable: true },
            { type: "text", name: "Satuan", isSortable: true },
          ]}
          records={[
            [false, new Date(), "No. Reff", "ATK Name", "Pcs"],
            [false, new Date(), "No. Reff", "ATK Name", "Pack"],
            [false, new Date(), "No. Reff", "ATK Name", "Box"],
          ]}
        />
        <div className="flex mt-auto">
          <p className="font-medium text-gray-500">Showing 10 entries</p>
        </div>
      </div>
    </>
  );
}
