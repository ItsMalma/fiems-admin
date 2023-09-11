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
    setActive(2, 2);
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
                  <Label className="basis-2/5" name="Inquiry Date" />
                  <InputText className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Inquiry Number" />
                  <InputText className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Sales Name" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose sales"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
            </>
          ),
        },
        {
          name: "Purchase Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Customer Name" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose customer"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Purchase Name" />
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
                  <Label className="basis-2/5" name="Customer Group" />
                  <InputText className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Purchase Address" />
                  <InputText className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Address" />
                  <InputText className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Purchase City" />
                  <InputText className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="City" />
                  <InputText className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
            </>
          ),
        },
        {
          name: "Type Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="J.O Type" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose job order type"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Order Type" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose order type"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
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
          isAppend: true,
          append: "Order",
          name: "Order Detail",
          component: (
            <div className="flex flex-col gap-3">
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Customer To" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose job order type"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Load Date" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose order type"
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
                  <Label className="basis-2/5" name="City" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose job order type"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Vessel Name" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose order type"
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
                  <Label className="basis-2/5" name="Route" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose job order type"
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
                  <Select
                    className="basis-3/5"
                    placeholder="Choose order type"
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
                  <Label className="basis-2/5" name="Service Type" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose job order type"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="ETD" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose order type"
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
                  <Label className="basis-2/5" name="Container Type" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose job order type"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="ETA" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose order type"
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
                  <Label className="basis-2/5" name="Container Size" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose job order type"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
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
                  <Label className="basis-2/5" name="PPN" />
                  <InputText className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Insurance" />
                  <InputText className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="PPFTZ" />
                  <InputText className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Shipping" />
                  <InputText className="basis-3/5" disabled />
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
