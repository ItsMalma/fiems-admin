import { z } from "zod";
import { transformZodError } from "@/libs/error";

const provinceNameSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Code must be string",
    })
    .optional(),
});

export function validateProvinceName(data: unknown) {
  const parsed = provinceNameSchema.safeParse(data);

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
