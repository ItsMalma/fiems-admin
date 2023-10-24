import { SelectOption } from "@/components/Elements";
import { Prisma } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import {
  validateCode,
  validateCounter,
  validateEmail,
  validatePhone,
  validateSelect,
  validateText,
} from "../validation";
import { extractCustomerGroupCode } from "./customerGroup.dto";

export const customerTypes = ["Factory", "Vendor", "Shipping"] as const;
export type CustomerType = (typeof customerTypes)[number];

export const customerInput = z.object({
  type: validateSelect(customerTypes),
  name: validateText(),
  group: validateCode(
    (value) => !isNaN(extractCustomerGroupCode(value))
  ).optional(),
  address: validateText(),
  province: validateText(),
  city: validateText(),
  telephone: validatePhone("telephone"),
  fax: validatePhone("fax"),
  email: validateEmail(),
  top: validateCounter(0),
  currency: validateText(),
  purchasing: z.object({
    name: validateText(),
    phoneNumber: validatePhone("mobile"),
    telephone: validatePhone("telephone"),
    fax: validatePhone("fax"),
    email: validateEmail(),
  }),
  operation: z.object({
    name: validateText(),
    phoneNumber: validatePhone("mobile"),
    telephone: validatePhone("telephone"),
    fax: validatePhone("fax"),
    email: validateEmail(),
  }),
  finance: z.object({
    name: validateText(),
    phoneNumber: validatePhone("mobile"),
    telephone: validatePhone("telephone"),
    fax: validatePhone("fax"),
    email: validateEmail(),
  }),
});
export type CustomerInput = z.infer<typeof customerInput>;

export const createCustomerCode = (
  type: CustomerType,
  codeNumber: number
): string => {
  let prefix = "";
  switch (type) {
    case "Factory":
      prefix = "CFC";
      break;
    case "Vendor":
      prefix = "CVC";
      break;
    case "Shipping":
      prefix = "CSC";
      break;
  }
  return prefix + codeNumber.toString().padStart(4, "0");
};

export const extractCustomerCode = (code: string): number => {
  return Number(code.slice(3));
};

export class CustomerPic {
  constructor(
    public name: string,
    public phoneNumber: string,
    public telephone: string,
    public fax: string,
    public email: string
  ) {}

  static fromModel(pic: Prisma.CustomerPicGetPayload<{}>): CustomerPic {
    return new CustomerPic(
      pic.name,
      pic.phoneNumber,
      pic.telephone,
      pic.fax,
      pic.email
    );
  }

  static readonly default: CustomerPic = {
    name: "",
    phoneNumber: "",
    telephone: "",
    fax: "",
    email: "",
  };
}

export class CustomerTableRow {
  constructor(
    public createDate: string,
    public type: string,
    public code: string,
    public name: string,
    public group: string,
    public address: string,
    public province: string,
    public city: string,
    public telephone: string,
    public fax: string,
    public email: string,
    public purchasing: CustomerPic,
    public operation: CustomerPic,
    public finance: CustomerPic,
    public status: boolean
  ) {}

  static fromFactoryModel(
    factory: Prisma.FactoryGetPayload<{
      include: { group: true };
    }>
  ): CustomerTableRow {
    return new CustomerTableRow(
      moment(factory.createDate).toString(),
      "Factory",
      factory.code,
      factory.name,
      factory.group.code,
      factory.address,
      factory.province,
      factory.city,
      factory.telephone,
      factory.fax,
      factory.email,
      CustomerPic.fromModel(factory.purchasing),
      CustomerPic.fromModel(factory.operation),
      CustomerPic.fromModel(factory.finance),
      factory.status
    );
  }

  static fromVendorModel(
    vendor: Prisma.VendorGetPayload<{}>
  ): CustomerTableRow {
    return new CustomerTableRow(
      moment(vendor.createDate).toString(),
      "Vendor",
      vendor.code,
      vendor.name,
      "",
      vendor.address,
      vendor.province,
      vendor.city,
      vendor.telephone,
      vendor.fax,
      vendor.email,
      CustomerPic.fromModel(vendor.purchasing),
      CustomerPic.fromModel(vendor.operation),
      CustomerPic.fromModel(vendor.finance),
      vendor.status
    );
  }

  static fromShippingModel(
    shipping: Prisma.ShippingGetPayload<{}>
  ): CustomerTableRow {
    return new CustomerTableRow(
      moment(shipping.createDate).toString(),
      "Shipping",
      shipping.code,
      shipping.name,
      "",
      shipping.address,
      shipping.province,
      shipping.city,
      shipping.telephone,
      shipping.fax,
      shipping.email,
      CustomerPic.fromModel(shipping.purchasing),
      CustomerPic.fromModel(shipping.operation),
      CustomerPic.fromModel(shipping.finance),
      shipping.status
    );
  }
}

export class CustomerForm {
  constructor(
    public createDate: string | Date,
    public type: CustomerType,
    public code: string,
    public name: string,
    public address: string,
    public province: string,
    public city: string,
    public telephone: string,
    public fax: string,
    public email: string,
    public top: number,
    public currency: string,
    public purchasing: CustomerPic,
    public operation: CustomerPic,
    public finance: CustomerPic,
    public group?: string
  ) {}

  static fromFactoryModel(
    factory: Prisma.FactoryGetPayload<{
      include: { group: true };
    }>
  ): CustomerForm {
    return new CustomerForm(
      moment(factory.createDate).toString(),
      "Factory",
      factory.code,
      factory.name,
      factory.address,
      factory.province,
      factory.city,
      factory.telephone,
      factory.fax,
      factory.email,
      factory.top,
      factory.currency,
      CustomerPic.fromModel(factory.purchasing),
      CustomerPic.fromModel(factory.operation),
      CustomerPic.fromModel(factory.finance),
      factory.group.code
    );
  }

  static fromVendorModel(vendor: Prisma.VendorGetPayload<{}>): CustomerForm {
    return new CustomerForm(
      moment(vendor.createDate).toString(),
      "Vendor",
      vendor.code,
      vendor.name,
      vendor.address,
      vendor.province,
      vendor.city,
      vendor.telephone,
      vendor.fax,
      vendor.email,
      vendor.top,
      vendor.currency,
      CustomerPic.fromModel(vendor.purchasing),
      CustomerPic.fromModel(vendor.operation),
      CustomerPic.fromModel(vendor.finance)
    );
  }

  static fromShippingModel(
    shipping: Prisma.ShippingGetPayload<{}>
  ): CustomerForm {
    return new CustomerForm(
      moment(shipping.createDate).toString(),
      "Shipping",
      shipping.code,
      shipping.name,
      shipping.address,
      shipping.province,
      shipping.city,
      shipping.telephone,
      shipping.fax,
      shipping.email,
      shipping.top,
      shipping.currency,
      CustomerPic.fromModel(shipping.purchasing),
      CustomerPic.fromModel(shipping.operation),
      CustomerPic.fromModel(shipping.finance)
    );
  }

  static initial = (type: CustomerType) => ({
    createDate: new Date(),
    type: type,
    code: createCustomerCode(type, 1),
    name: "",
    address: "",
    province: "",
    city: "",
    telephone: "",
    fax: "",
    email: "",
    top: 0,
    currency: "",
    purchasing: CustomerPic.default,
    operation: CustomerPic.default,
    finance: CustomerPic.default,
  });

  static readonly typeOptions: SelectOption[] = [
    { label: "Factory", value: "Factory" },
    { label: "Vendor", value: "Vendor" },
    { label: "Shipping", value: "Shipping" },
  ];
}
