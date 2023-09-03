import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import DatePicker from "@/components/Elements/DatePicker";
import Radio from "@/components/Elements/Radio";

export function Factory() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Create Date" className="w-[35%]" />
          <InputText className="w-full" disabled />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Effective Date" className="w-[35%]" />
          <DatePicker className="w-full" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Quotation Number" className="w-[35%]" />
          <Select
            placeholder=""
            options={["Direktur", "Marketing"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
            search
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Factory Name" className="w-[35%]" />
          <Select
            placeholder=""
            options={["Direktur", "Marketing"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
            search
          />
        </div>
      </div>
      <hr></hr>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Route" className="w-[35%]" />
          <Select
            placeholder=""
            options={["Jakarta-Tangerang", "Tangerang-Bekasi"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
            search
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Container Size" className="w-[35%]" />
          <Select
            placeholder="Choose container size"
            options={["20ft", "40ft"]}
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
            placeholder=""
            options={["Jakarta-Tangerang", "Tangerang-Bekasi"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
            search
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Service Type" className="w-[35%]" />
          <Select
            placeholder="Choose container size"
            options={["20ft", "40ft"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
          />
        </div>
      </div>
      <hr></hr>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Via Port" className="w-[35%]" />
          <Select
            placeholder="Choose port"
            options={["Jakarta", "Tangerang"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="HPP" className="w-[35%]" />
          <InputText className="w-full" disabled />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Province" className="w-[35%]" />
          <Select
            placeholder="Choose province"
            options={["Jawa Barat", "DKI Jakarta"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Etc. Cost" className="w-[35%]" />
          <InputText placeholder="Enter etc. cost" className="w-full" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="HPP after Etc. Cost" className="w-[35%]" />
          <InputText className="w-full" disabled />
        </div>
      </div>
    </>
  );
}
export function Vendor() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Create Date" className="w-[35%]" />
          <InputText className="w-full" disabled />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Effective Date" className="w-[35%]" />
          <DatePicker className="w-full" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Vendor Name" className="w-[35%]" />
          <Select
            placeholder=""
            options={["Direktur", "Marketing"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
            search
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
      </div>
      <hr></hr>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Route" className="w-[35%]" />
          <Select
            placeholder=""
            options={["Jakarta-Tangerang", "Tangerang-Bekasi"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
            search
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Container Size" className="w-[35%]" />
          <Select
            placeholder="Choose container size"
            options={["20ft", "40ft"]}
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
            placeholder=""
            options={["Jakarta-Tangerang", "Tangerang-Bekasi"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
            search
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Service Type" className="w-[35%]" />
          <Select
            placeholder="Choose container size"
            options={["20ft", "40ft"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
          />
        </div>
      </div>
      <hr></hr>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Via Port" className="w-[35%]" />
          <Select
            placeholder="Choose port"
            options={["Jakarta", "Tangerang"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="HPP" className="w-[35%]" />
          <InputText className="w-full" disabled />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Province" className="w-[35%]" />
          <Select
            placeholder="Choose province"
            options={["Jawa Barat", "DKI Jakarta"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Etc. Cost" className="w-[35%]" />
          <InputText placeholder="Enter etc. cost" className="w-full" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="City" className="w-[35%]" />
          <Select
            placeholder="Choose city"
            options={["Jakarta", "Tangerang"]}
            value={-1}
            onChange={() => {}}
            className="w-full"
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="HPP after Etc. Cost" className="w-[35%]" />
          <InputText className="w-full" disabled />
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
                  <Label name="Price Type" className="w-[35%]" />
                  <Radio
                    name="type"
                    value="Factory"
                    onChange={() => setType(0)}
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
            </>
          ),
        },
        {
          name: "General Information",
          component: <></>,
        },
      ]}
    />
  );
}
