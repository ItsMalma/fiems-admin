import {
  createCOA,
  updateCOA,
  useCOA,
  useCOAs,
  useMainCOA,
  useNextCOANumber,
} from "@/api/coas";
import { useCurrencies } from "@/api/currencies";
import DatePicker from "@/components/Elements/DatePicker";
import SelectInput from "@/components/Elements/Forms/SelectInput";
import InputText from "@/components/Elements/InputText";
import SaveLayout, { InputRow } from "@/components/Layouts/SaveLayout";
import { ApiResponsePayload, COATypes, toTitleCase } from "@/libs/utils";
import {
  COAOutput,
  MainCOAOutput,
  SaveCOAInput,
  formatCOANumber,
} from "@/models/coa.model";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import {
  validateSaveMainCOA,
  validateSaveSub1COA,
  validateSaveSub2COA,
} from "@/validations/coa.validation";
import { FormikProvider, useFormik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

type Values = {
  type: SaveCOAInput["type"];
  accountName: string;
  accountType: string;
  category: string;
  transaction: string;
  currency: string;
  main?: number;
  sub1?: number;
  description?: string;
};

function valuesToInput(values: Values): SaveCOAInput {
  switch (values.type) {
    case "sub1":
      return {
        type: "sub1",
        main: values.main ?? 0,
        description: values.description ?? "",
      };
    case "sub2":
      return {
        type: "sub2",
        main: values.main ?? 0,
        sub1: values.sub1 ?? 0,
        description: values.description ?? "",
      };
    default:
      return {
        type: "main",
        accountName: values.accountName,
        accountType: values.accountType,
        category: values.category,
        transaction: values.transaction,
        currency: values.currency,
      };
  }
}

function outputToValues(output?: COAOutput): Values {
  if (output) {
    if (output.sub1) {
      if (output.sub2) {
        return {
          type: "sub2",
          accountName: output.main.accountName,
          accountType: output.accountType,
          category: output.category,
          transaction: output.transaction,
          currency: output.currency,
          main: output.main.accountNumber,
          sub1: output.sub1.accountNumber,
          description: output.sub2.description,
        };
      }
      return {
        type: "sub1",
        accountName: output.main.accountName,
        accountType: output.accountType,
        category: output.category,
        transaction: output.transaction,
        currency: output.currency,
        main: output.main.accountNumber,
        sub1: output.sub1.accountNumber,
        description: output.sub1.description,
      };
    }
    return {
      type: "main",
      accountName: output.main.accountName,
      accountType: output.accountType,
      category: output.category,
      transaction: output.transaction,
      currency: output.currency,
    };
  }
  return {
    type: "main",
    accountName: "",
    accountType: "",
    category: "",
    transaction: "",
    currency: "",
  };
}

export default function COASave() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();

  React.useEffect(() => {
    setTitle("Master Data | Account COA");
    setActive(1, 10, 0);
  }, [setTitle, setActive]);

  const router = useRouter();

  const { coa: defaultCOA, error: defaultCOAError } = useCOA(
    React.useMemo(() => {
      if (!router.query.number) {
        return null;
      } else if (typeof router.query.number === "string") {
        return router.query.number;
      } else {
        return router.query.number[0] ?? null;
      }
    }, [router.query.number])
  );

  // Memo untuk menampung create date
  const defaultCreateDate = React.useMemo(
    () =>
      defaultCOA?.createDate
        ? moment(defaultCOA.createDate, "DD/MM/YYYY").toDate()
        : new Date(),
    [defaultCOA?.createDate]
  );

  // Panggil api untuk get next main number
  const { nextNumber: nextMainNumber, error: nextMainNumberError } =
    useNextCOANumber();

  const { coas, error: coasError } = useCOAs();

  const { currencies, error: currenciesError } = useCurrencies();

  const formik = useFormik<Values>({
    enableReinitialize: true,
    initialValues: {
      type: "main",
      accountName: "",
      accountType: "",
      category: "",
      transaction: "",
      currency: "",
    },
    onSubmit: async (values, helpers) => {
      const input = valuesToInput(values);

      let res: ApiResponsePayload<MainCOAOutput> | null = null;
      if (defaultCOA) {
        res = await updateCOA(
          formatCOANumber(
            defaultCOA.main.accountNumber,
            defaultCOA.sub1?.accountNumber,
            defaultCOA.sub2?.accountNumber
          ),
          input
        );
      } else {
        res = await createCOA(input);
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
        await router.push("/master_data/account_coa");
      }
    },
    validate: (values) => {
      const input = valuesToInput(values);
      switch (input.type) {
        case "main":
          return validateSaveMainCOA(input).error ?? {};
        case "sub1":
          return validateSaveSub1COA(input).error ?? {};
        case "sub2":
          return validateSaveSub2COA(input).error ?? {};
      }
    },
  });

  const { handleSubmit, handleChange, values, errors, setValues } = formik;

  // Panggil api untuk get main coa
  const { coa: mainCOA, error: mainCOAError } = useMainCOA(values.main ?? null);

  // Memo untuk get sub 1 coa
  const sub1COA = React.useMemo(() => {
    if (mainCOA && values.sub1) {
      return mainCOA.subs.find((sub1) => sub1.accountNumber === values.sub1);
    }
  }, [mainCOA, values.sub1]);

  React.useEffect(() => {
    if (mainCOA) {
      setValues((values) => ({
        ...values,
        accountName: mainCOA.accountName,
        accountType: mainCOA.accountType,
        category: mainCOA.accountType,
        transaction: mainCOA.transaction,
        currency: mainCOA.currency,
      }));
    }
  }, [mainCOA, setValues]);

  // Memo untuk get next sub 1 number
  const nextSub1Number = React.useMemo(() => {
    if (mainCOA) {
      return mainCOA.subs.length > 0
        ? mainCOA.subs[mainCOA.subs.length - 1].accountNumber + 1
        : 1;
    }
  }, [mainCOA]);

  // Memo untuk get next sub 2 number
  const nextSub2Number = React.useMemo(() => {
    if (sub1COA) {
      return sub1COA.subs.length > 0
        ? sub1COA.subs[sub1COA.subs.length - 1].accountNumber + 1
        : 1;
    }
  }, [sub1COA]);

  React.useEffect(() => {
    if (defaultCOA || mainCOA?.subs) {
      setValues(outputToValues(defaultCOA ?? undefined));
    }
  }, [defaultCOA, mainCOA?.subs, setValues]);

  if (defaultCOAError) {
    throw defaultCOAError;
  }
  if (nextMainNumberError) {
    throw nextMainNumberError;
  }
  if (coasError) {
    throw coasError;
  }
  if (currenciesError) {
    throw currenciesError;
  }
  if (mainCOAError) {
    throw mainCOAError;
  }

  return (
    <FormikProvider value={formik}>
      <SaveLayout
        onSave={handleSubmit}
        title="Input COA Data"
        tabs={[
          {
            name: "General Information",
            component: (
              <>
                <InputRow
                  firstCol={{
                    label: "COA Type",
                    input: (
                      <SelectInput
                        id="type"
                        name="type"
                        placeholder="Choose COA type"
                        className="basis-3/5"
                        options={COATypes.map((coaType) => ({
                          label: toTitleCase(coaType),
                          value: coaType,
                        }))}
                        readOnly={!!defaultCOA}
                        isSearchable
                      />
                    ),
                    error: errors.type,
                  }}
                />
                {values.type && (
                  <>
                    <hr />
                    <InputRow
                      firstCol={{
                        label: "Create Date",
                        input: (
                          <DatePicker
                            id="createDate"
                            name="createDate"
                            className="basis-3/5"
                            defaultValue={defaultCreateDate}
                            readOnly
                          />
                        ),
                      }}
                      secondCol={{
                        label: "Category",
                        input: (
                          <InputText
                            id="category"
                            name="category"
                            placeholder="Enter category"
                            className="basis-3/5"
                            value={values.category}
                            readOnly={values.type !== "main"}
                            onChange={handleChange}
                            isError={!!errors.category}
                          />
                        ),
                        error: errors.category,
                      }}
                    />
                    <InputRow
                      firstCol={{
                        label: "Account Number",
                        input:
                          values.type === "main" ? (
                            <InputText
                              id="mainNumber"
                              name="mainNumber"
                              className="basis-3/5"
                              value={values.main ?? nextMainNumber ?? 0}
                              readOnly
                            />
                          ) : (
                            <SelectInput
                              id="main"
                              name="main"
                              placeholder="Choose main coa"
                              className="basis-3/5"
                              options={
                                coas
                                  ? coas.map((coa) => ({
                                      label: `${coa.accountNumber} | ${coa.accountName}`,
                                      value: coa.accountNumber,
                                    }))
                                  : []
                              }
                              isSearchable
                            />
                          ),
                        error: values.type !== "main" ? errors.main : "",
                      }}
                      secondCol={{
                        label: "Transaction",
                        input: (
                          <InputText
                            id="transaction"
                            name="transaction"
                            placeholder="Enter transaction method"
                            className="basis-3/5"
                            value={values.transaction}
                            readOnly={values.type !== "main"}
                            onChange={handleChange}
                            isError={!!errors.transaction}
                          />
                        ),
                        error: errors.transaction,
                      }}
                    />
                    <InputRow
                      firstCol={{
                        label: "Account Name",
                        input: (
                          <InputText
                            id="accountName"
                            name="accountName"
                            placeholder="Enter account name"
                            className="basis-3/5"
                            value={values.accountName}
                            readOnly={values.type !== "main"}
                            onChange={handleChange}
                            isError={!!errors.accountName}
                          />
                        ),
                        error: errors.accountName,
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
                              currencies
                                ? currencies.map((currencie) => ({
                                    label: currencie,
                                    value: currencie,
                                  }))
                                : []
                            }
                            readOnly={values.type !== "main"}
                            isSearchable
                          />
                        ),
                        error: errors.currency,
                      }}
                    />
                    <InputRow
                      firstCol={{
                        label: "Account Type",
                        input: (
                          <InputText
                            id="accountType"
                            name="accountType"
                            placeholder="Enter account type"
                            className="basis-3/5"
                            value={values.accountType}
                            readOnly={values.type !== "main"}
                            onChange={handleChange}
                            isError={!!errors.accountType}
                          />
                        ),
                        error: errors.accountType,
                      }}
                    />
                    {values.type !== "main" && (
                      <>
                        <hr />
                        <InputRow
                          firstCol={{
                            label: "Account COA 1",
                            input:
                              values.type === "sub1" ? (
                                <InputText
                                  id="sub1Number"
                                  name="sub1Number"
                                  className="basis-3/5"
                                  value={
                                    defaultCOA?.sub1?.accountNumber ??
                                    nextSub1Number ??
                                    ""
                                  }
                                  readOnly
                                />
                              ) : (
                                <SelectInput
                                  id="sub1"
                                  name="sub1"
                                  placeholder="Choose sub 1 coa"
                                  className="basis-3/5"
                                  options={
                                    mainCOA?.subs
                                      ? mainCOA.subs.map((coa) => ({
                                          label: `${coa.accountNumber} | ${coa.description}`,
                                          value: coa.accountNumber,
                                        }))
                                      : []
                                  }
                                  isSearchable
                                />
                              ),
                            error: values.type !== "sub1" ? errors.sub1 : "",
                          }}
                          secondCol={{
                            label: "Account Description",
                            input:
                              values.type === "sub1" ? (
                                <InputText
                                  id="description"
                                  name="description"
                                  placeholder="Enter description"
                                  className="basis-3/5"
                                  value={values.description ?? ""}
                                  onChange={handleChange}
                                  isError={!!errors.description}
                                />
                              ) : (
                                <InputText
                                  id="sub1Description"
                                  name="sub1Description"
                                  className="basis-3/5"
                                  value={sub1COA?.description ?? ""}
                                  readOnly
                                />
                              ),
                            error:
                              values.type === "sub1" ? errors.description : "",
                          }}
                        />
                        {values.type === "sub2" && (
                          <>
                            <hr />
                            <InputRow
                              firstCol={{
                                label: "Account COA 2",
                                input: (
                                  <InputText
                                    id="sub2Number"
                                    name="sub2Number"
                                    className="basis-3/5"
                                    value={
                                      defaultCOA?.sub2?.accountNumber ??
                                      nextSub2Number ??
                                      ""
                                    }
                                    readOnly
                                  />
                                ),
                              }}
                              secondCol={{
                                label: "Account Description",
                                input: (
                                  <InputText
                                    id="description"
                                    name="description"
                                    placeholder="Enter description"
                                    className="basis-3/5"
                                    value={values.description ?? ""}
                                    onChange={handleChange}
                                    isError={!!errors.description}
                                  />
                                ),
                                error: errors.description,
                              }}
                            />
                          </>
                        )}
                      </>
                    )}
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
