import { SelectOption } from "@/components/Elements";
import {
  validateCode,
  validateSelectWithEnum,
  validateText,
} from "@/server/validation";
import { Prisma, ProductType } from "@prisma/client";
import moment from "moment";
import { z } from "zod";

export const productTypes = ["Product", "Sparepart", "ATK"] as const;

export const productInput = z.object({
  type: validateSelectWithEnum(productTypes),
  category: validateCode(
    (code) => !isNaN(extractProductSKUCode(code))
  ).optional(),
  name: validateText(),
  unit: validateText(),
});
export type ProductInput = z.infer<typeof productInput>;

export const createProductSKUCode = (skuCodeNumber: number): string => {
  return "SKU" + skuCodeNumber.toString().padStart(4, "0");
};

export const extractProductSKUCode = (skuCode: string): number => {
  return Number(skuCode.slice(3));
};

export class ProductTableRow {
  constructor(
    public createDate: string,
    public type: string,
    public skuCode: string,
    public category: string,
    public name: string,
    public unit: string
  ) {}

  static fromModel(
    model: Prisma.ProductGetPayload<{ include: { productCategory: true } }>
  ): ProductTableRow {
    return new ProductTableRow(
      moment(model.createDate).toString(),
      model.type,
      model.skuCode,
      model.productCategory?.name ?? "",
      model.name,
      model.unit
    );
  }
}

export class ProductForm {
  constructor(
    public type: ProductType,
    public createDate: string | Date,
    public skuCode: string,
    public name: string,
    public unit: string,
    public category?: string
  ) {}

  static fromModel(
    model: Prisma.ProductGetPayload<{ include: { productCategory: true } }>
  ): ProductForm {
    return new ProductForm(
      model.type,
      model.createDate,
      model.skuCode,
      model.name,
      model.unit,
      model.productCategory?.reff
    );
  }

  static readonly initial: ProductForm = new ProductForm(
    "Product",
    new Date(),
    createProductSKUCode(1),
    "",
    ""
  );

  static readonly typeOptions: SelectOption[] = [
    { label: "Product", value: "Product" },
    { label: "Sparepart", value: "Sparepart" },
    { label: "ATK", value: "ATK" },
  ];

  static readonly productUnitOptions: SelectOption[] = [
    { label: "Carton", value: "Carton" },
    { label: "Pack", value: "Pack" },
    { label: "Kg", value: "Kg" },
  ];

  static readonly sparepartUnitOptions: SelectOption[] = [
    { label: "Pcs", value: "Pcs" },
    { label: "Pack", value: "Pack" },
    { label: "Liter", value: "Liter" },
  ];

  static readonly atkUnitOptions: SelectOption[] = [
    { label: "Pcs", value: "Pcs" },
    { label: "Pack", value: "Pack" },
    { label: "Box", value: "Box" },
  ];
}
