import { transformZodError } from "@/libs/error";
import { z } from "zod";

export const saveCustomerGroupSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name Invalid value",
      required_error: "Name is required",
    })
    .nonempty("Name must be not empty"),
  description: z
    .string({
      invalid_type_error: "Description Invalid value",
    })
    .optional(),
});

const customerGroupCodeSchema = z.object({
  code: z
    .string({
      invalid_type_error: "Code Invalid value",
      required_error: "Code is required",
    })
    .nonempty("Code must be not empty"),
});

export function validateSaveCustomerGroup(data: unknown) {
  const parsed = saveCustomerGroupSchema.safeParse(data);

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

export function validateCustomerGroupCode(data: unknown) {
  const parsed = customerGroupCodeSchema.safeParse(data);

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
