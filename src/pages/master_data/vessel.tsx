import React from "react";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import {
  BoxFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import moment from "moment";
import { Button, Label, Modal, Search, Select, Table } from "@/components/Elements";
import { Form, FormCounter, FormDate, FormSelect, FormText } from "@/components/Forms";
import { useForm } from "react-hook-form";
import { VesselForm } from "@/server/dtos/vessel.dto";
import { trpc } from "@/libs/trpc";

export function Save({ id }: { id?: string }) {
  // Menggunakan function setModal dari store useModal
  const { setModal } = useModal();

  const methods = useForm<VesselForm>({
    defaultValues: VesselForm.initial,
  });
  const { reset, setValue } = methods;
  const formQuery = trpc.vessel.getForm.useQuery({
    id
  });
  React.useEffect(() => {
    if (formQuery.data?.defaultValue && reset) {
      reset(formQuery.data.defaultValue, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [formQuery.data?.defaultValue, reset]);

  const saveMutation = trpc.vessel.save.useMutation();

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
            type: "input",
            id: "shipping",
            label: "Shipping",
            input: <FormSelect name="shipping" options={formQuery.data?.shippings ?? []}/>,
          },
          {
            type: "separator",
          },
          {
            type: "input",
            id: "name",
            label: "Vessel Name",
            input: <FormText name="name" />,
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
            input: (
              <FormSelect
                name="unit"
                options={VesselForm.unitOptions}
              />
            ),
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
            value={null}
            className="basis-2/3"
            isSearchable
          />
        </div>
      </form>
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

  // Effect untuk mengset judul header dan menu yang active
  React.useEffect(() => {
    setTitle("Master Data | Master Vessel");
    setActive(1, 5, 0);
  }, [setTitle, setActive]);

  // State untuk menyimpan row yang di-select di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.vessel.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.vessel.delete.useMutation();
  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
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
            onClick={() => setModal(<Export />)}
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
          await deleteMutation.mutateAsync({
            id: tableRowsQuery.data[selectedRowIndex].id,
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
