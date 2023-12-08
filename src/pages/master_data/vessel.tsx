import { Button, Modal, Search, Table } from "@/components/Elements";
import {
  Form,
  FormCounter,
  FormDate,
  FormSelect,
  FormText,
} from "@/components/Forms";
import { trpc } from "@/libs/trpc";
import { VesselForm, vesselInput } from "@/server/dtos/vessel.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import useToast from "@/stores/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import React from "react";
import {
  BoxFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import { useForm } from "react-hook-form";

export function Save({ id }: { id?: string }) {
  // Menggunakan function setModal dari store useModal
  const { setModal } = useModal();

  const methods = useForm<VesselForm>({
    defaultValues: VesselForm.initial,
    resolver: zodResolver(vesselInput),
  });
  const { reset } = methods;

  const formQuery = trpc.vessels.getForm.useQuery({
    id,
  });
  React.useEffect(() => {
    if (formQuery.data?.value && reset) {
      reset(formQuery.data.value, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [formQuery.data?.value, reset]);

  const saveMutation = trpc.vessels.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      id,
    });

    setModal(null);
  });
  return (
    <Modal
      title="Add New Vessel"
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
            type: "separator",
          },
          {
            type: "input",
            id: "shipping",
            label: "Shipping",
            input: (
              <FormSelect
                name="shipping"
                options={formQuery.data?.shippings ?? []}
              />
            ),
          },
          {
            type: "blank",
          },
          {
            type: "input",
            id: "name",
            label: "Vessel Name",
            input: <FormText name="name" />,
          },
          {
            type: "blank",
          },
          {
            type: "input",
            id: "capacity",
            label: "Capacity",
            input: <FormCounter name="capacity" />,
          },
          {
            type: "input",
            id: "unit",
            label: "Satuan",
            input: <FormSelect name="unit" options={VesselForm.unitOptions} />,
          },
        ]}
      />
    </Modal>
  );
}

export default function MasterVessel() {
  // Gunakan store useHeader untuk merubah judul header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang active
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang lagi aktif
  const { setModal, current } = useModal();

  const { addToasts } = useToast();

  // Effect untuk mengset judul header dan menu yang active
  React.useEffect(() => {
    setTitle("Master Data | Master Vessel");
    setActive(1, 5, 0);
  }, [setTitle, setActive]);

  // State untuk search
  const [search, setSearch] = React.useState<string>("");

  // State untuk menyimpan row yang di-select di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.vessels.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.vessels.delete.useMutation();
  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Vessel" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Vessel"
            icon={<BoxFill />}
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
            onClick={() => {}}
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
            id: "shipping",
            header: "Shipping Name",
            type: "text",
            isSortable: true,
          },
          {
            id: "name",
            header: "Vessel Name",
            type: "text",
            isSortable: true,
          },
          {
            id: "capacity",
            header: "Capacity",
            type: "text",
            isSortable: true,
          },
          {
            id: "unit",
            header: "Satuan",
            type: "text",
          },
          {
            id: "status",
            header: "Status",
            type: "status",
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

          // Buka modal untuk membuat vessel
          setModal(<Save id={tableRowsQuery.data[selectedRowIndex].id} />);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada row yang dipilih di table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          // Hapus vessel yang dipilih di table
          await deleteMutation
            .mutateAsync({
              id: tableRowsQuery.data[selectedRowIndex].id,
            })
            .catch((err) => {
              if (err instanceof TRPCClientError) {
                addToasts({ type: "error", message: err.message });
              }
            });

          // Karena vessel yang dipilih telah dihapus, maka hapus pilihan sebelumnya
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
