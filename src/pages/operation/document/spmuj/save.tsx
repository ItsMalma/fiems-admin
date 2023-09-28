import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";

export default function VehicleSave() {
  const { setActive } = useMenu();

  React.useEffect(() => {
    setActive(3, 2, 0);
  }, [setActive]);

  return (
    <FormLayout
      onSave={() => {}}
      title="Input Vehicle Data"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Create Date" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="SPM Number" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="JO. Num." className="basis-2/5" />
                  <Select
                    placeholder="Choose job number"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer Name" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer To" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Stuffing Date" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Number" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Tracking Route" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Type" className="basis-2/5" />
                  <InputText className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Tracking Name" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="basis-2/5" />
                  <div className="flex gap-3 basis-3/5 items-center">
                    <InputText placeholder="" className="basis-3/5" disabled />
                    <Label name="Seal" />
                    <InputText placeholder="" className="basis-3/5" disabled />
                  </div>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Driver Name" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="basis-2/5" />
                  <div className="flex gap-3 basis-3/5 items-center">
                    <InputText placeholder="" className="basis-3/5" disabled />
                    <Label name="Seal" />
                    <InputText placeholder="" className="basis-3/5" disabled />
                  </div>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Uang Jalan" className="basis-2/5 font-bold" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
