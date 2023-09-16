import React from "react";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { useRouter } from "next/router";
import Search from "@/components/Elements/Search";
import Button from "@/components/Elements/Button";
import Modal from "@/components/Elements/Modal";
import Label from "@/components/Elements/Label";
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
import lodash from "lodash";
import PrintProvider from "@/components/Layouts/PrintProvider";

export function Export() {
  return (
    <Modal className="w-2/5" title="Export Data" type="save" onDone={() => {}}>
      <form>
        <div className="flex gap-6 items-center justify-between">
          <Label name="File Type" />
          <Select
            placeholder="Choose city"
            options={[{ label: "Excel", value: "excel" }]}
            value={1}
            onChange={() => {}}
            className="basis-2/3"
          />
        </div>
      </form>
    </Modal>
  );
}

export default function Customers() {
  const { setActive } = useMenu();
  const { setTitle } = useHeader();
  React.useEffect(() => {
    setTitle("Master Data | Customers");
    setActive(1, 0, 1);
  }, []);

  const { setModal } = useModal();

  const router = useRouter();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Customer Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Customer"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() =>
              router.push("/master_data/business_partner/customers/save")
            }
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
                { label: "Customer Type", value: "customerType" },
                { label: "Customer Code", value: "customerCode" },
                { label: "Name", value: "name" },
                { label: "Group", value: "group" },
                { label: "Address", value: "address" },
                { label: "City", value: "city" },
                { label: "Country", value: "country" },
                { label: "Telephone", value: "telephone" },
                { label: "Fax", value: "fax" },
                { label: "Email", value: "email" },
                {
                  label: "Purchasing Information",
                  value: "purchasingInformation",
                },
                {
                  label: "Operation Information",
                  value: "operationInformation",
                },
                { label: "Finance Information", value: "financeInformation" },
                {
                  label: "Description Information",
                  value: "descriptionInformation",
                },
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
              defaultValue={{ label: "Show 10 entries", value: 10 }}
              onChange={() => {}}
              isSearchable
            />
          </div>
        </div>
        <Table
          fields={[
            { type: "option" },
            {
              type: "date",
              name: "Create Date",
              isSortable: true,
            },
            {
              type: "text",
              name: "Customer Type",
              isSortable: true,
            },
            {
              type: "link",
              name: "Customer Code",
              isSortable: true,
            },
            {
              type: "text",
              name: "Name",
              isSortable: true,
            },
            {
              type: "text",
              name: "Group",
              isSortable: true,
            },
            {
              type: "text",
              name: "Address",
              isSortable: true,
            },
            {
              type: "text",
              name: "City",
              isSortable: true,
            },
            {
              type: "text",
              name: "Country",
              isSortable: true,
            },
            {
              type: "text",
              name: "Telephone",
              isSortable: true,
            },
            {
              type: "text",
              name: "Fax",
              isSortable: true,
            },
            {
              type: "text",
              name: "Email",
              isSortable: true,
            },
            {
              type: "group",
              name: "Purchasing",
              isSortable: true,
              fields: [
                { type: "text", name: "Phone Number" },
                { type: "text", name: "Telephone" },
                { type: "text", name: "Fax" },
                { type: "text", name: "Email" },
              ],
            },
            {
              type: "group",
              name: "Operation",
              isSortable: true,
              fields: [
                { type: "text", name: "Phone Number" },
                { type: "text", name: "Telephone" },
                { type: "text", name: "Fax" },
                { type: "text", name: "Email" },
              ],
            },
            {
              type: "group",
              name: "Finance",
              isSortable: true,
              fields: [
                { type: "text", name: "Phone Number" },
                { type: "text", name: "Telephone" },
                { type: "text", name: "Fax" },
                { type: "text", name: "Email" },
              ],
            },
            {
              type: "text",
              name: "Description",
            },
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
