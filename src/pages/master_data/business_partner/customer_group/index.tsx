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
import moment from "moment";
import Table from "@/components/Elements/NewTable";
import {
  CustomerGroupOutput,
  SaveCustomerGroupInput,
} from "@/models/customerGroup.model";
import {
  createCustomerGroup,
  deleteCustomerGroup,
  updateCustomerGroup,
  useCustomerGroups,
  useNextCustomerGroupCode,
} from "@/api/customer_groups";
import { useFormik } from "formik";
import { toFormikValidate } from "zod-formik-adapter";
import { saveCustomerGroupSchema } from "@/validations/customerGroup.validation";

type SaveProps = {
  customerGroup?: CustomerGroupOutput;
};

function Save(props: SaveProps) {
  // Gunakan formik
  const { handleSubmit, handleChange, values, errors } =
    useFormik<SaveCustomerGroupInput>({
      initialValues: {
        name: props.customerGroup?.name ?? "",
        description: props.customerGroup?.description ?? "",
      },
      onSubmit: async (values) => {
        // Cek apakah customer ada di props
        // Jika ada maka lakukan update saja
        // Jika tidak ada maka lakukan penambahan
        if (props.customerGroup) {
          await updateCustomerGroup(props.customerGroup.code, values);
        } else {
          await createCustomerGroup(values);
        }

        // Tutup modal
        setModal(null);
      },
      validate: toFormikValidate(saveCustomerGroupSchema),
    });

  // Menggunakan function setModal dari store useModal
  const { setModal } = useModal();

  // Ref untuk menyimpan form
  const formRef = React.useRef<HTMLFormElement>(null);

  // Memo untuk menampung create date
  const defaultCreateDate = React.useMemo(
    () =>
      props.customerGroup?.createDate
        ? moment(props.customerGroup.createDate, "DD/MM/YYYY").toDate()
        : new Date(),
    [props.customerGroup?.createDate]
  );

  // Panggil api untuk mendapatkan code customer group selanjutnya
  const { code, error, isLoading } = useNextCustomerGroupCode();

  // State untuk menyimpan default value dari code customer group
  const [defaultGroupCode, setDefaultGroupCode] = React.useState<string>();

  // Effect untuk mengset value dari default customer group code
  // dimana jika customer ada di props maka set dengan code customer tersebut
  // tapi jika tidak ada maka set dengan code yang diambil dari api
  React.useEffect(() => {
    if (props.customerGroup?.code) {
      setDefaultGroupCode(props.customerGroup.code);
    } else if (code) {
      setDefaultGroupCode(code);
    }
  }, [code, props.customerGroup?.code]);

  // Cek apakah pemanggilan api untuk mendapatkan code customer group selanjutnya masih loading
  if (isLoading) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan code customer group selanjutnya menghasilkan error
  if (error) {
    throw error;
  }

  return (
    <Modal title="Add New Customer Group" type="save" onDone={handleSubmit}>
      <form ref={formRef} onSubmit={handleSubmit}>
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
              <Label className="basis-1/3" name="Group Code" />
              <InputText
                id="code"
                name="code"
                className="basis-2/3"
                defaultValue={defaultGroupCode}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-6 items-center">
              <Label className="basis-1/3" name="Name" />
              <InputText
                id="name"
                name="name"
                placeholder="Enter Customer Group Name"
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
              <Label className="basis-1/3" name="Description" />
              <InputText
                id="description"
                name="description"
                placeholder="Enter Description"
                className="basis-2/3"
                value={values.description}
                onChange={handleChange}
                isError={!!errors.description}
              />
            </div>
            <div className="flex gap-6 items-center">
              <div className="basis-1/3"></div>
              <p className="basis-2/3 text-statusInactive">
                {errors.description}
              </p>
            </div>
          </div>
        </div>
      </form>
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

  // Effect untuk mengset judul header dan menu yang active
  React.useEffect(() => {
    setTitle("Master Data | Customer Group");
    setActive(1, 0, 0);
  }, [setTitle, setActive]);

  // State untuk menyimpan row yang di-select di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  // Pemanggilan api untuk mendapatkan semua customer group
  const { groups, isLoading, error } = useCustomerGroups([current]);

  // Cek apakah pemanggilan api untuk mendapatkan semua customer group
  // masih loading atau data masih belum didapatkan
  if (isLoading || !groups) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua customer group menghasilkan error
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
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Buka modal untuk membuat customer group
          setModal(<Save customerGroup={groups[selectedRowIndex]} />);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Hapus customer group yang dipilih di table
          await deleteCustomerGroup(groups[selectedRowIndex].code);

          // Karena customer group yang dipilih telah dihapus, maka hapus pilihan sebelumnya
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
