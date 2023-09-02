import Button from "@/components/Elements/Button";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import MainLayout from "@/components/Layouts/MainLayout";
import useMenu from "@/stores/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import VerticalLine from "@/components/Icons/VerticalLine";
import useHeader from "@/stores/header";
import lodash from "lodash";
import { useRouter } from "next/router";
import Modal from "@/components/Elements/Modal";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import useModal from "@/stores/modal";

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

export default function Customers() {
  const router = useRouter();
  const { setModal } = useModal();
  const { setIndex } = useMenu();
  const { setTitle } = useHeader();
  const [filter, setFilter] = React.useState<number[]>([]);

  React.useEffect(() => {
    setTitle("Master Data | Customers");
    setIndex(1, 0, 1);
  }, []);

  return (
    <MainLayout>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Customer Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Customer"
            icon={<FontAwesomeIcon icon={["fas", "user-plus"]} />}
            variant="filled"
            onClick={() =>
              router.push("/master_data/business_partner/customers/save")
            }
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
              options={[
                "Create Date",
                "Customer Type",
                "Customer Code",
                "Name",
                "Group",
                "Address",
                "City",
                "Country",
                "Telephone",
                "Fax",
                "Email",
                "Purchasing Information",
                "Operation Information",
                "Finance Information",
                "Description Information",
              ]}
              value={0}
              onChange={(value) =>
                setFilter(lodash.isArray(value) ? value : value ? [value] : [])
              }
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
            {
              type: "date",
              name: "Create Date",
              isSortable: true,
              isHide: !filter.includes(0),
            },
            {
              type: "text",
              name: "Customer Type",
              isSortable: true,
              isHide: !filter.includes(1),
            },
            {
              type: "link",
              name: "Customer Code",
              isSortable: true,
              isHide: !filter.includes(2),
            },
            {
              type: "text",
              name: "Name",
              isSortable: true,
              isHide: !filter.includes(3),
            },
            {
              type: "text",
              name: "Group",
              isSortable: true,
              isHide: !filter.includes(4),
            },
            {
              type: "text",
              name: "Address",
              isSortable: true,
              isHide: !filter.includes(5),
            },
            {
              type: "text",
              name: "City",
              isSortable: true,
              isHide: !filter.includes(6),
            },
            {
              type: "text",
              name: "Country",
              isSortable: true,
              isHide: !filter.includes(7),
            },
            {
              type: "text",
              name: "Telephone",
              isSortable: true,
              isHide: !filter.includes(8),
            },
            {
              type: "text",
              name: "Fax",
              isSortable: true,
              isHide: !filter.includes(9),
            },
            {
              type: "text",
              name: "Email",
              isSortable: true,
              isHide: !filter.includes(10),
            },
            {
              type: "group",
              name: "Purchasing",
              isSortable: true,
              isHide: !filter.includes(11),
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
              isHide: !filter.includes(12),
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
              isHide: !filter.includes(13),
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
              isHide: !filter.includes(14),
            },
          ]}
          records={[
            [
              false,
              new Date(),
              "Vendor",
              "CVC00001",
              "Customer Name",
              "Customer Group",
              "Customer Address No.55",
              "Tangerang",
              "Indonesia",
              "Telephone Number",
              "Fax Number",
              "email@email.com",
              [
                "081234567890",
                "Telephone Number",
                "Fax Number",
                "email@email.com",
              ],
              [
                "081234567890",
                "Telephone Number",
                "Fax Number",
                "email@email.com",
              ],
              [
                "081234567890",
                "Telephone Number",
                "Fax Number",
                "email@email.com",
              ],
            ],
            [
              false,
              new Date(),
              "Factory",
              "CFC00001",
              "Customer Name",
              "Customer Group",
              "Customer Address No.55",
              "Tangerang",
              "Indonesia",
              "Telephone Number",
              "Fax Number",
              "email@email.com",
              [
                "081234567890",
                "Telephone Number",
                "Fax Number",
                "email@email.com",
              ],
              [
                "081234567890",
                "Telephone Number",
                "Fax Number",
                "email@email.com",
              ],
              [
                "081234567890",
                "Telephone Number",
                "Fax Number",
                "email@email.com",
              ],
            ],
            [
              false,
              new Date(),
              "Shipping",
              "CSC00001",
              "Customer Name",
              "Customer Group",
              "Customer Address No.55",
              "Tangerang",
              "Indonesia",
              "Telephone Number",
              "Fax Number",
              "email@email.com",
              [
                "081234567890",
                "Telephone Number",
                "Fax Number",
                "email@email.com",
              ],
              [
                "081234567890",
                "Telephone Number",
                "Fax Number",
                "email@email.com",
              ],
              [
                "081234567890",
                "Telephone Number",
                "Fax Number",
                "email@email.com",
              ],
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
