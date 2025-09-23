'use server'

import { getMyUserToken } from "@/utils/utils"
import { revalidatePath } from "next/cache";

export default async function addProductToWashList(productId: string) {
  try {
    const token = await getMyUserToken();

    if (!token) return null;

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();
 
    if (res.ok && data?.status === "success") {
      revalidatePath("/washlist"); 
      return data.count; 
    }

    return null; 
  } catch (err) {
    console.error("Error in addProductToWashList:", err);
    return null;
  }
};

export async function removeItemFromWashlist( id:string){

 const token = await getMyUserToken();

const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{

    method:"Delete",
    headers: {
        
        token: token as string,
      },

  });
  const finalRes= await res.json();

  if(finalRes.status === 'success'){

    revalidatePath('/washlist');
    return finalRes.count

  }else{
    return null;
  }
  


  
};

