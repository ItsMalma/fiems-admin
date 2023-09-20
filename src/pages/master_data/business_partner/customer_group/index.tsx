import React from "react";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import Modal from "@/components/Elements/Modal";
import Label from "@/components/Elements/Label";
import DatePicker from "@/components/Elements/DatePicker";
import InputText from "@/components/Elements/InputText";
import Search from "@/components/Elements/Search";
import Button from "@/components/Elements/Button";
import {
  PersonFillAdd,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/libs/fetcher";
import Table from "@/components/Elements/NewTable";
import { CustomerGroup } from "@/models/CustomerGroup";

function useNextCustomerGroupCode() {
  const { data, error, isLoading } = useSWR(
    "/api/customer_groups/next",
    fetcher
  );

  return {
    code: data === undefined ? undefined : data.data,
    error,
    isLoading,
  };
}

function useCustomerGroups(deps: React.DependencyList) {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/customer_groups",
    fetcher
  );

  React.useEffect(() => {
    mutate();
  }, deps);

  return {
    groups: data === undefined ? undefined : data.data,
    error,
    isLoading,
  };
}

type SaveInputs = {
  createDate: string;
  groupCode: string;
  name: string;
  description?: string;
};

type SaveProps = {
  customer?: CustomerGroup;
};

export function Save(props: SaveProps) {
  const { setModal } = useModal();

  const formRef = React.useRef<HTMLFormElement>(null);

  const { register, handleSubmit, formState } = useForm<SaveInputs>();

  const onSubmit: SubmitHandler<SaveInputs> = async (data) => {
    await fetch(
      props.customer
        ? `/api/customer_groups/${props.customer.code}`
        : "/api/customer_groups",
      {
        method: props.customer ? "PUT" : "POST",
        body: JSON.stringify({
          name: data.name,
          description: data.description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setModal(null);
  };

  const defaultCreateDate = React.useMemo(
    () => props.customer?.createDate ?? new Date(),
    []
  );

  const { code, error, isLoading } = useNextCustomerGroupCode();

  const [defaultGroupCode, setDefaultGroupCode] = React.useState<string>();
  React.useEffect(() => {
    if (props.customer?.code) {
      setDefaultGroupCode(props.customer.code);
    } else {
      setDefaultGroupCode(code);
    }
  }, [code, props.customer?.code]);

  if (isLoading) {
    return <></>;
  }
  if (error) {
    throw error;
  }

  return (
    <Modal
      title="Add New Customer Group"
      type="save"
      onDone={() => handleSubmit(onSubmit)()}
    >
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="Create Date" />
            <DatePicker
              className="basis-2/3"
              defaultValue={moment(defaultCreateDate).format("DD/MM/YYYY")}
              readOnly
              {...register("createDate", {
                required: "Please filled this input",
              })}
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Group Code" />
            <InputText
              className="basis-2/3"
              defaultValue={defaultGroupCode}
              readOnly
              {...register("groupCode")}
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Name" />
            <InputText
              placeholder="Enter Customer Group Name"
              className="basis-2/3"
              error={formState.errors.name?.message?.toString()}
              defaultValue={props.customer?.name}
              {...register("name", { required: "Please filled this input" })}
            />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Description" />
            <InputText
              placeholder="Enter Description"
              className="basis-2/3"
              error={formState.errors.description?.message?.toString()}
              defaultValue={props.customer?.description}
              {...register("description")}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default function CustomerGroupPage() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();
  const { setModal, current } = useModal();

  React.useEffect(() => {
    setTitle("Master Data | Customer Group");
    setActive(1, 0, 0);
  }, []);

  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const { groups, isLoading, error } = useCustomerGroups([current]);

  if (isLoading) {
    return <></>;
  }
  if (error) {
    throw error;
  }

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Group Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Group"
            icon={<PersonFillAdd />}
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
          />
        </div>
      </div>
      <Table
        className="p-[18px] 2xl:p-6 bg-white rounded-2xl shadow-sm"
        isSelectable
        columns={[
          {
            id: "createDate",
            header: "Create Date",
            type: "date",
            isSortable: true,
          },
          {
            id: "code",
            header: "Group Code",
            type: "code",
          },
          {
            id: "name",
            header: "Name",
            type: "text",
            isSortable: true,
          },
          {
            id: "description",
            header: "Description",
            type: "text",
            isSortable: true,
          },
        ]}
        rows={groups}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          if (selectedRowIndex === undefined) {
            return;
          }
          setModal(
            <Save customer={groups[selectedRowIndex!] as CustomerGroup} />
          );
        }}
        onDelete={async () => {
          if (selectedRowIndex === undefined) {
            return;
          }
          const customer = groups[selectedRowIndex] as CustomerGroup;
          await fetch(`/api/customer_groups/${customer.code}`, {
            method: "DELETE",
          });
          setSelectedRowIndex(undefined);
          setModal(null);
        }}
      />
    </>
  );
}
