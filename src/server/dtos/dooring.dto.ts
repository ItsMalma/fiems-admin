import { z } from "zod";
import { validateCode, validateDate } from "../validation";
import { validateJobOrderNumber } from "./jobOrder.dto";

export type DooringForm = {
  date: string | Date;
  jobOrder: string;
  suratJalan: string;
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
  bongkarKapal: string | Date;
  estimate: string | Date;
};
export const defaultDooringForm: DooringForm = {
  date: new Date(),
  jobOrder: "",
  suratJalan: "",
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
  bongkarKapal: "",
  estimate: "",
};

export type DooringConfirmForm = {
  bongkarKapal: string | Date;
  estimate: string | Date;
  actual: string | Date;
};

export const dooringValidationSchema = z.object({
  jobOrder: validateCode(validateJobOrderNumber),
  bongkarKapal: validateDate(),
  estimate: validateDate(),
});
export type DooringInput = z.infer<typeof dooringValidationSchema>;

export const dooringConfirmValidationSchema = z.object({
  actual: validateDate(),
});
export type DooringConfirmInput = z.infer<
  typeof dooringConfirmValidationSchema
>;

export type DooringTableRow = {
  id: string;
  createDate: Date;
  jobOrder: string;
  suratJalan: string;
  td: Date;
  ta: Date;
  sandar: Date;
  bongkarKapal: Date;
  estimate: Date;
  actual: Date | null;
};
