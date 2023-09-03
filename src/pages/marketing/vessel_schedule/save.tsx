import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import DatePicker from "@/components/Elements/DatePicker";
import Radio from "@/components/Elements/Radio";


export default function InquirySave() {
  const { setActive } = useMenu();
  const [type, setType] = React.useState(0);

  React.useEffect(() => {
    setActive(2, 3,);
  }, []);

  return (
    <FormLayout
      title="Input Sales Data"
      tabs={[
        {
          name: "Purchase Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Create Date" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="w-[35%]" />
                  <Select
                    placeholder="Choose purchase customer"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Month" className="w-[35%]" />  
                  <DatePicker className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vessel Name" className="w-[35%]" />
                  <Select
                    placeholder="Choose purchase customer"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Voyage" className="w-[35%]" />
                  <InputText placeholder="Enter voyage" className="w-full"/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vessel Capacity" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Quota" className="w-[35%]" />
                  <InputText placeholder="Enter voyage" className="w-full"/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Port Asal" className="w-[35%]" />
                  <InputText placeholder="Enter port" className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Port Tujuan" className="w-[35%]" />
                  <InputText placeholder="Enter port" className="w-full"/>
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
                  <Label name="Open Stack Date" className="w-[35%]" />
                  <DatePicker className="w-full" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>              
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Closing RC" className="w-[35%]" />
                  <DatePicker className="w-full" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="RC Closing Time" className="w-[35%]" />
                  <DatePicker className="w-full" />
                </div>
              </div>              
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Closing Date" className="w-[35%]" />
                  <DatePicker className="w-full" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vessel Closing Time" className="w-[35%]" />
                  <DatePicker className="w-full" />
                </div>
              </div>              
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="ETD" className="w-[35%]" />
                  <DatePicker className="w-full" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="ETA" className="w-[35%]" />
                  <DatePicker className="w-full" />
                </div>
              </div>              
            </>
          ),
        },
      ]}
    />
  );
}
