'use server'

import { RestCodeFormType } from "./restCode.type";
export async function handelRestCode(data: RestCodeFormType) {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const finalResp = await res.json();

    return finalResp; 

  } catch (error) {
    return null;
  }
}

