'use server'

import { cookies } from "next/headers";
import { LoginFormType } from "./login.type";
export async function handelLogin(data:LoginFormType){

  try {

   const res=await fetch(` https://ecommerce.routemisr.com/api/v1/auth/signin `, {

        method:'post',
        body:JSON.stringify(data),

        headers:{

            'Content-Type': 'application/json'
        }

    });

    const finalResp = await res.json();


    if( finalResp.message === 'success' ){


       const cookie  = await cookies();
       cookie.set('user-token' , finalResp.token , {


        httpOnly:true,
       
        sameSite: 'strict',

        maxAge: 60 * 60 * 24 * 7
  
         
       });
 
        return true;

    }
    else{
        return finalResp.message;
    }


    } catch (error) {
        console.log(error);
        
    }

}
