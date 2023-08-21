import React from "react";
import Button from "@/components/Elements/Button";
import Menu from "@/components/Elements/Menu";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import useModal from "@/stores/modal";
import Modal from "@/components/Elements/Modal";
import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import DatePicker from "@/components/Elements/DatePicker";
import TextArea from "@/components/Elements/TextArea";
import Radio from "@/components/Elements/Radio";
import Upload from "@/components/Elements/Upload";

const BarChart = dynamic(
  () => import("@/components/Elements/BarChart"),
  {ssr: false}
);

export default function Home() {
  const { setModal } = useModal();
  const [recordSelected, setRecordSelected] = React.useState<number | undefined>(undefined);

  return (
    <>
      <div className="flex gap-4 p-2">
        <Button
          text="Add New Group"
          icon={<FontAwesomeIcon icon={["fas", "user-plus"]}
          className="text-solitude" />}
          onClick={() => setModal(
            <Modal className="w-1/3" title="Add New Group" type="info" onDone={() => setModal(null)}>
              <form className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <Label name="Name" className="basis-1/3" />
                  <InputText placeholder="Enter Customer Group Name" className="basis-2/3" />
                </div>
                <div className="flex items-center gap-4">
                  <Label name="Description" className="basis-1/3" />
                  <InputText placeholder="Enter Description" className="basis-2/3" />
                </div>
              </form>
            </Modal>
          )}
        />
        <Button
          variant="outlined"
          text="Import"
          icon={<FontAwesomeIcon icon={["fas", "file-arrow-down"]} />}
          onClick={() => setModal(
            <Modal className="w-1/3" title="Import Data" type="import" onDone={() => setModal(null)}>
              <form className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <Label name="File type" className="basis-1/3" />
                  <Select
                    value={0}
                    options={["Excel"]}
                    onChange={() => {}}
                    className="basis-2/3"
                  />
                </div>
              </form>
            </Modal>
          )}
        />
      </div>
      <div className="bg-primary w-2/12 py-3">
        <Menu items={[
          {name: "Dashboard", icon: <FontAwesomeIcon icon={["fas", "chart-simple"]} />},
          {name: "Master Data", icon: <FontAwesomeIcon icon={["fas", "database"]} />, subItems: [
            {name: "Business Partner", subSubItems: [
              {name: "Customer Group"},
              {name: "Customers"},
            ]},
            {name: "Master Route"},
            {name: "Master Port"}
          ]},
          {name: "Marketing", icon: <FontAwesomeIcon icon={["fas", "chart-line"]} />},
          {name: "Operational", icon: <FontAwesomeIcon icon={["fas", "gear"]} />},
          {name: "Purchasing", icon: <FontAwesomeIcon icon={["fas", "cart-shopping"]} />},
          {name: "Inventory", icon: <FontAwesomeIcon icon={["fas", "home"]} />},
          {name: "Finance & Accounting", icon: <FontAwesomeIcon icon={["fas", "money-bill"]} />, subItems: [
            {name: "Business Partner"},
            {name: "Master Route"},
            {name: "Master Port"}
          ]},
          {name: "HRD", icon: <FontAwesomeIcon icon={["fas", "users"]} />}
        ]} />
      </div>
      <div className="w-2/5">
        <BarChart datas={[
          {x: "January", firstValue: 220},
          {x: "February", firstValue: 170},
          {x: "March", firstValue: 160},
          {x: "April", firstValue: 180}
        ]} />
      </div>
      <div className="p-2">
        <Search />
      </div>
      <div className="p-2">
        <Table
          fields={[
            {type: "option"},
            {name: "Date", type: "date"},
            {name: "Link", type: "link"},
            {name: "Text", type: "text"},
            {name: "Status", type: "status"},
            {name: "Sortable", type: "text", isSortable: true},
            {name: "Group", type: "group", fields: [
              {name: "Sub Date", type: "date"},
              {name: "Sub Link", type: "link"},
              {name: "Sub Text", type: "text"},
              {name: "Sub Status", type: "status"},
              {name: "Sub Sortable", type: "text", isSortable: true},
            ]}
          ]}
          records={[
            [recordSelected === 0, new Date(), "CGC0001", "Hadi Yusuf Al Ghifari", true, "XXX", [
              new Date(), "CGC0001", "Hadi Yusuf Al Ghifari", true, "XXX"
            ]],
            [recordSelected === 1, new Date(), "CGC0002", "Rina Setiawan", true, "XXX", [
              new Date(), "CGC0002", "Rina Setiawan", true, "XXX"
            ]],
            [recordSelected === 2, new Date(), "CGC0003", "Aditya Wardhana", false, "XXX", [
              new Date(), "CGC0003", "Aditya Wardhana", false, "XXX"
            ]],
            [recordSelected === 3, new Date(), "CGC0004", "Desi Rahayu", false, "XXX", [
              new Date(), "CGC0004", "Desi Rahayu", false, "XXX"
            ]],
            [recordSelected === 4, new Date(), "CGC0005", "Maya Putri", true, "XXX", [
              new Date(), "CGC0005", "Maya Putri", true, "XXX"
            ]],
            [recordSelected === 5, new Date(), "CGC0006", "Adi Kusuma", false, "XXX", [
              new Date(), "CGC0006", "Adi Kusuma", false, "XXX"
            ]]
          ]}
          onOptionClicked={(recordIndex, _, value) => {
            if (value) setRecordSelected(recordIndex);
          }}
        />
      </div>
      <div className="p-2 flex flex-col gap-4">
        <Label name="Label" />
        <div className="flex items-center gap-4">
          <Label name="Text" />
          <InputText placeholder="Text" />
        </div>
        <div className="flex items-center gap-4">
          <Label name="Disabled Text" />
          <InputText placeholder="Disabled Text" disabled={true} />
        </div>
        <div className="flex items-center gap-4">
          <Label name="Date Picker" />
          <DatePicker />
        </div>
        <div className="flex items-center gap-4">
          <Label name="Text Area" />
          <TextArea placeholder="Text Area" />
        </div>
        <div className="flex items-center gap-4">
          <Label name="Select" />
          <Select
            value={0}
            options={["2023", "2022", "2021", "2020"]}
            onChange={(value) => {}}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label name="Radio" />
          <Radio name="option" value="Option 1" />
          <Radio name="option" value="Option 2" />
        </div>
        <div className="flex items-center gap-4">
          <Label name="Upload" />
          <Upload placeholder="Choose file" />
        </div>
      </div>
    </>
  );
}
