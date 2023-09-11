import React from "react";
import { useRouter } from "next/router";
import useModal from "@/stores/modal";
import useMenu from "@/stores/menu";
import useHeader from "@/stores/header";
import Button from "@/components/Elements/Button";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import VerticalLine from "@/components/Icons/VerticalLine";
import {
  GeoAltFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";
import Label from "@/components/Elements/Label";
import Modal from "@/components/Elements/Modal";
import Upload from "@/components/Elements/Upload";

function Export() {
  return (
    <Modal title="Export Data" type="save" onDone={() => {}}>
      <form>
        <div className="flex gap-6 items-center justify-between">
          <Label name="File Type" />
          <Select
            className="basis-3/5"
            placeholder="Choose city"
            options={[{ label: "Excel", value: "excel" }]}
            onChange={() => {}}
          />
        </div>
      </form>
    </Modal>
  );
}

function Import() {
  return (
    <Modal title="Export Data" type="save" onDone={() => {}}>
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="File Type" />
            <Select
              className="basis-2/3"
              placeholder="Choose file type"
              options={[{ label: "Excel", value: "excel" }]}
              onChange={() => {}}
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Upload File" />
            <Upload className="basis-2/3" />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default function MasterUangJalan() {
  const router = useRouter();
  const { setModal } = useModal();
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Data | Master Uang Jalan");
    setActive(1, 7, 0);
  }, []);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Uang Jalan"
            icon={<GeoAltFill />}
            variant="filled"
            onClick={() => router.push("/master_data/uang_jalan/save")}
          />
          <Button
            text="Import"
            icon={<FileEarmarkArrowDownFill />}
            variant="outlined"
            onClick={() => setModal(<Import />)}
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
                { label: "Customer Name", value: "customerName" },
                { label: "Route", value: "route" },
                { label: "Truck Type", value: "truckType" },
                { label: "Container Size", value: "containerSize" },
                { label: "BBM", value: "bbm" },
                { label: "Toll", value: "toll" },
                { label: "Buruh", value: "buruh" },
                { label: "Meal", value: "meal" },
                { label: "Etc.", value: "etc" },
                { label: "Grand Total", value: "grandTotal" },
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
            { type: "text", name: "Customer Name", isSortable: true },
            { type: "text", name: "Route", isSortable: true },
            { type: "text", name: "Truck Type", isSortable: true },
            { type: "text", name: "Container Size", isSortable: true },
            { type: "text", name: "BBM", isSortable: true },
            { type: "text", name: "Toll", isSortable: true },
            { type: "text", name: "Buruh", isSortable: true },
            { type: "text", name: "Meal", isSortable: true },
            { type: "text", name: "Etc.", isSortable: true },
            { type: "text", name: "Grand Total", isSortable: true },
            { type: "text", name: "Description" },
          ]}
          records={[
            [
              false,
              new Date(),
              "Customer Name",
              "Tangerang - Jakarta",
              "Dry",
              "20 ft",
              "Rp1.000.00",
              "Rp1.000.00",
              "Rp1.000.00",
              "Rp1.000.00",
              "Rp1.000.00",
              "Rp5.000.00",
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
