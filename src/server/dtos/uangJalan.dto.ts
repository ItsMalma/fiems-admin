import { SelectOption } from "@/components/Elements";
import { ContainerSizes, TruckTypes } from "@/libs/options";
import { Prisma } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import { validateCode, validateMoney, validateText } from "../validation";
import { extractCustomerCode } from "./customer.dto";
import { extractRouteCode } from "./route.dto";

export const uangJalanInput = z.object({
  vendor: validateCode((value) => !isNaN(extractCustomerCode(value))),
  route: validateCode((value) => !isNaN(extractRouteCode(value))),
  containerSize: validateText(),
  truckType: validateText(),
  bbm: validateMoney(),
  toll: validateMoney(),
  labourCost: validateMoney(),
  meal: validateMoney(),
  etc: validateMoney(),
  total: validateMoney(),
});
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
        vendor: true;
        route: true;
      };
    }>
  ): UangJalanTableRow {
    return new UangJalanTableRow(
      moment(model.createDate).toString(),
      model.id,
      `${model.vendorCode} (${model.vendor.name})`,
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
    public route: string
  ) {}

  static fromModel(
    model: Prisma.UangJalanGetPayload<{
      include: {
        vendor: true;
        route: true;
      };
    }>
  ): UangJalanForm {
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

  static readonly truckTypeOptions: SelectOption[] = TruckTypes;

  static readonly containerSizeOptions = ContainerSizes;
}
