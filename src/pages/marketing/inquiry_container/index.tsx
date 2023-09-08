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
import { useRouter } from "next/router";

export default function InquiryContainer() {
  const router = useRouter();
  const { setActive } = useMenu();
  const { setModal } = useModal();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Marketing | Inquiry Container");
    setActive(2, 2, 0);
  }, []);

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
        <Table
          fields={[
            { type: "option" },
            { type: "date", name: "Inquiry Date", isSortable: true },
            { type: "link", name: "Inquiry Number", isSortable: true },
            { type: "text", name: "Sales Name", isSortable: true },
            { type: "text", name: "Customer", isSortable: true},
            { type: "text", name: "Customer Group", isSortable: true},
            { type: "text", name: "Customer Address", isSortable: true},
            { type: "text", name: "Purchase", isSortable: true},
            { type: "text", name: "Purchase Address", isSortable: true},
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
            [false, new Date(), "REQ00001", "Hadi Ahmad Akbar", "Customer Name", "Customer Address", "Customer Group", "Purchase Name", "Purchase Address", "J.O Type", "Order Type", "Customer To", "City", "Route", "Service Type", "Container Type", "Container Size", "PPN", "Insurance", "PPFTZ", "Shipping", "Vessel Name", "Voyage", "", ""]
          ]}
        />
        <div className="flex mt-auto">
          <p className="font-medium text-gray-500">Showing 10 entries</p>
        </div>
      </div>
    </>
  );
}