import { z } from "zod";
import { validateText } from "../validation";

export const customerGroupInput = z.object({
  name: validateText(),
  description: validateText(),
});

export type CustomerGroupInput = z.infer<typeof customerGroupInput>;

export const createCustomerGroupCode = (codeNumber: number): string => {
  return "CGC" + codeNumber.toString().padStart(4, "0");
};

export const extractCustomerGroupCode = (code: string): number => {
  return Number(code.slice(3));
};

export class CustomerGroupForm {
  constructor(
    public createDate: string | Date,
    public code: string,
    public name: string,
    public description: string
  ) {}

  static readonly initial: CustomerGroupForm = {
    createDate: new Date(),
    code: createCustomerGroupCode(1),
    name: "",
    description: "",
  };
}
