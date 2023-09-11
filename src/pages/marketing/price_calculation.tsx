import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import useHeader from "@/stores/header";
import DatePicker from "@/components/Elements/DatePicker";

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
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Marketing Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose sales"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose customer"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Effective Date" className="basis-2/5" />
                  <DatePicker className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="" disabled className="basis-3/5" />
                </div>
              </div>
            </>
          ),
        },
        {
          isAppend: true,
          append: "Customer",
          name: "Customer Calculation",
          component: (
            <div className="flex flex-col gap-3">
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="basis-2/5" />
                  <Select
                    placeholder="Choose route"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Service Type" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose service type"
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
                  <Label className="basis-2/5" name="City" />
                  <InputText className="basis-3/5" placeholder="" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Container Size" className="basis-2/5" />
                  <Select
                    placeholder="Choose container size"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                    Tracking Asal
                  </h1>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                    Tracking Tujuan
                  </h1>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Via Port" className="basis-2/5" />
                  <Select
                    placeholder="Choose port"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vendor Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose vendor"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vendor Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose vendor"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="basis-2/5" />
                  <Select
                    placeholder="Choose route"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Create Date" />
                  <InputText className="basis-3/5" placeholder="" disabled />
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
