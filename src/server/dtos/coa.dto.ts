import { Coa, Coa1, Prisma } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import { validateCode, validateSelect, validateText } from "../validation";
import { SelectOption } from "@/components/Elements";

export const accountTypes = ["Main Coa", "Sub Coa 1", "Sub Coa 2"] as const;
export type AccountType = (typeof accountTypes)[number];

export const coaInput = z
  .object({
    accountType: validateSelect(accountTypes),
    description: validateText(),
    type: validateText(),
    category: validateText(),
    transaction: validateText(),
    currency: validateText(),

    mainCoa: validateCode(
      (value) => !isNaN(extractCoaCode(value))
    ).optional(),
    subCoa1: validateCode(
      (value) => !isNaN(extractCoaCode(value))
    ).optional(),
    subCoa2: validateCode(
      (value) => !isNaN(extractCoaCode(value))
    ).optional(),
  })
export type CoaInput = z.infer<typeof coaInput>;

export const createCoaCode = (codeNumber: number): string => {
  return codeNumber.toString().padStart(2, "0");
};

export const extractCoaCode = (code: string): number => {
  return Number(code);
};

export class CoaTableRow {
  constructor(
    public accountType: AccountType,
    public description: string,
    public subCoa1: string,
    public subCoa2: string,
    public number: string,
    public type: string,
    public category: string,
    public transaction: string,
    public currency: string,
    public status: boolean
  ) {}

  static fromMainCoaModel(model: Coa): CoaTableRow {
    return new CoaTableRow(
      "Main Coa",
      model.description,
      "",
      "",
      model.number,
      model.type,
      model.category,
      model.transaction,
      model.currency,
      model.status,
    );
  }
  
  static fromSubCoa1Model(model: Prisma.Coa1GetPayload<{include: { coa: true }}>): CoaTableRow {
    return new CoaTableRow(
      "Sub Coa 1",
      model.coa.description,
      model.description,
      "",
      model.coa.number,
      model.coa.type,
      model.coa.category,
      model.coa.transaction,
      model.coa.currency,
      model.coa.status,
    );
  }

  static fromSubCoa2Model(model: Prisma.Coa2GetPayload<{include: { coa1: {include: {coa: true}} }}>): CoaTableRow {
    return new CoaTableRow(
      "Sub Coa 2",
      model.coa1.coa.description,
      model.coa1.description,
      model.description,
      model.coa1.coa.number,
      model.coa1.coa.type,
      model.coa1.coa.category,
      model.coa1.coa.transaction,
      model.coa1.coa.currency,
      model.coa1.coa.status,
    );
  }

}

export class CoaForm {
  constructor(
    public accountType: AccountType,
    public createDate: string | Date,
    public number: string,
    public description: string,
    public type: string,
    public category: string,
    public transaction: string,
    public currency: string,

    public coa1?: string,
    public coa1Description?: string,
    
    public coa2?: string,
    public coa2Description?: string,
  ) {}

  static fromMainCoaModel(model: Coa): CoaForm {
    return new CoaForm(
      "Main Coa",
      model.createDate,
      model.number,
      model.description,
      model.type,
      model.category,
      model.transaction,
      model.currency
    );
  }

  static fromSubCoa1Model(model: Prisma.Coa1GetPayload<{include: { coa: true }}>): CoaForm {
    return new CoaForm(
      "Sub Coa 1",
      model.coa.createDate,
      model.coa.number,
      model.coa.description,
      model.coa.type,
      model.coa.category,
      model.coa.transaction,
      model.coa.currency,

      model.description
    );
  }
  
  static fromSubCoa2Model(model: Prisma.Coa2GetPayload<{include: { coa1: {include: {coa: true}} }}>): CoaForm {
    return new CoaForm(
      "Sub Coa 2",
      model.coa1.coa.createDate,
      model.coa1.coa.number,
      model.coa1.coa.description,
      model.coa1.coa.type,
      model.coa1.coa.category,
      model.coa1.coa.transaction,
      model.coa1.coa.currency,

      model.coa1.number,
      model.coa1.description,

      model.number,
      model.description
    );
  }

  static mainCoaInitial = (type: AccountType) => ({
    accountType: type,
    createDate: new Date(),
    number: createCoaCode(1),
    description: "",
    type: "",
    category: "",
    transaction: "",
    currency: "",
    coa1: "",
    coa1Description: "",
    coa2: "",
    coa2Description: ""
  });

  static subCoa1Initial = (type: AccountType, coa: Coa) => ({
    accountType: type,
    createDate: new Date(),
    number: "",
    description: "",
    type: "",
    category: "",
    transaction: "",
    currency: "",
    coa1: `${coa.number}${createCoaCode(1)}`,
    coa1Description: "",
    coa2: "",
    coa2Description: ""
  });

  static subCoa2Initial = (type: AccountType, coa1: Prisma.Coa1GetPayload<{include: { coa: true }}>) => ({
    accountType: type,
    createDate: new Date(),
    number: "",
    description: "",
    type: "",
    category: "",
    transaction: "",
    currency: "",
    coa1: "",
    coa1Description: "",
    coa2: `${coa1.coa.number}${coa1.number}${createCoaCode(1)}`,
    coa2Description: ""
  });

  static readonly typeOptions: SelectOption[] = [
    { label: "Main Coa", value: "Main Coa" },
    { label: "Sub Coa1", value: "Sub Coa1" },
    { label: "Sub Coa2", value: "Sub Coa2" },
  ];
}

