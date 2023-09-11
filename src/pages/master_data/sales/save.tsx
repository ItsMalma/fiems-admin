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
                  <Label className="basis-2/5" name="Job Position" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose job position"
                    options={[
                      { label: "Directur", value: "directur" },
                      { label: "Marketing", value: "marketing" },
                    ]}
                    onChange={() => {}}
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Marketing Name" />
                  <InputText
                    className="basis-3/5"
                    placeholder="Enter marketing name"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Telephone" />
                  <InputText
                    className="basis-3/5"
                    placeholder="Enter telephone number"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="NIK" />
                  <InputText className="basis-3/5" placeholder="Enter NIK" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Fax" />
                  <InputText
                    className="basis-3/5"
                    placeholder="Enter fax number"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Cabang" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose city"
                    options={[
                      { label: "Jakarta", value: 0 },
                      { label: "Tangerang", value: 1 },
                      { label: "Bekasi", value: 2 },
                    ]}
                    onChange={() => {}}
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Email" />
                  <InputText
                    className="basis-3/5"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Phone Number" />
                  <InputText
                    className="basis-3/5"
                    placeholder="Enter phone number"
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
