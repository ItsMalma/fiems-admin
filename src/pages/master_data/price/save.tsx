import DatePicker from "@/components/Elements/DatePicker";
import InputText from "@/components/Elements/InputText";
import Label from "@/components/Elements/Label";
import Radio from "@/components/Elements/Radio";
import Select from "@/components/Elements/Select";
import SaveLayout from "@/components/Layouts/SaveLayout";
import useMenu from "@/stores/menu";
import React from "react";

function Factory() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Create Date" />
          <InputText className="basis-3/5" disabled />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Effective Date" />
          <DatePicker className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Quotation Number" />
          <Select
            className="basis-3/5"
            placeholder=""
            options={[
              { label: "Directur", value: "directur" },
              { label: "Marketing", value: "marketing" },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Factory Name" />
          <Select
            className="basis-3/5"
            placeholder=""
            options={[
              { label: "Directur", value: "directur" },
              { label: "Marketing", value: "marketing" },
            ]}
            onChange={() => {}}
          />
        </div>
      </div>
      <hr></hr>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Route" />
          <Select
            className="basis-3/5"
            placeholder=""
            options={[
              { label: "Jakarta - Tangerang", value: 0 },
              { label: "Tangerang - Bekasi", value: 1 },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Container Size" />
          <Select
            className="basis-3/5"
            placeholder="Choose container size"
            options={[
              { label: "20ft", value: 20 },
              { label: "40ft", value: 40 },
            ]}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Container Type" />
          <Select
            className="basis-3/5"
            placeholder=""
            options={[
              { label: "Jakarta - Tangerang", value: 0 },
              { label: "Tangerang - Bekasi", value: 1 },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Service Type" />
          <Select
            className="basis-3/5"
            placeholder="Choose container size"
            options={[
              { label: "20ft", value: 20 },
              { label: "40ft", value: 40 },
            ]}
            onChange={() => {}}
          />
        </div>
      </div>
      <hr></hr>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Via Port" />
          <Select
            className="basis-3/5"
            placeholder="Choose port"
            options={[
              { label: "Jakarta", value: "jakarta" },
              { label: "Tangerang", value: "tangerang" },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="HPP" />
          <InputText className="basis-3/5" disabled />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Province" />
          <Select
            className="basis-3/5"
            placeholder="Choose province"
            options={[
              { label: "Jawa Barat", value: "jawaBarat" },
              { label: "DKI Jakarta", value: "dkiJakarta" },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Etc. Cost" />
          <InputText placeholder="Enter etc. cost" className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="HPP after Etc. Cost" />
          <InputText className="basis-3/5" disabled />
        </div>
      </div>
    </>
  );
}
function Vendor() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Create Date" />
          <InputText className="basis-3/5" disabled />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Effective Date" />
          <DatePicker className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Vendor Name" />
          <Select
            className="basis-3/5"
            placeholder=""
            options={[
              { label: "Directur", value: "directur" },
              { label: "Marketing", value: "marketing" },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
      </div>
    </>
  );
}

function PriceVendor() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Route" />
          <Select
            className="basis-3/5"
            placeholder=""
            options={[
              { label: "Jakarta - Tangerang", value: 0 },
              { label: "Tangerang - Bekasi", value: 1 },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Container Size" />
          <Select
            className="basis-3/5"
            placeholder="Choose container size"
            options={[
              { label: "20ft", value: 20 },
              { label: "40ft", value: 40 },
            ]}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Container Type" />
          <Select
            className="basis-3/5"
            placeholder=""
            options={[
              { label: "Jakarta - Tangerang", value: 0 },
              { label: "Tangerang - Bekasi", value: 1 },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Service Type" />
          <Select
            className="basis-3/5"
            placeholder="Choose container size"
            options={[
              { label: "20ft", value: 20 },
              { label: "40ft", value: 40 },
            ]}
            onChange={() => {}}
          />
        </div>
      </div>
      <hr></hr>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Via Port" />
          <Select
            className="basis-3/5"
            placeholder="Choose port"
            options={[
              { label: "Jakarta", value: "jakarta" },
              { label: "Tangerang", value: "tangerang" },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="THC OPP" />
          <InputText className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Tracking Rate" />
          <InputText className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="BL Admin" />
          <InputText placeholder="Enter etc. cost" className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Buruh" />
          <InputText className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Cleaning Cont." />
          <InputText className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="THC OPT" />
          <InputText className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Materai" />
          <InputText className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Grand Total" />
          <InputText className="basis-3/5" disabled />
        </div>
      </div>
    </>
  );
}

function Shipping() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Create Date" />
          <InputText className="basis-3/5" disabled />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Effective Date" />
          <DatePicker className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Shipping Name" />
          <Select
            className="basis-3/5"
            placeholder=""
            options={[
              { label: "Directur", value: "directur" },
              { label: "Marketing", value: "marketing" },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
      </div>
    </>
  );
}

function PriceShipping() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Route" />
          <Select
            className="basis-3/5"
            placeholder=""
            options={[
              { label: "Jakarta - Tangerang", value: 0 },
              { label: "Tangerang - Bekasi", value: 1 },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Container Size" />
          <Select
            className="basis-3/5"
            placeholder="Choose container size"
            options={[
              { label: "20ft", value: 20 },
              { label: "40ft", value: 40 },
            ]}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Container Type" />
          <Select
            className="basis-3/5"
            placeholder=""
            options={[
              { label: "Jakarta - Tangerang", value: 0 },
              { label: "Tangerang - Bekasi", value: 1 },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Service Type" />
          <Select
            className="basis-3/5"
            placeholder="Choose container size"
            options={[
              { label: "20ft", value: 20 },
              { label: "40ft", value: 40 },
            ]}
            onChange={() => {}}
          />
        </div>
      </div>
      <hr></hr>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Via Port" />
          <Select
            className="basis-3/5"
            placeholder="Choose port"
            options={[
              { label: "Jakarta", value: "jakarta" },
              { label: "Tangerang", value: "tangerang" },
            ]}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Alih Kapal" />
          <InputText className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Freight" />
          <InputText className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Materai" />
          <InputText className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="THC OPT" />
          <InputText className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="LO/LO" />
          <InputText placeholder="Enter etc. cost" className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="THC OPP" />
          <InputText className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Segel" />
          <InputText className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="BL Admin" />
          <InputText className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="RC" />
          <InputText className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Cleaning Cont." />
          <InputText className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="LSS" />
          <InputText className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label className="basis-2/5" name="Grand Total" />
          <InputText className="basis-3/5" disabled />
        </div>
      </div>
    </>
  );
}

export default function PriceSave() {
  const { setActive } = useMenu();
  const [type, setType] = React.useState(0);

  React.useEffect(() => {
    setActive(1, 6);
  }, [setActive]);

  return (
    <SaveLayout
      onSave={() => {}}
      title="Input Sales Data"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label className="basis-2/5" name="Price Type" />
                  <Radio
                    name="type"
                    value="Factory"
                    onChange={() => setType(0)}
                    defaultChecked
                  />
                  <Radio
                    name="type"
                    value="Vendor"
                    onChange={() => setType(1)}
                  />
                  <Radio
                    name="type"
                    value="Shipping"
                    onChange={() => setType(2)}
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              {type === 0 && <Factory />}
              {type === 1 && <Vendor />}
              {type === 2 && <Shipping />}
            </>
          ),
        },
        {
          isHide: type === 0,
          isAppend: true,
          append: "Detail Price",
          name: "Detail Price",
          component: (
            <div className="flex flex-col gap-3">
              {type === 1 && <PriceVendor />}
              {type === 2 && <PriceShipping />}
            </div>
          ),
        },
      ]}
    />
  );
}
