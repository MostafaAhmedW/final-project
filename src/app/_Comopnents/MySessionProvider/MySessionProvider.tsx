'use client'
import { CartContextProvider } from "@/app/(cart)/cart/CartCount";
import { WashlistContextProvider } from "@/app/(washlist)/washlist/WashlistContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function MySessionProvider( { children  } : { children : ReactNode } ) {
  return (

    <SessionProvider>
      <CartContextProvider>
        <WashlistContextProvider>





     { children }

        </WashlistContextProvider>
      </CartContextProvider>
    </SessionProvider>

  )
}
