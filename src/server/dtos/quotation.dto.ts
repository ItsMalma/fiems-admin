import {
  ContainerSizes,
  ContainerTypes,
  QuotationStatus,
  ServiceTypes,
} from "@/libs/options";
import { QuotationDetailSummaryDetailStatus } from "@prisma/client";
import { z } from "zod";
import {
  refineDateRange,
  validateAppend,
  validateCode,
  validateDate,
  validateMoney,
  validateSelect,
} from "../validation";
import {
  validateFactoryCode,
  validateShippingCode,
  validateVendorCode,
} from "./customer.dto";
import { validatePortCode } from "./port.dto";
import { validateRouteCode } from "./route.dto";
import { validateSalesCode } from "./sales.dto";

export function extractNumberQuotation(number: string): number {
  return Number(number.slice(3));
}

export function createQuotationNumber(number: number): string {
  return "QUO" + number.toString().padStart(5, "0");
}

export type QuotationDetailTrackingPrices = {
  tracking: number;
  buruh: number;
  thcOPT: number;
  thcOPP: number;
  adminBL: number;
  cleaning: number;
  materai: number;
};

export type QuotationDetailShippingPrices = {
  freight: number;
  thcOPT: number;
  thcOPP: number;
  adminBL: number;
  cleaning: number;
  alihKapal: number;
  materai: number;
  lolo: number;
  segel: number;
  rc: number;
  lss: number;
};

export type QuotationDetailTrackingForm = {
  vendor: string;
  route: string;
  price: number;
};

export type QuotationDetailShippingDetailForm = {
  shipping: string;
  route: string;
  price: number;
};

export type QuotationDetailOtherExpansesForm = {
  adminBL: number;
  cleaning: number;
  alihKapal: number;
  materai: number;
  biayaBuruh: number;
  stuffingDalam: number;
  stuffingLuar: number;
  biayaCetakRC: number;
  biayaCetakIR: number;
  price: number;
};

export type QuotationDetailSummaryDetailForm = {
  ppftz: QuotationDetailSummaryDetailStatus;
  nilaiPPFTZ: number;
  insurance: QuotationDetailSummaryDetailStatus;
  nilaiInsurance: number;
  rate: string;
  biayaAdmin: number;
  insuranceSum: number;
  hpp: number;
  ppn: Exclude<QuotationDetailSummaryDetailStatus, "TidakAda">;
  hargaJual: number;
  hargaJual2: number;
  hargaJual3: number;
  profit: number;
};

export type QuotationDetailForm = {
  route: string;
  factory: string;
  factoryAddress: string;
  factoryCity: string;
  port: string;
  containerSize: string;
  containerType: string;
  trackingAsal: QuotationDetailTrackingForm;
  trackingTujuan: QuotationDetailTrackingForm;
  shippingDetail: QuotationDetailShippingDetailForm;
  otherExpanses: QuotationDetailOtherExpansesForm;
  summaryDetail: QuotationDetailSummaryDetailForm;
};

export const defaultQuotationDetailForm: QuotationDetailForm = {
  route: "",
  factory: "",
  factoryAddress: "",
  factoryCity: "",
  port: "",
  containerSize: "",
  containerType: "",
  trackingAsal: { route: "", vendor: "", price: 0 },
  trackingTujuan: { route: "", vendor: "", price: 0 },
  shippingDetail: { route: "", shipping: "", price: 0 },
  otherExpanses: {
    adminBL: 0,
    cleaning: 0,
    alihKapal: 0,
    materai: 0,
    biayaBuruh: 0,
    stuffingDalam: 0,
    stuffingLuar: 0,
    biayaCetakRC: 0,
    biayaCetakIR: 0,
    price: 0,
  },
  summaryDetail: {
    ppftz: "Include",
    nilaiPPFTZ: 0,
    insurance: "Include",
    nilaiInsurance: 0,
    rate: "0,10%",
    biayaAdmin: 0,
    insuranceSum: 0,
    hpp: 0,
    ppn: "Include",
    hargaJual: 0,
    hargaJual2: 0,
    hargaJual3: 0,
    profit: 0,
  },
};

export type QuotationForm = {
  number: string;
  createDate: Date;
  serviceType: string;
  sales: string;
  effectiveStartDate: Date;
  effectiveEndDate: Date;
  factory: string;
  factoryAddress: string;
  details: QuotationDetailForm[];
};

export const defaultQuotationForm: QuotationForm = {
  number: createQuotationNumber(1),
  createDate: new Date(),
  serviceType: "",
  sales: "",
  effectiveStartDate: new Date(),
  effectiveEndDate: new Date(),
  factory: "",
  factoryAddress: "",
  details: [defaultQuotationDetailForm],
};

export const quotationValidationSchema = z
  .object({
    serviceType: validateSelect<string>(ServiceTypes),
    sales: validateCode(validateSalesCode),
    effectiveStartDate: validateDate(),
    effectiveEndDate: validateDate(),
    factory: validateCode(validateFactoryCode),
    details: validateAppend(
      z.object({
        route: validateCode(validateRouteCode),
        factory: validateCode(validateFactoryCode),
        port: validateCode(validatePortCode),
        containerSize: validateSelect<string>(ContainerSizes),
        containerType: validateSelect<string>(ContainerTypes),
        trackingAsal: z.object({
          vendor: validateCode(validateVendorCode),
          route: validateCode(validateRouteCode),
        }),
        trackingTujuan: z.object({
          vendor: validateCode(validateVendorCode),
          route: validateCode(validateRouteCode),
        }),
        shippingDetail: z.object({
          shipping: validateCode(validateShippingCode),
          route: validateCode(validateRouteCode),
        }),
        otherExpanses: z.object({
          adminBL: validateMoney(),
          cleaning: validateMoney(),
          alihKapal: validateMoney(),
          materai: validateMoney(),
          biayaBuruh: validateMoney(),
          stuffingDalam: validateMoney(),
          stuffingLuar: validateMoney(),
          biayaCetakRC: validateMoney(),
          biayaCetakIR: validateMoney(),
        }),
        summaryDetail: z.object({
          ppftz:
            validateSelect<QuotationDetailSummaryDetailStatus>(QuotationStatus),
          nilaiPPFTZ: validateMoney(),
          insurance:
            validateSelect<QuotationDetailSummaryDetailStatus>(QuotationStatus),
          nilaiInsurance: validateMoney(),
          biayaAdmin: validateMoney(),
          ppn: validateSelect<QuotationDetailSummaryDetailStatus>(
            QuotationStatus
          ),
          hargaJual: validateMoney(),
        }),
      })
    ),
  })
  .superRefine(refineDateRange("effectiveStartDate", "effectiveEndDate"));
export type QuotationInput = z.infer<typeof quotationValidationSchema>;
