import { SelectOption } from "@/components/Elements";
import { ContainerSizes, ContainerTypes, ServiceTypes } from "@/libs/options";
import { Route } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import { refineDateRange, validateDate, validateText } from "../validation";

export const routeInput = z
  .object({
    containerSize: validateText(),
    containerType: validateText(),
    serviceType: validateText(),
    province: validateText(),
    city: validateText(),
    startDescription: validateText(),
    endDescription: validateText(),
    effectiveStartDate: validateDate(),
    effectiveEndDate: validateDate(),
  })
  .superRefine(refineDateRange("effectiveStartDate", "effectiveEndDate"));
export type RouteInput = z.infer<typeof routeInput>;

export const createRouteCode = (codeNumber: number): string => {
  return "RC" + codeNumber.toString().padStart(4, "0");
};

export const extractRouteCode = (code: string): number => {
  return Number(code.slice(2));
};

export class RouteTableRow {
  constructor(
    public createDate: string,
    public code: string,
    public province: string,
    public city: string,
    public description: string,
    public containerSize: string,
    public containerType: string,
    public serviceType: string,
    public status: boolean
  ) {}

  static fromModel(model: Route): RouteTableRow {
    return new RouteTableRow(
      moment(model.createDate).toString(),
      model.code,
      model.province,
      model.city,
      `${model.startDescription} - ${model.endDescription}`,
      model.containerSize,
      model.containerType,
      model.serviceType,
      moment(new Date()).isBetween(
        model.effectiveStartDate,
        model.effectiveEndDate,
        "day",
        "[]"
      )
    );
  }
}

export class RouteForm {
  constructor(
    public createDate: string | Date,
    public code: string,
    public containerSize: string,
    public containerType: string,
    public serviceType: string,
    public province: string,
    public city: string,
    public startDescription: string,
    public endDescription: string,
    public effectiveStartDate: string | Date,
    public effectiveEndDate: string | Date
  ) {}

  static fromModel(model: Route): RouteForm {
    return new RouteForm(
      model.createDate,
      model.code,
      model.containerSize,
      model.containerType,
      model.serviceType,
      model.province,
      model.city,
      model.startDescription,
      model.endDescription,
      model.effectiveStartDate,
      model.effectiveEndDate
    );
  }

  static readonly initial: RouteForm = new RouteForm(
    new Date(),
    createRouteCode(1),
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    new Date(),
    new Date()
  );

  static readonly containerSizeOptions: SelectOption[] = ContainerSizes;

  static readonly containerTypeOptions: SelectOption[] = ContainerTypes;

  static readonly serviceTypeOptions: SelectOption[] = ServiceTypes;
}
