import {
  Form,
  FormCode,
  FormDate,
  FormSelect,
  FormText,
} from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import { setValues } from "@/libs/functions";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import { COAForm } from "@/server/dtos/coa.dto";
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
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

  const methods = useForm<COAForm>({
    defaultValues: COAForm.initial("Main"),
  });
  const { setValue, reset } = methods;

  const value = methods.watch();

  const [isDefault, setIsDefault] = React.useState(true);
  React.useEffect(() => {
    setIsDefault(true);
  }, [setValue, value.type]);

  const formQuery = trpc.coas.getForm.useQuery({
    number: queryNumber,
    type: value.type,
    main: value.type === "Main" ? undefined : value.main,
    sub1: value.sub1,
    sub2: value.sub2,
    isDefault,
  });

  React.useEffect(() => {
    if (formQuery.data?.value && setValue) {
      setValues(formQuery.data.value, (name, value) => {
        setValue(name, value);
      });
    }
  }, [formQuery.data?.value, setValue]);

  React.useEffect(() => {
    if (formQuery.data?.defaultValue && reset) {
      reset(formQuery.data.defaultValue);
      setIsDefault(false);
    }
  }, [formQuery.data?.defaultValue, reset]);

  const saveMainMutation = trpc.coas.saveMain.useMutation();
  const saveSub1Mutation = trpc.coas.saveSub1.useMutation();
  const saveSub2Mutation = trpc.coas.saveSub2.useMutation();

  const onSubmit = methods.handleSubmit(async (data) => {
    switch (data.type) {
      case "Main":
        await saveMainMutation.mutateAsync({
          ...data,
          accountName: data.accountName,
        });
    }

    await router.push("/master_data/account_coa");
  });

  return (
    <SaveLayout onSave={onSubmit} title="Input COA Data" isLoading={!value}>
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
                  value.type === "Main" ? (
                    <FormCode name="main" readOnly />
                  ) : (
                    <FormSelect
                      name="main"
                      options={formQuery.data?.mainCOAs ?? []}
                    />
                  ),
              },
              {
                type: "input",
                id: "accountName",
                label: "Account Name",
                input: (
                  <FormText
                    name="accountName"
                    readOnly={value.type !== "Main"}
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
                    readOnly={value.type !== "Main"}
                  />
                ),
              },
              {
                type: "input",
                id: "category",
                label: "Category",
                input: (
                  <FormText name="category" readOnly={value.type !== "Main"} />
                ),
              },
              {
                type: "input",
                id: "transaction",
                label: "Transaction",
                input: (
                  <FormText
                    name="transaction"
                    readOnly={value.type !== "Main"}
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
                    options={formQuery.data?.currencies ?? []}
                    readOnly={value.type !== "Main"}
                  />
                ),
              },
              {
                type: "separator",
                isHidden: value.type === "Main" || !!value.main,
              },
              {
                type: "input",
                id: "sub1",
                label: "Account COA 1",
                input:
                  value.type === "Sub 1" ? (
                    <FormCode name="sub1" readOnly />
                  ) : (
                    <FormSelect
                      name="sub1"
                      options={formQuery.data?.sub1COAs ?? []}
                    />
                  ),
                isHidden: value.type === "Main" || !!value.main,
              },
              {
                type: "input",
                id: "sub1Description",
                label: "Account Description",
                input: (
                  <FormText
                    name="sub1Description"
                    readOnly={value.type !== "Sub 1"}
                  />
                ),
                isHidden: value.type === "Main" || !!value.main,
              },
              {
                type: "separator",
                isHidden: value.type !== "Sub 2" || !!value.sub1,
              },
              {
                type: "input",
                id: "sub2",
                label: "Account COA 2",
                input: <FormCode name="sub1" readOnly />,
                isHidden: value.type !== "Sub 2" || !!value.sub1,
              },
              {
                type: "input",
                id: "sub2Description",
                label: "Account Description",
                input: <FormText name="sub2Description" />,
                isHidden: value.type !== "Sub 2" || !!value.sub1,
              },
            ],
          },
        ]}
      />
    </SaveLayout>
  );
}
