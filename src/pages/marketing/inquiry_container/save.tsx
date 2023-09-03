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
    setActive(2, 2,);
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
                  <Label name="Inquiry Date" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Inquiry Number" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Sales Name" className="w-[35%]" />
                  <Select
                    placeholder="Choose sales"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
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
                  <Label name="Customer Name" className="w-[35%]" />
                  <Select
                    placeholder="Choose customer"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                <Label name="Purchase Name" className="w-[35%]" />
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
                  <Label name="Customer Group" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Purchase Address" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Purchase City" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="City" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
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
                  <Label name="J.O Type" className="w-[35%]" />
                  <Select
                    placeholder="Choose job order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                <Label name="Order Type" className="w-[35%]" />
                  <Select
                    placeholder="Choose order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
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
                  <Label name="Customer To" className="w-[35%]" />
                  <Select
                    placeholder="Choose job order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                <Label name="Load Date" className="w-[35%]" />
                  <Select
                    placeholder="Choose order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="City" className="w-[35%]" />
                  <Select
                    placeholder="Choose job order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                <Label name="Vessel Name" className="w-[35%]" />
                  <Select
                    placeholder="Choose order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="w-[35%]" />
                  <Select
                    placeholder="Choose job order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                <Label name="Voyage" className="w-[35%]" />
                  <Select
                    placeholder="Choose order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Service Type" className="w-[35%]" />
                  <Select
                    placeholder="Choose job order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                <Label name="ETD" className="w-[35%]" />
                  <Select
                    placeholder="Choose order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Container Type" className="w-[35%]" />
                  <Select
                    placeholder="Choose job order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                <Label name="ETA" className="w-[35%]" />
                  <Select
                    placeholder="Choose order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Container Size" className="w-[35%]" />
                  <Select
                    placeholder="Choose job order type"
                    options={["sales1", "sales2"]}
                    value={-1}
                    onChange={() => {}}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="PPN" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Insurance" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="PPFTZ" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Shipping" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
