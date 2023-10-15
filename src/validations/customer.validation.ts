import { transformZodError } from "@/libs/error";
import { CustomerTypes } from "@/libs/utils";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isNumeric from "validator/lib/isNumeric";
import { z } from "zod";

const customerPicSchema = z.object(
  {
    name: z
      .string({
        invalid_type_error: "Name Invalid value",
        required_error: "Name is required",
      })
      .nonempty("Name must be not empty"),
    email: z
      .string({
        invalid_type_error: "Email Invalid value",
        required_error: "Email is required",
      })
      .nonempty("Email must be not empty")
      .refine((email) => isEmail(email), {
        message: "Email must be valid format",
      }),
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
  },
  {
    invalid_type_error: "Must be object",
    required_error: "Is required",
  }
);

export const saveCustomerSchema = z.object({
  type: z.enum(CustomerTypes, {
    errorMap: () => ({
      message: "Type must be factory, shipping or vendor",
    }),
  }),
  name: z
    .string({
      invalid_type_error: "Name Invalid value",
      required_error: "Name is required",
    })
    .nonempty("Name must be not empty"),
  group: z
    .string({
      invalid_type_error: "Group Invalid value",
      required_error: "Group is required",
    })
    .nonempty("Group must be not empty"),
  address: z
    .string({
      invalid_type_error: "Address Invalid value",
      required_error: "Address is required",
    })
    .nonempty("Address must be not empty"),
  city: z
    .string({
      invalid_type_error: "City Invalid value",
      required_error: "City is required",
    })
    .nonempty("City must be not empty"),
  province: z
    .string({
      invalid_type_error: "Province Invalid value",
      required_error: "Province is required",
    })
    .nonempty("Province must be not empty"),
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
  top: z
    .number({
      invalid_type_error: "TOP must be number",
      required_error: "TOP is required",
    })
    .min(1, "TOP minimum is 1"),
  currency: z
    .string({
      invalid_type_error: "Currency Invalid value",
      required_error: "Currency is required",
    })
    .nonempty("Currency must be not empty"),
  pic: z.object(
    {
      purchasing: customerPicSchema,
      operation: customerPicSchema,
      finance: customerPicSchema,
    },
    {
      invalid_type_error: "PIC must be object",
      required_error: "PIC is required",
    }
  ),
});

const customerCodeSchema = z.object({
  code: z
    .string({
      invalid_type_error: "Code Invalid value",
      required_error: "Code is required",
    })
    .nonempty("Code must be not empty"),
});

const customerTypeSchema = z.object({
  type: z.enum(CustomerTypes, {
    errorMap: () => ({
      message: `Type must be factory, shipping or vendor`,
    }),
  }),
});

const filterCustomerSchema = z.object({
  type: z
    .enum(CustomerTypes, {
      errorMap: () => ({
        message: `Type must be factory, shipping or vendor`,
      }),
    })
    .optional(),
});

export function validateCustomerSave(data: unknown) {
  const parsed = saveCustomerSchema.safeParse(data);

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

export function validateCustomerCode(data: unknown) {
  const parsed = customerCodeSchema.safeParse(data);

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

export function validateCustomerType(data: unknown) {
  const parsed = customerTypeSchema.safeParse(data);

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
export function validateCustomerFilter(data: unknown) {
  const parsed = filterCustomerSchema.safeParse(data);

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
