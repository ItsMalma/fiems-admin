import moment from "moment";
import { z } from "zod";
import {
  validateAppend,
  validateCode,
  validateCounter,
  validateText,
} from "../validation";
import { validateJobOrderNumber } from "./jobOrder.dto";
import { validateProductCode } from "./product.dto";
import { validateProductCategoryReff } from "./productCategory.dto";

export function createSuratJalanNumber(num: number) {
  const now = moment();

  return (
    num.toString().padStart(4, "0") +
    "/SJ/" +
    now.format("MMMM") +
    "/" +
    now.format("YYYY")
  );
}

export function extractSuratJalanNumber(spmNumber: string) {
  return Number(spmNumber.slice(0, 4));
}

export function validateSuratJalanNumber(spmNumber: string) {
  return /^\d{4}\/SJ\/[A-z][a-z]+\/\d{4}$/.test(spmNumber);
}

export type SuratJalanDetailProductForm = {
  product: string;
  qty: number;
  unit: string;
  kode: string | null;
  warna: string | null;
  frame: string | null;
  engine: string | null;
  spek: string | null;
};
export const defaultSuratJalanDetailProductForm: SuratJalanDetailProductForm = {
  product: "",
  qty: 0,
  unit: "",
  kode: null,
  warna: null,
  frame: null,
  engine: null,
  spek: null,
};

export type SuratJalanForm = {
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
  shipmentOrDO: number;
  containerNumber1: string;
  sealNumber1: string;
  containerNumber2: string;
  sealNumber2: string;
  typeProduct: string;
  details: SuratJalanDetailProductForm[];
};
export const defaultSuratJalanForm: SuratJalanForm = {
  number: createSuratJalanNumber(1),
  date: new Date(),
  jobOrder: "",
  factory: "",
  factoryAddress: "",
  factoryCity: "",
  consignee: "",
  consigneeAddress: "",
  consigneeCity: "",
  vehicle: "",
  shipmentOrDO: 0,
  containerNumber1: "",
  sealNumber1: "",
  containerNumber2: "",
  sealNumber2: "",
  typeProduct: "",
  details: [defaultSuratJalanDetailProductForm],
};

export const suratJalanValidationSchema = z.object({
  jobOrder: validateCode(validateJobOrderNumber),
  shipmentOrDO: validateCounter(0),
  typeProduct: validateCode(validateProductCategoryReff),
  details: validateAppend(
    z.object({
      product: validateCode(validateProductCode),
      qty: validateCounter(0),
      unit: validateText(),
      kode: z.string().nullable().default(null),
      warna: z.string().nullable().default(null),
      frame: z.string().nullable().default(null),
      engine: z.string().nullable().default(null),
      spek: z.string().nullable().default(null),
    })
  ),
});
export type SuratJalanInput = z.infer<typeof suratJalanValidationSchema>;

export type SuratJalanTableRow = {
  number: string;
  createDate: Date;
  factory: string;
  consignee: string;
};
