import { Form, FormDate, FormCode, FormSelect, FormText } from '@/components/Forms';
import SaveLayout from "@/components/Layouts/SaveLayout";
import { useQuery } from "@/libs/hooks";
import { inquiryJobOrderOptions, inquiryTypeOrderOptions } from '@/server/dtos/inquiry.dto';
import useHeader from "@/stores/header";
import useMenu from "@/stores/menu";
import useModal from "@/stores/modal";
import useToast from "@/stores/toast";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

export default function InquiryPage() {
  // Gunakan store useHeader untuk mengset judul di header
  const { setTitle } = useHeader();

  // Gunakan store useMenu untuk mengset menu yang aktif
  const { setActive } = useMenu();

  // Effect untuk mengset menu yang aktif
  React.useEffect(() => {
    setTitle("Marketing | Inquiry Container");
    setActive(2, 2, 0);
  }, [setTitle, setActive]);

  // Mendapatkan router
  const router = useRouter();

  const { setModal } = useModal();

  const { addToasts } = useToast();

  const queryNumber = useQuery("number");

  const [appendIndex, setAppendIndex] = React.useState(0);

  const methods = useForm({});
  const { reset, setValue } = methods;
  const values = methods.watch();

  const onSubmit = methods.handleSubmit(async (data) => {

  });

  return (
    <SaveLayout
      onSave={onSubmit}
      title="Input Inquiry Container"
      isLoading={!values}
    >
      <Form
        methods={methods}
        tabs={[
          {
            id: "inquiryInformation",
            name: "Inquiry Information",
            controls: [
              {
                type: "input",
                id: "number",
                label: "Inquiry Number",
                input: <FormCode name="number" readOnly />,
              },
              {
                type: "input",
                id: "createDate",
                label: "Inquiry Date",
                input: <FormDate name="createDate" isDefault />,
              },
              {
                type: "input",
                id: "sales",
                label: "Sales",
                input: <FormSelect
                  name="sales"
                  options={[]}
                />
              }
            ]
          },
          {
            id: "customerInformation",
            name: "Customer Information",
            controls: [
              {
                type: "input",
                id: "factory",
                label: "Factory",
                input: <FormSelect
                  name="factory"
                  options={[]}
                />
              },
              {
                type: "input",
                id: "factoryGroup",
                label: "Group",
                input: <FormText name="factoryGroup" readOnly />,
              },
              {
                type: "input",
                id: "factoryAddress",
                label: "Address",
                input: <FormText name="factoryAddress" readOnly />,
              },
              {
                type: "input",
                id: "factoryCity",
                label: "City",
                input: <FormText name="factoryCity" readOnly />,
              },
              {
                type: "separator",
              },
              {
                type: "input",
                id: "purchase",
                label: "Purchase",
                input: <FormSelect
                  name="purchase"
                  options={[]}
                />
              },
              {
                type: "input",
                id: "purchaseAddress",
                label: "Address",
                input: <FormText name="purchaseAddress" readOnly />,
              },
              {
                type: "input",
                id: "purchaseCity",
                label: "City",
                input: <FormText name="purchaseCity" readOnly />,
              }
            ]
          },
          {
            id: "detailOrder",
            name: "Detail Order",
            controls: [
              {
                type: "input",
                id: "jobOrder",
                label: "Job Order",
                input: (
                  <FormSelect
                    name='jobOrder'
                    options={inquiryJobOrderOptions}
                  />
                )
              },
              {
                type: "input",
                id: "typeOrder",
                label: "Type Order",
                input: (
                  <FormSelect
                    name='typeOrder'
                    options={inquiryTypeOrderOptions}
                  />
                )
              },
              {
                type: "separator"
              },
              {
                type: "input",
                id: "factory",
                label: "Delivery To",
                input: <FormSelect
                  name="factory"
                  options={[]}
                />
              },
              {
                type: "input",
                id: "factoryCity",
                label: "City",
                input: <FormText name="factoryCity" readOnly />,
              },
              {
                type: "input",
                id: "route",
                label: "Route",
                input: (
                  <FormSelect
                    name="route"
                    options={[]}
                  />
                ),
              },
            ],
            isAppend: true,
            itemName: "Detail",
            fieldName: "details",
            onChangeItem: (index) => setAppendIndex(index),
          }
        ]}
      />
    </SaveLayout>
  );
}
