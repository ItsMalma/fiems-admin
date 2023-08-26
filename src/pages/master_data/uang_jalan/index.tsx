import Button from "@/components/Elements/Button";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import VerticalLine from "@/components/Icons/VerticalLine";
import MainLayout from "@/components/Layouts/MainLayout";
import useMenu from "@/stores/menu";
import useHeader from "@/stores/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function MasterUangJalan() {
  const { setIndex } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Data | Master Uang Jalan");
    setIndex(1, 7, 0);
  }, []);

  return (
    <MainLayout>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Uang Jalan"
            icon={<FontAwesomeIcon icon={["fas", "route"]} />}
            variant="filled"
            onClick={() => {}}
          />
          <Button
            text="Import"
            icon={<FontAwesomeIcon icon={["fas", "file-arrow-down"]} />}
            variant="outlined"
          />
          <Button
            text="Export"
            icon={<FontAwesomeIcon icon={["fas", "file-arrow-up"]} />}
            variant="outlined"
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
            { type: "text", name: "Customer Name", isSortable: true },
            { type: "text", name: "Route", isSortable: true },
            { type: "text", name: "Truck Type", isSortable: true },
            { type: "text", name: "Container Size", isSortable: true },
            { type: "text", name: "BBM", isSortable: true },
            { type: "text", name: "Toll", isSortable: true },
            { type: "text", name: "Buruh", isSortable: true },
            { type: "text", name: "Meal", isSortable: true },
            { type: "text", name: "Etc.", isSortable: true },
            { type: "text", name: "Grand Total", isSortable: true },
            { type: "text", name: "Description" },
          ]}
          records={[
            [
              false,
              new Date(),
              "Customer Name",
              "Tangerang - Jakarta",
              "Dry",
              "20 ft",
              "Rp1.000.00",
              "Rp1.000.00",
              "Rp1.000.00",
              "Rp1.000.00",
              "Rp1.000.00",
              "Rp5.000.00",            
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
