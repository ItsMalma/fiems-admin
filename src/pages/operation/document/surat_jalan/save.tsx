import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import Radio from "@/components/Elements/Radio";

function Motor() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Type" className="basis-2/5" />
          <Select
            placeholder="Choose type"
            options={[
              { label: "Honda Vario", value: 0 },
              { label: "Yamaha Mio", value: 1 },
            ]}
            onChange={() => {}}
            isSearchable
            className="basis-3/5"
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="QTY" className="basis-2/5" />
          <div className="flex gap-1 basis-3/5 items-end">
            <InputText placeholder="Enter quantity" />
            <p className="text-sm">Unit</p>
          </div>
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Kode" className="basis-2/5" />
          <InputText placeholder="Enter kode motor" className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Warna" className="basis-2/5" />
          <InputText placeholder="Enter warna" className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Frame" className="basis-2/5" />
          <InputText placeholder="Enter frame" className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Engine" className="basis-2/5" />
          <InputText placeholder="Enter engine" className="basis-3/5" />
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="SPK" className="basis-2/5" />
          <InputText placeholder="Enter SPK" className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
      </div>
    </>
  );
}

function Product() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Product" className="basis-2/5" />
          <Select
            placeholder="Choose product"
            options={[
              { label: "SKU0001-SABUN", value: 1 },
              { label: "SKU0002-SHAMPOO", value: 2 },
            ]}
            onChange={() => {}}
            isSearchable
            className="basis-3/5"
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="QTY" className="basis-2/5" />
          <InputText placeholder="Enter quantity" className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Warna" className="basis-2/5" />
          <Select
            placeholder="Choose satuan"
            options={[
              { label: "BOX", value: 1 },
              { label: "Karton", value: 2 },
              { label: "KG", value: 3 },
              { label: "PCs", value: 4 },
            ]}
            onChange={() => {}}
            isSearchable
            className="basis-3/5"
          />
        </div>
      </div>
    </>
  );
}

function Material() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Product" className="basis-2/5" />
          <Select
            placeholder="Choose product"
            options={[
              { label: "SKU0001-SABUN", value: 1 },
              { label: "SKU0002-SHAMPOO", value: 2 },
            ]}
            onChange={() => {}}
            isSearchable
            className="basis-3/5"
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="QTY" className="basis-2/5" />
          <InputText placeholder="Enter quantity" className="basis-3/5" />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Warna" className="basis-2/5" />
          <Select
            placeholder="Choose satuan"
            options={[
              { label: "BOX", value: 1 },
              { label: "Karton", value: 2 },
              { label: "KG", value: 3 },
              { label: "PCs", value: 4 },
            ]}
            onChange={() => {}}
            isSearchable
            className="basis-3/5"
          />
        </div>
      </div>
    </>
  );
}

export default function UangJalanSave() {
  const { setActive } = useMenu();
  const [type, setType] = React.useState(0);

  React.useEffect(() => {
    setActive(3, 2, 1);
  }, []);

  return (
    <FormLayout
      title="Input Vehicle Data"
      tabs={[
        {
          name: "General Information",
          component: (
            <>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Create Date" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="SJ Number" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="JO. Num." className="basis-2/5" />
                  <Select
                    placeholder="Choose job number"
                    options={[
                      { label: "JO00001", value: 1 },
                      { label: "JO00002", value: 2 },
                    ]}
                    onChange={() => {}}
                    isSearchable
                    className="basis-3/5"
                  />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2"></div>
              </div>
              <hr></hr>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer Name" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer To" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Number" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Shipment/DO" className="basis-2/5" />
                  <InputText
                    placeholder="Enter customer shipment/DO number"
                    className="basis-3/5"
                  />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Tracking Route" className="basis-2/5" />
                  <InputText placeholder="" className="basis-3/5" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Type" className="basis-2/5" />
                  <InputText className="basis-3/5" disabled />
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="basis-2/5" />
                  <div className="flex gap-3 basis-3/5 items-center">
                    <InputText placeholder="" className="basis-3/5" disabled />
                    <Label name="Seal" />
                    <InputText placeholder="" className="basis-3/5" disabled />
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="basis-2/5" />
                  <div className="flex gap-3 basis-3/5 items-center">
                    <InputText placeholder="" className="basis-3/5" disabled />
                    <Label name="Seal" />
                    <InputText placeholder="" className="basis-3/5" disabled />
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          name: "Type",
          component: (
            <>
              <div className="flex gap-[9px] 2xl:gap-3 items-center">
                <Label name="Product Type" className="w-[15%]" />
                <div className="flex gap-6">
                  <Radio
                    name="type"
                    value="Motor"
                    onChange={() => setType(0)}
                    defaultChecked
                  />
                  <Radio
                    name="type"
                    value="Product FMCG"
                    onChange={() => setType(1)}
                  />
                  <Radio
                    name="type"
                    value="Raw Material"
                    onChange={() => setType(2)}
                  />
                </div>
              </div>
            </>
          ),
        },
        {
          isAppend: true,
          append: "Product",
          name: "Product Detail",
          component: (
            <>
              <div className="flex flex-col gap-3">
                {type === 0 && <Motor />}
                {type === 1 && <Product />}
                {type === 2 && <Material />}
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
