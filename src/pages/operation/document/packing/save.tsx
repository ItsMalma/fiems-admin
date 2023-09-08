import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import DatePicker from "@/components/Elements/DatePicker";
import Radio from "@/components/Elements/Radio";

export default function PackingSave() {
  const { setActive } = useMenu();

  React.useEffect(() => {
    setActive(3, 2, 3);
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
                  <Label name="Vessel Name" className="w-[35%]" />
                  <Select
                      placeholder="Choose vessel"
                      options={["JO00001", "JO00002"]}
                      value={0}
                      onChange={() => {}}
                      className="w-full"
                  />                
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="List Number" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div> 
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Voyage" className="w-[35%]" />
                  <Select
                      placeholder="Choose voyage"
                      options={["JO00001", "JO00002"]}
                      value={0}
                      onChange={() => {}}
                      className="w-full"
                  />
                </div>                
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                <Label name="Shipping Name" className="w-[35%]" />
                  <Select
                      placeholder="Choose shipping"
                      options={["JO00001", "JO00002"]}
                      value={0}
                      onChange={() => {}}
                      className="w-full"
                  />
                </div> 
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">                 
                </div>                
              </div>
            </>
          ),
        },
        {
          isAppend: true,
          append: "Realisasi",
          name: "Detail Realisasi",
          component: (
            <>
              <div className="flex flex-col gap-3">                         
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Product" className="w-[35%]" />
                    <Select
                      placeholder="Choose product"
                      options={["SKU0001-SABUN", "SKU0002-SHAMPOO"]}
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
                    <Label name="QTY" className="w-[35%]" />
                    <InputText placeholder="Enter quantity" className="w-full"/>
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">  
                    <Label name="Warna" className="w-[35%]" />
                    <Select
                      placeholder="Choose satuan"
                      options={["BOX", "Karton", "KG", "PCs"]}
                      value={0}
                      onChange={() => {}}
                      className="w-full"
                    />                
                  </div>
                </div>         
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
