import { saveProductCategorySchema } from "@/validations/productCategory.validation";
import mongoose from "mongoose";
import { z } from "zod";

export type SaveProductCategoryInput = z.infer<
  typeof saveProductCategorySchema
>;

export type ProductCategoryOutput = Omit<ProductCategory, "createDate"> & {
  id: number;
  createDate: string;
};

export type ProductCategory = {
  reff: string;
  name: string;
  createDate: Date;
};

export type ProductCategoryDocument = ProductCategory &
  mongoose.Document<number>;

const ProductCategorySchema = new mongoose.Schema<ProductCategoryDocument>(
  {
    _id: {
      type: Number,
      required: true,
    },
    reff: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    createDate: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
  },
  {
    collection: "productCategories",
  }
);

export const ProductCategoryModel =
  (mongoose.models
    .ProductCategory as mongoose.Model<ProductCategoryDocument>) ||
  mongoose.model<ProductCategoryDocument>(
    "ProductCategory",
    ProductCategorySchema
  );
