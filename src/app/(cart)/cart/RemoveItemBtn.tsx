'use client'
import { Button } from '@/components/ui/button'
import { removeItemFromCart } from './cart.actions'
import { toast } from 'sonner'
import { useContext } from 'react'
import { CartContext } from './CartCount'

export default function RemoveItemBtn({ id } : {id:string}) {

    const { updateCartCount } = useContext(CartContext);

   async function handleRemoveItem(){

     const outPut =  await removeItemFromCart(id)

     if( outPut === null ){

        toast.error("Couldn't remove item , Please try again ",{
          position: "top-right",
          duration: 1500,
          style: {
          color: "red",
          fontWeight: "600",
        },
        });
     }else{
        toast.success('Product remove successfully ',{
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

        <Button
            variant="destructive"
            className="min-w-[100px] w-full md:w-auto cursor-pointer"
            onClick={handleRemoveItem}
        >
            Remove
        </Button>
    )
}
