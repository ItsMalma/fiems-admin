import Button from "@/components/Elements/Button";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import useMenu from "@/stores/menu";
import React from "react";
import VerticalLine from "@/components/Icons/VerticalLine";
import useHeader from "@/stores/header";
import {
  PersonFillAdd,
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
    setTitle("Operational | Dooring");
    setActive(3, 4, 0);
  }, [setTitle, setActive]);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
        <div className="flex gap-3 2xl:gap-4">
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
                { label: "Inquiry Date", value: "inquiryDate" },
                { label: "Inquiry Number", value: "inquiryNumber" },
                { label: "Sales Name", value: "salesName" },
                { label: "Customer", value: "customer" },
                { label: "Customer Group", value: "customerGroup" },
                { label: "Customer Address", value: "customerAddress" },
                { label: "Purchase", value: "purchase" },
                { label: "Purchase Address", value: "purchaseAddress" },
                { label: "Job Order Type", value: "jobOrderType" },
                { label: "Order Type", value: "orderType" },
                { label: "Customer To", value: "customerTo" },
                { label: "City", value: "city" },
                { label: "Route", value: "route" },
                { label: "Service Type", value: "serviceType" },
                { label: "Cont. Type", value: "contType" },
                { label: "Cont. Size", value: "contSize" },
                { label: "PPN", value: "ppn" },
                { label: "Insurance", value: "insurance" },
                { label: "PPFTZ", value: "ppftz" },
                { label: "Shipping", value: "shipping" },
                { label: "Vessel Name", value: "vesselName" },
                { label: "Voyage", value: "voyage" },
                { label: "ETD", value: "etd" },
                { label: "ETA", value: "eta" },
                { label: "Action", value: "action" },
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
            { type: "text", name: "Departure", isSortable: true },
            { type: "text", name: "Arrival", isSortable: true },
            { type: "text", name: "Address", isSortable: true },
            { type: "text", name: "Shipping", isSortable: true },
            { type: "text", name: "Vessel", isSortable: true },
            { type: "text", name: "Voyage", isSortable: true },
            { type: "text", name: "Closing RC", isSortable: true },
            { type: "text", name: "Closing Date", isSortable: true },
            { type: "text", name: "Closing Time", isSortable: true },
            { type: "date", name: "ETD", isSortable: true },
            { type: "date", name: "ETA", isSortable: true },
            { type: "text", name: "Freetime Storage", isSortable: true },
            { type: "text", name: "Freetime Demurage", isSortable: true },
            { type: "text", name: "Storage", isSortable: true },
            { type: "text", name: "Demurage", isSortable: true },
            { type: "text", name: "Storage Value", isSortable: true },
            { type: "text", name: "Demurage Value", isSortable: true },
            { type: "tool", name: "Action" },
          ]}
          records={[
            [
              false,
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              new Date(),
              new Date(),
              "",
              "",
              "",
              "",
              "",
              "",
              // <Button
              //   className="text-sm !py-1.5 !px-2 rounded-lg"
              //   text="Dooring"
              //   variant="filled"
              //   onClick={() => router.push("/operation/dooring/save")}
              // />,
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
