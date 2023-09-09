import React from "react";
import useMenu from "@/stores/menu";
import Label from "@/components/Elements/Label";
import InputText from "@/components/Elements/InputText";
import FormLayout from "@/components/Layouts/FormLayout";
import Select from "@/components/Elements/Select";
import DatePicker from "@/components/Elements/DatePicker";
import Radio from "@/components/Elements/Radio";

export function Motor() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Type" className="w-[35%]" />
          <Select
            placeholder="Choose type"
            options={["Honda Vario", "Yamaha Mio"]}
            value={0}
            onChange={() => {}}
            className="w-full"
          />           
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">  
          <Label name="QTY" className="w-[35%]" />
          <div className="flex gap-1 w-full items-end">
            <InputText placeholder="Enter quantity" className="w-full"/> 
            <p className="text-sm">Unit</p>             
          </div>
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Kode" className="w-[35%]" />
          <InputText placeholder="Enter kode motor" className="w-full"/>
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">  
          <Label name="Warna" className="w-[35%]" />
          <InputText placeholder="Enter warna" className="w-full"/>                
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Frame" className="w-[35%]" />
          <InputText placeholder="Enter frame" className="w-full"/>
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">  
          <Label name="Engine" className="w-[35%]" />
          <InputText placeholder="Enter engine" className="w-full"/>                
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="SPK" className="w-[35%]" />
          <InputText placeholder="Enter SPK" className="w-full"/>
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">  
        </div>
      </div>
    </>
  )
}

export function Product() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Product" className="w-[35%]" />
          <Select
            placeholder="Choose product"
            options={["SKU0001-SABUN", "SKU0002-SHAMPOO"]}
            value={0}
            onChange={() => {}}
            className="w-full"
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">                
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="QTY" className="w-[35%]" />
          <InputText placeholder="Enter quantity" className="w-full"/>
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">  
          <Label name="Warna" className="w-[35%]" />
          <Select
            placeholder="Choose satuan"
            options={["BOX", "Karton", "KG", "PCs"]}
            value={0}
            onChange={() => {}}
            className="w-full"
          />                
        </div>
      </div>      
    </>
  )
}

export function Material() {
  return (
    <>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="Product" className="w-[35%]" />
          <Select
            placeholder="Choose product"
            options={["SKU0001-SABUN", "SKU0002-SHAMPOO"]}
            value={0}
            onChange={() => {}}
            className="w-full"
          />
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">                
        </div>
      </div>
      <div className="flex gap-[18px] 2xl:gap-6 items-center">
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
          <Label name="QTY" className="w-[35%]" />
          <InputText placeholder="Enter quantity" className="w-full"/>
        </div>
        <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">  
          <Label name="Warna" className="w-[35%]" />
          <Select
            placeholder="Choose satuan"
            options={["BOX", "Karton", "KG", "PCs"]}
            value={0}
            onChange={() => {}}
            className="w-full"
          />                
        </div>
      </div>      
    </>
  )
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
                  <Label name="Create Date" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">                  
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="SJ Number" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled />
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">                  
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="JO. Num." className="w-[35%]" />
                  <Select
                    placeholder="Choose job number"
                    options={["JO00001", "JO00002"]}
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
                  <Label name="Customer Name" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Customer To" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
              </div>   
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Address" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
              </div>   
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Number" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Shipment/DO" className="w-[35%]" />
                  <InputText placeholder="Enter customer shipment/DO number" className="w-full"/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Tracking Route" className="w-[35%]" />
                  <InputText placeholder="" className="w-full" disabled/>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Truck Type" className="w-[35%]" />
                  <InputText className="w-full" disabled/>
                </div>
              </div>
              <div className="flex gap-[18px] 2xl:gap-6 items-center">
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="w-[35%]" />
                  <div className="flex gap-3 w-full items-center">
                    <InputText placeholder="" className="w-full" disabled/>
                    <Label name="Seal"/>
                    <InputText placeholder="" className="w-full" disabled/>
                  </div>
                </div>
                <div className="flex gap-[18px] 2xl:gap-6 items-center basis-1/2">
                  <Label name="Cont. Number" className="w-[35%]" />
                  <div className="flex gap-3 w-full items-center">
                    <InputText placeholder="" className="w-full" disabled/>
                    <Label name="Seal"/>
                    <InputText placeholder="" className="w-full" disabled/>
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
                {type === 0 && <Motor/>}
                {type === 1 && <Product/>}
                {type === 2 && <Material/>}
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
