import { SelectOption } from "@/components/Elements";
import { Sales } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import {
  validateEmail,
  validatePhone,
  validateSelect,
  validateText,
} from "../validation";

export const jobPositions = ["Direktur", "Marketing"] as const;

export const salesInput = z.object({
  name: validateText(),
  jobPosition: validateSelect(jobPositions),
  nik: validateText(),
  area: validateText(),
  phoneNumber: validatePhone("mobile"),
  telephone: validatePhone("telephone"),
  fax: validatePhone("fax"),
  email: validateEmail(),
});
export type SalesInput = z.infer<typeof salesInput>;

export const createSalesCode = (codeNumber: number): string => {
  return "SC" + codeNumber.toString().padStart(4, "0");
};

export const extractSalesCode = (code: string): number => {
  return Number(code.slice(2));
};

export class SalesTableRow {
  constructor(
    public createDate: string,
    public jobPosition: string,
    public code: string,
    public name: string,
    public nik: string,
    public area: string,
    public phoneNumber: string,
    public telephone: string,
    public fax: string,
    public email: string,
    public status: boolean
  ) {}

  static fromModel(model: Sales): SalesTableRow {
    return new SalesTableRow(
      moment(model.createDate).toString(),
      model.jobPosition,
      model.code,
      model.name,
      model.nik,
      model.area,
      model.phoneNumber,
      model.telephone,
      model.fax,
      model.email,
      model.status
    );
  }
}

export class SalesForm {
  constructor(
    public createDate: string | Date,
    public jobPosition: string,
    public code: string,
    public name: string,
    public nik: string,
    public area: string,
    public phoneNumber: string,
    public telephone: string,
    public fax: string,
    public email: string
  ) {}

  static fromModel(model: Sales): SalesForm {
    return new SalesForm(
      model.createDate,
      model.jobPosition,
      model.code,
      model.name,
      model.nik,
      model.area,
      model.phoneNumber,
      model.telephone,
      model.fax,
      model.email
    );
  }

  static readonly initial: SalesForm = new SalesForm(
    new Date(),
    "",
    createSalesCode(1),
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  );

  static readonly typeOptions: SelectOption[] = [
    { label: "Marketing", value: "Marketing" },
    { label: "Direktur", value: "Direktur" },
  ];
}
