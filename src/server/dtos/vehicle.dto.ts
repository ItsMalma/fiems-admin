import { SelectOption } from "@/components/Elements";
import { TruckTypes } from "@/libs/options";
import { Prisma } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import {
  validateCode,
  validateCounter,
  validateDate,
  validateText,
} from "../validation";
import { extractCustomerCode } from "./customer.dto";

export const vehicleInput = z.object({
  vendor: validateCode((value) => !isNaN(extractCustomerCode(value))),
  truckNumber: validateText(),
  brand: validateText(),
  type: validateText(),
  machineNumber: validateText(),
  frameNumber: validateText(),
  cylinder: validateCounter(0),
  color: validateText(),
  stnkExpired: validateDate(),
  taxExpired: validateDate(),
  keurExpired: validateDate(),
});
export type VehicleInput = z.infer<typeof vehicleInput>;

export class VehicleTableRow {
  constructor(
    public createDate: string,
    public id: string,
    public vendor: string,
    public truckNumber: string,
    public brand: string,
    public type: string,
    public machineNumber: string,
    public frameNumber: string,
    public cylinder: number,
    public color: string,
    public stnkExpired: Date,
    public taxExpired: Date,
    public keurExpired: Date,
    public status: boolean
  ) {}

  static fromModel(
    model: Prisma.VehicleGetPayload<{
      include: { vendor: true };
    }>
  ): VehicleTableRow {
    return new VehicleTableRow(
      moment(model.createDate).toString(),
      model.id,
      `${model.vendorCode} (${model.vendor.name})`,
      model.truckNumber,
      model.brand,
      model.type,
      model.machineNumber,
      model.frameNumber,
      model.cylinder,
      model.color,
      model.stnkExpired,
      model.taxExpired,
      model.keurExpired,
      model.status
    );
  }
}

export class VehicleForm {
  constructor(
    public createDate: string | Date,
    public truckNumber: string,
    public brand: string,
    public type: string,
    public machineNumber: string,
    public frameNumber: string,
    public cylinder: number,
    public color: string,
    public stnkExpired: string | Date,
    public taxExpired: string | Date,
    public keurExpired: string | Date,
    public vendor: string
  ) {}

  static fromModel(
    model: Prisma.VehicleGetPayload<{
      include: { vendor: true };
    }>
  ): VehicleForm {
    return new VehicleForm(
      model.createDate,
      model.truckNumber,
      model.brand,
      model.type,
      model.machineNumber,
      model.frameNumber,
      model.cylinder,
      model.color,
      model.stnkExpired,
      model.taxExpired,
      model.keurExpired,
      model.vendor.code
    );
  }

  static readonly initial: VehicleForm = new VehicleForm(
    new Date(),
    "",
    "",
    "",
    "",
    "",
    0,
    "",
    new Date(),
    new Date(),
    new Date(),
    ""
  );

  static readonly brandOptions: SelectOption[] = [
    { label: "Hino", value: "Hino" },
    { label: "UD Trucks", value: "UD Trucks" },
  ];

  static readonly truckTypeOptions: SelectOption[] = TruckTypes;
}
