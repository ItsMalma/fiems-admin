import { z } from "zod";
import { TruckTypes, Cylinders } from "@/libs/utils";
import { transformZodError } from "@/libs/error";
import moment from "moment";
import lodash from "lodash";

export const saveVehicleSchema = z.object({
  vendor: z
    .string({
      invalid_type_error: "Vendor must be string",
      required_error: "Vendor is required",
    })
    .nonempty("Vendor must be not empty"),
  truckNumber: z
    .string({
      invalid_type_error: "Truck number must be string",
      required_error: "Truck number is required",
    })
    .nonempty("Truck number must be not empty"),
  brand: z
    .string({
      invalid_type_error: "Brand must be string",
      required_error: "Brand is required",
    })
    .nonempty("Brand must be not empty"),
  truckType: z.enum(TruckTypes, {
    errorMap: () => ({
      message:
        "Truck type must be engkel single, engkel double, fuso, tronton, trinton, trintin, or trailer",
    }),
  }),
  engineNumber: z
    .string({
      invalid_type_error: "Engine number must be string",
      required_error: "Engine number is required",
    })
    .nonempty("Engine number must be not empty"),
  chassisNumber: z
    .string({
      invalid_type_error: "Chassis number must be string",
      required_error: "Chassis number is required",
    })
    .nonempty("Chassis number must be not empty"),
  cylinder: z
    .number({
      invalid_type_error: "Cylinder must be number",
      required_error: "Cylinder is required",
    })
    .refine((cylinder) => lodash.includes(Cylinders, cylinder), {
      message: "Cylinder must be 2, 4, or 8",
    }),
  color: z
    .string({
      invalid_type_error: "Color must be string",
      required_error: "Color is required",
    })
    .nonempty("Color must be not empty"),
  stnkExpired: z
    .string({
      invalid_type_error: "STNK expired must be string",
      required_error: "STNK expired is required",
    })
    .nonempty("STNK expired must be not empty")
    .refine(
      (stnkExpired) => moment(stnkExpired, "DD/MM/YYYY", true).isValid(),
      {
        message: "STNK expired must be valid format (DD/MM/YYYY)",
      }
    ),
  taxExpired: z
    .string({
      invalid_type_error: "Tax expired must be string",
      required_error: "Tax expired is required",
    })
    .nonempty("Tax expired must be not empty")
    .refine((taxExpired) => moment(taxExpired, "DD/MM/YYYY", true).isValid(), {
      message: "Tax expired must be valid format (DD/MM/YYYY)",
    }),
  keurExpired: z
    .string({
      invalid_type_error: "KEUR expired must be string",
      required_error: "KEUR expired is required",
    })
    .nonempty("KEUR Expired must be not empty")
    .refine(
      (keurExpired) => moment(keurExpired, "DD/MM/YYYY", true).isValid(),
      {
        message: "KEUR expired must be valid format (DD/MM/YYYY)",
      }
    ),
});

const vehicleNumberSchema = z.object({
  number: z
    .string({
      invalid_type_error: "Truck number must be string",
      required_error: "Truck number is required",
    })
    .nonempty("Truck number must be not empty"),
});

export function validateVehicleSave(data: unknown) {
  const parsed = saveVehicleSchema.safeParse(data);

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

export function validateVehicleNumber(data: unknown) {
  const parsed = vehicleNumberSchema.safeParse(data);

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
