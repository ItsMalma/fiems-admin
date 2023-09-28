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

export default function ShippingInstruction() {
  const router = useRouter();
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Operational | Shipping Instruction");
    setActive(3, 2, 4);
  }, [setTitle, setActive]);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Shipping Instruction"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() => router.push("/operation/document/si/save")}
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
                { label: "SPM Number", value: "spmNumber" },
                { label: "JO. Number", value: "joNumber" },
                { label: "Customer", value: "customer" },
                { label: "Consignee", value: "consignee" },
                { label: "Route", value: "route" },
                { label: "Nilai", value: "nilai" },
                { label: "Description", value: "description" },
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
            { type: "link", name: "SI. Code", isSortable: true },
            { type: "link", name: "Shipping Name", isSortable: true },
            { type: "text", name: "Shipping Address", isSortable: true },
            { type: "group", name: "Shipper", isSortable: true, fields: [
              { type: "text", name: "Name", isSortable: true },
              { type: "text", name: "Address", isSortable: true },
              { type: "text", name: "Phone Number", isSortable: true },
              { type: "text", name: "Telephone", isSortable: true },
              { type: "text", name: "Email", isSortable: true },
              { type: "text", name: "NPWP", isSortable: true },
            ]},
            { type: "group", name: "Consignee", isSortable: true, fields: [
              { type: "text", name: "Name", isSortable: true },
              { type: "text", name: "Address", isSortable: true },
              { type: "text", name: "Phone Number", isSortable: true },
              { type: "text", name: "Telephone", isSortable: true },
              { type: "text", name: "Email", isSortable: true },
              { type: "text", name: "NPWP", isSortable: true },
            ]},
            { type: "text", name: "Shipment Name", isSortable: true },
            { type: "text", name: "Shipment Address", isSortable: true },
            { type: "text", name: "Vessel", isSortable: true },
            { type: "text", name: "Voyage", isSortable: true },
            { type: "text", name: "Port of Load", isSortable: true },
            { type: "text", name: "Shipping Term", isSortable: true },
            { type: "text", name: "Port of Demurage", isSortable: true },
            { type: "text", name: "Ocean Freight", isSortable: true },
            { type: "text", name: "P.O.L Charge", isSortable: true },
            { type: "text", name: "P.O.L Crg. Discharge", isSortable: true },
            { type: "text", name: "Sales", isSortable: true },
            { type: "date", name: "Create Date", isSortable: true },
            { type: "text", name: "Dangerous Goods", isSortable: true },
            { type: "text", name: "DG Class", isSortable: true },
            { type: "text", name: "UN Num.", isSortable: true },
            { type: "text", name: "Reefer", isSortable: true },
            { type: "text", name: "Temperature", isSortable: true },
            { type: "text", name: "Note", isSortable: true },
            { type: "text", name: "Transhipment Import", isSortable: true },
            { type: "text", name: "Transhipment Export", isSortable: true },
            { type: "text", name: "PIB", isSortable: true },
            { type: "text", name: "PEB", isSortable: true },
            { type: "text", name: "BC 1.2", isSortable: true },
            { type: "text", name: "BC 1.0", isSortable: true },
          ]}
          records={[]}
        />
        <div className="flex mt-auto">
          <p className="font-medium text-gray-500">Showing 10 entries</p>
        </div>
      </div>
    </>
  );
}
