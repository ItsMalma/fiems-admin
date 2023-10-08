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
} from "react-bootstrap-icons";
import moment from "moment";
import Table from "@/components/Elements/NewTable";
import { VesselOutput, SaveVesselInput } from "@/models/vessel.model";
import {
  createVessel,
  deleteVessel,
  updateVessel,
  useVessels,
} from "@/api/vessels";
import { FormikProvider, useFormik } from "formik";
import { saveVesselSchema } from "@/validations/vessel.validation";
import { formikValidateWithZod } from "@/libs/error";
import { useCustomers } from "@/api/customers";
import { toTitleCase } from "@/libs/utils";

type SaveProps = {
  vessel?: VesselOutput;
};

export function Save(props: SaveProps) {
  // Menggunakan function setModal dari store useModal
  const { setModal } = useModal();

  // Gunakan formik
  const formik = useFormik<SaveVesselInput>({
    initialValues: {
      shipping: props.vessel?.shipping.code ?? "",
      name: props.vessel?.name ?? "",
      capacity: props.vessel?.capacity ?? 0,
      unit: props.vessel?.unit ?? "container",
    },
    onSubmit: async (values) => {
      // Cek apakah vessel ada di props
      // Jika ada maka lakukan update saja
      // Jika tidak ada maka lakukan penambahan
      if (props.vessel) {
        await updateVessel(props.vessel.id, values);
      } else {
        await createVessel(values);
      }

      // Tutup modal
      setModal(null);
    },
    validate: formikValidateWithZod(saveVesselSchema),
  });

  // Decomposition formik
  const { handleSubmit, handleChange, values, errors, validateForm } = formik;

  // Pemanggilan api untuk mendapatkan semua shipping
  const {
    customers: shippings,
    isLoading: shippingsLoading,
    error: shippingsError,
  } = useCustomers("shipping");

  // Effect untuk mengvalidasi form
  React.useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Memo untuk menampung create date
  const defaultCreateDate = React.useMemo(
    () =>
      props.vessel?.createDate
        ? moment(props.vessel.createDate, "DD/MM/YYYY").toDate()
        : new Date(),
    [props.vessel?.createDate]
  );

  // Cek apakah pemanggilan api untuk mendapatkan semua shipping mengembalikan error
  if (shippingsError) {
    throw shippingsError;
  }

  return (
    <Modal title="Add New Vessel" type="save" onDone={handleSubmit}>
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
                <Label className="basis-1/3" name="Shipping" />
                <SelectInput
                  id="shipping"
                  name="shipping"
                  placeholder="Choose shipping"
                  className="basis-2/3"
                  options={
                    shippings
                      ? shippings.map((shipping) => ({
                          label: `${shipping.code} - ${shipping.name}`,
                          value: shipping.code,
                        }))
                      : []
                  }
                  isSearchable
                />
              </div>
              <div className="flex gap-6 items-center">
                <div className="basis-1/3"></div>
                <p className="basis-2/3 text-statusInactive">
                  {errors.shipping}
                </p>
              </div>
            </div>
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
                <Label className="basis-1/3" name="Capacity" />
                <InputNumber
                  id="capacity"
                  name="capacity"
                  placeholder="Enter capacity"
                  className="basis-2/3"
                  value={values.capacity}
                  onChange={handleChange}
                  isError={!!errors.capacity}
                />
              </div>
              <div className="flex gap-6 items-center">
                <div className="basis-1/3"></div>
                <p className="basis-2/3 text-statusInactive">
                  {errors.capacity}
                </p>
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
                  options={[
                    { label: "Container", value: "container" },
                    { label: "Teus", value: "teus" },
                    { label: "Ton", value: "ton" },
                  ]}
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

  // Pemanggilan api untuk mendapatkan semua vessel
  const { vessels, isLoading, error } = useVessels([current]);

  // Cek apakah pemanggilan api untuk mendapatkan semua vessel
  // masih loading atau data masih belum didapatkan
  if (isLoading || !vessels) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua vessel menghasilkan error
  if (error) {
    throw error;
  }

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
            id: "shipping.name",
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
            header: "Unit",
            type: "text",
          },
          {
            id: "status",
            header: "Status",
            type: "status",
          },
        ]}
        rows={vessels.map((vessel) => ({
          ...vessel,
          unit: toTitleCase(vessel.unit),
        }))}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Buka modal untuk membuat vessel
          setModal(<Save vessel={vessels[selectedRowIndex]} />);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Hapus vessel yang dipilih di table
          await deleteVessel(vessels[selectedRowIndex].id);

          // Karena vessel yang dipilih telah dihapus, maka hapus pilihan sebelumnya
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
