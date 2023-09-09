import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import DatePicker from "@/components/Elements/DatePicker";
import Radio from "@/components/Elements/Radio";
import TextArea from "@/components/Elements/TextArea";

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
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Insurance Ref. Num." className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div> 
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>                
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                <Label name="JO. Num." className="w-[35%]" />
                  <Select
                      placeholder="Choose job order number"
                      options={["JO00001", "JO00002"]}
                      value={0}
                      onChange={() => {}}
                      className="w-full"
                  />
                </div> 
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">                 
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
                  <Label name="City" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="City" className="w-[35%]" />
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
                  <Label name="Vessel Name" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">                  
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Voyage" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Nilai Tertanggung" className="w-[35%]" />
                  <InputText placeholder="" className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">                  
                </div>                
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Premi" className="w-[35%]" />
                  <InputText placeholder="Enter premi" className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">                  
                </div>                
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Premi dibayarkan" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">                  
                </div>                
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 basis-1/2">
                    <Label name="Keterangan" className="w-[35%]" />
                    <TextArea placeholder="Enter keterangan" className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">                  
                </div>               
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
