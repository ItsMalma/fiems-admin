import Button from "@/components/Elements/Button";
import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import Modal from "@/components/Elements/Modal";
import Radio from "@/components/Elements/Radio";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import VerticalLine from "@/components/Icons/VerticalLine";
import MainLayout from "@/components/Layouts/MainLayout";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function Save() {

  const [type, setType] = React.useState(0);

  return (
    <Modal
      className="w-2/5"
      title="Add New Product"
      type="save"
      onDone={() => {}}
    >
      <form>
        <div className="flex flex-col gap-3">
        <div className="flex gap-6 items-center justify-between">
            <Label name="Type Barang"/>
            <Radio name="barang" value="Product" onChange={() => setType(0)}/>
            <Radio name="barang" value="SparePart" onChange={() => setType(1)}/>
            <Radio name="barang" value="ATK" onChange={() => setType(2)}/>
          </div>
          <hr></hr>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Create Date"/>
            <InputText 
              placeholder=""
              disabled
              className="basis-2/3"
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="SKU Code"/>
            <InputText 
              placeholder="Enter SKU code"
              className="basis-2/3"
            />
          </div>
          {type == 0 &&
          <>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Product Category"/>
            <Select
              placeholder="Choose Category"
              options={["Direktur", "Marketing"]}
              value={-1}
              onChange={() => {}}
              className="basis-2/3"
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Product Name"/>
            <InputText 
              placeholder="Enter product name"
              className="basis-2/3"
            />
          </div>
          </>         
          }   
          {type == 1 &&
          <>
          <div className="flex gap-6 items-center justify-between">
            <Label name="SparePart Name"/>
            <InputText 
              placeholder="Enter sparepart name"
              className="basis-2/3"
            />
          </div>
          </>         
          }      
          {type == 2 &&
          <>
          <div className="flex gap-6 items-center justify-between">
            <Label name="ATK Name"/>
            <InputText 
              placeholder="Enter atk name"
              className="basis-2/3"
            />
          </div>
          </>         
          }      
        </div>
      </form>
    </Modal>
  )
}

export default function MasterProductProduct() {
  const { setModal } = useModal();
  const { setIndex } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Master Data | Master Product");
    setIndex(1, 9, 0);
  }, []);

  return (
    <MainLayout>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Product"
            icon={<FontAwesomeIcon icon={["fas", "box"]} />}
            variant="filled"
            onClick={() =>
              setModal(<Save/>)
            }
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
            { type: "link", name: "SKU Code", isSortable: true },
            { type: "text", name: "Product Category", isSortable: true },
            { type: "text", name: "Product Name", isSortable: true },
            { type: "text", name: "Satuan", isSortable: true },
          ]}
          records={[
            [
              false,
              new Date(),
              "No. Reff",
              "Category",
              "Product Name",
              "Carton",
            ],
            [
              false,
              new Date(),
              "No. Reff",
              "Category",
              "Product Name",
              "Pack",
            ],
            [
              false,
              new Date(),
              "No. Reff",
              "Category",
              "Product Name",
              "Kg",
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
