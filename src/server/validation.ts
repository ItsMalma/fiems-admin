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
  return z
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
  return z.coerce.date({
    invalid_type_error: "Invalid value",
    required_error: "Must be filled",
  });
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

export function validateSelect(options: Readonly<[string, ...string[]]>) {
  return z.enum(options, {
    errorMap: () => ({ message: "Invalid value" }),
  });
}

export function validateText() {
  return z
    .string({
      invalid_type_error: "Invalid value",
      required_error: "Must be filled",
    })
    .min(1, "Must be filled");
}
