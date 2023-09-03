import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";

export default function UJSave() {
  const { setActive } = useMenu();

  React.useEffect(() => {
    setActive(1, 7, 0);
  }, []);

  return (
    <FormLayout
      title="Input Uang Jalan Data"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Create Date" className="w-[35%]" />
                  <InputText disabled placeholder="Rp" className="w-full" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Toll" className="w-[35%]" />
                  <InputText placeholder="Rp" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer Name" className="w-[35%]" />
                  <Select
                    placeholder=""
                    options={["Direktur", "Marketing"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                    search
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="BBM" className="w-[35%]" />
                  <InputText placeholder="Rp" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="w-[35%]" />
                  <Select
                    placeholder=""
                    options={["Jakarta-Tangerang", "Tangerang-Bekasi"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                    search
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Biaya Buruh" className="w-[35%]" />
                  <InputText placeholder="Rp" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Type" className="w-[35%]" />
                  <Select
                    placeholder="Choose truck type"
                    options={["Direktur", "Marketing"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Meal" className="w-[35%]" />
                  <InputText placeholder="Rp" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Container Size" className="w-[35%]" />
                  <Select
                    placeholder="Choose container size"
                    options={["20ft", "40ft"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Etc." className="w-[35%]" />
                  <InputText placeholder="Rp" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Grand Total" className="w-[35%]" />
                  <InputText disabled placeholder="Rp" className="w-full" />
                </div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
