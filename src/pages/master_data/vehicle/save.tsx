import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import DatePicker from "@/components/Elements/DatePicker";

export default function VehicleSave() {
  const { setActive } = useMenu();

  React.useEffect(() => {
    setActive(1, 4, 0);
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
                  <Label name="Create Date" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Number Rangka" className="basis-2/5" />
                  <InputText
                    placeholder="Enter rangka number"
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vendor Name" className="basis-2/5" />
                  <Select
                    placeholder="Code"
                    options={[
                      { label: "Directur", value: "directur" },
                      { label: "Marketing", value: "marketing" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                  <InputText className="w-[65%]" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Silinder" className="basis-2/5" />
                  <InputText
                    placeholder="Enter jumlah silinder"
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Number" className="basis-2/5" />
                  <InputText
                    placeholder="Enter truck number"
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="STNK expired" className="basis-2/5" />
                  <DatePicker className="basis-3/5" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Merk" className="basis-2/5" />
                  <InputText placeholder="Enter merk" className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Pajak expired" className="basis-2/5" />
                  <DatePicker className="basis-3/5" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Type" className="basis-2/5" />
                  <Select
                    placeholder="Choose truck type"
                    options={[
                      { label: "Directur", value: "directur" },
                      { label: "Marketing", value: "marketing" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Pajak expired" className="basis-2/5" />
                  <DatePicker className="basis-3/5" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Machine Number" className="basis-2/5" />
                  <InputText
                    placeholder="Enter machine number"
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
