import Button from "@/components/Elements/Button";
import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import Modal from "@/components/Elements/Modal";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import VerticalLine from "@/components/Icons/VerticalLine";
import useMenu from "@/stores/menu";
import useHeader from "@/stores/header";
import React from "react";
import useModal from "@/stores/modal";
import {
  GeoAltFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";
import PrintProvider from "@/components/Layouts/PrintProvider";

export function Save() {
  return (
    <Modal title="Add New Route" type="save" onDone={() => {}}>
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="Create Date" className="basis-1/3" />
            <InputText placeholder="" disabled className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Route Code" className="basis-1/3" />
            <InputText placeholder="" disabled className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="City" className="basis-1/3" />
            <Select
              placeholder="Choose city"
              options={[
                { label: "Jakarta", value: 0 },
                { label: "Tangerang", value: 1 },
                { label: "Solo", value: 2 },
              ]}
              onChange={() => {}}
              className="basis-2/3"
              isSearchable
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Province" className="basis-1/3" />
            <Select
              placeholder="Choose province"
              options={[
                { label: "Jawa Barat", value: 0 },
                { label: "DKI Jakarta", value: 1 },
                { label: "Banten", value: 2 },
              ]}
              onChange={() => {}}
              className="basis-2/3"
              isSearchable
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Description" className="basis-1/3" />
            <InputText
              placeholder="Enter route description"
              className="basis-2/3"
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <div className="basis-1/3"></div>
            <InputText placeholder="..." className="basis-2/3" />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export function Export() {
  return (
    <Modal title="Export Data" type="save" onDone={() => {}}>
      <form>
        <div className="flex gap-6 items-center justify-between">
          <Label name="File Type" />
          <Select
            placeholder="Choose file type"
            options={[{ label: "Excel", value: "excel" }]}
            onChange={() => {}}
            className="basis-2/3"
            isSearchable
          />
        </div>
      </form>
    </Modal>
  );
}

export default function MasterRoute() {
  const { setModal } = useModal();
  const { setTitle } = useHeader();
  const { setActive } = useMenu();

  const [print, setPrint] = React.useState(false)

  React.useEffect(() => {
    setTitle("Master Data | Master Route");
    setActive(1, 1, 0);
  }, []);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Route"
            icon={<GeoAltFill />}
            variant="filled"
            onClick={() => setModal(<Save />)}
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
          <Button
            text="Print"
            icon={<FileEarmarkArrowUpFill />}
            variant="outlined"
            onClick={() => setPrint(true)}
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
                { label: "Route Code", value: "routeCode" },
                { label: "City", value: "city" },
                { label: "Province", value: "province" },
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
              defaultValue={{ label: "Show 10 entries", value: 10 }}
              onChange={() => {}}
              isSearchable
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
    </>
  );
}
