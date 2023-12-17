import moment from "moment";
import { z } from "zod";
import { validateCode } from "../validation";
import { validateSuratJalanNumber } from "./suratJalan.dto";

export function createBASTNumber(num: number) {
  const now = moment();

  return (
    num.toString().padStart(4, "0") +
    "/CEL/" +
    now.format("MMMM") +
    "/" +
    now.format("YYYY")
  );
}

export function extractBASTNumber(spmNumber: string) {
  return Number(spmNumber.slice(0, 4));
}

export function validateBASTNumber(spmNumber: string) {
  return /^\d{4}\/CEL\/[A-z][a-z]+\/\d{4}$/.test(spmNumber);
}

export type BASTDetailProductForm = {
  product: string;
  qty: number;
  unit: string;
};
export const defaultBASTDetailProductForm: BASTDetailProductForm = {
  product: "",
  qty: 0,
  unit: "",
};

export type BASTForm = {
  number: string;
  date: string | Date;
  suratJalan: string;
  jobOrder: string;
  shipmentOrDO: number;
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
  typeProduct: string;
  details: BASTDetailProductForm[];
};
export const defaultBASTForm: BASTForm = {
  number: createBASTNumber(1),
  date: new Date(),
  suratJalan: "",
  jobOrder: "",
  shipmentOrDO: 0,
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
  typeProduct: "",
  details: [defaultBASTDetailProductForm],
};

export const bastValidationSchema = z.object({
  suratJalan: validateCode(validateSuratJalanNumber),
});
export type BASTInput = z.infer<typeof bastValidationSchema>;

export type BASTTableRow = {
  number: string;
  createDate: Date;
};
