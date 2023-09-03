import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";

export default function SalesSave() {
  const { setActive } = useMenu();

  React.useEffect(() => {
    setActive(1, 3, 0);
  }, []);

  return (
    <FormLayout
      title="Input Sales Data"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Job Position" className="w-[35%]" />
                  <Select
                    placeholder="Choose job position"
                    options={["Direktur", "Marketing"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Marketing Name" className="w-[35%]" />
                  <InputText
                    placeholder="Enter marketing name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Telephone" className="w-[35%]" />
                  <InputText
                    placeholder="Enter telephone number"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="NIK" className="w-[35%]" />
                  <InputText placeholder="Enter NIK" className="w-full" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Fax" className="w-[35%]" />
                  <InputText
                    placeholder="Enter fax number"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cabang" className="w-[35%]" />
                  <Select
                    placeholder="Choose city"
                    options={[
                      "Jakarta",
                      "Tangerang",
                      "Bekasi",
                      "Tangerang",
                      "Tangerang",
                      "Tangerang",
                    ]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Email" className="w-[35%]" />
                  <InputText
                    placeholder="Enter email address"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="w-[35%]" />
                  <InputText
                    placeholder="Enter phone number"
                    className="w-full"
                  />
                </div>
                <div></div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
