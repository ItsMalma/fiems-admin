import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";

export default function COASave() {
  const { setActive } = useMenu();
  const [type, setType] = React.useState(1);

  React.useEffect(() => {
    setActive(1, 10, 0);
  }, [setActive]);

  return (
    <FormLayout
      onSave={() => {}}
      title="Input COA Data"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="COA Type" className="w-2/5" />
                  <Select
                    className="w-3/5"
                    placeholder="Choose COA type"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Create Date" className="w-2/5" />
                  <InputText placeholder="" className="w-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Category" className="w-2/5" />
                  <InputText
                    placeholder="Enter account category"
                    className="w-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Account Number" className="w-2/5" />
                  <InputText placeholder="" className="w-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Transaction" className="w-2/5" />
                  <InputText
                    placeholder="Enter via transaction"
                    className="w-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Account Name" className="w-2/5" />
                  <InputText
                    placeholder="Enter account name"
                    className="w-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Currency" className="w-2/5" />
                  <Select
                    className="w-3/5"
                    placeholder="Choose currency"
                    options={[
                      { label: "IDR", value: "idr" },
                      { label: "USD", value: "usd" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Account Type" className="w-2/5" />
                  <InputText
                    placeholder="Enter account type"
                    className="w-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              {type == 0 && (
                <>
                  <h1 className="font-bold text-2xl">Sub Account</h1>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center">
                    <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                      <Label name="Sub Acc. 1" className="w-2/5" />
                      <InputText placeholder="" className="w-3/5" disabled />
                    </div>
                    <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                      <Label name="Description" className="w-2/5" />
                      <InputText
                        placeholder="Enter account description"
                        className="w-3/5"
                      />
                    </div>
                  </div>
                </>
              )}
              {type == 1 && (
                <>
                  <h1 className="font-bold text-2xl">Sub Account</h1>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center">
                    <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                      <Label name="Sub Acc. 1" className="w-2/5" />
                      <Select
                        className="w-3/5"
                        placeholder="Choose sub account"
                        options={[
                          { label: "Sub 1", value: "sub1" },
                          { label: "Sub 2", value: "sub2" },
                          { label: "Sub 3", value: "sub3" },
                        ]}
                        onChange={() => {}}
                        isSearchable
                      />
                    </div>
                    <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center">
                    <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                      <Label name="Sub Acc. 2" className="w-2/5" />
                      <InputText placeholder="" className="w-3/5" disabled />
                    </div>
                    <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                      <Label name="Description" className="w-2/5" />
                      <InputText
                        placeholder="Enter account description"
                        className="w-3/5"
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          ),
        },
      ]}
    />
  );
}
