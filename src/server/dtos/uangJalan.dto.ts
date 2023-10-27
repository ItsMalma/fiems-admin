import { Prisma, UangJalan } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import { validateCode, validateCounter, validateDate, validateEmail, validatePhone, validateSelect, validateText } from "../validation";
import { SelectOption } from "@/components/Elements";
import { extractCustomerCode } from "./customer.dto";
import { extractRouteCode } from "./route.dto";

export const containerSizes = ["20ft", "21ft","40ft", "41ft", "40HC"] as const;
export type ContainerSize = (typeof containerSizes)[number];
export const truckTypes = ["Tronton", "Trintin","Trinton", "Trailer", "Fuso", "Engkel"] as const;
export type TruckTypes = (typeof truckTypes)[number];

export const uangJalanInput = z
  .object({
    vendor: validateCode(
      (value) => !isNaN(extractCustomerCode(value))
    ),
    route: validateCode(
      (value) => !isNaN(extractRouteCode(value))
    ),
    containerSize: validateSelect(containerSizes),
    truckType: validateSelect(truckTypes),
    bbm: validateCounter(),
    toll: validateCounter(),
    labourCost: validateCounter(),
    meal: validateCounter(),
    etc: validateCounter(),
    total: validateCounter(),
  })
export type UangJalanInput = z.infer<typeof uangJalanInput>;

export class UangJalanTableRow {
  constructor(
    public createDate: string,
    public id: string,
    public vendor: string,
    public route: string,
    public truckType: string,
    public containerSize: string,
    public bbm: number,
    public toll: number,
    public labourCost: number,
    public meal: number,
    public etc: number,
    public total: number
  ) {}

  static fromModel(
    model: Prisma.UangJalanGetPayload<{
      include: {
        vendor: true, 
        route: true}
    }>): UangJalanTableRow {
    return new UangJalanTableRow(
      moment(model.createDate).toString(),
      model.id,
      `${model.vendorCode}/${model.vendor.name}`,
      `${model.route.startDescription} - ${model.route.endDescription}`,
      model.truckType,
      model.containerSize,
      model.bbm,
      model.toll,
      model.labourCost,
      model.meal,
      model.etc,
      model.total
    );
  }
}

export class UangJalanForm {
  constructor(
    public createDate: string | Date,
    public truckType: string,
    public containerSize: string,
    public bbm: number,
    public toll: number,
    public labourCost: number,
    public meal: number,
    public etc: number,
    public total: number,
    public vendor: string,
    public route: string,
  ) {}

  static fromModel(
    model: Prisma.UangJalanGetPayload<{
      include: {
        vendor: true, 
        route: true}
    }>): UangJalanForm {
    return new UangJalanForm(
      model.createDate,
      model.truckType,
      model.containerSize,
      model.bbm,
      model.toll,
      model.labourCost,
      model.meal,
      model.etc,
      model.total,
      model.vendor.code,
      model.route.code
    );
  }

  static readonly initial: UangJalanForm = new UangJalanForm(
    new Date(),
    "",
    "",
    0,
    0,
    0,
    0,
    0,
    0,
    "",
    ""
  );

  static readonly truckTypeOptions: SelectOption[] = [
    { label: "Tronton", value: "Tronton" },
    { label: "Trintin", value: "Trintin" },
    { label: "Trinton", value: "Trinton" },
    { label: "Trailer", value: "Trailer" },
    { label: "Fuso", value: "Fuso" },
    { label: "Engkel", value: "Engkel" },
  ];

  static readonly containerSizeOptions: SelectOption[] = [
    { label: "20ft", value: "20ft" },
    { label: "21ft", value: "21ft" },
    { label: "40ft", value: "40ft" },
    { label: "41ft", value: "41ft" },
    { label: "40HC", value: "40HC" },
  ];
}

