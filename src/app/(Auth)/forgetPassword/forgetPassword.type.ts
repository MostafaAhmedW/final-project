import * as zod from "zod";
import { forgetPasswordSchema } from "./forgetPassword.schema";

export type ForgetPasswordFormType = zod.infer<typeof forgetPasswordSchema>;