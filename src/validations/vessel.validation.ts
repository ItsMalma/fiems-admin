import { transformZodError } from "@/libs/error";
import { VesselUnits } from "@/libs/utils";
import { z } from "zod";

export const saveVesselSchema = z.object({
  shipping: z
    .string({
      invalid_type_error: "Shipping Invalid value",
      required_error: "Shipping is required",
    })
    .nonempty("Shipping must be not empty"),
  name: z
    .string({
      invalid_type_error: "Name Invalid value",
      required_error: "Name is required",
    })
    .nonempty("Name must be not empty"),
  capacity: z
    .number({
      invalid_type_error: "Capacity must be number",
      required_error: "Capacity is required",
    })
    .min(1, "Capacity minimum is 1"),
  unit: z.enum(VesselUnits, {
    errorMap: () => ({
      message: "Unit must be container, teus, or ton",
    }),
  }),
});

const vesselIDSchema = z.object({
  id: z
    .string({
      invalid_type_error: "ID Invalid value",
      required_error: "ID is required",
    })
    .nonempty("ID must be not empty"),
});

export function validateVesselSave(data: unknown) {
  const parsed = saveVesselSchema.safeParse(data);

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

export function validateVesselID(data: unknown) {
  const parsed = vesselIDSchema.safeParse(data);

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
