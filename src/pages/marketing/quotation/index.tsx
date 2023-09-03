import Button from "@/components/Elements/Button";
import Modal from "@/components/Elements/Modal";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import useModal from "@/stores/modal";
import useMenu from "@/stores/menu";
import React from "react";
import VerticalLine from "@/components/Icons/VerticalLine";
import useHeader from "@/stores/header";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import {
  PersonFillAdd,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";
import clsx from "clsx";
import { useRouter } from "next/router";

export function QuotationTable() {
  return (
    <Table
      fields={[
        { type: "option" },
        { type: "date", name: "Create Date", isSortable: true },
        { type: "link", name: "Form Code", isSortable: true },
        { type: "text", name: "Service Type", isSortable: true },
        { type: "text", name: "Shipping Name", isSortable: true },
        { type: "text", name: "Route", isSortable: true },
        { type: "text", name: "Address", isSortable: true },
        { type: "text", name: "Via Port", isSortable: true },
        { type: "text", name: "Cont. Type", isSortable: true },
        { type: "text", name: "Cont. Size", isSortable: true },
        { type: "text", name: "Tracking Asal", isSortable: true },
        { type: "text", name: "Tracking Tujuan", isSortable: true },
        { type: "text", name: "Shipping", isSortable: true },
        { type: "text", name: "Other", isSortable: true },
        { type: "text", name: "Summary", isSortable: true },
        { type: "text", name: "HPP", isSortable: true },
        { type: "text", name: "Description" },
      ]}
      records={[
        [false, new Date(), "CALC00001", "Service Type", "Shipping Name", "Jakarta-Tangerang", "Jl. in aja, Jakarta", "Jakarta", "Dry", "20ft", "Rp", "Rp", "Rp", "Rp", "Rp", "Rp"],
      ]}
    />
  );
}

export function ConfirmTable() {
  return (
    <Table
      fields={[
        { type: "option" },
        { type: "date", name: "Create Date", isSortable: true },
        { type: "link", name: "Form Code", isSortable: true },
        { type: "text", name: "Service Type", isSortable: true },
        { type: "text", name: "Shipping Name", isSortable: true },
        { type: "text", name: "Route", isSortable: true },
        { type: "text", name: "Address", isSortable: true },
        { type: "text", name: "Via Port", isSortable: true },
        { type: "text", name: "Cont. Type", isSortable: true },
        { type: "text", name: "Cont. Size", isSortable: true },
        { type: "text", name: "Tracking Asal", isSortable: true },
        { type: "text", name: "Tracking Tujuan", isSortable: true },
        { type: "text", name: "Shipping", isSortable: true },
        { type: "text", name: "Other", isSortable: true },
        { type: "text", name: "Summary", isSortable: true },
        { type: "text", name: "HPP", isSortable: true },
        { type: "text", name: "Description" },
      ]}
      records={[
        [false, new Date(), "CALC00001", "Service Type", "Shipping Name", "Jakarta-Tangerang", "Jl. in aja, Jakarta", "Jakarta", "Dry", "20ft", "Rp", "Rp", "Rp", "Rp", "Rp", "Rp"],
      ]}
    />
  );
}

export function CompletedTable() {
  return (
    <Table
      fields={[
        { type: "option" },
        { type: "date", name: "Create Date", isSortable: true },
        { type: "link", name: "Form Code", isSortable: true },
        { type: "text", name: "Service Type", isSortable: true },
        { type: "text", name: "Shipping Name", isSortable: true },
        { type: "text", name: "Route", isSortable: true },
        { type: "text", name: "Address", isSortable: true },
        { type: "text", name: "Via Port", isSortable: true },
        { type: "text", name: "Cont. Type", isSortable: true },
        { type: "text", name: "Cont. Size", isSortable: true },
        { type: "text", name: "Tracking Asal", isSortable: true },
        { type: "text", name: "Tracking Tujuan", isSortable: true },
        { type: "text", name: "Shipping", isSortable: true },
        { type: "text", name: "Other", isSortable: true },
        { type: "text", name: "Summary", isSortable: true },
        { type: "text", name: "HPP", isSortable: true },
        { type: "text", name: "Description" },
      ]}
      records={[
        [false, new Date(), "CALC00001", "Service Type", "Shipping Name", "Jakarta-Tangerang", "Jl. in aja, Jakarta", "Jakarta", "Dry", "20ft", "Rp", "Rp", "Rp", "Rp", "Rp", "Rp"],
      ]}
    />
  );
}

export default function CustomerGroup() {
  const router = useRouter();
  const { setActive } = useMenu();
  const { setModal } = useModal();
  const { setTitle } = useHeader();

  const [selectedTab, setSelectedTab] = React.useState(0);

  React.useEffect(() => {
    setTitle("Marketing | Form Quotation");
    setActive(2, 1, 0);
  }, []);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add Price Calculation"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() => router.push("/marketing/price_calculation")}
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
        <div className="flex gap-1.5">
          <Button
            variant="normal"
            text="Quotation"
            className={clsx("font-normal !text-gray-500 !rounded-none", selectedTab == 0 && "border-b-[3px] border-b-primaryActive !font-semibold !text-gray-800")}
            onClick={() => setSelectedTab(0)}
          />
          <Button
            variant="normal"
            text="Confirm"
            className={clsx("font-normal !text-gray-500 !rounded-none", selectedTab == 1 && "border-b-[3px] border-b-primaryActive !font-semibold !text-gray-800")}
            onClick={() => setSelectedTab(1)}
          />
          <Button
            variant="normal"
            text="Completed"
            className={clsx("font-normal !text-gray-500 !rounded-none", selectedTab == 2 && "border-b-[3px] border-b-primaryActive !font-semibold !text-gray-800")}
            onClick={() => setSelectedTab(2)}
          />
        </div>
        <hr></hr>
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
              className="w-44"
              icon={<Calendar />}
              placeholder="Date Range"
              options={["Today", "Yesterday", "Weeks Ago"]}
              value={0}
              onChange={() => {}}
            />
            <Select
              className="w-36"
              icon={<Filter />}
              placeholder="Filter"
              options={["Create", "Group Code", "Group Name", "Description"]}
              value={0}
              onChange={() => {}}
              multi={true}
            />
            <Select
              className="w-44"
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
        {selectedTab == 0 && <QuotationTable/>}
        {selectedTab == 1 && <ConfirmTable/>}
        {selectedTab == 2 && <CompletedTable/>}
        <div className="flex mt-auto">
          <p className="font-medium text-gray-500">Showing 10 entries</p>
        </div>
      </div>
    </>
  );
}
