import {
  Button,
  Label,
  Modal,
  Search,
  Select,
  Table,
} from "@/components/Elements";
import {
  Form,
  FormCode,
  FormDate,
  FormSelect,
  FormText,
} from "@/components/Forms";
import { trpc } from "@/libs/trpc";
import { PortForm, portInput } from "@/server/dtos/port.dto";
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
  GeoAltFill,
} from "react-bootstrap-icons";
import { useForm } from "react-hook-form";

export function Save({ code }: { code?: string }) {
  const { setModal } = useModal();

  const methods = useForm<PortForm>({
    defaultValues: PortForm.initial,
    resolver: zodResolver(portInput),
  });
  const { reset, setValue } = methods;

  const province = methods.watch("province");
  React.useEffect(() => {
    if (!province) setValue("city", "");
  }, [province, setValue]);

  const formQuery = trpc.ports.getForm.useQuery({
    code,
    province,
  });
  React.useEffect(() => {
    if (formQuery.data?.defaultValue && reset) {
      reset(formQuery.data.defaultValue, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [formQuery.data?.defaultValue, reset]);

  const saveMutation = trpc.ports.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      code,
    });

    setModal(null);
  });

  return (
    <Modal
      title="Add New Port"
      type="save"
      onDone={onSubmit}
      isLoading={!formQuery.data}
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
            label: "Route Code",
            input: <FormCode name="code" readOnly />,
          },
          {
            type: "separator",
          },
          {
            type: "input",
            id: "province",
            label: "Province",
            input: (
              <FormSelect
                name="province"
                options={formQuery.data?.provinces ?? []}
              />
            ),
          },
          {
            type: "input",
            id: "city",
            label: "City",
            input: (
              <FormSelect
                name="city"
                options={
                  formQuery.data?.cities && province
                    ? formQuery.data?.cities
                    : []
                }
                readOnly={!province}
              />
            ),
          },
          {
            type: "input",
            id: "name",
            label: "Name",
            input: <FormText name="name" />,
          },
        ]}
      />
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
            value={""}
            className="basis-2/3"
            isSearchable
          />
        </div>
      </form>
    </Modal>
  );
}

export default function MasterPort() {
  // Gunakan store useHeader untuk merubah judul header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang active
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang lagi aktif
  const { setModal, current } = useModal();

  const { addToasts } = useToast();

  // Effect untuk mengset judul header dan menu yang active
  React.useEffect(() => {
    setTitle("Master Data | Master Port");
    setActive(0, 2, 0);
  }, [setTitle, setActive]);

  const [search, setSearch] = React.useState("");

  // State untuk menyimpan row yang di-select di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.ports.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.ports.delete.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Port" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Port"
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
            onClick={() => {}}
          />
        </div>
      </div>
      <Table
        isLoading={!tableRowsQuery.data}
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
            header: "Port Code",
            type: "code",
          },
          {
            id: "province",
            header: "Province",
            type: "text",
            isSortable: true,
          },
          {
            id: "city",
            header: "City",
            type: "text",
            isSortable: true,
          },
          {
            id: "name",
            header: "Port Name",
            type: "text",
            isSortable: true,
          },
        ]}
        search={search}
        dateRangeColumn="createDate"
        rows={tableRowsQuery.data ?? []}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada row yang dipilih di table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          // Buka modal untuk membuat port
          setModal(<Save code={tableRowsQuery.data[selectedRowIndex].code} />);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada row yang dipilih di table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          // Hapus port yang dipilih di table
          await deleteMutation
            .mutateAsync({
              code: tableRowsQuery.data[selectedRowIndex].code,
            })
            .catch((err) => {
              if (err instanceof TRPCClientError) {
                addToasts({ type: "error", message: err.message });
              }
            });

          // Karena port yang dipilih telah dihapus, maka hapus pilihan sebelumnya
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
