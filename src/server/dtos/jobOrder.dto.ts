import { validateShippingCode } from "@/server/dtos/customer.dto";
import {
  refineDateRange,
  validateCode,
  validateDate,
  validatePhone,
  validateText,
} from "@/server/validation";
import { z } from "zod";
import { validateVendorCode } from "./customer.dto";
import { validateRouteCode } from "./route.dto";

export function validateJobOrderNumber(jobOrderNumber: string): boolean {
  return /^JO\d{4}$/.test(jobOrderNumber);
}

export function createJobOrderNumber(number: number) {
  return "JO" + number.toString().padStart(4, "0");
}

export function extractNumberJobOrder(jobOrderNumber: string) {
  return Number(jobOrderNumber.slice(2));
}

export type JobOrderForm = {
  number: string;
  createDate: string | Date;
  inquiryNumber: string;
  inquiryDate: string | Date;
  sales: string;
  shipping: string;
  vessel: string;
  voyage: string;
  etd: string | Date;
  eta: string | Date;
  loadDate: string | Date;
  route: string;
  factory: string;
  factoryAddress: string;
  deliveryTo: string;
  deliveryToCity: string;
  containerSize: string;
  containerType: string;
  typeOrder: string;
  roNumber: string;
  consignee: string;
  consigneeAddress: string;
  consigneeCity: string;
  consigneeEmail: string;
  consigneeTelephone: string;
  stuffingDate: string | Date;
  trackingRoute: string;
  vendor: string;
  driverName: string;
  driverPhoneNumber: string;
  vehicle: string;
  vehicleType: string;
  containerNumber1: string;
  sealNumber1: string;
  containerNumber2: string | null;
  sealNumber2: string | null;
};

export const defaultJobOrderForm: JobOrderForm = {
  number: "",
  createDate: new Date(),
  inquiryNumber: "",
  inquiryDate: new Date(),
  sales: "",
  shipping: "",
  vessel: "",
  voyage: "",
  etd: new Date(),
  eta: new Date(),
  loadDate: new Date(),
  route: "",
  factory: "",
  factoryAddress: "",
  deliveryTo: "",
  deliveryToCity: "",
  containerSize: "",
  containerType: "",
  typeOrder: "",
  roNumber: "",
  consignee: "",
  consigneeAddress: "",
  consigneeCity: "",
  consigneeEmail: "",
  consigneeTelephone: "",
  stuffingDate: new Date(),
  trackingRoute: "",
  vendor: "",
  driverName: "",
  driverPhoneNumber: "",
  vehicle: "",
  vehicleType: "",
  containerNumber1: "",
  sealNumber1: "",
  containerNumber2: null,
  sealNumber2: null,
};

export type JobOrderConfirmationForm = {
  td: string | Date;
  ta: string | Date;
  sandar: string | Date;
};

export type JobOrderPindahKapalForm = {
  shipping: string;
  vessel: string;
  voyage: string;
  etd: string | Date;
  eta: string | Date;
};

export const jobOrderValidationSchema = z.object({
  roNumber: validateText(true),
  consignee: validateCode(validateVendorCode),
  stuffingDate: validateDate(),
  trackingRoute: validateCode(validateRouteCode),
  vendor: validateCode(validateVendorCode),
  driverName: validateText(),
  driverPhoneNumber: validatePhone("mobile"),
  vehicle: validateText(),
  containerNumber1: validateText(),
  sealNumber1: validateText(),
  containerNumber2: z.string().nullable(),
  sealNumber2: z.string().nullable(),
});
export type JobOrderInput = z.infer<typeof jobOrderValidationSchema>;

export const jobOrderConfirmationValidationSchema1 = z
  .object({
    td: validateDate(),
  })
  .superRefine(refineDateRange("td", "ta"));
export const jobOrderConfirmationValidationSchema2 = z
  .object({
    ta: validateDate(),
    sandar: validateDate(),
  })
  .superRefine(refineDateRange("td", "ta"));
export type JobOrderConfirmationInput =
  | z.infer<typeof jobOrderConfirmationValidationSchema1>
  | z.infer<typeof jobOrderConfirmationValidationSchema2>;

export const jobOrderPindahKapalValidationSchema = z.object({
  shipping: validateCode(validateShippingCode),
  vessel: validateText(),
  voyage: validateText(),
  etd: validateDate(),
  eta: validateDate(),
});
export type JobOrderPindahKapalInput = z.infer<
  typeof jobOrderPindahKapalValidationSchema
>;

export type JobOrderTableRow = {
  number: string;
  createDate: Date;
  inquiryNumber: string;
  inquiryDate: Date;
  sales: string;
  shipping: string;
  vessel: string;
  voyage: string;
  etd: Date;
  eta: Date;
  loadDate: Date;
  route: string;
  factory: string;
  factoryAddress: string;
  deliveryTo: string;
  deliveryToCity: string;
  containerSize: string;
  containerType: string;
  typeOrder: string;
  roNumber: string;
  consignee: string;
  consigneeAddress: string;
  consigneeCity: string;
  consigneeEmail: string;
  consigneeTelephone: string;
  stuffingDate: Date;
  trackingRoute: string;
  vendor: string;
  driverName: string;
  driverPhoneNumber: string;
  vehicle: string;
  vehicleType: string;
  containerNumber1: string;
  sealNumber1: string;
  containerNumber2: string | null;
  sealNumber2: string | null;
  td: Date | null;
  ta: Date | null;
  sandar: Date | null;
};

export type ConfirmedJobOrderTableRow = JobOrderTableRow & {
  td: Date | null;
  ta: Date | null;
  sandar: Date | null;
};
