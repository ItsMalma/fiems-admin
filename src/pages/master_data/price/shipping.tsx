import React from "react";
import { useRouter } from "next/router";
import useModal from "@/stores/modal";
import useMenu from "@/stores/menu";
import useHeader from "@/stores/header";
import Button from "@/components/Elements/Button";
import Label from "@/components/Elements/Label";
import Modal from "@/components/Elements/Modal";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import VerticalLine from "@/components/Icons/VerticalLine";
import {
  CurrencyDollar,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";

export function Export() {
  return (
    <Modal className="w-2/5" title="Export Data" type="save" onDone={() => {}}>
      <form>
        <div className="flex gap-6 items-center justify-between">
          <Label name="File Type" />
          <Select
            placeholder="Choose city"
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

export default function PriceShipping() {
  const router = useRouter();
  const { setModal } = useModal();
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Data | Shipping Price");
    setActive(1, 6, 2);
  }, []);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Price"
            icon={<CurrencyDollar />}
            variant="filled"
            onClick={() => router.push("/master_data/price/save")}
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
              className=""
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
            { type: "date", name: "Effective Date", isSortable: true },
            { type: "text", name: "Vendor Name", isSortable: true },
            { type: "text", name: "Route", isSortable: true },
            { type: "text", name: "Container Size", isSortable: true },
            { type: "text", name: "Via Port", isSortable: true },
            { type: "text", name: "Freight", isSortable: true },
            { type: "text", name: "THC OPT", isSortable: true },
            { type: "text", name: "THC OPP", isSortable: true },
            { type: "text", name: "BL Admin", isSortable: true },
            { type: "text", name: "Cleaning Cont.", isSortable: true },
            { type: "text", name: "Alih Kapal", isSortable: true },
            { type: "text", name: "Materai", isSortable: true },
            { type: "text", name: "LO/LO", isSortable: true },
            { type: "text", name: "Segel", isSortable: true },
            { type: "text", name: "RC", isSortable: true },
            { type: "text", name: "LSS", isSortable: true },
            { type: "text", name: "Grand Total", isSortable: true },
            { type: "status", name: "Status" },
          ]}
          records={[
            [
              false,
              new Date(),
              new Date(),
              "Vendor Name",
              "Tangerang - Jakarta",
              "20 ft",
              "Tangerang",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp11.000.000",
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
