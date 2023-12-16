import { SelectOption } from "@/components/Elements";
import { ContainerSizes } from "@/libs/options";
import { QuotationDetailSummaryDetailStatus } from "@prisma/client";
import { z } from "zod";
import {
  refineDateRange,
  validateAppend,
  validateCode,
  validateDate,
  validateSelect,
  validateText,
} from "../validation";
import { validateFactoryCode, validateShippingCode } from "./customer.dto";
import { validateRouteCode } from "./route.dto";
import { validateSalesCode } from "./sales.dto";

export function validateInquiryNumber(inquiryNumber: string): boolean {
  return /^INQ\d{4}$/.test(inquiryNumber);
}

export function createInquiryNumber(number: number) {
  return "INQ" + number.toString().padStart(4, "0");
}

export function extractNumberInquiry(inquiryNumber: string) {
  return Number(inquiryNumber.slice(3));
}

export const inquiryJobOrderOptions: SelectOption[] = [
  { label: "Domestic", value: "Domestic" },
  { label: "International", value: "International" },
];

export const inquiryTypeOrderOptions: SelectOption[] = [
  { label: "Muat", value: "Muat" },
  { label: "Bongkaran", value: "Bongkaran" },
];

export type InquiryDetailForm = {
  id: string;
  jobOrder: string;
  typeOrder: string;
  loadDate: string | Date;
  factory: string;
  factoryCity: string;
  route: string;
  containerSize: string;
  serviceType: string;
  containerType: string;
  insurance: QuotationDetailSummaryDetailStatus;
  nilaiInsurance: number;
  ppn: QuotationDetailSummaryDetailStatus;
  ppftz: QuotationDetailSummaryDetailStatus;
  nilaiPPFTZ: number;
  shipping: string;
  vessel: string;
  voyage: string;
  etd: string | Date;
  eta: string | Date;
};

export type InquiryForm = {
  number: string;
  createDate: string | Date;
  sales: string;
  factory: string;
  factoryGroup: string;
  factoryAddress: string;
  factoryCity: string;
  purchase: string;
  purchaseAddress: string;
  purchaseCity: string;
  details: InquiryDetailForm[];
};

export const defaultInquiryDetailForm: InquiryDetailForm = {
  id: "",
  jobOrder: "",
  typeOrder: "",
  loadDate: new Date(),
  factory: "",
  factoryCity: "",
  route: "",
  containerSize: "",
  serviceType: "",
  containerType: "",
  insurance: "Include",
  nilaiInsurance: 0,
  ppn: "Include",
  ppftz: "Include",
  nilaiPPFTZ: 0,
  shipping: "",
  vessel: "",
  voyage: "",
  etd: new Date(),
  eta: new Date(),
};

export const defaultInquiryForm: InquiryForm = {
  number: createInquiryNumber(1),
  createDate: new Date(),
  sales: "",
  factory: "",
  factoryGroup: "",
  factoryAddress: "",
  factoryCity: "",
  purchase: "",
  purchaseAddress: "",
  purchaseCity: "",
  details: [defaultInquiryDetailForm],
};

export const inquiryValidationSchema = z.object({
  sales: validateCode(validateSalesCode),
  factory: validateCode(validateFactoryCode),
  purchase: validateCode(validateFactoryCode),
  details: validateAppend(
    z
      .object({
        id: z.string().optional(),
        jobOrder: validateSelect(inquiryJobOrderOptions),
        typeOrder: validateSelect(inquiryTypeOrderOptions),
        loadDate: validateDate(),
        route: validateCode(validateRouteCode),
        containerSize: validateSelect(ContainerSizes),
        shipping: validateCode(validateShippingCode),
        vessel: validateText(),
        voyage: validateText(),
        etd: validateDate(),
        eta: validateDate(),
      })
      .superRefine(refineDateRange("etd", "eta"))
  ),
});

export type InquiryInput = z.infer<typeof inquiryValidationSchema>;

export type InquiryTableRow = {
  number: string;
  detailID: string;
  createDate: Date;
  sales: string;
  factory: string;
  factoryGroup: string;
  factoryAddress: string;
  factoryCity: string;
  purchase: string;
  purchaseAddress: string;
  purchaseCity: string;
  jobOrder: string;
  typeOrder: string;
  loadDate: Date;
  deliveryTo: string;
  deliveryToCity: string;
  route: string;
  containerSize: string;
  containerType: string;
  serviceType: string;
  ppn: string;
  insurance: string;
  nilaiInsurance: number;
  ppftz: string;
  nilaiPPFTZ: number;
  shipping: string;
  vessel: string;
  voyage: string;
  etd: Date;
  eta: Date;
};
