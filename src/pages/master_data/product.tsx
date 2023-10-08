import React from "react";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import Modal from "@/components/Elements/Modal";
import Label from "@/components/Elements/Label";
import DatePicker from "@/components/Elements/DatePicker";
import InputText from "@/components/Elements/InputText";
import InputNumber from "@/components/Elements/InputNumber";
import SelectInput from "@/components/Elements/Forms/SelectInput";
import Select from "@/components/Elements/Select";
import Search from "@/components/Elements/Search";
import Button from "@/components/Elements/Button";
import {
  BoxFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
  Pencil,
  Trash,
  Calendar,
  Filter,
} from "react-bootstrap-icons";
import moment from "moment";
import Table from "@/components/Elements/NewTable";
import { ProductOutput, SaveProductInput } from "@/models/product.model";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  useProducts,
  useNextProductSKUCode,
} from "@/api/products";
import { useProductCategories } from "@/api/product_categories";
import { FormikProvider, useFormik } from "formik";
import { saveProductSchema } from "@/validations/product.validation";
import { formikValidateWithZod } from "@/libs/error";
import { useCustomers } from "@/api/customers";
import {
  AtkUnits,
  ItemTypes,
  ProductUnits,
  SparepartUnits,
  toTitleCase,
} from "@/libs/utils";

type SaveProps = {
  product?: ProductOutput;
};

export function Save(props: SaveProps) {
  // Menggunakan function setModal dari store useModal
  const { setModal } = useModal();

  // Gunakan formik
  const formik = useFormik<SaveProductInput>({
    initialValues: {
      type: props.product?.type ?? "product",
      category: props.product?.category?.reff,
      name: props.product?.name ?? "",
      unit: props.product?.unit ?? "carton",
    },
    onSubmit: async (values) => {
      // Cek apakah product ada di props
      // Jika ada maka lakukan update saja
      // Jika tidak ada maka lakukan penambahan
      if (props.product) {
        await updateProduct(props.product.skuCode, values);
      } else {
        await createProduct(values);
      }

      // Tutup modal
      setModal(null);
    },
    validate: formikValidateWithZod(saveProductSchema),
  });

  // Decomposition formik
  const { handleSubmit, handleChange, values, errors, validateForm } = formik;

  // Pemanggilan api untuk mendapatkan semua shipping
  const { productCategories, error: productCategoriesError } =
    useProductCategories();

  // Effect untuk mengvalidasi form
  React.useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Memo untuk menampung create date
  const defaultCreateDate = React.useMemo(
    () =>
      props.product?.createDate
        ? moment(props.product.createDate, "DD/MM/YYYY").toDate()
        : new Date(),
    [props.product?.createDate]
  );

  // Panggil api untuk mendapatkan sku code product selanjutnya
  const { skuCode, error: skuCodeError } = useNextProductSKUCode();

  // State untuk menyimpan default value dari sku code
  const [defaultSKUCode, setDefaultSKUCode] = React.useState<string>();

  // Effect untuk mengset value dari default sku code
  // dimana jika product ada di props maka set dengan sku code dari product tersebut
  // tapi jika tidak ada maka set dengan sku code yang diambil dari api
  React.useEffect(() => {
    if (props.product?.skuCode) {
      setDefaultSKUCode(props.product.skuCode);
    } else if (skuCode) {
      setDefaultSKUCode(skuCode);
    }
  }, [skuCode, props.product?.skuCode]);

  // Memo untuk menyimpan unit berdasarkan type
  const units = React.useMemo(() => {
    switch (values.type) {
      case "product":
        return ProductUnits;
      case "sparepart":
        return SparepartUnits;
      case "atk":
        return AtkUnits;
    }
  }, [values.type]);

  // Cek apakah pemanggilan api untuk mendapatkan semua product category mengembalikan error
  if (productCategoriesError) {
    throw productCategoriesError;
  }

  // Cek apakah pemanggilan api untuk mendapatkan sku code selanjutnya mengalami error
  if (skuCodeError) {
    throw skuCodeError;
  }

  return (
    <Modal title="Add New Product" type="save" onDone={handleSubmit}>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex gap-6 items-center">
                <Label className="basis-1/3" name="Item Type" />
                <SelectInput
                  id="type"
                  name="type"
                  placeholder="Choose item type"
                  className="basis-2/3"
                  options={ItemTypes.map((itemType) => ({
                    label: toTitleCase(itemType),
                    value: itemType,
                  }))}
                  isSearchable
                />
              </div>
              <div className="flex gap-6 items-center">
                <div className="basis-1/3"></div>
                <p className="basis-2/3 text-statusInactive">{errors.type}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-6 items-center">
                <Label className="basis-1/3" name="Create Date" />
                <DatePicker
                  id="createDate"
                  name="createDate"
                  className="basis-2/3"
                  defaultValue={defaultCreateDate}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-6 items-center">
                <Label className="basis-1/3" name="SKU Code" />
                <InputText
                  id="skuCode"
                  name="skuCode"
                  className="basis-2/3"
                  defaultValue={defaultSKUCode}
                  readOnly
                />
              </div>
            </div>
            {values.type === "product" && (
              <div className="flex flex-col gap-1">
                <div className="flex gap-6 items-center">
                  <Label className="basis-1/3" name="Product Category" />
                  <SelectInput
                    id="category"
                    name="category"
                    placeholder="Choose product category"
                    className="basis-2/3"
                    options={
                      productCategories
                        ? productCategories.map((productCategory) => ({
                            label: `${productCategory.reff} - ${productCategory.name}`,
                            value: productCategory.reff,
                          }))
                        : []
                    }
                    isSearchable
                  />
                </div>
                <div className="flex gap-6 items-center">
                  <div className="basis-1/3"></div>
                  <p className="basis-2/3 text-statusInactive">
                    {errors.category}
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className="flex gap-6 items-center">
                <Label className="basis-1/3" name="Name" />
                <InputText
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  className="basis-2/3"
                  value={values.name}
                  onChange={handleChange}
                  isError={!!errors.name}
                />
              </div>
              <div className="flex gap-6 items-center">
                <div className="basis-1/3"></div>
                <p className="basis-2/3 text-statusInactive">{errors.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-6 items-center">
                <Label className="basis-1/3" name="Unit" />
                <SelectInput
                  id="unit"
                  name="unit"
                  placeholder="Choose unit"
                  className="basis-2/3"
                  options={
                    units
                      ? units.map((unit) => ({
                          label: toTitleCase(unit),
                          value: unit,
                        }))
                      : []
                  }
                  isSearchable
                />
              </div>
              <div className="flex gap-6 items-center">
                <div className="basis-1/3"></div>
                <p className="basis-2/3 text-statusInactive">{errors.unit}</p>
              </div>
            </div>
          </div>
        </form>
      </FormikProvider>
    </Modal>
  );
}

export default function MasterProductProduct() {
  // Gunakan store useHeader untuk merubah judul header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang active
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang lagi aktif
  const { setModal, current } = useModal();

  // Effect untuk mengset judul header dan menu yang active
  React.useEffect(() => {
    setTitle("Master Data | Master Product");
    setActive(1, 9, 0);
  }, [setTitle, setActive]);

  // State untuk menyimpan row yang di-select di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  // Pemanggilan api untuk mendapatkan semua product
  const { products, isLoading, error } = useProducts([current]);

  // Cek apakah pemanggilan api untuk mendapatkan semua product
  // masih loading atau data masih belum didapatkan
  if (isLoading || !products) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua product menghasilkan error
  if (error) {
    throw error;
  }

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Product"
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
            id: "skuCode",
            header: "SKU Code",
            type: "text",
            isSortable: true,
          },
          {
            id: "category.name",
            header: "Product Category",
            type: "text",
            isSortable: true,
          },
          {
            id: "name",
            header: "Product",
            type: "text",
            isSortable: true,
          },
          {
            id: "unit",
            header: "Unit",
            type: "text",
          },
        ]}
        rows={products.map((product) => ({
          ...product,
          unit: toTitleCase(product.unit),
        }))}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Buka modal untuk membuat product
          setModal(<Save product={products[selectedRowIndex]} />);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Hapus product yang dipilih di table
          await deleteProduct(products[selectedRowIndex].skuCode);

          // Karena product yang dipilih telah dihapus, maka hapus pilihan sebelumnya
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
