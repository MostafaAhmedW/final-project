'use client'
import { addProductToCart } from "@/app/(cart)/cart/cart.actions";
import { CartContext } from "@/app/(cart)/cart/CartCount";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

import { toast } from 'sonner';

export default function AddProductBtn({ id }: { id: string }) {

  const { updateCartCount } = useContext(CartContext)

  async function handleAddToCart() {


    const outPut = await addProductToCart(id);

    if (outPut) {

      toast.success("Product Added Successfully", {
        position: "top-right",
        duration: 1500,
        style: {
          color: "green",
          fontWeight: "600",
        },
      });
      updateCartCount(outPut)

    } else {
      toast.error("Error occurred while adding", {
        position: "top-right",
        duration: 1500,
        style: {
          color: "red",
          fontWeight: "600",
        },
    });
    }

  }

  return (

    <div>
      <Button onClick={handleAddToCart} className=" w-full cursor-pointer mt-2.5 bg-green-600 hover:bg-green-700 rounded-md" size="sm">Add to Cart</Button>
    </div>

  )
}
