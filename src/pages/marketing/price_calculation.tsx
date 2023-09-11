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
                  <Label name="Service Type" className="w-[35%]" />
                  <Select
                    placeholder="Choose "
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Form Number" className="w-[35%]" />
                  <InputText placeholder="" disabled className="w-full" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Create Date" className="w-[35%]" />
                  <InputText placeholder="" disabled className="w-full" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Marketing Name" className="w-[35%]" />
                  <Select
                    placeholder="Choose sales"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer Name" className="w-[35%]" />
                  <Select
                    placeholder="Choose customer"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Effective Date" className="w-[35%]" />
                  <DatePicker className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="w-[35%]" />
                  <InputText placeholder="" disabled className="w-full" />
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
                  <Label name="Route" className="w-[35%]" />
                  <Select
                    placeholder="Choose route"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Delivery To" className="w-[35%]" />
                  <Select
                    placeholder="Choose customer"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Via Port" className="w-[35%]" />
                  <InputText placeholder="" disabled className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="w-[35%]" />
                  <InputText placeholder="" disabled className="w-full" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Container Type" className="w-[35%]" />
                  <Select
                    placeholder="Choose container type"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="City" className="w-[35%]" />
                  <InputText placeholder="" disabled className="w-full" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Container Size" className="w-[35%]" />
                  <Select
                    placeholder="Choose container size"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">Tracking Asal</h1>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">Tracking Tujuan</h1>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Via Port" className="w-[35%]" />
                  <Select
                    placeholder="Choose port"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vendor Name" className="w-[35%]" />
                  <Select
                    placeholder="Choose vendor"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vendor Name" className="w-[35%]" />
                  <Select
                    placeholder="Choose vendor"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="w-[35%]" />
                  <Select
                    placeholder="Choose route"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="w-[35%]" />
                  <Select
                    placeholder="Choose route"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col gap-1 basis-1/2 relative">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center">
                    <Label name="Amount" className="w-[35%]" />
                    <InputText placeholder="Rp" disabled className="w-full" />
                  </div>
                  <u 
                    className="text-sm text-gray-400 cursor-pointer absolute right-0 bottom-[-1.5rem]"
                  >
                    Amount Detail+
                  </u>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex flex-col gap-1 basis-1/2 relative">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center">
                    <Label name="Amount" className="w-[35%]" />
                    <InputText placeholder="Rp" disabled className="w-full" />
                  </div>
                  <u 
                    className="text-sm text-gray-400 cursor-pointer absolute right-0 bottom-[-1.5rem]"
                  >
                    Amount Detail+
                  </u>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
