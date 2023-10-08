import { z } from "zod";
import { transformZodError } from "@/libs/error";

export const savePortSchema = z.object({
  province: z
    .string({
      invalid_type_error: "Province must be string",
      required_error: "Province is required",
    })
    .nonempty("Province must be not empty"),
  city: z
    .string({
      invalid_type_error: "City must be string",
      required_error: "City is required",
    })
    .nonempty("City must be not empty"),
  name: z
    .string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    })
    .nonempty("Name must be not empty"),
});

const portCodeSchema = z.object({
  code: z
    .string({
      invalid_type_error: "Code must be string",
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
