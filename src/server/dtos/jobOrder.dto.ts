import {
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
  containerNumber2: z.string().optional(),
  sealNumber2: z.string().optional(),
});
export type JobOrderInput = z.infer<typeof jobOrderValidationSchema>;

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
};
