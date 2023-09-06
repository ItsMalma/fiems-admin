import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import DatePicker from "@/components/Elements/DatePicker";
import Radio from "@/components/Elements/Radio";

export default function BASTSave() {
  const { setActive } = useMenu();

  React.useEffect(() => {
    setActive(3, 2, 2);
  }, []);

  return (
    <FormLayout
      title="Input Vehicle Data"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Create Date" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">  
                  <Label name="Shipment Number" className="w-[35%]" />
                  <InputText placeholder="Enter shipment/DO number" className="w-full" />                
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="SJ Number" className="w-[35%]" />
                  <Select
                      placeholder="Choose job number"
                      options={["JO00001", "JO00002"]}
                      value={0}
                      onChange={() => {}}
                      className="w-full"
                    />
                </div> 
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="JO. Num." className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>                
                </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer Name" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Consignee" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
              </div>   
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
              </div>   
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Number" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Shipping Name" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vessel Name" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Voyage" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="w-[35%]" />
                  <div className="flex gap-3 w-full items-center">
                    <InputText placeholder="" className="w-full" disabled/>
                    <Label name="Seal"/>
                    <InputText placeholder="" className="w-full" disabled/>
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="w-[35%]" />
                  <div className="flex gap-3 w-full items-center">
                    <InputText placeholder="" className="w-full" disabled/>
                    <Label name="Seal"/>
                    <InputText placeholder="" className="w-full" disabled/>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          isAppend: true,
          append: "Product",
          name: "Product Detail",
          component: (
            <>
              <div className="flex flex-col gap-3">
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
