import { SelectOption } from "@/components/Elements";
import moment from "moment";
import isMobilePhone from "validator/lib/isMobilePhone";
import { z } from "zod";

export function isTelephone(value: string): boolean {
  return new RegExp(
    /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g
  ).test(value);
}

export function isFax(value: string): boolean {
  return new RegExp(
    /^(\+)?(((((\d+)|(\(\d+\))|(\(\d+\s(\d)\)))(\s|-|\d+))+)|((\d+)|(\(\d+\))$)+)+\d$/
  ).test(value);
}

export function validateCode(checker?: (code: string) => boolean) {
  return z.coerce
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Must be filled",
    })
    .min(1, "Must be filled")
    .refine((value) => !(checker && !checker(value)), "Invalid format");
}

export function validateCounter(min: number = 1, max?: number) {
  return z
    .number({
      invalid_type_error: "Invalid value",
      required_error: "Must be filled",
    })
    .refine((value) => value >= min, {
      message: `Must be greater than ${min}`,
    })
    .refine((value) => max === undefined || value <= max, {
      message: `Must be less than ${max}`,
    });
}

export function validateDate() {
  return z.union([
    z.date({
      invalid_type_error: "Invalid value",
      required_error: "Must be filled",
    }),
    z
      .string({
        invalid_type_error: "Invalid value",
        required_error: "Must be filled",
      })
      .refine((value) => moment(value).isValid(), "Invalid value"),
  ]);
}

export function validateTime() {
  return z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Must be filled",
    })
    .refine((value) => moment(value, "HH:mm").isValid(), "Invalid value");
}

export function validateEmail() {
  return z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Must be filled",
    })
    .email("Invalid format");
}

export function validatePhone(
  type: "mobile" | "telephone" | "fax" = "telephone"
) {
  return z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Must be filled",
    })
    .refine((value) => {
      if (
        (type === "mobile" && !isMobilePhone(value, "id-ID")) ||
        (type === "telephone" && !isTelephone(value)) ||
        (type === "fax" && !isFax(value))
      ) {
        return false;
      }
      return true;
    }, "Invalid format");
}

export function validateSelectWithEnum<
  U extends string,
  T extends Readonly<[U, ...U[]]>,
>(options: T) {
  return z.enum(options, {
    errorMap: () => ({ message: "Invalid value" }),
  });
}

export function validateSelect(options: SelectOption[]) {
  return z.union(
    [
      z.literal(options[0].value, {
        errorMap: () => ({ message: "Invalid value" }),
      }),
      z.literal(options[1].value, {
        errorMap: () => ({ message: "Invalid value" }),
      }),
      ...options.slice(2).map((option) =>
        z.literal(option.value, {
          errorMap: () => ({ message: "Invalid value" }),
        })
      ),
    ],
    {
      errorMap: () => ({ message: "Invalid value" }),
    }
  );
}

export function validateSelectEnum(options: z.EnumLike) {
  return z.nativeEnum(options, {
    errorMap: () => ({ message: "Invalid value" }),
  });
}

export function validateText(numeric: boolean = false) {
  return z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Must be filled",
    })
    .min(1, "Must be filled")
    .refine(
      (value) => !numeric || (numeric && !isNaN(Number(value))),
      "Invalid value"
    );
}

export function validateCheck() {
  return z.boolean({
    invalid_type_error: "Invalid value",
    required_error: "Must be filled",
  });
}

export function validatePassword() {
  return z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Must be filled",
    })
    .min(1, "Must be filled");
}

export function validateMoney() {
  return z.number({
    invalid_type_error: "Invalid value",
    required_error: "Must be filled",
  });
}

export function validateAppend<T extends z.ZodTypeAny>(validations: T) {
  return z.array(validations, {
    invalid_type_error: "Invalud value",
    required_error: "Must be filled",
  });
}

export function refineDateRange(start: string, end: string): z.Refinement<any> {
  return (data, ctx) => {
    if (!data[start] || !data[end]) return;
    const startDate = moment(data[start]);
    const endDate = moment(data[end]);
    if (
      startDate.isValid() &&
      endDate.isValid() &&
      endDate.isBefore(startDate, "day")
    ) {
      ctx.addIssue({
        code: "invalid_date",
        path: [end],
        message: `Must be after ${startDate.format("DD/MM/YYYY")}`,
      });
    }
  };
}

export function isObjectID(value: string): boolean {
  return true;
}
