import { transformZodError } from "@/libs/error";
import { ContainerSizes, TruckTypes } from "@/libs/utils";
import { z } from "zod";

export const saveUangJalanSchema = z.object({
  customer: z
    .string({
      invalid_type_error: "Customer Invalid value",
      required_error: "Customer is required",
    })
    .nonempty("Customer must be not empty"),
  route: z
    .string({
      invalid_type_error: "Route Invalid value",
      required_error: "Route is required",
    })
    .nonempty("Route must be not empty"),
  truckType: z.enum(TruckTypes, {
    errorMap: () => ({
      message:
        "Truck type must be engkel single, engkel double, fuso, tronton, trinton, trintin, or trailer",
    }),
  }),
  containerSize: z.enum(ContainerSizes, {
    errorMap: () => ({
      message:
        "Truck type must be 20 feet, 21 feet, 40 feet, 41 feet, 40 hc, or combo",
    }),
  }),
  fuelOil: z
    .number({
      invalid_type_error: "Fuel oil must be number",
      required_error: "Fuel oil is required",
    })
    .min(0, "Fuel oil minimum is 0"),
  toll: z
    .number({
      invalid_type_error: "Toll must be number",
      required_error: "Toll is required",
    })
    .min(0, "Toll minimum is 0"),
  labourCosts: z
    .number({
      invalid_type_error: "Labour costs must be number",
      required_error: "Labour costs is required",
    })
    .min(0, "Labour costs minimum is 0"),
  meal: z
    .number({
      invalid_type_error: "Meal must be number",
      required_error: "Meal is required",
    })
    .min(0, "Meal minimum is 0"),
  etc: z
    .number({
      invalid_type_error: "Etc must be number",
      required_error: "Etc is required",
    })
    .min(0, "Etc minimum is 0"),
});

const uangJalanIDSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID Invalid value",
      required_error: "ID is required",
    })
    .nonempty("ID must be not empty"),
});

export function validateUangJalanSave(data: unknown) {
  const parsed = saveUangJalanSchema.safeParse(data);

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

export function validateUangJalanID(data: unknown) {
  const parsed = uangJalanIDSchema.safeParse(data);

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
