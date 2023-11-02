import { validateText } from "@/server/validation";
import { ProductCategory } from "@prisma/client";
import moment from "moment";
import { z } from "zod";

export const productCategoryInput = z.object({
  name: validateText(),
});
export type ProductCategoryInput = z.infer<typeof productCategoryInput>;

export const createProductCategoryReff = (reffNumber: number): string => {
  return "PCR" + reffNumber.toString().padStart(4, "0");
};

export const extractProductCategoryReff = (reff: string): number => {
  return Number(reff.slice(3));
};

export class ProductCategoryTableRow {
  constructor(
    public createDate: string,
    public reff: string,
    public name: string
  ) {}

  static fromModel(model: ProductCategory): ProductCategoryTableRow {
    return new ProductCategoryTableRow(
      moment(model.createDate).toString(),
      model.reff,
      model.name
    );
  }
}

export class ProductCategoryForm {
  constructor(
    public createDate: string | Date,
    public reff: string,
    public name: string
  ) {}

  static fromModel(model: ProductCategory): ProductCategoryForm {
    return new ProductCategoryForm(model.createDate, model.reff, model.name);
  }

  static readonly initial: ProductCategoryForm = new ProductCategoryForm(
    new Date(),
    createProductCategoryReff(1),
    ""
  );
}
