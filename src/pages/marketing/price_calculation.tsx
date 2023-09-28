import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import useHeader from "@/stores/header";
import DatePicker from "@/components/Elements/DatePicker";
import useModal from "@/stores/modal";
import Modal from "@/components/Elements/Modal";
import Radio from "@/components/Elements/Radio";

function TrackingAsal() {
  return (
    <Modal title="" type="save" onDone={() => {}}>
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="Tracking" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Buruh" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="THC OPT" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="THC OPP" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Admin BL" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Cleaning Cont." className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Materai" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Price" className="basis-1/3" />
            <InputText placeholder="Rp" disabled className="basis-2/3" />
          </div>
        </div>
      </form>
    </Modal>
  );
}

function TrackingTujuan() {
  return (
    <Modal title="" type="save" onDone={() => {}}>
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="Tracking" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Buruh" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="THC OPT" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="THC OPP" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Admin BL" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Cleaning Cont." className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Materai" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Price" className="basis-1/3" />
            <InputText placeholder="Rp" disabled className="basis-2/3" />
          </div>
        </div>
      </form>
    </Modal>
  );
}

function ShippingCost() {
  return (
    <Modal title="" type="save" onDone={() => {}}>
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="Freight" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="THC OPT" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="THC OPP" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="LO/LO" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Segel" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="RC" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="LSS" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Shipping Cost" className="basis-1/3" />
            <InputText placeholder="Rp" disabled className="basis-2/3" />
          </div>
        </div>
      </form>
    </Modal>
  );
}

function OtherCost() {
  return (
    <Modal title="" type="save" onDone={() => {}}>
      <form>
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center justify-between">
            <Label name="Admin BL" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Cleaning Cont." className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Alih Kapal" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Materai" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Biaya Buruh" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Stuffing Dalam" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Stuffing Luar" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Biaya Cetak RC" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Biaya Cetak IR" className="basis-1/3" />
            <InputText placeholder="Rp" className="basis-2/3" />
          </div>
          <div className="flex gap-6 items-center justify-between">
            <Label name="Other Expanses Cost" className="basis-1/3" />
            <InputText placeholder="Rp" disabled className="basis-2/3" />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default function PriceCalculation() {
  const { setActive } = useMenu();
  const { setModal } = useModal();
  const { setTitle } = useHeader();

  const [insurance, setInsurance] = React.useState<string | number>(0)
  const [adminFee, setAdminFee] = React.useState<string | number>(0)

  React.useEffect(() => {
    setTitle("Marketing | Price Calculation");
    setActive(2, 0, 0);
  }, [setTitle, setActive]);

  return (
    <FormLayout
      onSave={() => {}}
      title=""
      tabs={[
        {
          name: "Form Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Service Type" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose Service Type"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Form Number" />
                  <InputText className="basis-3/5" placeholder="" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Create Date" />
                  <InputText className="basis-3/5" placeholder="" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Marketing Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose sales"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose customer"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Effective Date" className="basis-2/5" />
                  <DatePicker className="basis-3/5" />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="" disabled className="basis-3/5" />
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
            <div className="flex flex-col gap-3">
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="basis-2/5" />
                  <Select
                    placeholder="Choose route"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Service Type" />
                  <Select
                    className="basis-3/5"
                    placeholder="Choose service type"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="City" />
                  <InputText className="basis-3/5" placeholder="" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Container Size" className="basis-2/5" />
                  <Select
                    placeholder="Choose container size"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                    Tracking Asal
                  </h1>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                    Tracking Tujuan
                  </h1>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Via Port" className="basis-2/5" />
                  <Select
                    placeholder="Choose port"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vendor Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose vendor"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Vendor Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose vendor"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="basis-2/5" />
                  <Select
                    placeholder="Choose route"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="basis-2/5" />
                  <Select
                    placeholder="Choose route"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex flex-col gap-1 basis-1/2 relative">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center">
                    <Label name="Amount" className="basis-2/5" />
                    <InputText
                      placeholder="Rp"
                      disabled
                      className="basis-3/5"
                    />
                  </div>
                  <u
                    className="text-sm text-gray-400 cursor-pointer absolute right-0 bottom-[-1.5rem]"
                    onClick={() => setModal(<TrackingAsal />)}
                  >
                    Amount Detail+
                  </u>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center mb-6">
                <div className="flex flex-col gap-1 basis-1/2 relative">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center">
                    <Label name="Amount" className="basis-2/5" />
                    <InputText
                      placeholder="Rp"
                      disabled
                      className="basis-3/5"
                    />
                  </div>
                  <u
                    className="text-sm text-gray-400 cursor-pointer absolute right-0 bottom-[-1.5rem]"
                    onClick={() => setModal(<TrackingTujuan />)}
                  >
                    Amount Detail+
                  </u>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr className=""></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                    Shipping Details
                  </h1>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                    Other Expanses
                  </h1>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Shipping Name" className="basis-2/5" />
                  <Select
                    placeholder="Choose shipping"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex flex-col gap-1 basis-1/2 relative">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center">
                    <Label name="Other Cost." className="basis-2/5" />
                    <InputText
                      placeholder="Rp"
                      disabled
                      className="basis-3/5"
                    />
                  </div>
                  <u
                    className="text-sm text-gray-400 cursor-pointer absolute right-0 bottom-[-1.5rem]"
                    onClick={() => setModal(<OtherCost />)}
                  >
                    Cost Detail+
                  </u>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Route" className="basis-2/5" />
                  <Select
                    placeholder="Choose route"
                    options={[
                      { label: "Main COA", value: "main" },
                      { label: "Sub COA1", value: "sub1" },
                      { label: "Sub COA2", value: "sub2" },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex flex-col gap-1 basis-1/2 relative"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center mb-6">
                <div className="flex flex-col gap-1 basis-1/2 relative">
                  <div className="flex gap-[18px] 2xl:gap-6 items-center">
                    <Label name="Shipping Cost" className="basis-2/5" />
                    <InputText
                      placeholder="Rp"
                      disabled
                      className="basis-3/5"
                    />
                  </div>
                  <u
                    className="text-sm text-gray-400 cursor-pointer absolute right-0 bottom-[-1.5rem]"
                    onClick={() => setModal(<ShippingCost />)}
                  >
                    Cost Detail+
                  </u>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr className=""></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1.5">
                    Summary
                  </h1>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                </div>
              </div>
              <div className="flex items-center gap-[18px] 2xl:gap-6">
                <div className="flex flex-col basis-1/2 gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-[18px] 2xl:gap-6 items-center">
                      <Label name="PPFTZ" className="basis-2/5" />
                      <div className="flex justify-between basis-3/5">
                        <Radio 
                          name="status"
                          value="Include"
                        />
                        <Radio 
                          name="status"
                          value="Exclude"
                        />
                        <Radio 
                          name="status"
                          value="None"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 basis-1/2 relative">
                      <InputText placeholder="Rp" className=""/>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-[18px] 2xl:gap-6 items-center">
                      <Label name="Insurance" className="basis-2/5"/>
                      <div className="flex justify-between basis-3/5">
                        <Radio 
                          name="status"
                          value="Include"
                        />
                        <Radio 
                          name="status"
                          value="Exclude"
                        />
                        <Radio 
                          name="status"
                          value="None"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between gap-1 items-center">
                      <InputText placeholder="Rp" className="w-5/12" onChange={(e) => setInsurance(e.target.value)}/>
                      <p className="">x 10% +</p>
                      <InputText placeholder="Admin Fee" className="w-5/12" onChange={(e) => setAdminFee(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-1 relative">
                      <InputText readOnly placeholder="Rp" className="" value={Number(insurance) * 0.10 + Number(adminFee)}/>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-[18px] 2xl:gap-6 items-center">
                      <Label name="PPN" className="basis-2/5" />
                      <div className="flex justify-between basis-3/5">
                        <Radio 
                          name="status"
                          value="Include"
                        />
                        <Radio 
                          name="status"
                          value="Exclude"
                        />
                        <Radio 
                          name="status"
                          value="None"
                        />
                      </div>
                    </div>                    
                  </div>
                </div>
            
                <div className="flex flex-col basis-1/2 gap-3">
                  <div className="flex flex-col gap-1 relative">
                    <Label name="HPP" className="basis-2/5" />
                    <InputText placeholder="Rp" readOnly className="basis-3/5" />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label name="Harga Jual" className="basis-2/5" />
                    <InputText placeholder="Rp" className="basis-3/5" />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label name="" className="basis-2/5" />
                    <InputText placeholder="Rp" readOnly className="basis-3/5" />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label name="" className="basis-2/5" />
                    <InputText placeholder="Rp" readOnly className="basis-3/5" />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <Label name="Profit" className="basis-2/5" />
                    <InputText placeholder="Rp" readOnly className="basis-3/5" />
                  </div>
                </div>
              </div>             
            </div>
          ),
        },
      ]}
    />
  );
}
