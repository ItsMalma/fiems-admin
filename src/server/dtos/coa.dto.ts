import { SelectOption } from "@/components/Elements";
import { MainCOA, Prisma } from "@prisma/client";
import { z } from "zod";
import {
  validateCode,
  validateSelectWithEnum,
  validateText,
} from "../validation";

export const coaTypes = ["Main", "Sub 1", "Sub 2"] as const;
export type COAType = (typeof coaTypes)[number];

export const mainCOAInput = z.object({
  type: validateSelectWithEnum(coaTypes),
  accountName: validateText(),
  accountType: validateText(),
  category: validateText(),
  transaction: validateText(),
  currency: validateText(),
});
export type MainCOAInput = z.infer<typeof mainCOAInput>;

export const sub1COAInput = z.object({
  type: validateSelectWithEnum(coaTypes),
  main: validateCode((code) => code !== "0" && !isNaN(Number(code))).transform(
    (value) => Number(value)
  ),
  sub1Description: validateText(),
});
export type Sub1COAInput = z.infer<typeof sub1COAInput>;

export const sub2COAInput = z.object({
  type: validateSelectWithEnum(coaTypes),
  main: validateCode((code) => code !== "0" && !isNaN(Number(code))).transform(
    (value) => Number(value)
  ),
  sub1: validateCode((code) => code !== "0" && !isNaN(Number(code))).transform(
    (value) => Number(value)
  ),
  sub2Description: validateText(),
});
export type Sub2COAInput = z.infer<typeof sub2COAInput>;

export function extractCOANumber(coaNumber: string): {
  main: number;
  sub1?: number;
  sub2?: number;
} {
  const splittedCOANumber = coaNumber.split(".");
  return {
    main: Number(splittedCOANumber[0]),
    sub1:
      splittedCOANumber.length >= 2 ? Number(splittedCOANumber[1]) : undefined,
    sub2:
      splittedCOANumber.length >= 3 ? Number(splittedCOANumber[2]) : undefined,
  };
}

export class COATableRow {
  constructor(
    public mainCOA: string,
    public sub1COA: string,
    public sub2COA: string,
    public accountNumber: string,
    public accountType: string,
    public category: string,
    public transaction: string,
    public currency: string,
    public status: boolean
  ) {}

  static fromMainModel(model: MainCOA): COATableRow[] {
    return [
      new COATableRow(
        model.accountName,
        "",
        "",
        model.number.toString(),
        model.accountType,
        model.category,
        model.transaction,
        model.currency,
        model.status
      ),
      ...model.subs.flatMap((sub1, sub1Index) => {
        return [
          new COATableRow(
            model.accountName,
            sub1.description,
            "",
            `${model.number}.${sub1Index + 1}`,
            model.accountType,
            model.category,
            model.transaction,
            model.currency,
            sub1.status
          ),
          ...sub1.subs.flatMap(
            (sub2, sub2Index) =>
              new COATableRow(
                model.accountName,
                sub1.description,
                sub2.description,
                `${model.number}.${sub1Index + 1}.${sub2Index + 1}`,
                model.accountType,
                model.category,
                model.transaction,
                model.currency,
                sub2.status
              )
          ),
        ];
      }),
    ];
  }
}

export class COAForm {
  constructor(
    public type: COAType,
    public createDate: string | Date,
    public accountName: string,
    public accountType: string,
    public category: string,
    public transaction: string,
    public currency: string,
    public main: number,
    public sub1: number,
    public sub1Description: string,
    public sub2: number,
    public sub2Description: string
  ) {}

  static fromMainModel(mainModel: MainCOA): COAForm {
    return new COAForm(
      "Main",
      mainModel.createDate,
      mainModel.accountName,
      mainModel.accountType,
      mainModel.category,
      mainModel.transaction,
      mainModel.currency,
      mainModel.number,
      0,
      "",
      0,
      ""
    );
  }

  static fromSub1Model(
    sub1Model: Prisma.Sub1COAGetPayload<{}>,
    sub1Index: number,
    mainModel: MainCOA
  ): COAForm {
    return new COAForm(
      "Sub 1",
      mainModel.createDate,
      mainModel.accountName,
      mainModel.accountType,
      mainModel.category,
      mainModel.transaction,
      mainModel.currency,
      mainModel.number,
      sub1Index,
      sub1Model.description,
      0,
      ""
    );
  }

  static fromSub2Model(
    sub2Model: Prisma.Sub2COAGetPayload<{}>,
    sub2Index: number,
    sub1Model: Prisma.Sub1COAGetPayload<{}>,
    sub1Index: number,
    mainModel: MainCOA
  ): COAForm {
    return new COAForm(
      "Sub 2",
      mainModel.createDate,
      mainModel.accountName,
      mainModel.accountType,
      mainModel.category,
      mainModel.transaction,
      mainModel.currency,
      mainModel.number,
      sub1Index,
      sub1Model.description,
      sub2Index,
      sub2Model.description
    );
  }

  static initial = (type: COAType) => {
    switch (type) {
      case "Main":
        return new COAForm(
          "Main",
          new Date(),
          "",
          "",
          "",
          "",
          "",
          0,
          0,
          "",
          0,
          ""
        );
      case "Sub 1":
        return new COAForm(
          "Sub 1",
          new Date(),
          "",
          "",
          "",
          "",
          "",
          0,
          0,
          "",
          0,
          ""
        );
      case "Sub 2":
        return new COAForm(
          "Sub 2",
          new Date(),
          "",
          "",
          "",
          "",
          "",
          0,
          0,
          "",
          0,
          ""
        );
    }
  };

  static readonly typeOptions: SelectOption[] = [
    { label: "Main COA", value: "Main" },
    { label: "Sub COA 1", value: "Sub 1" },
    { label: "Sub COA 2", value: "Sub 2" },
  ];
}
