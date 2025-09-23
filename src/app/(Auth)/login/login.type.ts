import * as zod from "zod";
import { loginSchema } from "./login.schema";

export type LoginFormType = zod.infer<typeof loginSchema>;