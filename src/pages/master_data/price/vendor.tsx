import Button from "@/components/Elements/Button";
import Label from "@/components/Elements/Label";
import Modal from "@/components/Elements/Modal";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import VerticalLine from "@/components/Icons/VerticalLine";
import MainLayout from "@/components/Layouts/MainLayout";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";

export function Export() {
  return (
    <Modal
      className="w-2/5"
      title="Export Data"
      type="save"
      onDone={() => {}}
    >
      <form>       
          <div className="flex gap-6 items-center justify-between">
            <Label name="File Type"/>
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
  )
}

export default function PriceVendor() {
  const router = useRouter();
  const { setModal } = useModal();
  const { setIndex } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Data | Price Vendor");
    setIndex(1, 6, 1);
  }, []);

  return (
    <MainLayout>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Price"
            icon={<FontAwesomeIcon icon={["fas", "money-bills"]} />}
            variant="filled"
            onClick={() => router.push("/master_data/price/save")}
          />
          <Button
            text="Export"
            icon={<FontAwesomeIcon icon={["fas", "file-arrow-up"]} />}
            variant="outlined"
            onClick={() => setModal(<Export/>)}
          />
        </div>
      </div>
      <div className="flex flex-col p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm gap-[18px] 2xl:gap-6 grow overflow-auto">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Button
              text="Edit"
              icon={<FontAwesomeIcon icon={["fas", "pencil"]} />}
              iconPosition="left"
              variant="normal"
              className="!border-gray-300 !text-gray-300"
            />
            <VerticalLine />
            <Button
              text="Delete"
              icon={<FontAwesomeIcon icon={["fas", "trash"]} />}
              iconPosition="left"
              variant="normal"
              className="!border-gray-300 !text-gray-300"
            />
          </div>
          <div className="flex gap-4 items-center">
            <Select
              className="w-40"
              icon={<FontAwesomeIcon icon={["fas", "calendar"]} />}
              placeholder="Date Range"
              options={["Today", "Yesterday", "Weeks Ago"]}
              value={0}
              onChange={() => {}}
            />
            <Select
              className="w-40"
              icon={<FontAwesomeIcon icon={["fas", "filter"]} />}
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
            { type: "text", name: "Tracking", isSortable: true },
            { type: "text", name: "Buruh", isSortable: true },
            { type: "text", name: "THC OPT", isSortable: true },
            { type: "text", name: "THC OPP", isSortable: true },
            { type: "text", name: "BL Admin", isSortable: true },
            { type: "text", name: "Cleaning Cont.", isSortable: true },
            { type: "text", name: "Materai", isSortable: true },
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
              "Door to Port",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp1.000.000",
              "Rp6.000.000",
            ],
          ]}
        />
        <div className="flex mt-auto">
          <p className="font-medium text-gray-500">Showing 10 entries</p>
        </div>
      </div>
    </MainLayout>
  );
}
