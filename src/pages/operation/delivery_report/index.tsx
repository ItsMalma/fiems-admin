import Button from "@/components/Elements/Button";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import useMenu from "@/stores/menu";
import React from "react";
import VerticalLine from "@/components/Icons/VerticalLine";
import useHeader from "@/stores/header";
import {
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";
import { useRouter } from "next/router";

export default function InquiryContainer() {
  const router = useRouter();
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Operationa | Delivery Report");
    setActive(3, 1, 0);
  }, [setTitle, setActive]);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="SPM & UJ"
            variant="filled"
            className="!px-6"
            onClick={() => router.push("/operation/document/spmuj/save")}
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
                { label: "Job Order Num.", value: "jobOrderNum" },
                { label: "RO Num.", value: "roNum" },
                { label: "Consignee", value: "consignee" },
                { label: "Address", value: "address" },
                { label: "Email", value: "email" },
                { label: "Telephone", value: "telephone" },
                { label: "Phone Number", value: "phoneNumber" },
                { label: "Stuffing Date", value: "stuffingDate" },
                { label: "Tracking Name", value: "trackingName" },
                { label: "Route", value: "route" },
                { label: "Truck Num.", value: "truckNum" },
                { label: "Truck Type", value: "truckType" },
                { label: "Driver", value: "driver" },
                { label: "Phone Number", value: "phoneNumber" },
                { label: "Cont. Number", value: "contNumber" },
                { label: "Seal Number", value: "sealNumber" },
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
            { type: "link", name: "Job Order Num.", isSortable: true },
            { type: "link", name: "RO Num.", isSortable: true },
            { type: "text", name: "Consignee", isSortable: true },
            { type: "text", name: "Address", isSortable: true },
            { type: "text", name: "Email", isSortable: true },
            { type: "text", name: "Telephone", isSortable: true },
            { type: "text", name: "Phone Number", isSortable: true },
            { type: "date", name: "Stuffing Date", isSortable: true },
            { type: "text", name: "Tracking Name", isSortable: true },
            { type: "text", name: "Route", isSortable: true },
            { type: "text", name: "Truck Num.", isSortable: true },
            { type: "text", name: "Truck Type", isSortable: true },
            { type: "text", name: "Driver", isSortable: true },
            { type: "text", name: "Phone Number", isSortable: true },
            { type: "text", name: "Cont. Number", isSortable: true },
            { type: "text", name: "Seal Number", isSortable: true },
          ]}
          records={[
            [
              false,
              "JO00001",
              "90122",
              "Consignee",
              "Address",
              "Email",
              "Telephone",
              "Phone Number",
              new Date(),
              "Tracking",
              "Route",
              "Truck Num",
              "Truck Type",
              "Driver Name",
              "Driver Phone Num.",
              "Cont. Num",
              "Seal Num.",
              "Cont. Num",
              "Seal Num.",
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
