import React from "react";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import Modal from "@/components/Elements/Modal";
import Label from "@/components/Elements/Label";
import DatePicker from "@/components/Elements/DatePicker";
import InputText from "@/components/Elements/InputText";
import SelectInput from "@/components/Elements/Forms/SelectInput";
import Select from "@/components/Elements/Select";
import Search from "@/components/Elements/Search";
import Button from "@/components/Elements/Button";
import {
  BookmarkPlusFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import moment from "moment";
import Table from "@/components/Elements/NewTable";
import {
  ProductCategoryOutput,
  SaveProductCategoryInput,
} from "@/models/productCategory.model";
import {
  createProductCategory,
  deleteProductCategory,
  updateProductCategory,
  useProductCategories,
  useNextProductCategoryReff,
} from "@/api/product_categories";
import { FormikProvider, useFormik } from "formik";
import { saveProductCategorySchema } from "@/validations/productCategory.validation";
import { formikValidateWithZod } from "@/libs/error";

type SaveProps = {
  productCategory?: ProductCategoryOutput;
};

export function Save(props: SaveProps) {
  // Gunakan formik
  const formik = useFormik<SaveProductCategoryInput>({
    initialValues: {
      name: props.productCategory?.name ?? "",
    },
    onSubmit: async (values) => {
      // Cek apakah product category ada di props
      // Jika ada maka lakukan update saja
      // Jika tidak ada maka lakukan penambahan
      if (props.productCategory) {
        await updateProductCategory(props.productCategory.reff, values);
      } else {
        await createProductCategory(values);
      }

      // Tutup modal
      setModal(null);
    },
    validate: formikValidateWithZod(saveProductCategorySchema),
  });

  // Decomposition formik
  const { handleSubmit, handleChange, values, errors, validateForm } = formik;

  // Effect untuk mengvalidasi form
  React.useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Menggunakan function setModal dari store useModal
  const { setModal } = useModal();

  // Memo untuk menampung create date
  const defaultCreateDate = React.useMemo(
    () =>
      props.productCategory?.createDate
        ? moment(props.productCategory.createDate, "DD/MM/YYYY").toDate()
        : new Date(),
    [props.productCategory?.createDate]
  );

  // Panggil api untuk mendapatkan reff product category selanjutnya
  const { reff, error, isLoading } = useNextProductCategoryReff();

  // State untuk menyimpan default value dari reff product category
  const [defaultReffCategory, setDefaultReffCategory] =
    React.useState<string>();

  // Effect untuk mengset value dari default product category reff
  // dimana jika product category ada di props maka set dengan reff product category tersebut
  // tapi jika tidak ada maka set dengan reff yang diambil dari api
  React.useEffect(() => {
    if (props.productCategory?.reff) {
      setDefaultReffCategory(props.productCategory.reff);
    } else if (reff) {
      setDefaultReffCategory(reff);
    }
  }, [reff, props.productCategory?.reff]);

  // Cek apakah pemanggilan api untuk mendapatkan reff product category selanjutnya masih loading
  if (isLoading) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan reff product category selanjutnya menghasilkan error
  if (error) {
    throw error;
  }

  return (
    <Modal title="Add New Product Category" type="save" onDone={handleSubmit}>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
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
                <Label className="basis-1/3" name="Reff Category" />
                <InputText
                  id="reff"
                  name="reff"
                  className="basis-2/3"
                  defaultValue={defaultReffCategory}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-6 items-center">
                <Label className="basis-1/3" name="Product Category" />
                <InputText
                  id="name"
                  name="name"
                  placeholder="Enter origin description"
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
          </div>
        </form>
      </FormikProvider>
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
            className="basis-2/3"
            isSearchable
          />
        </div>
      </form>
    </Modal>
  );
}

export default function MasterProductCategory() {
  // Gunakan store useHeader untuk merubah judul header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang active
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang lagi aktif
  const { setModal, current } = useModal();

  // Effect untuk mengset judul header dan menu yang active
  React.useEffect(() => {
    setTitle("Master Data | Master Product Category");
    setActive(1, 8, 0);
  }, [setTitle, setActive]);

  // State untuk menyimpan row yang di-select di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  // Pemanggilan api untuk mendapatkan semua product category
  const { productCategories, isLoading, error } = useProductCategories([
    current,
  ]);

  // Cek apakah pemanggilan api untuk mendapatkan semua product category
  // masih loading atau data masih belum didapatkan
  if (isLoading || !productCategories) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua productCategory menghasilkan error
  if (error) {
    throw error;
  }

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search ProductCategory Reff" />
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
            id: "reff",
            header: "Reff Category",
            type: "code",
            isSortable: true,
          },
          {
            id: "name",
            header: "Product Category",
            type: "text",
            isSortable: true,
          },
        ]}
        rows={productCategories}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Buka modal untuk membuat product category
          setModal(
            <Save productCategory={productCategories[selectedRowIndex]} />
          );
        }}
        onDelete={async () => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Hapus product category yang dipilih di table
          await deleteProductCategory(productCategories[selectedRowIndex].reff);

          // Karena product category yang dipilih telah dihapus, maka hapus pilihan sebelumnya
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
