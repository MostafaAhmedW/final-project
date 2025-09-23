'use server'

import { ForgetPasswordFormType } from "./forgetPassword.type";
export async function handelForgetPassword(data: ForgetPasswordFormType) {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const finalResp = await res.json();
    console.log("finalRes forget Password", finalResp);
    return finalResp; 
  } catch (error) {
    return { message: "Something went wrong" };
  }
}

