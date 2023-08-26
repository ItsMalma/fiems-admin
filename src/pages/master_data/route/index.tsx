import Button from "@/components/Elements/Button";
import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import Modal from "@/components/Elements/Modal";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import VerticalLine from "@/components/Icons/VerticalLine";
import MainLayout from "@/components/Layouts/MainLayout";
import useMenu from "@/stores/menu";
import useHeader from "@/stores/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useModal from "@/stores/modal";

export default function MasterRoute() {
  const { setModal } = useModal();
  const { setTitle } = useHeader();
  const { setIndex } = useMenu();

  React.useEffect(() => {
    setTitle("Master Data | Master Route");
    setIndex(1, 1, 0);
  }, []);

  return (
    <MainLayout>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Route"
            icon={<FontAwesomeIcon icon={["fas", "route"]} />}
            variant="filled"
            onClick={() =>
              setModal(
                <Modal
                  className="w-1/4"
                  title="Add New Route"
                  type="save"
                  onDone={() => {}}
                >
                  <form className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="Create Date" />
                      <InputText
                        className="basis-2/3"
                        disabled
                        value="20/08/2023"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="Route Code" />
                      <InputText
                        className="basis-2/3"
                        disabled
                        value="RC00001"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="City" />
                      <InputText
                        className="basis-2/3"
                        value=""
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="Province" />
                      <InputText
                        className="basis-2/3"
                        value=""
                        placeholder="Enter province"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="Route Description" />
                      <InputText
                        className="basis-2/3"
                        value=""
                        placeholder="Enter route description"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label className="basis-1/3" name="" />
                      <InputText
                        className="basis-2/3"
                        value=""
                        placeholder="Enter route description"
                      />
                    </div>
                  </form>
                </Modal>
              )
            }
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
            { type: "link", name: "Route Code", isSortable: true },
            { type: "text", name: "City", isSortable: true },
            { type: "text", name: "Province", isSortable: true },
            { type: "text", name: "Description" },
          ]}
          records={[
            [
              false,
              new Date(),
              "RC00001",
              "Banten",
              "Tangerang",
              "Jakarta - Tangerang",
            ],
            [
              false,
              new Date(),
              "RC00001",
              "Banten",
              "Tangerang",
              "Jakarta - Tangerang",
            ],
            [
              false,
              new Date(),
              "RC00001",
              "Banten",
              "Tangerang",
              "Jakarta - Tangerang",
            ],
            [
              false,
              new Date(),
              "RC00001",
              "Banten",
              "Tangerang",
              "Jakarta - Tangerang",
            ],
            [
              false,
              new Date(),
              "RC00001",
              "Banten",
              "Tangerang",
              "Jakarta - Tangerang",
            ],
            [
              false,
              new Date(),
              "RC00001",
              "Banten",
              "Tangerang",
              "Jakarta - Tangerang",
            ],
            [
              false,
              new Date(),
              "RC00001",
              "Banten",
              "Tangerang",
              "Jakarta - Tangerang",
            ],
            [
              false,
              new Date(),
              "RC00001",
              "Banten",
              "Tangerang",
              "Jakarta - Tangerang",
            ],
            [
              false,
              new Date(),
              "RC00001",
              "Banten",
              "Tangerang",
              "Jakarta - Tangerang",
            ],
            [
              false,
              new Date(),
              "RC00001",
              "Banten",
              "Tangerang",
              "Jakarta - Tangerang",
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
