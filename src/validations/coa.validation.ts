import { transformZodError } from "@/libs/error";
import { COATypes, generateEnumError } from "@/libs/utils";
import { z } from "zod";

const coaTypeSchema = z.object({
  type: z.enum(COATypes, {
    errorMap: () => ({
      message: generateEnumError("type", COATypes),
    }),
  }),
});

export const saveMainCOASchema = z.object({
  accountName: z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Is required",
    })
    .nonempty("Must be not empty"),
  accountType: z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Is required",
    })
    .nonempty("Must be not empty"),
  category: z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Is required",
    })
    .nonempty("Must be not empty"),
  transaction: z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Is required",
    })
    .nonempty("Must be not empty"),
  currency: z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Is required",
    })
    .nonempty("Must be not empty"),
});

export const saveSub1COASchema = z.object({
  main: z.number({
    invalid_type_error: "Must be number",
    required_error: "Is required",
  }),
  description: z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Is required",
    })
    .nonempty("Must be not empty"),
});

export const saveSub2COASchema = z.object({
  main: z.number({
    invalid_type_error: "Must be number",
    required_error: "Is required",
  }),
  sub1: z.number({
    invalid_type_error: "Must be number",
    required_error: "Is required",
  }),
  description: z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Is required",
    })
    .nonempty("Must be not empty"),
});

const coaNumberSchema = z.object({
  number: z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Is required",
    })
    .nonempty("Must be not empty"),
});

const optionalCOANumberSchema = z.object({
  number: z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Is required",
    })
    .optional(),
});

const queryFindSchema = z.object({
  simple: z
    .enum(["true", "false"], {
      errorMap: () => ({
        message: "Invalid value",
      }),
    })
    .transform((value) => value === "true")
    .optional(),
});

export function validateCOAType(data: unknown) {
  const parsed = coaTypeSchema.safeParse(data);

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

export function validateSaveMainCOA(data: unknown) {
  const parsed = saveMainCOASchema.safeParse(data);

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

export function validateSaveSub1COA(data: unknown) {
  const parsed = saveSub1COASchema.safeParse(data);

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

export function validateSaveSub2COA(data: unknown) {
  const parsed = saveSub2COASchema.safeParse(data);

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

export function validateCOANumber(data: unknown) {
  const parsed = coaNumberSchema.safeParse(data);

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

export function validateOptionalCOANumber(data: unknown) {
  const parsed = optionalCOANumberSchema.safeParse(data);

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

export function validateFindQuery(data: unknown) {
  const parsed = queryFindSchema.safeParse(data);

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
