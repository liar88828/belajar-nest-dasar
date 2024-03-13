import { string, z } from "zod";

export class LoginModel {
  username: string;
  password: string;
}

export const loginUserRequestValidation = z.object({
  username: string().max(50).min(1),
  password: string().max(50).min(1)
});
