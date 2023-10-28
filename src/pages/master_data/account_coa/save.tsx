import { Select } from "@/components/Elements";
import { Form, FormCode, FormDate, FormSelect } from "@/components/Forms";
import SaveLayout, { InputRow } from "@/components/Layouts/SaveLayout";
import { useQuery } from "@/libs/hooks";
import { trpc } from "@/libs/trpc";
import { CoaForm } from "@/server/dtos/coa.dto";
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

  const methods = useForm<CoaForm>({
    defaultValues: CoaForm.initial,
  });
  const { reset, setValue } = methods;

  const formQuery = trpc.mainCoa.getForm.useQuery({
    number: queryNumber
  });
  React.useEffect(() => {
    if (formQuery.data?.defaultValue && reset) {
      reset(formQuery.data.defaultValue, {
        keepDirtyValues: true,
        keepErrors: true,
      });
    }
  }, [formQuery.data?.defaultValue, reset]);

  const saveMutation = trpc.mainCoa.save.useMutation();

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
                  label: "Job Position",
                  input: <Select options={}/>,
                },
                {
                  type: "input",
                  id: "createDate",
                  label: "Create Date",
                  input: <FormDate name="createDate" readOnly />,
                },
                {
                  type: "input",
                  id: "code",
                  label: "Sales Code",
                  input: <FormCode name="code" readOnly />,
                },
                {
                  type: "input",
                  id: "jobPosition",
                  label: "Job Position",
                  input: <FormSelect name="jobPosition" options={SalesForm.typeOptions} readOnly={!!queryCode}/>,
                },
                {
                  type: "separator",
                },
                {
                  type: "input",
                  id: "name",
                  label: "Marketing Name",
                  input: <FormCode name="name" />,
                },
                {
                  type: "input",
                  id: "telephone",
                  label: "Telephone",
                  input: <FormCode name="telephone" />,
                },
                {
                  type: "input",
                  id: "nik",
                  label: "NIK",
                  input: <FormCode name="nik" />,
                },
                {
                  type: "input",
                  id: "fax",
                  label: "Fax",
                  input: <FormCode name="fax" />,
                },
                {
                  type: "input",
                  id: "area",
                  label: "Cabang",
                  input: <FormCode name="area" />,
                },
                {
                  type: "input",
                  id: "email",
                  label: "Email",
                  input: <FormCode name="email" />,
                },
                {
                  type: "input",
                  id: "phoneNumber",
                  label: "Phone Number",
                  input: <FormCode name="phoneNumber" />,
                },
              ]
            }
          ]}
        />
      </SaveLayout>
  );
}
