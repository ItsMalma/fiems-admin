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
  GeoAltFill,
  FileEarmarkArrowDownFill,
  FileEarmarkArrowUpFill,
} from "react-bootstrap-icons";
import moment from "moment";
import Table from "@/components/Elements/NewTable";
import { PortOutput, SavePortInput } from "@/models/port.model";
import {
  createPort,
  deletePort,
  updatePort,
  usePorts,
  useNextPortCode,
} from "@/api/ports";
import { useProvinces } from "@/api/provinces";
import { FormikProvider, useFormik } from "formik";
import { savePortSchema } from "@/validations/port.validation";
import { formikValidateWithZod } from "@/libs/error";

type SaveProps = {
  port?: PortOutput;
};

export function Save(props: SaveProps) {
  // Pemanggilan api untuk mendapatkan semua provinsi
  const {
    provinces,
    isLoading: provincesLoading,
    error: provincesError,
  } = useProvinces();

  // Gunakan formik
  const formik = useFormik<SavePortInput>({
    initialValues: {
      province: props.port?.province ?? "",
      city: props.port?.city ?? "",
      name: props.port?.name ?? "",
    },
    onSubmit: async (values) => {
      // Cek apakah port ada di props
      // Jika ada maka lakukan update saja
      // Jika tidak ada maka lakukan penambahan
      if (props.port) {
        await updatePort(props.port.code, values);
      } else {
        await createPort(values);
      }

      // Tutup modal
      setModal(null);
    },
    validate: formikValidateWithZod(savePortSchema),
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
      props.port?.createDate
        ? moment(props.port.createDate, "DD/MM/YYYY").toDate()
        : new Date(),
    [props.port?.createDate]
  );

  // Panggil api untuk mendapatkan code port selanjutnya
  const { code, error, isLoading } = useNextPortCode();

  // State untuk menyimpan default value dari code port
  const [defaultPortCode, setDefaultPortCode] = React.useState<string>();

  // Effect untuk mengset value dari default port code
  // dimana jika port ada di props maka set dengan code port tersebut
  // tapi jika tidak ada maka set dengan code yang diambil dari api
  React.useEffect(() => {
    if (props.port?.code) {
      setDefaultPortCode(props.port.code);
    } else if (code) {
      setDefaultPortCode(code);
    }
  }, [code, props.port?.code]);

  // Ambil semua kota yang dimiliki provinsi yang dipilih
  const selectedProvinceCities = React.useMemo(() => {
    if (provinces && !provincesLoading) {
      return provinces.find((province) => province.name === values.province)
        ?.cities;
    }
    return null;
  }, [provinces, provincesLoading, values.province]);

  // Cek apakah pemanggilan api untuk mendapatkan code port selanjutnya masih loading
  if (isLoading) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan code port selanjutnya menghasilkan error
  if (error) {
    throw error;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua province menghasilkan error
  if (provincesError) {
    throw provincesError;
  }

  return (
    <Modal title="Add New Port" type="save" onDone={handleSubmit}>
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
                <Label className="basis-1/3" name="Port Code" />
                <InputText
                  id="code"
                  name="code"
                  className="basis-2/3"
                  defaultValue={defaultPortCode}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-6 items-center">
                <Label className="basis-1/3" name="Province" />
                <SelectInput
                  id="province"
                  name="province"
                  placeholder="Choose province"
                  className="basis-2/3"
                  options={
                    !provincesLoading && provinces
                      ? provinces.map((province) => ({
                          label: province.name,
                          value: province.name,
                        }))
                      : []
                  }
                  isSearchable
                />
              </div>
              <div className="flex gap-6 items-center">
                <div className="basis-1/3"></div>
                <p className="basis-2/3 text-statusInactive">
                  {errors.province}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-6 items-center">
                <Label className="basis-1/3" name="City" />
                <SelectInput
                  id="city"
                  name="city"
                  placeholder="Choose city"
                  className="basis-2/3"
                  options={
                    selectedProvinceCities
                      ? selectedProvinceCities.map((selectedProvinceCity) => ({
                          label: selectedProvinceCity,
                          value: selectedProvinceCity,
                        }))
                      : []
                  }
                  readOnly={!selectedProvinceCities}
                  isSearchable
                />
              </div>
              <div className="flex gap-6 items-center">
                <div className="basis-1/3"></div>
                <p className="basis-2/3 text-statusInactive">{errors.city}</p>
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

export default function MasterPort() {
  // Gunakan store useHeader untuk merubah judul header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang active
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang lagi aktif
  const { setModal, current } = useModal();

  // Effect untuk mengset judul header dan menu yang active
  React.useEffect(() => {
    setTitle("Master Data | Master Port");
    setActive(1, 2, 0);
  }, [setTitle, setActive]);

  // State untuk menyimpan row yang di-select di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  // Pemanggilan api untuk mendapatkan semua port
  const { ports, isLoading, error } = usePorts([current]);

  // Cek apakah pemanggilan api untuk mendapatkan semua port
  // masih loading atau data masih belum didapatkan
  if (isLoading || !ports) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua port menghasilkan error
  if (error) {
    throw error;
  }

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Port Code" />
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
        rows={ports}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Buka modal untuk membuat port
          setModal(<Save port={ports[selectedRowIndex]} />);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Hapus port yang dipilih di table
          await deletePort(ports[selectedRowIndex].code);

          // Karena port yang dipilih telah dihapus, maka hapus pilihan sebelumnya
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
