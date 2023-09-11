import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";

export default function CustomerSave() {
  const { setActive } = useMenu();

  React.useEffect(() => {
    setActive(1, 0, 1);
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
                  <Label className="w-2/5" name="Customer Type" />
                  <Select
                    className="w-3/5"
                    placeholder="Choose customer type"
                    options={[
                      { label: "Factory", value: "factory" },
                      { label: "Vendor", value: "vendor" },
                      { label: "Shipping", value: "shipping" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Factory Name" />
                  <InputText
                    className="w-3/5"
                    placeholder="Enter factory name"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Country" />
                  <Select
                    className="w-3/5"
                    placeholder="Choose country"
                    options={[
                      { label: "Indonesia", value: "id" },
                      { label: "United States", value: "us" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Factory Group" />
                  <InputText
                    placeholder="Enter factory group"
                    className="w-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Telephone" />
                  <InputText
                    placeholder="Enter telephone number"
                    className="w-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Address" />
                  <InputText className="w-3/5" placeholder="Enter address" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Fax" />
                  <InputText className="w-3/5" placeholder="Enter fax number" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="City" />
                  <InputText className="w-3/5" placeholder="Enter city" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Email" className="w-2/5" />
                  <InputText className="w-3/5" placeholder="Enter email" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Province" />
                  <InputText className="w-3/5" placeholder="Enter province" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="TOP" />
                  <InputText className="w-3/5" placeholder="Enter TOP" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center justify-end">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Currency" />
                  <Select
                    className="w-3/5"
                    placeholder="Choose currency"
                    options={[
                      { label: "IDR", value: "idr" },
                      { label: "USD", value: "usd" },
                      { label: "MYR", value: "myr" },
                    ]}
                    onChange={() => {}}
                    isSearchable
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
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                    Purchasing
                  </h1>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                    Operation
                  </h1>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Purchasing" />
                  <InputText
                    placeholder="Enter purchasing name"
                    className="w-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Operation" />
                  <InputText
                    placeholder="Enter operation name"
                    className="w-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Email" />
                  <InputText className="w-3/5" placeholder="Enter email" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Email" />
                  <InputText className="w-3/5" placeholder="Enter email" />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Phone Number" />
                  <InputText
                    placeholder="Enter phone number"
                    className="w-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Phone Number" />
                  <InputText
                    placeholder="Enter phone number"
                    className="w-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Telephone" />
                  <InputText
                    placeholder="Enter telephone number"
                    className="w-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Telephone" />
                  <InputText
                    placeholder="Enter telephone number"
                    className="w-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Fax" />
                  <InputText className="w-3/5" placeholder="Enter fax number" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Fax" />
                  <InputText className="w-3/5" placeholder="Enter fax number" />
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                    Finance
                  </h1>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Finance" />
                  <InputText
                    placeholder="Enter finance name"
                    className="w-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Email" />
                  <InputText className="w-3/5" placeholder="Enter email" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Phone Number" />
                  <InputText
                    placeholder="Enter phone number"
                    className="w-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Telephone" />
                  <InputText
                    placeholder="Enter telephone number"
                    className="w-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="w-2/5" name="Fax" />
                  <InputText className="w-3/5" placeholder="Enter fax number" />
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
