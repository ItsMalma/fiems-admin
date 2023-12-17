import { z } from "zod";
import { validateCode } from "../validation";
import { validateJobOrderNumber } from "./jobOrder.dto";

export function createSPMNumber(num: number) {
  return "SPM" + num.toString().padStart(4, "0");
}

export function extractSPMNumber(spmNumber: string) {
  return Number(spmNumber.slice(3));
}

export function validateSPMNumber(spmNumber: string) {
  return /^SPM\d{4}$/.test(spmNumber);
}

export type SPMForm = {
  number: string;
  createDate: string | Date;
  jobOrder: string;
  factory: string;
  factoryAddress: string;
  consignee: string;
  consigneeAddress: string;
  stuffingDate: string | Date;
  vendor: string;
  route: string;
  vehicle: string;
  vehicleType: string;
  driverName: string;
  driverPhoneNumber: string;
  containerNumber1: string;
  sealNumber1: string;
  containerNumber2: string;
  sealNumber2: string;
  uangJalan: number;
};

export const spmValidationSchema = z.object({
  jobOrder: validateCode(validateJobOrderNumber),
});
export type SPMInput = z.infer<typeof spmValidationSchema>;

export type SPMTableRow = {
  number: string;
  createDate: Date;
  factory: string;
  consignee: string;
  route: string;
  uangJalan: number;
};
