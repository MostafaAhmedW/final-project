import * as zod from "zod";
import { resetPasswordSchema } from "./resetPassword.schema";

export type ResetPasswordFormType = zod.infer<typeof resetPasswordSchema>;