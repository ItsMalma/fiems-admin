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
import useHeader from "@/stores/header";
import useModal from "@/stores/modal";
import { size } from "lodash";

export default function PriceCalculation() {
  const { setIndex } = useMenu();
  const { setModal } = useModal();
  const { setTitle } = useHeader();
  const [type, setType] = React.useState(1);

  React.useEffect(() => {
    setTitle("Marketing | Price Calculation");
    setIndex(2, 0, 0);
  }, []);

  return (
    <FormLayout
      title=""
      tabs={[
        {
          name: "Form Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Service Type" className="w-[35%]"/>
                  <Select
                    placeholder="Choose "
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>              
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Form Number" className="w-[35%]"/>
                  <InputText placeholder="" disabled className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>              
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Create Date" className="w-[35%]"/>
                  <InputText placeholder="" disabled className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>              
            </>
          ),
        },
        {
          isAppend: true,
          append: "Customer",
          name: "Customer Calculation",
          component: (
            <>
            <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Service Type" className="w-[35%]"/>
                  <Select
                    placeholder="Choose "
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Service Type" className="w-[35%]"/>
                  <Select
                    placeholder="Choose "
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>              
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Form Number" className="w-[35%]"/>
                  <InputText placeholder="" disabled className="w-full"/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>              
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Create Date" className="w-[35%]"/>
                  <InputText placeholder="" disabled className="w-full"/>
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
