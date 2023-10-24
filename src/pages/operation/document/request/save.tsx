import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import Select from "@/components/Elements/Select";
import SaveLayout from "@/components/Layouts/SaveLayout";
import useMenu from "@/stores/menu";
import React from "react";

export default function RequestSave() {
  const { setActive } = useMenu();

  React.useEffect(() => {
    setActive(3, 2, 5);
  }, [setActive]);

  return (
    <SaveLayout
      onSave={() => {}}
      title="Form Request"
      tabs={[
        {
          name: "Request Information",
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
                  <Label name="Type Request" className="basis-2/5" />
                  <Select
                    placeholder="Choose type request"
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
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Req. Num." className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
            </>
          ),
        },
        {
          isAppend: true,
          append: "Request",
          name: "Detail Request",
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
                    <Label name="Remarks" className="basis-2/5" />
                    <InputText
                      placeholder="Enter description"
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
