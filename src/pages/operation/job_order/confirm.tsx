import { Form, FormCode, FormDate, FormSelect, FormText } from "@/components/Forms";
import SaveLayout from "@/components/Layouts/SaveLayout";
import useMenu from "@/stores/menu";
import React from "react";

export default function JobOrderConfirm() {
  const { setActive } = useMenu();

  let methods:any

  const [combo, setCombo] = React.useState(0);

  React.useEffect(() => {
    setActive(3, 0, 0);
  }, [setActive]);

  return (
    <SaveLayout
        onSave={() => {}}
        title="Confirm Job Order"
        isLoading={false}
      >
        <Form
          methods={methods}
          tabs={[
            {
              id: "generalInformation",
              name: "General Information",
              controls :[
                {
                  type: "input",
                  id: "createDate",
                  label: "Create Date",
                  input: <FormDate name="createDate" readOnly />,
                },
                {
                  type: "input",
                  id: "inquiryDate",
                  label: "Inquiry Date",
                  input: <FormDate name="inquiryDate" readOnly />,
                },
                {
                  type: "input",
                  id: "jobOrderCode",
                  label: "J.O. Code",
                  input: <FormCode name="jobOrder" readOnly/>,
                },
                {
                  type: "input",
                  id: "inquiryCode",
                  label: "Inquiry Code",
                  input: <FormCode name="inquiryCode" readOnly/>,
                },
                {
                  type: "input",
                  id: "marketingName",
                  label: "Marketing Name",
                  input: <FormText name="marketingName" readOnly/>,
                },
                {
                  type: "separator",
                },
                {
                  type: "heading",
                  label: "Shipping Detail"
                },
                {
                  type: "input",
                  id: "shippingName",
                  label: "Shipping Name",
                  input: <FormText name="shippingName" readOnly/>,
                },
                {
                  type: "blank",
                },
                {
                  type: "input",
                  id: "vesselName",
                  label: "Vessel Name",
                  input: <FormText name="vesselName" readOnly/>,
                },
                {
                  type: "input",
                  id: "voyage",
                  label: "Voyage",
                  input: <FormText name="voyage" readOnly/>,
                },
                {
                  type: "input",
                  id: "etd",
                  label: "ETD",
                  input: <FormDate name="etd" readOnly/>,
                },
                {
                  type: "input",
                  id: "eta",
                  label: "ETA",
                  input: <FormDate name="eta" readOnly/>,
                },
                {
                  type: "separator",
                },
                {
                  type: "heading",
                  label: "Order Detail"
                },
                {
                  type: "input",
                  id: "loadDate",
                  label: "Load Date",
                  input: <FormDate name="loadDate" readOnly/>,
                },
                {
                  type: "input",
                  id: "route",
                  label: "Route",
                  input: <FormText name="route" readOnly/>,
                },
                {
                  type: "input",
                  id: "customerName",
                  label: "Customer Name",
                  input: <FormText name="customerName" readOnly/>,
                },
                // address dan city untuk customer asli
                {
                  type: "input",
                  id: "address",
                  label: "Address",
                  input: <FormText name="address" readOnly/>,
                },
                {
                  type: "input",
                  id: "customerTo",
                  label: "Customer To",
                  input: <FormText name="customerTo" readOnly/>,
                },
                // city untuk customer to
                {
                  type: "input",
                  id: "city",
                  label: "City",
                  input: <FormText name="city" readOnly/>,
                },
                {
                  type: "input",
                  id: "containerType",
                  label: "Container Type",
                  input: <FormText name="containerType" readOnly/>,
                },
                {
                  type: "input",
                  id: "containerSize",
                  label: "Container Size",
                  input: <FormText name="containerSize" readOnly/>,
                },
                {
                  type: "separator",
                },
                {
                  type: "heading",
                  label: "Confirmation Order"
                },
                {
                  type: "input",
                  id: "typeOrder",
                  label: "Type Order",
                  input: <FormText name="typeOrder" readOnly/>,
                },
                {
                  type: "blank"
                },
                {
                  type: "input",
                  id: "roNumber",
                  label: "RO Number",
                  input: <FormText name="roNumber"/>,
                },
                {
                  type: "blank"
                },
                {
                  type: "input",
                  id: "consignee",
                  label: "Consignee",
                  input: <FormSelect name="consignee" options={[]}/>,
                },
                {
                  type: "input",
                  id: "consigneeEmail",
                  label: "Email",
                  input: <FormText name="consigneeEmail" readOnly/>,
                },
                {
                  type: "input",
                  id: "consigneeAddress",
                  label: "Address",
                  input: <FormText name="consigneeAddress" readOnly/>,
                },
                {
                  type: "input",
                  id: "consigneeTelephoneNumber",
                  label: "Telephone Number",
                  input: <FormText name="consigneeTelephoneNumber" readOnly/>,
                },
                {
                  type: "input",
                  id: "consigneeCity",
                  label: "City",
                  input: <FormText name="consigneeCity" readOnly/>,
                },
                {
                  type: "input",
                  id: "consigneePhoneNumber",
                  label: "Phone Number",
                  input: <FormText name="consigneePhoneNumber" readOnly/>,
                },
                {
                  type: "separator",
                },
                {
                  type: "tools",
                  label: "Convert To Combo",
                  onClick: () => {}
                },
                {
                  type: "input",
                  id: "stuffingDate",
                  label: "Stuffing Date",
                  input: <FormDate name="stuffingDate"/>,
                },
                {
                  type: "blank"
                },
                // THIS RIGHT HERE MIGHT BE THERE'S SOME CHANGE - trackingName trackingRoute
                {
                  type: "input",
                  id: "trackingName",
                  label: "Tracking Name",
                  input: <FormText name="trackingName"/>,
                },
                {
                  type: "input",
                  id: "containerNumber1",
                  label: "Container Number",
                  input: <FormText name="containerNumber1"/>,
                },
                // {
                //   type: "blank"
                // },
                {
                  type: "input",
                  id: "trackingRoute",
                  label: "Tracking Route",
                  input: <FormSelect name="trackingRoute" options={[]}/>,
                },
                {
                  type: "input",
                  id: "sealNumber1",
                  label: "Seal Number",
                  input: <FormText name="sealNumber1"/>,
                },
                // {
                //   type: "blank"
                // },
                {
                  type: "input",
                  id: "driverName",
                  label: "Driver Name",
                  input: <FormText name="driverName"/>,
                },
                {
                  type: "input",
                  id: "containerNumber2",
                  label: "Container Number",
                  input: <FormText name="containerNumber2"/>,
                },
                // {
                //   type: "blank"
                // },
                {
                  type: "input",
                  id: "driverPhoneNumber",
                  label: "Phone Number",
                  input: <FormText name="driverPhoneNumber"/>,
                },
                {
                  type: "input",
                  id: "sealNumber2",
                  label: "Seal Number",
                  input: <FormText name="sealNumber2"/>,
                },
                // {
                //   type: "blank"
                // },


                // TRUCK NUMBER???
                {
                  type: "input",
                  id: "truckNumber",
                  label: "Truck Number",
                  input: <FormSelect name="truckNumber" options={[]}/>,
                },
                {
                  type: "blank"
                },
                {
                  type: "input",
                  id: "truckType",
                  label: "Truck Type",
                  input: <FormText name="truckType"/>,
                },
                {
                  type: "blank"
                },
              ]
            }
          ]}
        />
    </SaveLayout>
  );
}
