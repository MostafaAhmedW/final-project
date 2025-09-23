'use server'
import { getMyUserToken } from "@/utils/utils";
import { revalidatePath } from "next/cache";

export type ShippingAddressType ={

        details: string ,
        phone: string,
        city: string,

}

export async function createCashOrder(cartId: string , shippingAddress: ShippingAddressType ){

   const token = await getMyUserToken();

  const res = await  fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{

        method:'post',
        body:   JSON.stringify({ shippingAddress }),
        headers:{
            "Content-Type" :"application/json",
            token:token as string
        }



    });

    const finalRes = await res.json();

    if(finalRes.status === 'success'){
        revalidatePath('/cart');
        return true;
    }else{
        return false ;
    }
    

};


export async function createCheckoutSession(cartId: string , shippingAddress: ShippingAddressType ){

   const token = await getMyUserToken();

  const res = await  fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{

        method:'post',
        body:   JSON.stringify({ shippingAddress }),
        headers:{
            "Content-Type" :"application/json",
            token:token as string
        }

    });

    const finalRes = await res.json();

    if(finalRes.status === 'success'){
        revalidatePath('/cart');
        return finalRes.session.url;
    }else{
        return false ;
    }
    

};



