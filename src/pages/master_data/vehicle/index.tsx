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
  TruckFrontFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";
import Label from "@/components/Elements/Label";
import Modal from "@/components/Elements/Modal";

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

export default function MasterVehicle() {
  const router = useRouter();
  const { setModal } = useModal();
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Data | Master Vehicle");
    setActive(1, 4, 0);
  }, []);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Vehicle"
            icon={<TruckFrontFill />}
            variant="filled"
            onClick={() => router.push("/master_data/vehicle/save")}
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
              className="w-40"
              icon={<Filter />}
              placeholder="Filter"
              options={["Create", "Group Code", "Group Name", "Description"]}
              value={0}
              onChange={() => {}}
              multi={true}
            />
            <Select
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
            { type: "text", name: "Vendor Name", isSortable: true },
            { type: "link", name: "Truck Number", isSortable: true },
            { type: "text", name: "Merk", isSortable: true },
            { type: "text", name: "Truck Type", isSortable: true },
            { type: "text", name: "Mesin Number", isSortable: true },
            { type: "text", name: "Rangka Number", isSortable: true },
            { type: "text", name: "Silinder", isSortable: true },
            { type: "text", name: "Color", isSortable: true },
            { type: "date", name: "STNK Expired", isSortable: true },
            { type: "date", name: "Pajak Expired", isSortable: true },
            { type: "date", name: "Keur Expired", isSortable: true },
            { type: "text", name: "Description" },
          ]}
          records={[
            [
              false,
              new Date(),
              "Vendor Name",
              "VHC00001",
              "Merk",
              "Truck Type",
              "Mesin Number",
              "Rangka Number",
              "Silinder",
              "Color",
              new Date(),
              new Date(),
              new Date(),
            ],
            [
              false,
              new Date(),
              "Vendor Name",
              "VHC00001",
              "Merk",
              "Truck Type",
              "Mesin Number",
              "Rangka Number",
              "Silinder",
              "Color",
              new Date(),
              new Date(),
              new Date(),
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
