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
                  <Label name="Customer Type" className="w-[35%]"/>
                  <Select
                    placeholder="Choose customer type"
                    options={["Factory", "Vendor", "Shipping"]}
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
                  <Label name="Factory Name" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter factory name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Country" className="w-[35%]"/>
                  <Select
                    placeholder="Choose country"
                    options={["Bekasi", "Venus", "Bandung"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Factory Group" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter factory group"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Telephone" className="w-[35%]"/>
                  <InputText placeholder="Enter telephone number" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter address"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Fax" className="w-[35%]"/>
                  <InputText placeholder="Enter fax number" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="City" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter city"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Email" className="w-[35%]"/>
                  <InputText placeholder="Enter email" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Province" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter province"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="TOP" className="w-[35%]"/>
                  <InputText placeholder="Enter TOP" className="w-full" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center justify-end">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">

                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Currency" className="w-[35%]"/>
                  <Select
                    placeholder="Choose currency"
                    options={["IDR", "USD", "MYR"]}
                    value={0}
                    onChange={() => {}}
                    className="w-full"
                  />
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
                  <Label name="Purchasing" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter purchasing name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Operation" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter operation name"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Email" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter email"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Email" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter email"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter phone number"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter phone number"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Telephone" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter telephone number"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Telephone" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter telephone number"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Fax" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter fax number"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Fax" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter fax number"
                    className="w-full"
                  />
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Finance" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter finance name"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Email" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter email"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter phone number"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Telephone" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter telephone number"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Fax" className="w-[35%]"/>
                  <InputText
                    placeholder="Enter fax number"
                    className="w-full"
                  />
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
