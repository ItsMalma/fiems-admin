import { Select } from "@/components/Elements";
import { Form, FormCode, FormDate, FormSelect, FormText } from "@/components/Forms";
import SaveLayout, { InputRow } from "@/components/Layouts/SaveLayout";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import { AccountType, CoaForm } from "@/server/dtos/coa.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form"

export default function COASave() {
  const { setTitle } = useHeader();
  const { setActive } = useMenu();

  React.useEffect(() => {
    setTitle("Master Data | Account COA");
    setActive(1, 10, 0);
  }, [setTitle, setActive]);

  const router = useRouter();

  const queryNumber = useQuery("number");
  const queryType = (useQuery("type") ?? "Main Coa") as AccountType;

  const methods = useForm<CoaForm>({
    defaultValues: CoaForm.mainCoaInitial(queryType),
  });
  const { reset, setValue } = methods;
  const accountType = methods.watch("accountType");
  const formQuery = trpc.coa.getForm.useQuery({
    number: queryNumber,
    type: accountType
  });
  React.useEffect(() => {
    if (formQuery.data?.defaultValue && reset) {
      reset(formQuery.data.defaultValue, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [formQuery.data?.defaultValue, reset]);

  const saveMutation = trpc.coa.save.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    await saveMutation.mutateAsync({
      ...data,
      number: queryNumber,
    });

    await router.push("/master_data/account_coa");
  });

  return (
    <SaveLayout
        onSave={onSubmit}
        title="Input COA Data"
        isLoading={!formQuery.data?.defaultValue}
      >
        <Form
          methods={methods}
          tabs={[
            {
              id: "generalInformation",
              name: "General Information",
              controls :[
                {
                  type: "input",
                  id: "accountType",
                  label: "COA Type",
                  input: 
                    <FormSelect
                      name="accountType"
                      options={CoaForm.typeOptions}
                      readOnly={!!queryNumber}
                    />,
                },
                {
                  type: "blank"
                },
                {
                  type: "input",
                  id: "createDate",
                  label: "Create Date",
                  input: <FormDate name="createDate" readOnly />,
                },
                {
                  type: "input",
                  id: "category",
                  label: "Category",
                  input: <FormText name="category"/>,
                },
                {
                  type: "input",
                  id: "number",
                  label: "Account Number",
                  input: <FormText name="number" readOnly/>,
                  isHidden: accountType !== "Main Coa"
                },
                {
                  type: "input",
                  id: "number",
                  label: "Account Number",
                  input: <FormSelect name="coa1" options={formQuery.data?.coa1 ?? []} readOnly={accountType === "Sub Coa 2" || !!formQuery.data?.defaultValue.number}/>,
                  isHidden: accountType === "Main Coa",
                },
                {
                  type: "input",
                  id: "transaction",
                  label: "Transaction",
                  input: <FormText name="transaction"/>,
                },
                {
                  type: "input",
                  id: "description",
                  label: "Account Name",
                  input: <FormText name="description"/>,
                },
                {
                  type: "input",
                  id: "currency",
                  label: "Currency",
                  input: <FormText name="currency"/>,
                },
                {
                  type: "input",
                  id: "type",
                  label: "Account Type",
                  input: <FormText name="type"/>,
                },
                {
                  type: "separator",
                  isHidden: accountType !== "Sub Coa 1"
                },
                {
                  type: "input",
                  id: "coa1",
                  label: "Sub Account 1 Number",
                  input: <FormSelect name="coa1" options={formQuery.data?.coa1 ?? []}/>,
                  isHidden: accountType !== "Sub Coa 2"
                },
                {
                  type: "input",
                  id: "coa1Description",
                  label: "Sub Account 1 Description",
                  input: <FormCode name="coa1Description" />,
                  isHidden: accountType === "Main Coa"
                },
                {
                  type: "separator",
                  isHidden: accountType !== "Sub Coa 2"
                },
                {
                  type: "input",
                  id: "coa2Description",
                  label: "Sub Account 2 Description",
                  input: <FormCode name="coa2Description" />,
                  isHidden: accountType !== "Sub Coa 2"
                },
              ]
            }
          ]}
        />
      </SaveLayout>
  );
}
