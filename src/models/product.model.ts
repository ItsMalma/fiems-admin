import { ItemTypes } from "@/libs/utils";
import { saveProductSchema } from "@/validations/product.validation";
import mongoose from "mongoose";
import { z } from "zod";
import { ProductCategoryDocument } from "./productCategory.model";

export type SaveProductInput = z.infer<typeof saveProductSchema>;

export type ProductOutput = Omit<Product, "category" | "createDate"> & {
  id: number;
  category?: {
    reff: string;
    name: string;
  };
  createDate: string;
};

export type Product = {
  type: (typeof ItemTypes)[number];
  skuCode: string;
  category: mongoose.PopulatedDoc<ProductCategoryDocument & number, number>;
  name: string;
  unit: string;
  createDate: Date;
};

export type ProductDocument = Product & mongoose.Document<number>;

const ProductSchema = new mongoose.Schema<ProductDocument>({
  _id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ItemTypes,
    required: true,
  },
  skuCode: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: Number,
    ref: "ProductCategory",
    required: function () {
      return this.type === "product";
    },
  },
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    requiredPaths: true,
  },
  createDate: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
});

export const ProductModel =
  (mongoose.models.Product as mongoose.Model<ProductDocument>) ||
  mongoose.model<ProductDocument>("Product", ProductSchema);
