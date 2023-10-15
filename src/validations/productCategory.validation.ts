import { transformZodError } from "@/libs/error";
import { z } from "zod";

export const saveProductCategorySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name Invalid value",
      required_error: "Name is required",
    })
    .nonempty("Name must be not empty"),
});

const productCategoryReffSchema = z.object({
  reff: z
    .string({
      invalid_type_error: "Reff Invalid value",
      required_error: "Reff is required",
    })
    .nonempty("Reff must be not empty"),
});

export function validateSaveProductCategory(data: unknown) {
  const parsed = saveProductCategorySchema.safeParse(data);

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

export function validateProductCategoryReff(data: unknown) {
  const parsed = productCategoryReffSchema.safeParse(data);

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
