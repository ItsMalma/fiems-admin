import { ZodError, ZodSchema } from "zod";
import lodash from "lodash";

export function transformZodError(err: ZodError) {
  const transformedError: { [name: string]: string } = {};

  err.issues.forEach((issue) => {
    transformedError[issue.path.join(".")] = issue.message;
  });

  return transformedError;
}

export function transformZodErrorDeep(err: ZodError) {
  const transformedError: object = {};

  err.issues.forEach((issue) => {
    lodash.set(transformedError, issue.path, issue.message);
  });

  return transformedError;
}

export function formikValidateWithZod(zodSchema: ZodSchema) {
  return function (values: unknown) {
    const parsed = zodSchema.safeParse(values);

    if (!parsed.success) {
      return transformZodErrorDeep(parsed.error);
    }
  };
}
