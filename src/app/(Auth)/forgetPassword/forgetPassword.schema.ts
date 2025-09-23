import * as zod from "zod";

export const forgetPasswordSchema = zod
  .object({
   
    email: zod.email("Email is not format"),
    
  });
  
