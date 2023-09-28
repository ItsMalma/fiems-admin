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
import { RouteOutput, SaveRouteInput } from "@/models/route.model";
import {
  createRoute,
  deleteRoute,
  updateRoute,
  useRoutes,
  useNextRouteCode,
} from "@/api/routes";
import { useProvinces } from "@/api/provinces";
import { FormikProvider, useFormik } from "formik";
import { saveRouteSchema } from "@/validations/route.validation";
import { formikValidateWithZod } from "@/libs/error";

type SaveProps = {
  route?: RouteOutput;
};

export function Save(props: SaveProps) {
  // Pemanggilan api untuk mendapatkan semua provinsi
  const {
    provinces,
    isLoading: provincesLoading,
    error: provincesError,
  } = useProvinces();

  // Gunakan formik
  const formik = useFormik<SaveRouteInput>({
    initialValues: {
      province: props.route?.province ?? "",
      city: props.route?.city ?? "",
      originDescription: props.route?.originDescription ?? "",
      destinationDescription: props.route?.destinationDescription ?? "",
    },
    onSubmit: async (values) => {
      // Cek apakah route ada di props
      // Jika ada maka lakukan update saja
      // Jika tidak ada maka lakukan penambahan
      if (props.route) {
        await updateRoute(props.route.code, values);
      } else {
        await createRoute(values);
      }

      // Tutup modal
      setModal(null);
    },
    validate: formikValidateWithZod(saveRouteSchema),
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
      props.route?.createDate
        ? moment(props.route.createDate, "DD/MM/YYYY").toDate()
        : new Date(),
    [props.route?.createDate]
  );

  // Panggil api untuk mendapatkan code route selanjutnya
  const { code, error, isLoading } = useNextRouteCode();

  // State untuk menyimpan default value dari code route
  const [defaultRouteCode, setDefaultRouteCode] = React.useState<string>();

  // Effect untuk mengset value dari default route code
  // dimana jika route ada di props maka set dengan code route tersebut
  // tapi jika tidak ada maka set dengan code yang diambil dari api
  React.useEffect(() => {
    if (props.route?.code) {
      setDefaultRouteCode(props.route.code);
    } else if (code) {
      setDefaultRouteCode(code);
    }
  }, [code, props.route?.code]);

  // Ambil semua kota yang dimiliki provinsi yang dipilih
  const selectedProvinceCities = React.useMemo(() => {
    if (provinces && !provincesLoading) {
      return provinces.find((province) => province.name === values.province)
        ?.cities;
    }
    return null;
  }, [provinces, provincesLoading, values.province]);

  // Cek apakah pemanggilan api untuk mendapatkan code route selanjutnya masih loading
  if (isLoading) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan code route selanjutnya menghasilkan error
  if (error) {
    throw error;
  }

  return (
    <Modal title="Add New Route" type="save" onDone={handleSubmit}>
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
                <Label className="basis-1/3" name="Route Code" />
                <InputText
                  id="code"
                  name="code"
                  className="basis-2/3"
                  defaultValue={defaultRouteCode}
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
                <Label className="basis-1/3" name="Origin Description" />
                <InputText
                  id="originDescription"
                  name="originDescription"
                  placeholder="Enter origin description"
                  className="basis-2/3"
                  value={values.originDescription}
                  onChange={handleChange}
                  isError={!!errors.originDescription}
                />
              </div>
              <div className="flex gap-6 items-center">
                <div className="basis-1/3"></div>
                <p className="basis-2/3 text-statusInactive">
                  {errors.originDescription}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-6 items-center">
                <Label className="basis-1/3" name="Destination Description" />
                <InputText
                  id="destinationDescription"
                  name="destinationDescription"
                  placeholder="Enter origin description"
                  className="basis-2/3"
                  value={values.destinationDescription}
                  onChange={handleChange}
                  isError={!!errors.destinationDescription}
                />
              </div>
              <div className="flex gap-6 items-center">
                <div className="basis-1/3"></div>
                <p className="basis-2/3 text-statusInactive">
                  {errors.destinationDescription}
                </p>
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

export default function MasterRoute() {
  // Gunakan store useHeader untuk merubah judul header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang active
  const { setActive } = useMenu();

  // Gunakan store useModal untuk mengset modal dan mendapatkan modal yang lagi aktif
  const { setModal, current } = useModal();

  // Effect untuk mengset judul header dan menu yang active
  React.useEffect(() => {
    setTitle("Master Data | Master Route");
    setActive(1, 1, 0);
  }, [setTitle, setActive]);

  // State untuk menyimpan row yang di-select di table
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>();

  // Pemanggilan api untuk mendapatkan semua route
  const { routes, isLoading, error } = useRoutes([current]);

  // Cek apakah pemanggilan api untuk mendapatkan semua route
  // masih loading atau data masih belum didapatkan
  if (isLoading || !routes) {
    return <></>;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua route menghasilkan error
  if (error) {
    throw error;
  }

  return (
    <>
      <div className="px-[18px] py-[15px] 2xl:px-6 2xl:py-5 flex justify-between bg-white rounded-2xl shadow-sm">
        <Search placeholder="Search Route Code" />
        <div className="flex gap-3 2xl:gap-4">
          <Button
            text="Add New Route"
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
            header: "Route Code",
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
            id: "description",
            header: "Route Description",
            type: "text",
            isSortable: true,
          },
        ]}
        rows={routes.map((route) => ({
          ...route,
          description: `${route.originDescription} - ${route.destinationDescription}`,
        }))}
        onSelect={(rowIndex) => setSelectedRowIndex(rowIndex)}
        onEdit={() => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Buka modal untuk membuat route
          setModal(<Save route={routes[selectedRowIndex]} />);
        }}
        onDelete={async () => {
          // Cek apakah tidak ada row yang dipilih di table
          if (selectedRowIndex === undefined) {
            return;
          }

          // Hapus route yang dipilih di table
          await deleteRoute(routes[selectedRowIndex].code);

          // Karena route yang dipilih telah dihapus, maka hapus pilihan sebelumnya
          setSelectedRowIndex(undefined);

          // Tutup modal
          setModal(null);
        }}
      />
    </>
  );
}
