import { SelectOption } from "@/components/Elements";
import { Route } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import { refineDateRange, validateDate, validateText } from "../validation";

export const routeInput = z
  .object({
    serviceType: validateText(),
    containerType: validateText(),
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
    public serviceType: string,
    public containerType: string,
    public status: boolean
  ) {}

  static fromModel(model: Route): RouteTableRow {
    return new RouteTableRow(
      moment(model.createDate).toString(),
      model.code,
      model.province,
      model.city,
      `${model.startDescription} - ${model.endDescription}`,
      model.serviceType,
      model.containerType,
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
    public serviceType: string,
    public containerType: string,
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
      model.serviceType,
      model.containerType,
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
    new Date(),
    new Date()
  );

  static readonly serviceTypeOptions: SelectOption[] = [
    { label: "Door to Door", value: "Door to Door" },
    { label: "Door to Port", value: "Door to Port" },
    { label: "Port to Door", value: "Port to Door" },
    { label: "Port to Port", value: "Port to Port" },
    { label: "Door to CY", value: "Door to CY" },
    { label: "Port to CY", value: "Port to CY" },
    { label: "CY to Door", value: "CY to Door" },
    { label: "CY to Port", value: "CY to Port" },
    { label: "CY to CY", value: "CY to CY" },
  ];

  static readonly containerTypeOptions: SelectOption[] = [
    { label: "20 Feet", value: "20 Feet" },
    { label: "21 Feet", value: "21 Feet" },
    { label: "40 Feet", value: "40 Feet" },
    { label: "41 Feet", value: "41 Feet" },
    { label: "40 HC", value: "40 HC" },
  ];
}
