import {
  Form,
  FormCode,
  FormDate,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import {
  COAForm,
  mainCOAInput,
  sub1COAInput,
  sub2COAInput,
} from "@/server/dtos/coa.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function COASave() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();

  React.useEffect(() => {
    setTitle("Master Data | Account COA");
    setActive(1, 10, 0);
  }, [setTitle, setActive]);

  const router = useRouter();

  const queryNumber = useQuery("number");
  const coaQuery = trpc.coas.getCOAForm.useQuery(queryNumber);
  const nextAccountNumber = trpc.coas.getNextCOANumber.useQuery();
  const mainCOAs = trpc.coas.getCOAs.useQuery();

  const methods = useForm<COAForm>({
    defaultValues: COAForm.initial("Main"),
    resolver: (value, ctx, opts) => {
      switch (value.type) {
        case "Main":
          return zodResolver(mainCOAInput)(value, ctx, opts);
        case "Sub 1":
          return zodResolver(sub1COAInput)(value, ctx, opts);
        case "Sub 2":
          return zodResolver(sub2COAInput)(value, ctx, opts);
      }
    },
  });
  const { setValue, reset } = methods;
  const values = methods.watch();

  // Memo for main coa options
  const mainCOAsOptions = React.useMemo(() => {
    return (
      mainCOAs.data?.map((mainCOA) => ({
        label: `${mainCOA.number} (${mainCOA.accountName})`,
        value: mainCOA.number,
      })) ?? []
    );
  }, [mainCOAs?.data]);

  // Set default
  React.useEffect(() => {
    if (!queryNumber) {
      reset(COAForm.initial(values.type));
    } else if (coaQuery.data) {
      reset(coaQuery.data);
    }
  }, [coaQuery.data, queryNumber, reset, values.type]);
  // React.useEffect(() => {
  //   if (coaQuery.data) {
  //     reset(coaQuery.data);
  //   }
  // }, [queryNumber, coaQuery.data, mainCOAs.data, reset]);

  React.useEffect(() => {
    if (nextAccountNumber.data && values.type !== "Sub 1" && !queryNumber) {
      setValue("main", nextAccountNumber.data);
    }
  }, [nextAccountNumber.data, values.type, setValue, queryNumber]);

  // Memo untuk nyimpen main coa yang diselect
  const mainCOA = React.useMemo(() => {
    return mainCOAs.data?.find((mainCOA) => mainCOA.number === values.main);
  }, [mainCOAs.data, values.main]);

  // Memo untuk nyimpen sub 1 coa yang diselect
  const sub1COA = React.useMemo(() => {
    return mainCOA?.subs.find(
      (_, sub1COAIndex) => sub1COAIndex + 1 === values.sub1
    );
  }, [mainCOA?.subs, values.sub1]);

  React.useEffect(() => {
    if (mainCOA && values.type !== "Main") {
      setValue("accountName", mainCOA.accountName);
      setValue("accountType", mainCOA.accountType);
      setValue("category", mainCOA.category);
      setValue("currency", mainCOA.currency);
      setValue("transaction", mainCOA.transaction);
      if (mainCOA.number !== coaQuery.data?.main) {
        setValue("sub1", mainCOA.subs.length + 1);
      }
    } else if (values.type === "Main") {
      setValue("accountName", "");
      setValue("accountType", "");
      setValue("category", "");
      setValue("currency", "");
      setValue("transaction", "");
    }
  }, [mainCOA, values.type, setValue, coaQuery.data]);

  React.useEffect(() => {
    if (sub1COA && values.type === "Sub 2") {
      setValue("sub1Description", sub1COA.description);
      if (values.sub1 !== coaQuery.data?.sub1) {
        setValue("sub2", sub1COA.subs.length + 1);
      }
    } else if (values.type === "Sub 2") {
      setValue("sub1", 0);
      setValue("sub1Description", "");
    }
  }, [coaQuery.data?.sub1, setValue, sub1COA, values.sub1, values.type]);

  const currencies = trpc.coas.getCurrencies.useQuery();

  const saveMainMutation = trpc.coas.saveMain.useMutation();
  const saveSub1Mutation = trpc.coas.saveSub1.useMutation();
  const saveSub2Mutation = trpc.coas.saveSub2.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    switch (data.type) {
      case "Main":
        await saveMainMutation.mutateAsync({
          ...data,
          number: queryNumber,
        });
        break;
      case "Sub 1":
        await saveSub1Mutation.mutateAsync({
          ...data,
          main: data.main.toString(),
          number: queryNumber,
        });
        break;
      case "Sub 2":
        await saveSub2Mutation.mutateAsync({
          ...data,
          main: data.main.toString(),
          sub1: data.sub1.toString(),
          number: queryNumber,
        });
        break;
    }

    await router.push("/master_data/account_coa");
  });

  return (
    <SaveLayout onSave={onSubmit} title="Input COA Data" isLoading={!values}>
      <Form
        methods={methods}
        tabs={[
          {
            id: "generalInformation",
            name: "General Information",
            controls: [
              {
                type: "input",
                id: "createDate",
                label: "Create Date",
                input: <FormDate name="createDate" readOnly />,
              },
              {
                type: "input",
                id: "type",
                label: "COA Type",
                input: (
                  <FormSelect
                    name="type"
                    options={COAForm.typeOptions}
                    readOnly={!!queryNumber}
                  />
                ),
              },
              {
                type: "separator",
              },
              {
                type: "input",
                id: "main",
                label: "Account Number",
                input:
                  values.type === "Main" ? (
                    <FormCode name="main" readOnly />
                  ) : (
                    <FormSelect name="main" options={mainCOAsOptions} />
                  ),
              },
              {
                type: "input",
                id: "accountName",
                label: "Account Name",
                input: (
                  <FormText
                    name="accountName"
                    readOnly={values.type !== "Main"}
                  />
                ),
              },
              {
                type: "input",
                id: "accountType",
                label: "Account Type",
                input: (
                  <FormText
                    name="accountType"
                    readOnly={values.type !== "Main"}
                  />
                ),
              },
              {
                type: "input",
                id: "category",
                label: "Category",
                input: (
                  <FormText name="category" readOnly={values.type !== "Main"} />
                ),
              },
              {
                type: "input",
                id: "transaction",
                label: "Transaction",
                input: (
                  <FormText
                    name="transaction"
                    readOnly={values.type !== "Main"}
                  />
                ),
              },
              {
                type: "input",
                id: "currency",
                label: "Currency",
                input: (
                  <FormSelect
                    name="currency"
                    options={
                      currencies.data
                        ? currencies.data.map((currency) => ({
                            label: currency,
                            value: currency,
                          }))
                        : []
                    }
                    readOnly={values.type !== "Main"}
                  />
                ),
              },
              {
                type: "separator",
                isHidden: values.type === "Main",
              },
              {
                type: "input",
                id: "sub1",
                label: "Account COA 1",
                input:
                  values.type === "Sub 1" ? (
                    <FormCode name="sub1" readOnly />
                  ) : (
                    <FormSelect
                      name="sub1"
                      options={
                        mainCOA?.subs.map((sub1COA, sub1COAIndex) => ({
                          label: `${mainCOA.number}.${sub1COAIndex + 1} (${
                            sub1COA.description
                          })`,
                          value: sub1COAIndex + 1,
                        })) ?? []
                      }
                    />
                  ),
                isHidden: values.type === "Main",
              },
              {
                type: "input",
                id: "sub1Description",
                label: "Account Description",
                input: (
                  <FormText
                    name="sub1Description"
                    readOnly={values.type !== "Sub 1"}
                  />
                ),
                isHidden: values.type === "Main",
              },
              {
                type: "separator",
                isHidden: values.type !== "Sub 2",
              },
              {
                type: "input",
                id: "sub2",
                label: "Account COA 2",
                input: <FormCode name="sub2" readOnly />,
                isHidden: values.type !== "Sub 2",
              },
              {
                type: "input",
                id: "sub2Description",
                label: "Account Description",
                input: <FormText name="sub2Description" />,
                isHidden: values.type !== "Sub 2",
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
