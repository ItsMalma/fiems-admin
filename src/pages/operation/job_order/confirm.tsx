import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import DatePicker from "@/components/Elements/DatePicker";

export default function JobOrderConfirm() {
  const { setActive } = useMenu();

  const [combo, setCombo] = React.useState(0);

  React.useEffect(() => {
    setActive(3, 0, 0);
  }, []);

  return (
    <FormLayout
      title="Confirm Job Order"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Confirm Date" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="JO Num." className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Inq. Date" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Inq. Num." className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Marketing" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Load Date" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer Name" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer To" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="City" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Type" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Size" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <hr></hr>
              <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                Confirmation
              </h1>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Type Order" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="RO Number" className="basis-2/5" />
                  <InputText
                    placeholder="Enter RO number"
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Consignee" className="basis-2/5" />
                  <Select
                    placeholder="Choose vendor"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Email" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Telephone Number" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="City" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2 justify-end">
                  <div
                    className="flex px-3 py-[9px] 2xl:px-4 2xl:py-3 justify-center items-center gap-3 2xl:gap-4 rounded-[10px] font-semibold bg-primary text-white cursor-pointer"
                    onClick={() => setCombo(1)}
                  >
                    Convert to Combo
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          isHide: combo === 0,
          name: "Convert to Combo",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Stuffing Date" className="basis-2/5" />
                  <DatePicker className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Tracking Route" className="basis-2/5" />
                  <Select
                    placeholder="Choose route"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Number" className="basis-2/5" />
                  <Select
                    placeholder="Choose vendor"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Tracking Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose tracking name"
                    options={[
                      { label: "Sales 1", value: 1 },
                      { label: "Sales 2", value: 2 },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Type" className="basis-2/5" />
                  <InputText className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Driver Name" className="basis-2/5" />
                  <InputText
                    placeholder="Enter driver name"
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="basis-2/5" />
                  <div className="flex gap-3 basis-3/5 items-center">
                    <InputText
                      placeholder="Enter container number"
                      className="basis-3/5"
                    />
                    <Label name="Seal" />
                    <InputText
                      placeholder="Enter seal number"
                      className="basis-3/5"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="basis-2/5" />
                  <InputText
                    placeholder="Enter phone number"
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="basis-2/5" />
                  <div className="flex gap-3 basis-3/5 items-center">
                    <InputText
                      placeholder="Enter container number"
                      className="basis-3/5"
                    />
                    <Label name="Seal" />
                    <InputText
                      placeholder="Enter seal number"
                      className="basis-3/5"
                    />
                  </div>
                </div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
