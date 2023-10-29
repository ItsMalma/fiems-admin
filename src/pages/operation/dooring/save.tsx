import DatePicker from "@/components/Elements/DatePicker";
import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import Select from "@/components/Elements/Select";
import SaveLayout from "@/components/Layouts/SaveLayout";
import useMenu from "@/stores/menu";
import React from "react";

export default function JobOrderConfirm() {
  const { setActive } = useMenu();

  const [isChangeDooring, setIsChangeDooring] = React.useState<boolean>(false);

  React.useEffect(() => {
    setActive(3, 4, 0);
  }, [setActive]);

  return (
    <SaveLayout
      onSave={() => {}}
      title="Confirm Dooring / Change Dooring"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <div className="basis-2/5"></div>
                  <Select
                    options={[
                      { label: "Dooring", value: false },
                      { label: "Change Dooring", value: true },
                    ]}
                    value={false}
                    onChange={(option) => setIsChangeDooring(option)}
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  {isChangeDooring ? (
                    <>
                      <Label name="Dooring To" className="basis-2/5" />
                      <Select
                        placeholder="Choose customer "
                        options={[
                          { label: "Customer 1", value: 1 },
                          { label: "Customer 2", value: 2 },
                        ]}
                        onChange={() => {}}
                        className="basis-3/5"
                      />
                    </>
                  ) : (
                    <>
                      <Label name="Customer" className="basis-2/5" />
                      <InputText
                        placeholder=""
                        className="basis-3/5"
                        readOnly
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Sandar" className="basis-2/5" />
                  <DatePicker className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Dooring Date" className="basis-2/5" />
                  <DatePicker className="basis-3/5" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="FreeTime Storage" className="basis-2/5" />
                  <InputText
                    placeholder="Enter berapa hari"
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="FreeTime Demurage" className="basis-2/5" />
                  <InputText
                    placeholder="Enter berapa hari"
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Storage" className="basis-2/5" />
                  <InputText
                    placeholder="Enter berapa hari"
                    className="basis-3/5"
                    readOnly
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Demurage" className="basis-2/5" />
                  <InputText
                    placeholder="Enter berapa hari"
                    className="basis-3/5"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Storage Value" className="basis-2/5" />
                  <InputText
                    placeholder="Enter berapa hari"
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Demurage Value" className="basis-2/5" />
                  <InputText
                    placeholder="Enter berapa hari"
                    className="basis-3/5"
                  />
                </div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
