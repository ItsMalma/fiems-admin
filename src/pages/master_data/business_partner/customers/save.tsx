import React from "react";
import useMenu from "@/stores/menu";
import MainLayout from "@/components/Layouts/MainLayout";
import Button from "@/components/Elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import clsx from "clsx";
import FormLayout from "@/components/Layouts/FormLayout";

export default function CustomerSave() {
  const { setIndex } = useMenu();

  React.useEffect(() => {
    setIndex(1, 0, 1);
  }, []);

  return (
    <FormLayout
      title="Input Customer Data"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Factory Name" />
                  <InputText
                    placeholder="Enter factory name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Country" />
                  <InputText placeholder="Choose country" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Factory Name" />
                  <InputText
                    placeholder="Enter factory name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Country" />
                  <InputText placeholder="Choose country" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Factory Name" />
                  <InputText
                    placeholder="Enter factory name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Country" />
                  <InputText placeholder="Choose country" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Factory Name" />
                  <InputText
                    placeholder="Enter factory name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Country" />
                  <InputText placeholder="Choose country" className="w-full" />
                </div>
              </div>
            </>
          ),
        },
        {
          name: "PIC Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Purchasing" />
                  <InputText
                    placeholder="Enter purchasing name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Operation" />
                  <InputText
                    placeholder="Enter operation name"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Purchasing" />
                  <InputText
                    placeholder="Enter purchasing name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Operation" />
                  <InputText
                    placeholder="Enter operation name"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Purchasing" />
                  <InputText
                    placeholder="Enter purchasing name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Operation" />
                  <InputText
                    placeholder="Enter operation name"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Purchasing" />
                  <InputText
                    placeholder="Enter purchasing name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Operation" />
                  <InputText
                    placeholder="Enter operation name"
                    className="w-full"
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
