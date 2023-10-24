import DatePicker from "@/components/Elements/DatePicker";
import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import Select from "@/components/Elements/Select";
import SaveLayout from "@/components/Layouts/SaveLayout";
import useMenu from "@/stores/menu";
import React from "react";

export default function InquirySave() {
  const { setActive } = useMenu();
  React.useEffect(() => {
    setActive(2, 3);
  }, [setActive]);

  return (
    <SaveLayout
      onSave={() => {}}
      title="Input Sales Data"
      tabs={[
        {
          name: "Purchase Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Create Date" />
                  <InputText className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Address" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose purchase customer"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Month" />
                  <DatePicker className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Vessel Name" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose purchase customer"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Voyage" />
                  <InputText className="basis-3/5" placeholder="Enter voyage" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Vessel Capacity" />
                  <InputText className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Quota" />
                  <InputText className="basis-3/5" placeholder="Enter voyage" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Port Asal" />
                  <InputText className="basis-3/5" placeholder="Enter port" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Port Tujuan" />
                  <InputText className="basis-3/5" placeholder="Enter port" />
                </div>
              </div>
            </>
          ),
        },
        {
          name: "Vessel Schedule",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Open Stack Date" />
                  <DatePicker className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Closing RC" />
                  <DatePicker className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="RC Closing Time" />
                  <DatePicker className="basis-3/5" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Closing Date" />
                  <DatePicker className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Vessel Closing Time" />
                  <DatePicker className="basis-3/5" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="ETD" />
                  <DatePicker className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="ETA" />
                  <DatePicker className="basis-3/5" />
                </div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
