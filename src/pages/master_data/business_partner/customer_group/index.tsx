import { Button, Modal, Search, Table } from "@/components/Elements";
import { Form, FormCode, FormDate, FormText } from "@/components/Forms";
import { trpc } from "@/libs/trpc";
import {
  CustomerGroupForm,
  customerGroupInput,
} from "@/server/dtos/customerGroup.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import React from "react";
import {
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  PersonFillAdd,
} from "react-bootstrap-icons";
import { useForm } from "react-hook-form";

function Save({ code }: { code?: string }) {
  const { setModal } = useModal();

  const saveMutation = trpc.customerGroups.save.useMutation();

  const methods = useForm<CustomerGroupForm>({
    values: CustomerGroupForm.initial,
    resolver: zodResolver(customerGroupInput),
  });
  const { reset } = methods;

  const defaultValuesQuery = trpc.customerGroups.getDefaultValues.useQuery({
    code,
  });
  React.useEffect(() => {
    if (defaultValuesQuery.data && reset) {
      reset(defaultValuesQuery.data, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [defaultValuesQuery.data, reset]);

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      code,
      name: data.name,
      description: data.description,
    });

    setModal(null);
  });

  return (
    <Modal
      title="Add New Customer Group"
      type="save"
      onDone={onSubmit}
      isLoading={!defaultValuesQuery.data}
    >
      <Form
        methods={methods}
        singleTab
        controls={[
          {
            type: "input",
            id: "createDate",
            label: "Create Date",
            input: <FormDate name="createDate" readOnly />,
          },
          {
            type: "input",
            id: "code",
            label: "Group Code",
            input: <FormCode name="code" readOnly />,
          },
          {
            type: "separator",
          },
          {
            type: "input",
            id: "name",
            label: "Name",
            input: <FormText name="name" />,
          },
          {
            type: "input",
            id: "description",
            label: "Description",
            input: <FormText name="description" />,
          },
        ]}
      />
    </Modal>
  );
}

export default function CustomerGroupPage() {
  // Gunakan store useHeader untuk merubah judul header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang active
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang lagi aktif
  const { setModal, current } = useModal();

  const { addToasts } = useToast();

  // Effect untuk mengset judul header dan menu yang active
  React.useEffect(() => {
    setTitle("Master Data | Customer Group");
    setActive(0, 0, 0);
  }, [setTitle, setActive]);

  const [search, setSearch] = React.useState("");

  // State untuk menyimpan row yang di-select di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const deleteMutation = trpc.customerGroups.delete.useMutation();

  const findQuery = trpc.customerGroups.findAll.useQuery();
  React.useEffect(() => {
    findQuery.refetch();
  }, [current, findQuery]);

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white dark:bg-gray-700 rounded-2xl shadow-sm">
        <Search
          placeholder="Search Customer Group"
          onChange={(content) => {
            setSearch(content);
          }}
        />
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
        className="p-[18px] 2xl:p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-sm"
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
        search={search}
        dateRangeColumn="createDate"
        isLoading={!findQuery.data}
        rows={findQuery.data ?? []}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined || findQuery.data === undefined) {
            return;
          }

          // Buka modal untuk membuat customer group
          setModal(<Save code={findQuery.data[selectedRowIndex].code} />);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined || findQuery.data === undefined) {
            return;
          }

          // Hapus customer group yang dipilih di table
          await deleteMutation
            .mutateAsync(findQuery.data[selectedRowIndex].code)
            .catch((err) => {
              if (err instanceof TRPCClientError) {
                addToasts({ type: "error", message: err.message });
              }
            });

          // Karena customer group yang dipilih telah dihapus, maka hapus pilihan sebelumnya
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
