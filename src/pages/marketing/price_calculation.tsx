import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import useHeader from "@/stores/header";

export default function PriceCalculation() {
  const { setActive } = useMenu();
  const { setTitle } = useHeader();

  React.useEffect(() => {
    setTitle("Marketing | Price Calculation");
    setActive(2, 0, 0);
  }, []);

  return (
    <FormLayout
      title=""
      tabs={[
        {
          name: "Form Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Service Type" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose Service Type"
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
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Form Number" />
                  <InputText className="basis-3/5" placeholder="" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Create Date" />
                  <InputText className="basis-3/5" placeholder="" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
            </>
          ),
        },
        {
          isAppend: true,
          append: "Customer",
          name: "Customer Calculation",
          component: (
            <div className="flex flex-col gap-1">
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Service Type" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose Service Type"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Service Type" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose Service Type"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Form Number" />
                  <InputText className="basis-3/5" placeholder="" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Create Date" />
                  <InputText className="basis-3/5" placeholder="" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
