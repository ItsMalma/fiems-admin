import React from "react";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { useRouter } from "next/router";
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

export default function InquiryContainer() {
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Marketing | Vessel Schedule");
    setActive(2, 3, 0);
  }, []);

  const router = useRouter();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Schedule"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() => router.push("/marketing/vessel_schedule/save")}
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
                { label: "Month", value: "month" },
                { label: "Shipping Name", value: "shippingName" },
                { label: "Vessel Name", value: "vesselName" },
                { label: "Voyage", value: "voyage" },
                { label: "Vessel Capacity", value: "vesselCapacity" },
                { label: "Quota", value: "quota" },
                { label: "Port Asal", value: "portOrigin" },
                { label: "Port Tujuan", value: "portDestination" },
                { label: "Open Stack Date", value: "openStackDate" },
                { label: "Closing RC", value: "closingRc" },
                { label: "RC Closing Time", value: "rcClosingTime" },
                { label: "Closing Date", value: "closingDate" },
                { label: "Vessel Closing Time", value: "vesselClosingTime" },
                { label: "ETD", value: "etd" },
                { label: "ETA", value: "eta" },
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
            { type: "text", name: "Month", isSortable: true },
            { type: "text", name: "Shipping Name", isSortable: true },
            { type: "text", name: "Vessel Name", isSortable: true },
            { type: "text", name: "Voyage", isSortable: true },
            { type: "text", name: "Vessel Capacity", isSortable: true },
            { type: "text", name: "Quota", isSortable: true },
            { type: "text", name: "Port Asal", isSortable: true },
            { type: "text", name: "Port Tujuan", isSortable: true },
            { type: "date", name: "Open Stack Date", isSortable: true },
            { type: "date", name: "Closing RC", isSortable: true },
            { type: "text", name: "RC Closing Time", isSortable: true },
            { type: "date", name: "Closing Date", isSortable: true },
            { type: "text", name: "Vessel Closing Time", isSortable: true },
            { type: "date", name: "ETD", isSortable: true },
            { type: "date", name: "ETA", isSortable: true },
            { type: "text", name: "Description" },
          ]}
          records={[
            [
              false,
              new Date(),
              "Month",
              "Shipping",
              "Vessel",
              "Voyage",
              "Vessel Capacity",
              "Quota",
              "Port",
              "Port",
              new Date(),
              new Date(),
              "",
              new Date(),
              "",
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
