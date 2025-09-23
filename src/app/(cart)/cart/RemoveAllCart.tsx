'use client'
import { Button } from '@/components/ui/button'
import { useContext } from "react";
import { CartContext } from "./CartCount";
import { toast } from "sonner";
import { removeAllItem } from './cart.actions'

export default function RemoveAllCart() {

     const { updateCartCount , cartCount } = useContext(CartContext);

   async function handleRemoveAllItem(){

    const removeAll = await  removeAllItem();

     if(  removeAll === null  ){

    toast.error('Error occurred, try again',{
              position: "top-right",
              duration: 1500,
              style: {
          color: "red",
          fontWeight: "600",
        },
            });

   }else{

    toast.success('All items removed', {
              position: "top-right",
              duration: 1500,
              style: {
          color: "green",
          fontWeight: "600",
        },
            });
     updateCartCount(removeAll.numOfCartItems ?? 0);

   }

    }


    return (
       <Button 
  onClick={handleRemoveAllItem} 
  className="cursor-pointer" 
  disabled={cartCount <= 0} 
  variant={'destructive'}
>
  Remove All
</Button>

    )
}
