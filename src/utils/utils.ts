import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyUserToken(){
    
    
   
    const cooke = await cookies();
   const sessionToken = cooke.get('next-auth.session-token')?.value;

   const decodedToken = await decode({ token:sessionToken  , secret: process.env.NEXTAUTH_SECRET || ''})

   console.log('decodedToken' , decodedToken);
   return decodedToken?.credentialsToken;
   

}