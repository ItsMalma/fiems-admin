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

export default function COASave() {
  const { setIndex } = useMenu();
  const [type, setType] = React.useState(1);

  React.useEffect(() => {
    setIndex(1, 10, 0);
  }, []);

  return (
    <FormLayout
      title="Input COA Data"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="COA Type" className="w-[35%]"/>
                  <Select
                    placeholder="Choose COA type"
                    options={["Main COA", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Create Date" className="w-[35%]"/>
                  <InputText
                    placeholder=""
                    className="w-full"
                    disabled
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Category" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter account category"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Account Number" className="w-[35%]"/>
                  <InputText
                    placeholder=""
                    className="w-full"
                    disabled
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Transaction" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter via transaction"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Account Name" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter account name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Currency" className="w-[35%]"/>
                  <Select
                    placeholder="Choose currency"
                    options={["IDR", "Sub COA1", "Sub COA2"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Account Type" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter account type"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <hr></hr>              
              {type == 0 &&
              <>
                <h1 className="font-bold text-2xl">Sub Account</h1>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Sub Acc. 1" className="w-[35%]"/>
                    <InputText
                      placeholder=""
                      className="w-full"
                      disabled
                    />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Description" className="w-[35%]"/>
                    <InputText
                      placeholder="Enter account description"
                      className="w-full"
                    />
                  </div>
                </div>
              </>
              }
              {type == 1 &&
              <>
                <h1 className="font-bold text-2xl">Sub Account</h1>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Sub Acc. 1" className="w-[35%]"/>
                    <Select
                    placeholder="Choose sub account"
                    options={["sub1", "sub2", "sub3"]}
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
                    <Label name="Sub Acc. 2" className="w-[35%]"/>
                    <InputText
                      placeholder=""
                      className="w-full"
                      disabled
                    />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Description" className="w-[35%]"/>
                    <InputText
                      placeholder="Enter account description"
                      className="w-full"
                    />
                  </div>
                </div>
              </>
              }
            </>
          ),
        },
      ]}
    />
  );
}
