import React from "react";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { useRouter } from "next/router";
import FormLayout, { InputRow } from "@/components/Layouts/FormLayout";
import InputMoney from "@/components/Elements/Forms/InputMoney";
import SelectInput from "@/components/Elements/Forms/SelectInput";
import DatePickerInput from "@/components/Elements/Forms/DatePickerInput";
import InputText from "@/components/Elements/InputText";
import {
  createUangJalan,
  updateUangJalan,
  useUangJalan,
} from "@/api/uang_jalan";
import { useCustomers } from "@/api/customers";
import { FormikProvider, useFormik } from "formik";
import { SaveUangJalanInput, UangJalanOutput } from "@/models/uangJalan.model";
import {
  ApiResponsePayload,
  ContainerSizes,
  TruckTypes,
  toTitleCase,
} from "@/libs/utils";
import { formikValidateWithZod } from "@/libs/error";
import { saveUangJalanSchema } from "@/validations/uangJalan.validation";
import moment from "moment";
import { useRoutes } from "@/api/routes";

type UangJalanFormValues = Omit<
  SaveUangJalanInput,
  "truckType" | "containerSize"
> & {
  truckType: SaveUangJalanInput["truckType"] | "";
  containerSize: SaveUangJalanInput["containerSize"] | "";
};

export default function UangJalanSavePage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu mana yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset judul header dan menu yang aktif
  React.useEffect(() => {
    setTitle("Master Data | Master Uang Jalan");
    setActive(1, 7, 0);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  // Ambil id uang jalan dari query
  // Jika ada query nya maka akan mengembalikan id uang jalan nya
  // Jika tidak ada query nya, maka akan mengembalikan null
  const idUangJalan = React.useMemo(() => {
    if (!router.query.id) {
      return null;
    } else if (typeof router.query.id === "string") {
      return Number(router.query.id);
    } else {
      return Number(router.query.id[0]) ?? null;
    }
  }, [router.query.id]);

  // Pemanggilan api untuk mendapatkan uang jalan berdasarkan number nya (dari query)
  const { uangJalan, error: errorUangJalan } = useUangJalan(idUangJalan);

  // Memo untuk menampung create date
  const defaultCreateDate = React.useMemo(
    () =>
      uangJalan?.createDate
        ? moment(uangJalan.createDate, "DD/MM/YYYY").toDate()
        : new Date(),
    [uangJalan?.createDate]
  );

  // Pemanggilan api untuk mendapatkan semua customer
  const {
    customers,
    isLoading: loadingCustomers,
    error: errorCustomers,
  } = useCustomers();

  // Pemanggilan api untuk mendapatkan semua route
  const { routes, isLoading: loadingRoutes, error: errorRoutes } = useRoutes();

  // Penggunaan formik
  const formik = useFormik<UangJalanFormValues>({
    enableReinitialize: true,
    initialValues: {
      customer: uangJalan?.customer.code ?? "",
      route: uangJalan?.route ?? "",
      truckType: uangJalan?.truckType ?? "",
      containerSize: uangJalan?.containerSize ?? "",
      fuelOil: uangJalan?.fuelOil ?? 0,
      toll: uangJalan?.toll ?? 0,
      labourCosts: uangJalan?.labourCosts ?? 0,
      meal: uangJalan?.meal ?? 0,
      etc: uangJalan?.etc ?? 0,
    },
    onSubmit: async (values, helpers) => {
      let res: ApiResponsePayload<UangJalanOutput> | null = null;
      if (uangJalan) {
        res = await updateUangJalan(uangJalan.id, values as SaveUangJalanInput);
      } else {
        res = await createUangJalan(values as SaveUangJalanInput);
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
        await router.push("/master_data/uang_jalan");
      }
    },
    validate: formikValidateWithZod(saveUangJalanSchema),
  });

  // Decomposition formik
  const { handleSubmit, handleChange, values, errors } = formik;

  // Cek apakah pemanggilan api untuk mendapatkan uang jalan berdasarkan id nya (dari query)
  // mengalami error
  if (errorUangJalan) {
    throw errorUangJalan;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua customer
  // mengalami error
  if (errorCustomers) {
    throw errorCustomers;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua route
  // mengalami error
  if (errorRoutes) {
    throw errorRoutes;
  }

  return (
    <FormikProvider value={formik}>
      <FormLayout
        onSave={handleSubmit}
        title="Input Uang Jalan Data"
        tabs={[
          {
            name: "General Information",
            component: (
              <>
                <InputRow
                  firstCol={{
                    label: "Create Date",
                    input: (
                      <DatePickerInput
                        id="createDate"
                        name="createDate"
                        className="basis-3/5"
                        defaultValue={defaultCreateDate}
                        readOnly
                      />
                    ),
                  }}
                  secondCol={{
                    label: "Fuel Oil",
                    input: (
                      <InputMoney
                        id="fuelOil"
                        name="fuelOil"
                        placeholder="Enter fuel oil"
                        className="basis-3/5"
                      />
                    ),
                    error: errors.fuelOil,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Customer",
                    input: (
                      <SelectInput
                        id="customer"
                        name="customer"
                        placeholder="Choose customer"
                        className="basis-3/5"
                        options={
                          customers
                            ? customers.map((customer) => ({
                                label: `${customer.code} - ${customer.name}`,
                                value: customer.code,
                              }))
                            : []
                        }
                        isSearchable
                      />
                    ),
                    error: errors.customer,
                  }}
                  secondCol={{
                    label: "Toll",
                    input: (
                      <InputMoney
                        id="toll"
                        name="toll"
                        placeholder="Enter toll"
                        className="basis-3/5"
                      />
                    ),
                    error: errors.toll,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Route",
                    input: (
                      <SelectInput
                        id="route"
                        name="route"
                        placeholder="Choose route"
                        className="basis-3/5"
                        options={
                          routes
                            ? routes.map((route) => ({
                                label: route.code,
                                value: route.code,
                              }))
                            : []
                        }
                        isSearchable
                      />
                    ),
                    error: errors.route,
                  }}
                  secondCol={{
                    label: "Labour Costs",
                    input: (
                      <InputMoney
                        id="labourCosts"
                        name="labourCosts"
                        placeholder="Enter labour costs"
                        className="basis-3/5"
                      />
                    ),
                    error: errors.labourCosts,
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
                    label: "Meal",
                    input: (
                      <InputMoney
                        id="meal"
                        name="meal"
                        placeholder="Enter meal"
                        className="basis-3/5"
                      />
                    ),
                    error: errors.meal,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Container Size",
                    input: (
                      <SelectInput
                        id="containerSize"
                        name="containerSize"
                        placeholder="Choose container size"
                        className="basis-3/5"
                        options={ContainerSizes.map((containerSize) => ({
                          label: toTitleCase(containerSize),
                          value: containerSize,
                        }))}
                        isSearchable
                      />
                    ),
                    error: errors.containerSize,
                  }}
                  secondCol={{
                    label: "Etc",
                    input: (
                      <InputMoney
                        id="etc"
                        name="etc"
                        placeholder="Enter etc"
                        className="basis-3/5"
                      />
                    ),
                    error: errors.etc,
                  }}
                />
                <InputRow
                  secondCol={{
                    label: "Total",
                    input: (
                      <InputText
                        id="total"
                        name="total"
                        placeholder="Enter total"
                        className="basis-3/5"
                        readOnly
                        value={
                          values.fuelOil +
                          values.toll +
                          values.labourCosts +
                          values.meal +
                          values.etc
                        }
                      />
                    ),
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
