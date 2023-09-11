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
                  <Label className="basis-2/5" name="Create Date" />
                  <InputText className="basis-3/5" placeholder="Rp" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Toll" />
                  <InputText className="basis-3/5" placeholder="Rp" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Customer Name" />
                  <Select
                    className="basis-3/5"
                    placeholder=""
                    options={[
                      { label: "Directur", value: "directur" },
                      { label: "Marketing", value: "marketing" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="BBM" />
                  <InputText className="basis-3/5" placeholder="Rp" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Route" />
                  <Select
                    className="basis-3/5"
                    placeholder=""
                    options={[
                      { label: "Jakarta - Tangerang", value: 0 },
                      { label: "Tangerang - Bekasi", value: 1 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Biaya Buruh" />
                  <InputText className="basis-3/5" placeholder="Rp" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Truck Type" />
                  <Select
                    className="basis-3/5"
                    placeholder=""
                    options={[
                      { label: "Directur", value: "directur" },
                      { label: "Marketing", value: "marketing" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Meal" />
                  <InputText className="basis-3/5" placeholder="Rp" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Container Size" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose container size"
                    options={[
                      { label: "20ft", value: 20 },
                      { label: "40ft", value: 40 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Etc." />
                  <InputText className="basis-3/5" placeholder="Rp" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Grand Total" />
                  <InputText className="basis-3/5" placeholder="Rp" disabled />
                </div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
