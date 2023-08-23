import Button from "@/components/Elements/Button";
import Modal from "@/components/Elements/Modal";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import MainLayout from "@/components/Layouts/MainLayout";
import useModal from "@/stores/modal";
import useMenu from "@/stores/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import VerticalLine from "@/components/Icons/VerticalLine";

export default function CustomerGroup() {
  const { setIndex } = useMenu();
  const { setModal } = useModal();

  React.useEffect(() => {
    setIndex(1, 0, 0);
  }, []);

  return (
    <MainLayout>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Group"
            icon={<FontAwesomeIcon icon={["fas", "user-plus"]} />}
            variant="filled"
            onClick={() =>
              setModal(
                <Modal
                  className="w-1/4"
                  title="Add New Customer Group"
                  type="save"
                  onDone={() => {}}
                >
                  <form></form>
                </Modal>
              )
            }
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
              className="w-36"
              icon={<FontAwesomeIcon icon={["fas", "filter"]} />}
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
            { type: "date", name: "Create Date", isSortable: true },
            { type: "link", name: "Group Code", isSortable: true },
            { type: "text", name: "Name", isSortable: true },
            { type: "text", name: "Description" },
          ]}
          records={[
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
            [false, new Date(), "CGC00001", "Hadi Ahmad Akbar"],
          ]}
        />
        <div className="flex">
          <p className="font-medium text-gray-500">Showing 10 entries</p>
        </div>
      </div>
    </MainLayout>
  );
}
