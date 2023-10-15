import { transformZodError } from "@/libs/error";
import { JobPositions } from "@/libs/utils";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isNumeric from "validator/lib/isNumeric";
import { z } from "zod";

export const saveSalesSchema = z.object({
  jobPosition: z.enum(JobPositions, {
    errorMap: () => ({
      message: "Job position must be director or marketing",
    }),
  }),
  name: z
    .string({
      invalid_type_error: "Name Invalid value",
      required_error: "Name is required",
    })
    .nonempty("Name must be not empty"),
  nik: z
    .string({
      invalid_type_error: "NIK Invalid value",
      required_error: "NIK is required",
    })
    .length(16, "NIK's length must be 16 characters")
    .nonempty("NIK must be not empty")
    .refine((nik) => isNumeric(nik), {
      message: "NIK must be valid format",
    }),
  cabang: z
    .string({
      invalid_type_error: "Cabang Invalid value",
      required_error: "Cabang is required",
    })
    .nonempty("Cabang must be not empty"),
  phoneNumber: z
    .string({
      invalid_type_error: "Phone number Invalid value",
      required_error: "Phone number is required",
    })
    .nonempty("Phone number must be not empty")
    .refine((phoneNumber) => isMobilePhone(phoneNumber), {
      message: "Phone number must be valid format",
    }),
  telephone: z
    .string({
      invalid_type_error: "Telephone Invalid value",
      required_error: "Telephone is required",
    })
    .nonempty("Telephone must be not empty")
    .refine((telephone) => isMobilePhone(telephone), {
      message: "Telephone must be valid format",
    }),
  fax: z
    .string({
      invalid_type_error: "Fax Invalid value",
      required_error: "Fax is required",
    })
    .nonempty("Fax must be not empty")
    .refine((fax) => isNumeric(fax), {
      message: "Fax must be valid format",
    }),
  email: z
    .string({
      invalid_type_error: "Email Invalid value",
      required_error: "Email is required",
    })
    .nonempty("Email must be not empty")
    .refine((email) => isEmail(email), {
      message: "Email must be valid format",
    }),
});

const salesCodeSchema = z.object({
  code: z
    .string({
      invalid_type_error: "Code Invalid value",
      required_error: "Code is required",
    })
    .nonempty("Code must be not empty"),
});

export function validateSalesSave(data: unknown) {
  const parsed = saveSalesSchema.safeParse(data);

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

export function validateSalesCode(data: unknown) {
  const parsed = salesCodeSchema.safeParse(data);

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
