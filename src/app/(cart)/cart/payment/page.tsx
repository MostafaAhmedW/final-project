'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCashOrder, createCheckoutSession } from "./order.actions";
import { useContext, useEffect, useRef, useState } from "react";
import { getUserCart } from "@/app/_services/cart.service";
import { toast } from "sonner";
import { CartContext } from "../CartCount";

export default function Payment() {
    const { updateCartCount } = useContext(CartContext)
    const cityInput = useRef<HTMLInputElement>(null);
    const phoneInput = useRef<HTMLInputElement>(null);
    const detailsInput = useRef<HTMLInputElement>(null);

    const [cartId, setCartId] = useState<null | string>(null)

    async function handleGettingUserCart() {

        const res = await getUserCart();
        setCartId(res.cartId)

    }

    useEffect(function () {

        handleGettingUserCart();

    }, []);

    async function makeCashOrder() {

        const address = {
            details: detailsInput.current?.value as string,
            phone: phoneInput.current?.value as string,
            city: cityInput.current?.value as string,
        }
        // CALLING API

        const isSuccessed = await createCashOrder(cartId || '', address)

        if (isSuccessed) {
            toast.success('Order created successfully', {
          position: "top-right",
          duration: 1500,
          classNames: {
            toast: "dark:bg-white dark:text-black bg-black text-green-700 font-semibold",
          },
        });

            updateCartCount(0);

        } else {
            toast.error('Error occurred while creating order ', {
          position: "top-right",
          duration: 1500,
          classNames: {
            toast: "dark:bg-white dark:text-red-600 bg-black text-red-600 font-semibold",
          },
        });

        }

    }


    async function makeOnlineOrder() {
        const address = {
            details: detailsInput.current?.value as string,
            phone: phoneInput.current?.value as string,
            city: cityInput.current?.value as string,
        }
        const res = await createCheckoutSession(cartId || '', address);

        if (res === false) {
            toast.error('Unable to create online payment session. Please try again. ', {
          position: "top-right",
          duration: 1500,
         style: {
          color: "red",
          fontWeight: "600",
        },
        })
        } else {
            toast.success("Redirecting to payment gateway...", {
          position: "top-right",
          duration: 1500,
          style: {
          color: "green",
          fontWeight: "600",
        },
        });
            window.open(res, "_self");
        }

    }

    return (
        <div className="w-full mx-auto  max-w-3xl mt-22">

            <div className="px-4">

                <Label className="text-green-600 mb-2">City</Label>
                <Input ref={cityInput} placeholder="Enter your city" className="border-gray-200 rounded-md focus:outline-none focus:ring-0 mb-2.5  placeholder:text-gray-400 shadow-sm focus:shadow-md focus:shadow-white !ring-0 " />

            </div>

            <div className="px-4">

                <Label className="text-green-600 mb-2">Phone</Label>
                <Input type="tel" ref={phoneInput} placeholder="Enter your phone" className="border-gray-200 rounded-md focus:outline-none focus:ring-0 mb-2.5  placeholder:text-gray-400 shadow-sm focus:shadow-md focus:shadow-white !ring-0 " />

            </div>

            <div className="px-4">

                <Label className="text-green-600 mb-2">Details</Label>
                <Input ref={detailsInput} placeholder="Enter your details"
                className="border-gray-200 rounded-md focus:outline-none focus:ring-0 mb-2.5  placeholder:text-gray-400 shadow-sm focus:shadow-md focus:shadow-white !ring-0 " />

            </div>

            <div className=" flex items-center gap-6 justify-center px-4">
                <Button onClick={makeCashOrder} className="w-1/4 cursor-pointer py-4.5 mt-2.5 bg-green-600 hover:bg-green-700 rounded-md" >Pay with Cash</Button>

            <Button onClick={makeOnlineOrder} className="w-1/4 cursor-pointer py-4.5 mt-2.5 bg-blue-700 hover:bg-blue-800 rounded-md" >Pay with Card</Button>
            </div>

        </div>

    )
}
