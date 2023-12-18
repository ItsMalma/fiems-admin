import { z } from "zod";
import { validateCode, validateMoney, validateText } from "../validation";
import { validateJobOrderNumber } from "./jobOrder.dto";

export function createInsuranceNumber(num: number) {
  return "INS" + num.toString().padStart(4, "0");
}

export function extractInsuranceNumber(insuranceNumber: string) {
  return Number(insuranceNumber.slice(3));
}

export function validateInsuranceNumber(insuranceNumber: string) {
  return /^INS\d{4}$/.test(insuranceNumber);
}

export type InsuranceForm = {
  number: string;
  date: string | Date;
  jobOrder: string;
  factory: string;
  factoryAddress: string;
  factoryCity: string;
  consignee: string;
  consigneeAddress: string;
  consigneeCity: string;
  vehicle: string;
  shipping: string;
  vessel: string;
  voyage: string;
  containerNumber1: string;
  sealNumber1: string;
  containerNumber2: string;
  sealNumber2: string;
  nilaiTertanggung: number;
  premi: string;
  total: number;
  keterangan: string;
};
export const defaultInsuranceForm: InsuranceForm = {
  number: createInsuranceNumber(1),
  date: new Date(),
  jobOrder: "",
  factory: "",
  factoryAddress: "",
  factoryCity: "",
  consignee: "",
  consigneeAddress: "",
  consigneeCity: "",
  vehicle: "",
  shipping: "",
  vessel: "",
  voyage: "",
  containerNumber1: "",
  sealNumber1: "",
  containerNumber2: "",
  sealNumber2: "",
  nilaiTertanggung: 0,
  premi: "",
  total: 0,
  keterangan: "",
};

export const insuranceValidationSchema = z.object({
  jobOrder: validateCode(validateJobOrderNumber),
  nilaiTertanggung: validateMoney(),
  premi: validateText(),
  keterangan: z.string().default(""),
});
export type InsuranceInput = z.infer<typeof insuranceValidationSchema>;

export type InsuranceTableRow = {
  number: string;
  createDate: Date;
  nilaiTertanggung: number;
  premi: string;
  total: number;
  td: Date;
};
