import { Button, Modal, Search, Table } from "@/components/Elements";
import { Form, FormCode, FormDate, FormText } from "@/components/Forms";
import { trpc } from "@/libs/trpc";
import {
  ProductCategoryForm,
  productCategoryInput,
} from "@/server/dtos/productCategory.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  BookmarkPlusFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { TRPCClientError } from '@trpc/client';
import useToast from '@/stores/toast';

export function Save({ reff }: { reff?: string }) {
  const { setModal } = useModal();

  const methods = useForm<ProductCategoryForm>({
    defaultValues: ProductCategoryForm.initial,
    resolver: zodResolver(productCategoryInput),
  });
  const { reset } = methods;

  const formQuery = trpc.productCategories.getForm.useQuery({
    reff,
  });
  React.useEffect(() => {
    if (formQuery.data && reset) {
      reset(formQuery.data, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [formQuery.data, reset]);

  const saveMutation = trpc.productCategories.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      reff,
    });

    setModal(null);
  });

  return (
    <Modal
      title="Add New Product Category"
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
            id: "reff",
            label: "Reff",
            input: <FormCode name="reff" readOnly />,
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

export default function ProductCategoryPage() {
  // Gunakan store useHeader untuk merubah judul header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang active
  const { setActive } = useMenu();

  // Effect untuk mengset judul header dan menu yang active
  React.useEffect(() => {
    setTitle("Master Data | Master Product Category");
    setActive(1, 8, 0);
  }, [setTitle, setActive]);

  // State untuk search
  const [search, setSearch] = React.useState("");

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang lagi aktif
  const { setModal, current } = useModal();

  const { addToasts } = useToast();

  // State untuk menyimpan row yang di-select di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.productCategories.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.productCategories.delete.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Product Category" onChange={setSearch} />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Product Category"
            icon={<BookmarkPlusFill />}
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
            onClick={() => { }}
          />
          <Button
            text="Print"
            icon={<FileEarmarkArrowUpFill />}
            variant="outlined"
            onClick={() => { }}
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
            id: "reff",
            header: "Reff",
            type: "code",
          },
          {
            id: "name",
            header: "Name",
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

          // Buka modal untuk membuat product category
          setModal(<Save reff={tableRowsQuery.data[selectedRowIndex].reff} />);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada row yang dipilih di table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          // Hapus product category yang dipilih di table
          await deleteMutation.mutateAsync({
            reff: tableRowsQuery.data[selectedRowIndex].reff,
          }).catch((err) => {
            if (err instanceof TRPCClientError) {
              addToasts({ type: "error", message: err.message });
            }
          });

          // Karena product category yang dipilih telah dihapus, maka hapus pilihan sebelumnya
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
