import { ZodError } from "zod";

export function transformZodError(err: ZodError) {
  const transformedError: { [name: string]: string } = {};

  err.issues.forEach((e) => {
    transformedError[e.path.join(".")] = e.message;
  });

  return transformedError;
}
