import React from "react";
import useMenu from "@/stores/menu";
import MainLayout from "@/components/Layouts/MainLayout";
import Button from "@/components/Elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import clsx from "clsx";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import DatePicker from "@/components/Elements/DatePicker";

export default function VehicleSave() {
  const { setIndex } = useMenu();

  React.useEffect(() => {
    setIndex(1, 4, 0);
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
                  <Label name="Create Date" className="w-[35%]"/>
                  <InputText
                    placeholder=""
                    className="w-full"
                    disabled
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Number Rangka" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter rangka number"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vendor Name" className="w-[35%]"/>
                  <Select
                    placeholder="Code"
                    options={["Direktur", "Marketing"]}
                    value={0}
                    onChange={() => {}}
                    className="w-[30%] overflow-hidden whitespace-nowrap"
                  />
                  <InputText
                    className="w-[65%]"
                    disabled
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                <Label name="Silinder" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter jumlah silinder"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Number" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter truck number"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="STNK expired" className="w-[35%]"/>
                  <DatePicker className="w-full"/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Merk" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter merk"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Pajak expired" className="w-[35%]"/>
                  <DatePicker className="w-full"/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Type" className="w-[35%]"/>
                  <Select
                    placeholder="Choose truck type"
                    options={["Direktur", "Marketing"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Pajak expired" className="w-[35%]"/>
                  <DatePicker className="w-full"/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Machine Number" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter machine number"
                    className="w-full"
                  />
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
