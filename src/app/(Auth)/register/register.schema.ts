import * as zod from "zod";

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 chars")
      .max(10, "Name must be at max 10 chars"),

    email: zod.email("Email is not format"),

    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
      ),

    rePassword: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
      ),

    phone: zod
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0125][0-9]{8}$/, "Phone must be an egyptian number"),
  })
  .refine(
    function (object) {
      return object.password === object.rePassword;
    },
    { path: ["rePassword"], error: "Passwords are in-match" }
  );
  
