import * as zod from "zod";

export const resetPasswordSchema = zod
  .object({
   
    email: zod.email("Email is not format"),

    newPassword: zod
      .string()
      .nonempty("newPassword is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
      ),
  });
  
