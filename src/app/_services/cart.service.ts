'use server'
import { getMyUserToken } from "@/utils/utils";
import { ItemType } from "../(cart)/cart/page";

export type CartRsponseType = { 
    numOfCartItems: number , 
    products: ItemType[] ,
    totalCartPrice: number ,
    cartId:string,
}

export async function getUserCart() : Promise< CartRsponseType > {

  const token = await getMyUserToken()

     const res =  await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {

      headers:{

        token:token as string

      },
      cache:"force-cache",
      next: { tags: ["getUserCart"] }, 
      

    });


    const final = await res.json();

    const {  numOfCartItems ,cartId , data: { products , totalCartPrice } } = final;
    return { numOfCartItems ,  products  ,  totalCartPrice , cartId }


    
}