import { validateShippingCode } from "@/server/dtos/customer.dto";
import { validateAppend, validateText } from "@/server/validation";
import moment from "moment";
import { z } from "zod";
import { validateCode } from "../validation";
import { validateJobOrderNumber } from "./jobOrder.dto";

export function createPackingListNumber(num: number) {
  const now = moment();

  return (
    num.toString().padStart(4, "0") +
    "/PKLS/" +
    now.format("MMMM") +
    "/" +
    now.format("YYYY")
  );
}

export function extractPackingListNumber(spmNumber: string) {
  return Number(spmNumber.slice(0, 4));
}

export function validatePackingListNumber(spmNumber: string) {
  return /^\d{4}\/PKLS\/[A-z][a-z]+\/\d{4}$/.test(spmNumber);
}

export type PackingListDetailRealisationForm = {
  number: string;
  factory: string;
  factoryCity: string;
  deliveryTo: string;
  deliveryToCity: string;
  consignee: string;
  portOrigin: string;
  portDestination: string;
  serviceType: string;
  containerNumber1: string;
  sealNumber1: string;
  containerNumber2: string | null;
  sealNumber2: string | null;
  suratJalan: string;
  bast: string;
};
export const defaultPackingListDetailRealisationForm: PackingListDetailRealisationForm =
  {
    number: "",
    factory: "",
    factoryCity: "",
    deliveryTo: "",
    deliveryToCity: "",
    consignee: "",
    portOrigin: "",
    portDestination: "",
    serviceType: "",
    containerNumber1: "",
    sealNumber1: "",
    containerNumber2: "",
    sealNumber2: "",
    suratJalan: "",
    bast: "",
  };

export type PackingListForm = {
  number: string;
  date: string | Date;
  shipping: string;
  vessel: string;
  voyage: string;
  details: PackingListDetailRealisationForm[];
};
export const defaultPackingListForm: PackingListForm = {
  number: createPackingListNumber(1),
  date: new Date(),
  shipping: "",
  vessel: "",
  voyage: "",
  details: [defaultPackingListDetailRealisationForm],
};

export const packingListValidationSchema = z.object({
  shipping: validateCode(validateShippingCode),
  vessel: validateCode(),
  voyage: validateText(),
  details: validateAppend(
    z.object({
      number: validateCode(validateJobOrderNumber),
    })
  ),
});
export type PackingListInput = z.infer<typeof packingListValidationSchema>;

export type PackingListTableRow = {
  number: string;
  createDate: Date;
  vessel: string;
};
