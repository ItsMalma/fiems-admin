import React from "react";
import useMenu from "@/stores/menu";
import { useRouter } from "next/router";
import InputText from "@/components/Elements/InputText";
import FormLayout, { InputRow } from "@/components/Layouts/FormLayout";
import { CustomerOutput, SaveCustomerInput } from "@/models/customer.model";
import InputNumber from "@/components/Elements/InputNumber";
import { createCustomer, updateCustomer, useCustomer } from "@/api/customers";
import { useCustomerGroups } from "@/api/customer_groups";
import { useProvinces } from "@/api/provinces";
import { useCurrencies } from "@/api/currencies";
import { useFormik, FormikProvider } from "formik";
import SelectInput from "@/components/Elements/Forms/SelectInput";
import { saveCustomerSchema } from "@/validations/customer.validation";
import { formikValidateWithZod, transformZodErrorDeep } from "@/libs/error";
import { ApiResponsePayload } from "@/libs/utils";

export default function CustomerSavePage() {
  // Gunakan store useMenu untuk mengset menu mana yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset menu yang aktif
  React.useEffect(() => {
    setActive(1, 0, 1);
  }, [setActive]);

  // Mendapatkan router
  const router = useRouter();

  // Ambil code customer dari query
  // Jika ada query nya maka akan mengembalikan string code customer nya
  // Jika tidak ada query nya maka akan mengembalikan null
  const customerCode = React.useMemo(() => {
    if (!router.query.code) {
      return null;
    } else if (typeof router.query.code === "string") {
      return router.query.code;
    } else {
      return router.query.code[0] ?? null;
    }
  }, [router.query.code]);

  // Pemanggilan api untuk mendapatkan customer berdasarkan code nya (dari query)
  const { customer, error: customerError } = useCustomer(customerCode, [
    customerCode,
  ]);

  // Pemanggilan api untuk mendapatkan semua customer group
  const {
    groups: customerGroups,
    isLoading: customerGroupsApiLoading,
    error: customerGroupsApiError,
  } = useCustomerGroups();

  // Pemanggilan api untuk mendapatkan semua provinsi
  const {
    provinces,
    isLoading: provincesLoading,
    error: provincesError,
  } = useProvinces();

  // Pemanggilan api untuk mendapatkan semua currency
  const {
    currencies,
    isLoading: currenciesLoading,
    error: currenciesError,
  } = useCurrencies();

  // Penggunaan formik
  const formik = useFormik<SaveCustomerInput>({
    enableReinitialize: true,
    initialValues: {
      type: customer?.type ?? "factory",
      name: customer?.name ?? "",
      group: customer?.group ?? "",
      address: customer?.address ?? "",
      province: customer?.province ?? "",
      city: customer?.city ?? "",
      telephone: customer?.telephone ?? "",
      fax: customer?.fax ?? "",
      email: customer?.email ?? "",
      top: customer?.top ?? 0,
      currency: customer?.currency ?? "",
      pic: customer?.pic ?? {
        purchasing: {
          name: "",
          email: "",
          phoneNumber: "",
          telephone: "",
          fax: "",
        },
        operation: {
          name: "",
          email: "",
          phoneNumber: "",
          telephone: "",
          fax: "",
        },
        finance: {
          name: "",
          email: "",
          phoneNumber: "",
          telephone: "",
          fax: "",
        },
      },
    },
    onSubmit: async (values, helpers) => {
      let res: ApiResponsePayload<CustomerOutput> | null = null;
      if (customer) {
        res = await updateCustomer(customer.code, values);
      } else {
        res = await createCustomer(values);
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
        await router.push("/master_data/business_partner/customers");
      }
    },
    validate: formikValidateWithZod(saveCustomerSchema),
  });

  // Decomposition formik
  const { handleSubmit, handleChange, values, errors } = formik;

  // Memo untuk merubah customer type yang dipilih menjadi kapital
  const capitalizedSelectedCustomerType = React.useMemo(() => {
    switch (values.type) {
      case "factory":
        return "Factory";
      case "shipping":
        return "Shipping";
      case "vendor":
        return "Vendor";
    }
  }, [values.type]);

  // Ambil semua kota yang dimiliki provinsi yang dipilih
  const selectedProvinceCities = React.useMemo(() => {
    if (provinces && !provincesLoading) {
      return provinces.find((province) => province.name === values.province)
        ?.cities;
    }
    return null;
  }, [provinces, provincesLoading, values.province]);

  // Cek apakah pemanggilan api untuk mendapatkan customer berdasarkan code nya (dari query)
  // mengalami error
  if (customerError) {
    throw customerError;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua customer group
  // mengalami error
  if (customerGroupsApiError) {
    throw customerGroupsApiError;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua provinsi
  // mengalami error
  if (provincesError) {
    throw provincesError;
  }

  // Cek apakah pemanggilan api untuk mendapatkan semua provinsi
  // mengalami error
  if (currenciesError) {
    throw currenciesError;
  }

  return (
    <FormikProvider value={formik}>
      <FormLayout
        onSave={handleSubmit}
        title="Input Customer Data"
        tabs={[
          {
            name: "General Information",
            component: (
              <>
                <InputRow
                  firstCol={{
                    label: "Customer Type",
                    input: (
                      <SelectInput
                        id="type"
                        name="type"
                        placeholder="Choose customer type"
                        className="basis-3/5"
                        options={[
                          { label: "Factory", value: "factory" },
                          { label: "Vendor", value: "vendor" },
                          { label: "Shipping", value: "shipping" },
                        ]}
                        isSearchable
                      />
                    ),
                    error: errors.type,
                  }}
                />
                {values.type && (
                  <>
                    <hr></hr>
                    <InputRow
                      firstCol={{
                        label: `${capitalizedSelectedCustomerType} Name`,
                        input: (
                          <InputText
                            id="name"
                            name="name"
                            placeholder={`Enter ${values.type} name`}
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
                        label: `${capitalizedSelectedCustomerType} Group`,
                        input: (
                          <SelectInput
                            id="group"
                            name="group"
                            placeholder={`Choose ${values.type} group`}
                            className="basis-3/5"
                            options={
                              !customerGroupsApiLoading && customerGroups
                                ? customerGroups.map((customerGroup) => ({
                                    label: customerGroup.code,
                                    value: customerGroup.code,
                                  }))
                                : []
                            }
                            isSearchable
                          />
                        ),
                        error: errors.group,
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
                        label: "Address",
                        input: (
                          <InputText
                            id="address"
                            name="address"
                            placeholder="Enter address"
                            className="basis-3/5"
                            value={values.address}
                            onChange={handleChange}
                            isError={!!errors.address}
                          />
                        ),
                        error: errors.address,
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
                        label: "Province",
                        input: (
                          <SelectInput
                            id="province"
                            name="province"
                            placeholder="Choose province"
                            className="basis-3/5"
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
                        ),
                        error: errors.province,
                      }}
                      secondCol={{
                        label: "TOP",
                        input: (
                          <InputNumber
                            id="top"
                            name="top"
                            placeholder="Enter TOP"
                            className="basis-3/5"
                            value={values.top}
                            onChange={handleChange}
                            isError={!!errors.top}
                          />
                        ),
                        error: errors.top,
                      }}
                    />
                    <InputRow
                      firstCol={{
                        label: "City",
                        input: (
                          <SelectInput
                            id="city"
                            name="city"
                            placeholder="Choose city"
                            className="basis-3/5"
                            options={
                              selectedProvinceCities
                                ? selectedProvinceCities.map(
                                    (selectedProvinceCity) => ({
                                      label: selectedProvinceCity,
                                      value: selectedProvinceCity,
                                    })
                                  )
                                : []
                            }
                            readOnly={!selectedProvinceCities}
                            isSearchable
                          />
                        ),
                        error: errors.city,
                      }}
                      secondCol={{
                        label: "Currency",
                        input: (
                          <SelectInput
                            id="currency"
                            name="currency"
                            placeholder="Choose currency"
                            className="basis-3/5"
                            options={
                              !currenciesLoading && currencies
                                ? currencies.map((currencie) => ({
                                    label: currencie,
                                    value: currencie,
                                  }))
                                : []
                            }
                            isSearchable
                          />
                        ),
                        error: errors.currency,
                      }}
                    />
                  </>
                )}
              </>
            ),
          },
          {
            name: "PIC Information",
            isHide: !values.type,
            component: (
              <>
                <InputRow firstCol="Purchasing" secondCol="Operation" />
                <InputRow
                  firstCol={{
                    label: "Name",
                    input: (
                      <InputText
                        id="pic.purchasing.name"
                        name="pic.purchasing.name"
                        placeholder="Enter purchasing name"
                        className="basis-3/5"
                        value={values.pic.purchasing.name}
                        onChange={handleChange}
                        isError={!!errors.pic?.purchasing?.name}
                      />
                    ),
                    error: errors.pic?.purchasing?.name,
                  }}
                  secondCol={{
                    label: "Name",
                    input: (
                      <InputText
                        id="pic.operation.name"
                        name="pic.operation.name"
                        placeholder="Enter operation name"
                        className="basis-3/5"
                        value={values.pic.operation.name}
                        onChange={handleChange}
                        isError={!!errors.pic?.operation?.name}
                      />
                    ),
                    error: errors.pic?.operation?.name,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Email",
                    input: (
                      <InputText
                        id="pic.purchasing.email"
                        name="pic.purchasing.email"
                        placeholder="Enter purchasing email"
                        className="basis-3/5"
                        value={values.pic.purchasing.email}
                        onChange={handleChange}
                        isError={!!errors.pic?.purchasing?.email}
                      />
                    ),
                    error: errors.pic?.purchasing?.email,
                  }}
                  secondCol={{
                    label: "Email",
                    input: (
                      <InputText
                        id="pic.operation.email"
                        name="pic.operation.email"
                        placeholder="Enter operation email"
                        className="basis-3/5"
                        value={values.pic.operation.email}
                        onChange={handleChange}
                        isError={!!errors.pic?.operation?.email}
                      />
                    ),
                    error: errors.pic?.operation?.email,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Phone Number",
                    input: (
                      <InputText
                        id="pic.purchasing.phoneNumber"
                        name="pic.purchasing.phoneNumber"
                        placeholder="Enter purchasing phone number"
                        className="basis-3/5"
                        value={values.pic.purchasing.phoneNumber}
                        onChange={handleChange}
                        isError={!!errors.pic?.purchasing?.phoneNumber}
                      />
                    ),
                    error: errors.pic?.purchasing?.phoneNumber,
                  }}
                  secondCol={{
                    label: "Phone Number",
                    input: (
                      <InputText
                        id="pic.operation.phoneNumber"
                        name="pic.operation.phoneNumber"
                        placeholder="Enter operation phone number"
                        className="basis-3/5"
                        value={values.pic.operation.phoneNumber}
                        onChange={handleChange}
                        isError={!!errors.pic?.operation?.phoneNumber}
                      />
                    ),
                    error: errors.pic?.operation?.phoneNumber,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Telephone",
                    input: (
                      <InputText
                        id="pic.purchasing.telephone"
                        name="pic.purchasing.telephone"
                        placeholder="Enter purchasing telephone number"
                        className="basis-3/5"
                        value={values.pic.purchasing.telephone}
                        onChange={handleChange}
                        isError={!!errors.pic?.purchasing?.telephone}
                      />
                    ),
                    error: errors.pic?.purchasing?.telephone,
                  }}
                  secondCol={{
                    label: "Telephone",
                    input: (
                      <InputText
                        id="pic.operation.telephone"
                        name="pic.operation.telephone"
                        placeholder="Enter operation telephone number"
                        className="basis-3/5"
                        value={values.pic.operation.telephone}
                        onChange={handleChange}
                        isError={!!errors.pic?.operation?.telephone}
                      />
                    ),
                    error: errors.pic?.operation?.telephone,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Fax",
                    input: (
                      <InputText
                        id="pic.purchasing.fax"
                        name="pic.purchasing.fax"
                        placeholder="Enter purchasing fax number"
                        className="basis-3/5"
                        value={values.pic.purchasing.fax}
                        onChange={handleChange}
                        isError={!!errors.pic?.purchasing?.fax}
                      />
                    ),
                    error: errors.pic?.purchasing?.fax,
                  }}
                  secondCol={{
                    label: "Fax",
                    input: (
                      <InputText
                        id="pic.operation.fax"
                        name="pic.operation.fax"
                        placeholder="Enter operation fax number"
                        className="basis-3/5"
                        value={values.pic.operation.fax}
                        onChange={handleChange}
                        isError={!!errors.pic?.operation?.fax}
                      />
                    ),
                    error: errors.pic?.operation?.fax,
                  }}
                />
                <hr></hr>
                <InputRow firstCol="Finance" />
                <InputRow
                  firstCol={{
                    label: "Name",
                    input: (
                      <InputText
                        id="pic.finance.name"
                        name="pic.finance.name"
                        placeholder="Enter finance name"
                        className="basis-3/5"
                        value={values.pic.finance.name}
                        onChange={handleChange}
                        isError={!!errors.pic?.finance?.name}
                      />
                    ),
                    error: errors.pic?.finance?.name,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Email",
                    input: (
                      <InputText
                        id="pic.finance.email"
                        name="pic.finance.email"
                        placeholder="Enter finance email"
                        className="basis-3/5"
                        value={values.pic.finance.email}
                        onChange={handleChange}
                        isError={!!errors.pic?.finance?.email}
                      />
                    ),
                    error: errors.pic?.finance?.email,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Phone Number",
                    input: (
                      <InputText
                        id="pic.finance.phoneNumber"
                        name="pic.finance.phoneNumber"
                        placeholder="Enter finance phone number"
                        className="basis-3/5"
                        value={values.pic.finance.phoneNumber}
                        onChange={handleChange}
                        isError={!!errors.pic?.finance?.phoneNumber}
                      />
                    ),
                    error: errors.pic?.finance?.phoneNumber,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Telephone",
                    input: (
                      <InputText
                        id="pic.finance.telephone"
                        name="pic.finance.telephone"
                        placeholder="Enter finance telephone"
                        className="basis-3/5"
                        value={values.pic.finance.telephone}
                        onChange={handleChange}
                        isError={!!errors.pic?.finance?.telephone}
                      />
                    ),
                    error: errors.pic?.finance?.telephone,
                  }}
                />
                <InputRow
                  firstCol={{
                    label: "Fax",
                    input: (
                      <InputText
                        id="pic.finance.fax"
                        name="pic.finance.fax"
                        placeholder="Enter finance fax"
                        className="basis-3/5"
                        value={values.pic.finance.fax}
                        onChange={handleChange}
                        isError={!!errors.pic?.finance?.fax}
                      />
                    ),
                    error: errors.pic?.finance?.fax,
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
