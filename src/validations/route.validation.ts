import { z } from "zod";
import { transformZodError } from "@/libs/error";

export const saveRouteSchema = z.object({
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
  originDescription: z
    .string({
      invalid_type_error: "Origin description must be string",
      required_error: "Origin description is required",
    })
    .nonempty("Origin description must be not empty"),
  destinationDescription: z
    .string({
      invalid_type_error: "Destination description must be string",
      required_error: "Destination description is required",
    })
    .nonempty("Destination description must be not empty"),
});

const routeCodeSchema = z.object({
  code: z
    .string({
      invalid_type_error: "Code must be string",
      required_error: "Code is required",
    })
    .nonempty("Code must be not empty"),
});

export function validateSaveRoute(data: unknown) {
  const parsed = saveRouteSchema.safeParse(data);

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

export function validateRouteCode(data: unknown) {
  const parsed = routeCodeSchema.safeParse(data);

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
