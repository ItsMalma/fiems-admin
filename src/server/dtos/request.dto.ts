import { SelectOption } from "@/components/Elements";
import { TypeRequest } from "@prisma/client";
import { z } from "zod";
import {
  validateAppend,
  validateCode,
  validateCounter,
  validateSelect,
} from "../validation";
import { validateProductCode } from "./product.dto";

export function createRequestNumber(num: number) {
  return "REQ" + num.toString().padStart(4, "0");
}

export function extractRequestNumber(insuranceNumber: string) {
  return Number(insuranceNumber.slice(3));
}

export function validateRequestNumber(insuranceNumber: string) {
  return /^REQ\d{4}$/.test(insuranceNumber);
}

export const typeRequests: SelectOption[] = Object.values(TypeRequest).map(
  (v) => ({
    label: v,
    value: v,
  })
);

export type RequestDetailForm = {
  product: string;
  qty: number;
  remarks: string;
};
export const defaultRequestDetailForm: RequestDetailForm = {
  product: "",
  qty: 0,
  remarks: "",
};

export type RequestForm = {
  number: string;
  date: string | Date;
  typeRequest: string;
  details: RequestDetailForm[];
};
export const defaultRequestForm: RequestForm = {
  number: createRequestNumber(1),
  date: new Date(),
  typeRequest: "",
  details: [defaultRequestDetailForm],
};

export const requestValidationSchema = z.object({
  typeRequest: validateSelect(typeRequests),
  details: validateAppend(
    z.object({
      product: validateCode(validateProductCode),
      qty: validateCounter(0),
      remarks: z.string().default(""),
    })
  ),
});
export type RequestInput = z.infer<typeof requestValidationSchema>;

export type RequestTableRow = {
  number: string;
  createDate: Date;
  type: string;
};
