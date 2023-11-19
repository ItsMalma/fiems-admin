import { Port } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import { refineDateRange, validateText } from "../validation";

export function validatePortCode(code: string): boolean {
  return /^PC\d{4}$/.test(code);
}

export const portInput = z
  .object({
    province: validateText(),
    city: validateText(),
    name: validateText(),
  })
  .superRefine(refineDateRange("effectiveStartDate", "effectiveEndDate"));
export type PortInput = z.infer<typeof portInput>;

export const createPortCode = (codeNumber: number): string => {
  return "PC" + codeNumber.toString().padStart(4, "0");
};

export const extractPortCode = (code: string): number => {
  return Number(code.slice(2));
};

export class PortTableRow {
  constructor(
    public createDate: string,
    public code: string,
    public province: string,
    public city: string,
    public name: string
  ) {}

  static fromModel(model: Port): PortTableRow {
    return new PortTableRow(
      moment(model.createDate).toString(),
      model.code,
      model.province,
      model.city,
      model.name
    );
  }
}

export class PortForm {
  constructor(
    public createDate: string | Date,
    public code: string,
    public province: string,
    public city: string,
    public name: string
  ) {}

  static fromModel(model: Port): PortForm {
    return new PortForm(
      model.createDate,
      model.code,
      model.province,
      model.city,
      model.name
    );
  }

  static readonly initial: PortForm = new PortForm(
    new Date(),
    createPortCode(1),
    "",
    "",
    ""
  );
}
