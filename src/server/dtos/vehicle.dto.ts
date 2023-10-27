import { Prisma, Vehicle } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import { validateCode, validateDate, validateSelect, validateText } from "../validation";
import { SelectOption } from "@/components/Elements";
import { extractCustomerCode } from "./customer.dto";

export const brands = ["Mitsubishi", "Nissan UD", "Hino", "Isuzu", "FAW", "Scania", "Toyota"]  as const;
export type Brand = (typeof brands)[number];

export const types = ["Tronton", "Trintin", "Trinton", "Trailer", "Fuso", "Engkel"]  as const;
export type type = (typeof types)[number];

export const vehicleInput = z
  .object({
    vendor: validateCode(
        (value) => !isNaN(extractCustomerCode(value))
    ),
    truckNumber: validateText(),
    brand: validateSelect(brands),
    type: validateSelect(types),
    machineNumber: validateText(),
    frameNumber: validateText(),
    cylinder: validateText(),
    color: validateText(),
    stnkExpired: validateDate(),
    taxExpired: validateDate(),
    keurExpired: validateDate(),
  })
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
    public cylinder: string,
    public color: string,
    public stnkExpired: Date,
    public taxExpired: Date,
    public keurExpired: Date,
    public status: boolean
  ) {}

  static fromModel(
    model: Prisma.VehicleGetPayload<{
        include: {vendor: true}
    }>): VehicleTableRow {
    return new VehicleTableRow(
      moment(model.createDate).toString(),
      model.id,
      `${model.vendorCode}/${model.vendor.name}`,
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
      model.status,
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
    public cylinder: string,
    public color: string,
    public stnkExpired: string | Date,
    public taxExpired: string | Date,
    public keurExpired: string | Date,
    public vendor: string,
    ) {}

  static fromModel(
    model: Prisma.VehicleGetPayload<{
        include: {vendor: true}
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
      model.vendor.code,
    );
  }

  static readonly initial: VehicleForm = new VehicleForm(
    new Date(),
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    new Date(),
    new Date(),
    new Date(),
    "",
  );

  static readonly brandOptions: SelectOption[] = [
    { label: "Mitsubishi", value: "Mitsubishi" },
    { label: "Nissan UD", value: "Nissan UD" },
    { label: "Hino", value: "Hino" },
    { label: "Isuzu", value: "Isuzu" },
    { label: "FAW", value: "FAW" },
    { label: "Scania", value: "Scania" },
    { label: "Toyota", value: "Toyota" },
  ];

  static readonly typeOptions: SelectOption[] = [
    { label: "Tronton", value: "Tronton" },
    { label: "Trintin", value: "Trintin" },
    { label: "Trinton", value: "Trinton" },
    { label: "Trailer", value: "Trailer" },
    { label: "Fuso", value: "Fuso" },
    { label: "Engkel", value: "Engkel" },
  ];
}

