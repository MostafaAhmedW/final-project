'use client'
import { Button } from "@/components/ui/button";
import { changeCount } from "./cart.actions";
import { toast } from "sonner";
import { useContext } from "react";
import { CartContext } from "./CartCount";

export default function ChangeCountBtn( { isIncrement = false , id ,newCount} : {isIncrement?:boolean ,id:string ,newCount:number} ) {

   const { updateCartCount } = useContext(CartContext);

   async function handleChangeCount(){

   const outPut = await changeCount(id ,newCount );

   if(  outPut === null  ){

    toast.error('Error occurred please try again',{
              position: "top-right",
              duration: 1500,
              style: {
          color: "red",
          fontWeight: "600",
        },
            });

   }else{

    toast.success(`Product count is: ${newCount}`, {
          position: "top-right",
          duration: 1500,
          style: {
          color: "green",
          fontWeight: "600",
        },
        });
     updateCartCount(outPut);

   }

    }


  return (
    <Button onClick={handleChangeCount} disabled={newCount == 0}  className="cursor-pointer" size="sm" variant="outline">
     { isIncrement ? "+" :"-" }
    </Button>
  )
}
