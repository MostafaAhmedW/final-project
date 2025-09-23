'use server';

import { getMyUserToken } from "@/utils/utils";
import { revalidatePath, revalidateTag } from "next/cache";

export async function addProductToCart(productId: string){

const token = await getMyUserToken();
if( token ){

   const res =await fetch('https://ecommerce.routemisr.com/api/v1/cart' , {
        method:'post',
        body:JSON.stringify({productId}),
        headers:{
            "Content-Type": "application/json",
            token: token as string
        }, 
        
});
const finalRes = await res.json();

if( finalRes.status ==='success' ){

    revalidateTag('getUserCart');

    return finalRes.numOfCartItems;

}else{
    return false;
}

}

};

export async function removeItemFromCart(id:string){

  const token = await getMyUserToken();

 const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {


    method:'Delete',
    headers:{

     token:token as string

    }
  });
  const finalRemoveItme = await res.json();

  if( finalRemoveItme.status === "success"){

    revalidatePath('/cart');

    return  finalRemoveItme.numOfCartItems;

  }else{
    return null;
  }
  
};

export async function changeCount(id:string , count: number){

  const token = await getMyUserToken();

 const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {

    method:'Put',
    headers:{

     token:token as string,
     "Content-Type": "application/json"

    },

    body:JSON.stringify( { count} ),

  });
  const finalChange = await res.json();

  if( finalChange.status === "success"){

    revalidatePath('/cart');

    return  finalChange.numOfCartItems;

  }else{
    return null;
  }
  
};

export async function removeAllItem(){

  const token = await getMyUserToken();

 const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {


    method:'Delete',
    headers:{

     token:token as string

    }
  });
  const removeAllItem = await res.json();

  if( removeAllItem.message === "success"){

    revalidatePath('/cart');

    return removeAllItem.numOfCartItems;

  }else{
    return null;
  }
  
};


