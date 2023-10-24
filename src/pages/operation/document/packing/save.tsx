import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import Select from "@/components/Elements/Select";
import SaveLayout from "@/components/Layouts/SaveLayout";
import useMenu from "@/stores/menu";
import React from "react";

export default function PackingSave() {
  const { setActive } = useMenu();

  React.useEffect(() => {
    setActive(3, 2, 3);
  }, [setActive]);

  return (
    <SaveLayout
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
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vessel Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose vessel name"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Packing List Number" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Voyage" className="basis-2/5" />
                  <Select
                    placeholder="Choose voyage"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Shipping Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose shipping"
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
                    <Label name="Product" className="basis-2/5" />
                    <Select
                      placeholder="Choose product"
                      options={[
                        { label: "SKU0001-SABUN", value: 1 },
                        { label: "SKU0002-SHAMPOO", value: 2 },
                      ]}
                      onChange={() => {}}
                      isSearchable
                      className="basis-3/5"
                    />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="QTY" className="basis-2/5" />
                    <InputText
                      placeholder="Enter quantity"
                      className="basis-3/5"
                    />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Satuan" className="basis-2/5" />
                    <Select
                      placeholder="Choose satuan"
                      options={[
                        { label: "BOX", value: 1 },
                        { label: "Karton", value: 2 },
                        { label: "KG", value: 3 },
                        { label: "PCs", value: 4 },
                      ]}
                      onChange={() => {}}
                      isSearchable
                      className="basis-3/5"
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
