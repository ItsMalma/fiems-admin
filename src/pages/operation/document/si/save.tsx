import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import Radio from "@/components/Elements/Radio";
import TextArea from "@/components/Elements/TextArea";
import DatePicker from "@/components/Elements/DatePicker";
import useHeader from "@/stores/header";

export default function ShippingInstructionSave() {
  const { setActive } = useMenu();
  const { setTitle } = useHeader();
  const [detail, setDetail] = React.useState<number[]>([]);

  React.useEffect(() => {
    
    setTitle("Operational | Shipping Instruction");
    setActive(3, 2, 4);
  }, []);

  return (
    <FormLayout
      title="Shiping Instruction"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Choose Shipping" className="basis-2/5" />
                  <Select
                    placeholder="Choose shipping"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="SI. Code" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Shipper Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose customer shipper"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Consignee Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose customer consignee"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Phone Number" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Telephone" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Telephone" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Email" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Email" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="NPWP" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="NPWP" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
              </div>
            </>
          ),
        },
        {
          name: "Shipment Details",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Shipping Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose customer shipper"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Port of Load" className="basis-2/5" />
                  <Select
                    placeholder="Choose port of load"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Shipping Term" className="basis-2/5" />
                  <Select
                    placeholder="Choose shipping term"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vessel" className="basis-2/5" />
                  <Select
                    placeholder="Choose vessel"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Port of D." className="basis-2/5" />
                  <Select
                    placeholder="Choose port of discharge"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Voyage" className="basis-2/5" />
                  <Select
                    placeholder="Choose voyage"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>   
              <hr></hr>       
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Other Detail" />
                  <div className="flex">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className=""
                      onChange={() => {if (detail.includes(0)) {setDetail(detail.filter(item => item !== 0))} else {setDetail([...detail, 0])}}}
                    />
                    <Label className="!font-normal ml-1" name="Billing & Payment" />
                  </div>
                  <div className="flex">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className=""
                      onChange={() => {if (detail.includes(1)) {setDetail(detail.filter(item => item !== 1))} else {setDetail([...detail, 1])}}}
                    />
                    <Label className="!font-normal ml-1" name="Vessel Remarks" />
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              {detail.includes(0)?
              <>
                <hr></hr>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                      Billing & Payment
                    </h1>
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="O. Freight" className="basis-2/5" />
                    <Select
                      placeholder="Choose payment type"
                      options={[
                        { label: "Prepaid", value: 1 },
                        { label: "Collect at", value: 2 },
                      ]}
                      onChange={() => {}}
                      className="basis-3/5"
                    />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="P.O.L Chr." className="basis-2/5" />
                    <Select
                      placeholder="Choose payment type"
                      options={[
                        { label: "Prepaid", value: 1 },
                        { label: "Collect at", value: 2 },
                      ]}
                      onChange={() => {}}
                      className="basis-3/5"
                    />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="P.O.L C/D" className="basis-2/5" />
                    <Select
                      placeholder="Choose payment type"
                      options={[
                        { label: "Prepaid", value: 1 },
                        { label: "Collect at", value: 2 },
                      ]}
                      onChange={() => {}}
                      className="basis-3/5"
                    />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  </div>
                </div>
              </>
              :
              null
              }
              {detail.includes(1) ?
              <>
                <hr></hr>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                      Vessel Remarks
                    </h1>
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Made by" className="basis-2/5" />
                    <Select
                      placeholder="Choose"
                      options={[
                        { label: "JO00001", value: 1 },
                        { label: "JO00002", value: 2 },
                      ]}
                      onChange={() => {}}
                      className="basis-3/5"
                    />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Position" className="basis-2/5" />
                    <InputText placeholder="" className="basis-3/5" readOnly />
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Date" className="basis-2/5" />
                    <DatePicker
                      className="basis-3/5"
                    />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  </div>
                </div>
                <hr></hr>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Dangerous Goods" className="basis-2/5" />
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        className=""
                      />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Reefer" className="basis-2/5" />
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className=""
                    />
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="DG Class" className="basis-2/5" />
                    <InputText placeholder="Enter dangerous goods class" className="basis-3/5" />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Temperature" className="basis-2/5" />
                    <InputText placeholder="Enter temperature" className="basis-3/5" />
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="UN Number" className="basis-2/5" />
                    <InputText placeholder="Enter UN number" className="basis-3/5" />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Note" className="basis-2/5" />
                    <InputText placeholder="Enter vessel note" className="basis-3/5" />
                  </div>
                </div>
                <hr></hr>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="Transhipment Import" className="basis-2/5" />
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        className=""
                      />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Transhipment Export" className="basis-2/5" />
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className=""
                    />
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="PIB" optional="Please Provide" className="basis-2/5" />
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        className=""
                      />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="PEB" optional="Please Provide" className="basis-2/5" />
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className=""
                    />
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                    <Label name="BC 1.2" optional="Please Provide" className="basis-2/5" />
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        className=""
                      />
                  </div>
                  <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="BC 1.0" optional="Please Provide" className="basis-2/5" />
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className=""
                    />
                  </div>
                </div>
              </>
              :
              null
              } 
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                    Vessel Details
                  </h1>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Container Number" className="basis-2/5" />                  
                  <InputText className="basis-3/5" readOnly />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="NPWP" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" readOnly />
                </div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
