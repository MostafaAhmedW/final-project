'use server'
import { getMyUserToken } from "@/utils/utils";

export async function getMyUserWashlist(){

    const token = await getMyUserToken();

      const res = await  fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{
         
            headers:{
                token:token as string,
            },
            cache:"force-cache",
            

        });

        const finalRes = await res.json();
        return finalRes
    
};

