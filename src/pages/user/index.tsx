import Button from "@/components/Elements/Button";
import Modal from "@/components/Elements/Modal";
import Search from "@/components/Elements/Search";
import Select from "@/components/Elements/Select";
import Table from "@/components/Elements/Table";
import useModal from "@/stores/modal";
import useMenu from "@/stores/menu";
import React from "react";
import VerticalLine from "@/components/Icons/VerticalLine";
import useHeader from "@/stores/header";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import { PersonFillAdd, Pencil, Trash } from "react-bootstrap-icons";
import { useRouter } from "next/router";

function Save() {
  return (
    <Modal title="Add New Customer Group" type="save" onDone={() => {}}>
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="Create Date" />
            <InputText placeholder="" disabled className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Group Code" />
            <InputText placeholder="" disabled className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Name" />
            <InputText placeholder="Enter group name" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Description" />
            <InputText
              placeholder="Enter group description"
              className="basis-2/3"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default function userManagement() {
  const router = useRouter();
  const { setActive } = useMenu();
  const { setModal } = useModal();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("User Management");
    setActive(5, 0, 0);
  }, []);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search User ID" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New User"
            icon={<PersonFillAdd />}
            variant="filled"
            onClick={() => setModal(<Save />)}
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
            { type: "link", name: "User ID", isSortable: true },
            { type: "text", name: "User Name", isSortable: true },
            { type: "text", name: "Email", isSortable: true },
            { type: "text", name: "Position", isSortable: true },
            { type: "text", name: "Department", isSortable: true },
            { type: "tool", name: "Action" },
            { type: "text", name: "Description" },
          ]}
          records={[
            [
              false,
              "0001",
              "gtap-dev",
              "gtap@gtap.com",
              "Dev",
              "Department",
              <Button
                text="Access"
                variant="filled"
                onClick={() => router.push("/user/access")}
                className="!px-3 !py-2 !text-xs"
              />,
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
