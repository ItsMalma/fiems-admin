import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import DatePicker from "@/components/Elements/DatePicker";
import Button from "@/components/Elements/Button";
import useModal from "@/stores/modal";

export default function JobOrderConfirm() {
  const { setModal } = useModal();
  const { setActive } = useMenu();

  const [combo, setCombo] = React.useState(0);

  React.useEffect(() => {
    setActive(3, 0, 0);
  }, []);


  return (
    <FormLayout
      title="Confirm Job Order"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Confirm Date" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="JO Num." className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
              </div>              
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Inq. Date" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Inq. Num." className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
              </div>              
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Marketing" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>  
              <hr></hr>    
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Load Date" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer Name" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer To" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="City" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Type" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Size" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
              </div>    
              <hr></hr>
              <h1 className="text-gray-800 font-bold text-2xl mb-1.5">Confirmation</h1>    
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Type Order" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="RO Number" className="w-[35%]" />
                  <InputText placeholder="Enter RO number" className="w-full"/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Consignee" className="w-[35%]" />
                  <Select
                    placeholder="Choose vendor"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Email" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Telephone Number" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="City" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2 justify-end">
                  <div 
                    className="flex px-3 py-[9px] 2xl:px-4 2xl:py-3 justify-center items-center gap-3 2xl:gap-4 rounded-[10px] font-semibold bg-primary text-white cursor-pointer" 
                    onClick={() => setCombo(1)}
                  >
                    Convert to Combo
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          isHide: combo === 0,
          name: "Convert to Combo",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Stuffing Date" className="w-[35%]" />
                  <DatePicker className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Tracking Route" className="w-[35%]" />
                  <Select
                    placeholder="Choose route"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Number" className="w-[35%]" />
                  <Select
                    placeholder="Choose vendor"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Tracking Name" className="w-[35%]" />
                  <Select
                    placeholder="Choose tracking name"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Type" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Driver Name" className="w-[35%]" />
                  <InputText placeholder="Enter driver name" className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="w-[35%]" />
                  <div className="flex gap-3 w-full items-center">
                    <InputText placeholder="Enter container number" className="w-full"/>
                    <Label name="Seal"/>
                    <InputText placeholder="Enter seal number" className="w-full"/>
                  </div>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="w-[35%]" />
                  <InputText placeholder="Enter phone number" className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="w-[35%]" />
                  <div className="flex gap-3 w-full items-center">
                    <InputText placeholder="Enter container number" className="w-full"/>
                    <Label name="Seal"/>
                    <InputText placeholder="Enter seal number" className="w-full"/>
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
