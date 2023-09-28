import React from "react";
import { useRouter } from "next/router";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import Button from "@/components/Elements/Button";
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

export default function InquiryContainer() {
  const router = useRouter();
  const { setTitle } = useHeader();
  const { setActive } = useMenu();

  React.useEffect(() => {
    setTitle("Marketing | Inquiry Container");
    setActive(2, 2, 0);
  }, [setTitle, setActive]);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Inquiry"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() => router.push("/marketing/inquiry_container/save")}
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
                { label: "Inquiry Date", value: "inquiryDate" },
                { label: "Inquiry Member", value: "inquiryMember" },
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
              value={10}
              onChange={() => {}}
              isSearchable
            />
          </div>
        </div>
        <Table
          fields={[
            { type: "option" },
            { type: "date", name: "Inquiry Date", isSortable: true },
            { type: "link", name: "Inquiry Number", isSortable: true },
            { type: "text", name: "Sales Name", isSortable: true },
            { type: "text", name: "Customer", isSortable: true },
            { type: "text", name: "Customer Group", isSortable: true },
            { type: "text", name: "Customer Address", isSortable: true },
            { type: "text", name: "Purchase", isSortable: true },
            { type: "text", name: "Purchase Address", isSortable: true },
            { type: "text", name: "Job Order Type", isSortable: true },
            { type: "text", name: "Order Type", isSortable: true },
            { type: "text", name: "Customer To", isSortable: true },
            { type: "text", name: "City", isSortable: true },
            { type: "text", name: "Route", isSortable: true },
            { type: "text", name: "Service Type", isSortable: true },
            { type: "text", name: "Cont. Type", isSortable: true },
            { type: "text", name: "Cont. Size", isSortable: true },
            { type: "text", name: "PPN", isSortable: true },
            { type: "text", name: "Insurance", isSortable: true },
            { type: "text", name: "PPFTZ", isSortable: true },
            { type: "text", name: "Shipping", isSortable: true },
            { type: "text", name: "Vessel Name", isSortable: true },
            { type: "text", name: "Voyage", isSortable: true },
            { type: "text", name: "ETD", isSortable: true },
            { type: "text", name: "ETA", isSortable: true },
            { type: "text", name: "Description" },
          ]}
          records={[
            [
              false,
              new Date(),
              "REQ00001",
              "Hadi Ahmad Akbar",
              "Customer Name",
              "Customer Address",
              "Customer Group",
              "Purchase Name",
              "Purchase Address",
              "J.O Type",
              "Order Type",
              "Customer To",
              "City",
              "Route",
              "Service Type",
              "Container Type",
              "Container Size",
              "PPN",
              "Insurance",
              "PPFTZ",
              "Shipping",
              "Vessel Name",
              "Voyage",
              "",
              "",
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
