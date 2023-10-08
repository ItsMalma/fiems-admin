import { z } from "zod";
import {
  ItemTypes,
  ProductUnits,
  SparepartUnits,
  AtkUnits,
} from "@/libs/utils";
import { transformZodError } from "@/libs/error";
import lodash from "lodash";

export const saveProductSchema = z
  .object({
    type: z.enum(ItemTypes, {
      errorMap: () => ({
        message: "Type product, sparepart or atk",
      }),
    }),
    category: z
      .string({
        invalid_type_error: "Category must be string",
        required_error: "Category is required",
      })
      .optional(),
    name: z
      .string({
        invalid_type_error: "Name must be string",
        required_error: "Name is required",
      })
      .nonempty("Name must be not empty"),
    unit: z.string({
      invalid_type_error: "Unit must be string",
      required_error: "Unit is required",
    }),
  })
  .superRefine((product, ctx) => {
    switch (product.type) {
      case "product":
        if (product.category === undefined) {
          ctx.addIssue({
            code: "custom",
            message: "Category is required",
            path: ["category"],
          });
        }
        if (!lodash.includes(ProductUnits, product.unit)) {
          ctx.addIssue({
            code: "custom",
            message: "Unit must be carton, pack, or kg",
            path: ["unit"],
          });
        }
        break;
      case "sparepart":
        if (!lodash.includes(SparepartUnits, product.unit)) {
          ctx.addIssue({
            code: "custom",
            message: "Unit must be pcs, pack, or liter",
            path: ["unit"],
          });
        }
        break;
      case "atk":
        if (!lodash.includes(AtkUnits, product.unit)) {
          ctx.addIssue({
            code: "custom",
            message: "Unit must be carton, pack, or box",
            path: ["unit"],
          });
        }
        break;
    }
    return true;
  });

const productSKUCodeSchema = z.object({
  skuCode: z
    .string({
      invalid_type_error: "SKU code must be string",
      required_error: "SKU code is required",
    })
    .nonempty("SKU code must be not empty"),
});

export function validateProductSave(data: unknown) {
  const parsed = saveProductSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: transformZodError(parsed.error),
      data: null,
    };
  }

  return {
    error: null,
    data: parsed.data,
  };
}

export function validateProductSKUCode(data: unknown) {
  const parsed = productSKUCodeSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: transformZodError(parsed.error),
      data: null,
    };
  }

  return {
    error: null,
    data: parsed.data,
  };
}
