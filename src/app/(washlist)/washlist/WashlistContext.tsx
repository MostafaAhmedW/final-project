'use client';

import { createContext, ReactNode, useState } from "react";

export const WashlistContext = createContext( { washlistCount:0 , updateWashlistCount: (x:number) => {} } );

export function WashlistContextProvider( {children }: { children:ReactNode } ){

    const [washlistCount, setWashlistCount] = useState(0);

    function updateWashlistCount(newCount: number) {

        setWashlistCount(newCount);

    };

    return <WashlistContext.Provider value={{ washlistCount , updateWashlistCount }} >

         {children} 
         
         </WashlistContext.Provider>

}