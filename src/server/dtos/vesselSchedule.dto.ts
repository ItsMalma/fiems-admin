import { Months } from "@/libs/options";
import {
  refineDateRange,
  validateCode,
  validateDate,
  validateSelect,
  validateText,
  validateTime,
} from "@/server/validation";
import { z } from "zod";
import { validateShippingCode } from "./customer.dto";
import { validatePortCode } from "./port.dto";

export type VesselScheduleForm = {
  createDate: string | Date;
  month: string;
  shipping: string;
  vessel: string;
  vesselCapacity: number;
  voyage: string;
  quota: string;
  portOrigin: string;
  portDestination: string;
  openStackDate: string | Date;
  closingRC: string | Date;
  rcClosingTime: string;
  closingDate: string | Date;
  vesselClosingTime: string;
  etd: string | Date;
  eta: string | Date;
};

export const defaultVesselScheduleForm: VesselScheduleForm = {
  createDate: new Date(),
  month: "",
  shipping: "",
  vessel: "",
  vesselCapacity: 0,
  voyage: "",
  quota: "",
  portOrigin: "",
  portDestination: "",
  openStackDate: new Date(),
  closingRC: new Date(),
  rcClosingTime: "",
  closingDate: new Date(),
  vesselClosingTime: "",
  etd: new Date(),
  eta: new Date(),
};

export const vesselScheduleValidationSchema = z
  .object({
    month: validateSelect(Months),
    shipping: validateCode(validateShippingCode),
    vessel: validateCode(),
    voyage: validateText(),
    quota: validateText(),
    portOrigin: validateCode(validatePortCode),
    portDestination: validateCode(validatePortCode),
    openStackDate: validateDate(),
    closingRC: validateDate(),
    rcClosingTime: validateTime(),
    closingDate: validateDate(),
    vesselClosingTime: validateTime(),
    etd: validateDate(),
    eta: validateDate(),
  })
  .superRefine(refineDateRange("etd", "eta"));
export type VesselScheduleInput = z.infer<
  typeof vesselScheduleValidationSchema
>;

export type VesselScheduleTableRow = {
  id: string;
  createDate: Date;
  month: string;
  shipping: string;
  vessel: string;
  vesselCapacity: number;
  voyage: string;
  quota: string;
  portOrigin: string;
  portDestination: string;
  openStackDate: Date;
  closingRC: Date;
  rcClosingTime: string;
  closingDate: Date;
  vesselClosingTime: string;
  etd: Date;
  eta: Date;
};
