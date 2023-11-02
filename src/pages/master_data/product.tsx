import { Button, Modal, Search, Table } from "@/components/Elements";
import {
  Form,
  FormCode,
  FormDate,
  FormSelect,
  FormText,
} from "@/components/Forms";
import { trpc } from "@/libs/trpc";
import { ProductForm, productInput } from "@/server/dtos/product.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  BookFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import { useForm } from "react-hook-form";

export function Save({ skuCode }: { skuCode?: string }) {
  const { setModal } = useModal();

  const methods = useForm<ProductForm>({
    defaultValues: ProductForm.initial,
    resolver: zodResolver(productInput),
  });
  const { reset } = methods;

  const productType = methods.watch("type");

  const formQuery = trpc.products.getForm.useQuery({
    skuCode,
    type: productType,
  });
  React.useEffect(() => {
    if (formQuery.data?.defaultValue && reset) {
      reset(formQuery.data.defaultValue, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [formQuery.data?.defaultValue, reset]);

  const saveMutation = trpc.products.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      skuCode,
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
            id: "type",
            label: "Type",
            input: <FormSelect name="type" options={ProductForm.typeOptions} />,
          },
          {
            type: "blank",
          },
          {
            type: "input",
            id: "createDate",
            label: "Create Date",
            input: <FormDate name="createDate" readOnly />,
          },
          {
            type: "input",
            id: "skuCode",
            label: "SKU Code",
            input: <FormCode name="skuCode" readOnly />,
          },
          {
            type: "separator",
          },
          {
            type: "input",
            id: "category",
            label: "Category",
            input: (
              <FormSelect
                name="category"
                options={formQuery.data?.categories ?? []}
              />
            ),
            isHidden: productType !== "Product",
          },
          {
            type: "blank",
            isHidden: productType !== "Product",
          },
          {
            type: "input",
            id: "name",
            label: "Name",
            input: <FormText name="name" />,
          },
          {
            type: "input",
            id: "unit",
            label: "Unit",
            input: (
              <FormSelect name="unit" options={formQuery.data?.units ?? []} />
            ),
          },
        ]}
      />
    </Modal>
  );
}

export default function ProductPage() {
  // Gunakan store useHeader untuk merubah judul header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang active
  const { setActive } = useMenu();

  // Effect untuk mengset judul header dan menu yang active
  React.useEffect(() => {
    setTitle("Master Data | Master Product");
    setActive(1, 9, 0);
  }, [setTitle, setActive]);

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang lagi aktif
  const { setModal, current } = useModal();

  // State untuk menyimpan row yang di-select di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  const tableRowsQuery = trpc.products.getTableRows.useQuery();
  React.useEffect(() => {
    tableRowsQuery.refetch();
  }, [current, tableRowsQuery]);

  const deleteMutation = trpc.products.delete.useMutation();

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Product" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Product"
            icon={<BookFill />}
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
            id: "type",
            header: "Type",
            type: "text",
          },
          {
            id: "skuCode",
            header: "SKU Code",
            type: "code",
            isSortable: true,
          },
          {
            id: "category",
            header: "Category",
            type: "text",
            isSortable: true,
          },
          {
            id: "name",
            header: "Name",
            type: "text",
            isSortable: true,
          },
          {
            id: "unit",
            header: "Unit",
            type: "text",
            isSortable: true,
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

          // Buka modal untuk membuat product
          setModal(
            <Save skuCode={tableRowsQuery.data[selectedRowIndex].skuCode} />
          );
        }}
        onDelete={async () => {
          // Cek apakah tidak ada row yang dipilih di table
          if (
            selectedRowIndex === undefined ||
            tableRowsQuery.data === undefined
          ) {
            return;
          }

          // Hapus product yang dipilih di table
          await deleteMutation.mutateAsync({
            skuCode: tableRowsQuery.data[selectedRowIndex].skuCode,
          });

          // Karena product yang dipilih telah dihapus, maka hapus pilihan sebelumnya
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
