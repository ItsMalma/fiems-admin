import React from "react";
import useModal from "@/stores/modal";
import useMenu from "@/stores/menu";
import useHeader from "@/stores/header";
import Button from "@/components/Elements/Button";
import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import Modal from "@/components/Elements/Modal";
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

export default function MasterVessel() {
  const { setModal } = useModal();
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Data | Master Vessel");
    setActive(1, 5, 0);
  }, []);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Vessel"
            icon={<BoxFill />}
            variant="filled"
            onClick={() =>
              setModal(
                <Modal title="Add New Route" type="save" onDone={() => {}}>
                  <form className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="Create Date" />
                      <InputText
                        className="basis-2/3"
                        disabled
                        value="20/08/2023"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="Shipping Name" />
                      <div className="basis-2/3 flex gap-4">
                        <Select
                          className="basis-4/5"
                          placeholder="Enter Code"
                          options={["CSC00001", "CSC00002", "CSC00003"]}
                          value={0}
                          onChange={() => {}}
                        />
                        <InputText
                          className="w-fit"
                          disabled
                          value="Shipping Name"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="City" />
                      <InputText
                        className="basis-2/3"
                        value=""
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="Province" />
                      <InputText
                        className="basis-2/3"
                        value=""
                        placeholder="Enter province"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="Route Description" />
                      <InputText
                        className="basis-2/3"
                        value=""
                        placeholder="Enter route description"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="" />
                      <InputText
                        className="basis-2/3"
                        value=""
                        placeholder="Enter route description"
                      />
                    </div>
                  </form>
                </Modal>
              )
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
