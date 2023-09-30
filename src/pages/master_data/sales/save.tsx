import React from "react";
import useMenu from "@/stores/menu";
import { useRouter } from "next/router";
import { createSales, updateSales, useSales } from "@/api/sales";
import { useFormik, FormikProvider, Formik } from "formik";
import { ApiResponsePayload } from "@/libs/utils";
import { SalesOutput, SaveSalesInput } from "@/models/sales.model";
import { formikValidateWithZod } from "@/libs/error";
import { saveSalesSchema } from "@/validations/sales.validation";
import FormLayout, { InputRow } from "@/components/Layouts/FormLayout";
import InputText from "@/components/Elements/InputText";
import InputNumber from "@/components/Elements/InputNumber";
import SelectInput from "@/components/Elements/Forms/SelectInput";

export default function SalesSave() {
  // Gunakan store useMenu untuk mengset menu mana yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset menu yang aktif
  React.useEffect(() => {
    setActive(1, 3, 0);
  }, [setActive]);

  // Mendapatkan router
  const router = useRouter();

  // Ambil code sales dari query
  // Jika ada query nya maka akan mengembalikan string code sales nya
  // Jika tidak ada query nya maka akan mengembalikan null
  const salesCode = React.useMemo(() => {
    if (!router.query.code) {
      return null;
    } else if (typeof router.query.code === "string") {
      return router.query.code;
    } else {
      return router.query.code[0] ?? null;
    }
  }, [router.query.code]);

  // Pemanggilan api untuk mendapatkan sales berdasarkan code nya (dari query)
  const { sales, error: salesError } = useSales(salesCode, [salesCode]);

  // Penggunaan formik
  const formik = useFormik<SaveSalesInput>({
    enableReinitialize: true,
    initialValues: {
      jobPosition: sales?.jobPosition ?? "marketing",
      name: sales?.name ?? "",
      nik: sales?.nik ?? "",
      cabang: sales?.cabang ?? "",
      phoneNumber: sales?.phoneNumber ?? "",
      telephone: sales?.telephone ?? "",
      fax: sales?.fax ?? "",
      email: sales?.email ?? "",
    },
    onSubmit: async (values, helpers) => {
      let res: ApiResponsePayload<SalesOutput> | null = null;
      if (sales) {
        res = await updateSales(sales.code, values);
      } else {
        res = await createSales(values);
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
        await router.push("/master_data/sales");
      }
    },
    validate: formikValidateWithZod(saveSalesSchema),
  });

  // Decomposition formik
  const { handleSubmit, handleChange, values, errors } = formik;

  // Memo untuk merubah job position yang dipilih menjadi kapital
  const capitalizedSelectedJobPosition = React.useMemo(() => {
    switch (values.jobPosition) {
      case "marketing":
        return "Marketing";
      case "director":
        return "Director";
    }
  }, [values.jobPosition]);

  // Cek apakah pemanggilan api untuk mendapatkan sales berdasarkan code nya (dari query)
  // mengalami error
  if (salesError) {
    throw salesError;
  }

  return (
    <FormikProvider value={formik}>
      <FormLayout
        onSave={handleSubmit}
        title="Input Sales Data"
        tabs={[
          {
            name: "General Information",
            component: (
              <>
                <InputRow
                  firstCol={{
                    label: "Job Position",
                    input: (
                      <SelectInput
                        id="jobPosition"
                        name="jobPosition"
                        placeholder="Choose job position"
                        className="basis-3/5"
                        options={[
                          { label: "Directur", value: "directur" },
                          { label: "Marketing", value: "marketing" },
                        ]}
                        isSearchable
                      />
                    ),
                    error: errors.jobPosition,
                  }}
                />
                {values.jobPosition && (
                  <>
                    <hr />
                    <InputRow
                      firstCol={{
                        label: `${capitalizedSelectedJobPosition} Name`,
                        input: (
                          <InputText
                            id="name"
                            name="name"
                            placeholder={`Enter ${values.jobPosition} name`}
                            className="basis-3/5"
                            value={values.name}
                            onChange={handleChange}
                            isError={!!errors.name}
                          />
                        ),
                        error: errors.name,
                      }}
                      secondCol={{
                        label: "Telephone",
                        input: (
                          <InputText
                            id="telephone"
                            name="telephone"
                            placeholder="Enter telephone number"
                            className="basis-3/5"
                            value={values.telephone}
                            onChange={handleChange}
                            isError={!!errors.telephone}
                          />
                        ),
                        error: errors.telephone,
                      }}
                    />
                    <InputRow
                      firstCol={{
                        label: "NIK",
                        input: (
                          <InputText
                            id="nik"
                            name="nik"
                            placeholder="Enter NIK"
                            className="basis-3/5"
                            value={values.nik}
                            onChange={handleChange}
                            isError={!!errors.nik}
                          />
                        ),
                        error: errors.nik,
                      }}
                      secondCol={{
                        label: "Fax",
                        input: (
                          <InputText
                            id="fax"
                            name="fax"
                            placeholder="Enter fax number"
                            className="basis-3/5"
                            value={values.fax}
                            onChange={handleChange}
                            isError={!!errors.fax}
                          />
                        ),
                        error: errors.fax,
                      }}
                    />
                    <InputRow
                      firstCol={{
                        label: "Cabang",
                        input: (
                          <InputText
                            id="cabang"
                            name="cabang"
                            placeholder="Enter Cabang"
                            className="basis-3/5"
                            value={values.cabang}
                            onChange={handleChange}
                            isError={!!errors.cabang}
                          />
                        ),
                        error: errors.cabang,
                      }}
                      secondCol={{
                        label: "Email",
                        input: (
                          <InputText
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            className="basis-3/5"
                            value={values.email}
                            onChange={handleChange}
                            isError={!!errors.email}
                          />
                        ),
                        error: errors.email,
                      }}
                    />
                    <InputRow
                      firstCol={{
                        label: "Phone Number",
                        input: (
                          <InputText
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter phone number"
                            className="basis-3/5"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            isError={!!errors.phoneNumber}
                          />
                        ),
                        error: errors.phoneNumber,
                      }}
                    />
                  </>
                )}
              </>
            ),
          },
        ]}
      />
    </FormikProvider>
  );
}
