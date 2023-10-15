import { transformZodError } from "@/libs/error";
import { z } from "zod";

export const savePortSchema = z.object({
  province: z
    .string({
      invalid_type_error: "Province Invalid value",
      required_error: "Province is required",
    })
    .nonempty("Province must be not empty"),
  city: z
    .string({
      invalid_type_error: "City Invalid value",
      required_error: "City is required",
    })
    .nonempty("City must be not empty"),
  name: z
    .string({
      invalid_type_error: "Name Invalid value",
      required_error: "Name is required",
    })
    .nonempty("Name must be not empty"),
});

const portCodeSchema = z.object({
  code: z
    .string({
      invalid_type_error: "Code Invalid value",
      required_error: "Code is required",
    })
    .nonempty("Code must be not empty"),
});

export function validateSavePort(data: unknown) {
  const parsed = savePortSchema.safeParse(data);

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

export function validatePortCode(data: unknown) {
  const parsed = portCodeSchema.safeParse(data);

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
