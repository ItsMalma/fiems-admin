import { z } from "zod";
import { validatePassword, validateText } from "../validation";

export const loginInput = z.object({
  name: validateText(),
  password: validatePassword(),
});

export class LoginForm {
  constructor(
    public name: string,
    public password: string
  ) {}
}
