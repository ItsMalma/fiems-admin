import { useCustomers } from "@/api/customers";
import { createVehicle, updateVehicle, useVehicle } from "@/api/vehicles";
import DatePickerInput from "@/components/Elements/Forms/DatePickerInput";
import SelectInput from "@/components/Elements/Forms/SelectInput";
import InputText from "@/components/Elements/InputText";
import SaveLayout, { InputRow } from "@/components/Layouts/SaveLayout";
import { formikValidateWithZod } from "@/libs/error";
import { ApiResponsePayload, TruckTypes, toTitleCase } from "@/libs/utils";
import { SaveVehicleInput, VehicleOutput } from "@/models/vehicle.model";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { saveVehicleSchema } from "@/validations/vehicle.validation";
import { FormikProvider, useFormik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

type VehicleFormValues = Omit<SaveVehicleInput, "truckType" | "cylinder"> & {
  truckType: SaveVehicleInput["truckType"] | "";
  cylinder: SaveVehicleInput["cylinder"] | "";
};

export default function VehicleSavePage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu mana yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset judul header dan menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Vehicle");
    setActive(1, 4, 0);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  // Ambil vehicle number dari query
  // Jika ada query nya maka akan mengembalikan string vehicle number nya
  // Jika tidak ada query nya, maka akan mengembalikan null
  const vehicleNumber = React.useMemo(() => {
    if (!router.query.code) {
      return null;
    } else if (typeof router.query.code === "string") {
      return router.query.code;
    } else {
      return router.query.code[0] ?? null;
    }
  }, [router.query.code]);

  // Pemanggilan api untuk mendapatkan vehicle berdasarkan number nya (dari query)
  const { vehicle, error: vehicleError } = useVehicle(vehicleNumber, [
    vehicleNumber,
  ]);

  // Pemanggilan api untuk mendapatkan semua vendor
  const {
    customers: vendors,
    isLoading: vendorsLoading,
    error: vendorsError,
  } = useCustomers("vendor");

  // Penggunaan formik
  const formik = useFormik<VehicleFormValues>({
    enableReinitialize: true,
    initialValues: {
      vendor: vehicle?.vendor.code ?? "",
      truckNumber: vehicle?.truckNumber ?? "",
      brand: vehicle?.brand ?? "",
      truckType: vehicle?.truckType ?? "",
      engineNumber: vehicle?.engineNumber ?? "",
      chassisNumber: vehicle?.chassisNumber ?? "",
      cylinder: vehicle?.cylinder ?? "",
      color: vehicle?.color ?? "",
      stnkExpired: vehicle?.stnkExpired ?? moment().format("DD/MM/YYYY"),
      taxExpired: vehicle?.taxExpired ?? moment().format("DD/MM/YYYY"),
      keurExpired: vehicle?.keurExpired ?? moment().format("DD/MM/YYYY"),
    },
    onSubmit: async (values, helpers) => {
      let res: ApiResponsePayload<VehicleOutput> | null = null;
      if (vehicle) {
        res = await updateVehicle(
          vehicle.truckNumber,
          values as SaveVehicleInput
        );
      } else {
        res = await createVehicle(values as SaveVehicleInput);
      }

      if (res.error) {
        if (typeof res.error !== "string") {
          const errors = res.error;

          Object.keys(errors).forEach((field) => {
            helpers.setFieldError(field, errors[field]);
          });
        } else {
          // TODO: tampilin notif gagal
        }
      } else {
        await router.push("/master_data/vehicle");
      }
    },
    validate: formikValidateWithZod(saveVehicleSchema),
  });

  // Decomposition formik
  const { handleSubmit, handleChange, values, errors } = formik;

  // Cek apakah pemanggilan api untuk mendapatkan vehicle berdasarkan number nya (dari query)
  // mengalami error
  if (vehicleError) {
    throw vehicleError;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua customer group
  // mengalami error
  if (vendorsError) {
    throw vendorsError;
  }

  return (
    <FormikProvider value={formik}>
      <SaveLayout
        onSave={handleSubmit}
        title="Input Vehicle Data"
        tabs={[
          {
            name: "General Information",
            component: (
              <>
                <InputRow
                  firstCol={{
                    label: "Vendor",
                    input: (
                      <SelectInput
                        id="vendor"
                        name="vendor"
                        placeholder="Choose vendor"
                        className="basis-3/5"
                        options={
                          vendors
                            ? vendors.map((vendor) => ({
                                label: `${vendor.code} - ${vendor.name}`,
                                value: vendor.code,
                              }))
                            : []
                        }
                        isSearchable
                      />
                    ),
                    error: errors.vendor,
                  }}
                  secondCol={{
                    label: "Cylinder",
                    input: (
                      <SelectInput
                        id="cylinder"
                        name="cylinder"
                        placeholder="Choose cylinder"
                        className="basis-3/5"
                        options={[
                          { label: "2", value: 2 },
                          { label: "4", value: 4 },
                          { label: "8", value: 8 },
                        ]}
                        isSearchable
                      />
                    ),
                    error: errors.cylinder,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Vehicle Number",
                    input: (
                      <InputText
                        id="truckNumber"
                        name="truckNumber"
                        placeholder="Enter truck number"
                        className="basis-3/5"
                        value={values.truckNumber}
                        onChange={handleChange}
                        isError={!!errors.truckNumber}
                      />
                    ),
                    error: errors.truckNumber,
                  }}
                  secondCol={{
                    label: "Color",
                    input: (
                      <InputText
                        id="color"
                        name="color"
                        placeholder="Enter color"
                        className="basis-3/5"
                        value={values.color}
                        onChange={handleChange}
                        isError={!!errors.color}
                      />
                    ),
                    error: errors.color,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Brand",
                    input: (
                      <InputText
                        id="brand"
                        name="brand"
                        placeholder="Enter brand"
                        className="basis-3/5"
                        value={values.brand}
                        onChange={handleChange}
                        isError={!!errors.brand}
                      />
                    ),
                    error: errors.brand,
                  }}
                  secondCol={{
                    label: "STNK Expired",
                    input: (
                      <DatePickerInput
                        id="stnkExpired"
                        name="stnkExpired"
                        placeholder="Choose stnk expired date"
                        className="basis-3/5"
                      />
                    ),
                    error: errors.stnkExpired,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Truck Type",
                    input: (
                      <SelectInput
                        id="truckType"
                        name="truckType"
                        placeholder="Choose truck type"
                        className="basis-3/5"
                        options={TruckTypes.map((truckType) => ({
                          label: toTitleCase(truckType),
                          value: truckType,
                        }))}
                        isSearchable
                      />
                    ),
                    error: errors.truckType,
                  }}
                  secondCol={{
                    label: "Tax Expired",
                    input: (
                      <DatePickerInput
                        id="taxExpired"
                        name="taxExpired"
                        placeholder="Choose tax expired date"
                        className="basis-3/5"
                      />
                    ),
                    error: errors.taxExpired,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Engine Number",
                    input: (
                      <InputText
                        id="engineNumber"
                        name="engineNumber"
                        placeholder="Enter engine number"
                        className="basis-3/5"
                        value={values.engineNumber}
                        onChange={handleChange}
                        isError={!!errors.engineNumber}
                      />
                    ),
                    error: errors.truckType,
                  }}
                  secondCol={{
                    label: "KEUR Expired",
                    input: (
                      <DatePickerInput
                        id="keurExpired"
                        name="keurExpired"
                        placeholder="Choose keur expired date"
                        className="basis-3/5"
                      />
                    ),
                    error: errors.keurExpired,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Chassis Number",
                    input: (
                      <InputText
                        id="chassisNumber"
                        name="chassisNumber"
                        placeholder="Enter chassis number"
                        className="basis-3/5"
                        value={values.chassisNumber}
                        onChange={handleChange}
                        isError={!!errors.chassisNumber}
                      />
                    ),
                    error: errors.truckType,
                  }}
                />
              </>
            ),
          },
        ]}
      />
    </FormikProvider>
  );
}
