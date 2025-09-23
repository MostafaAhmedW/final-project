'use server';

import { cookies } from "next/headers";
import { ResetPasswordFormType } from "./resetPassword.type";

export async function handelResetPassword(data: ResetPasswordFormType) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const finalResp = await res.json();

    if (finalResp.token) {

      const cookie = await cookies();
      cookie.set("user-token", finalResp.token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, 
      });

      return { success: true, message: finalResp.message };
    } else {
      return { success: false, message: finalResp.message };
    }
  } catch (error) {
    console.log(error);
    
    return { success: false, message: "Something went wrong" };
  }
}
