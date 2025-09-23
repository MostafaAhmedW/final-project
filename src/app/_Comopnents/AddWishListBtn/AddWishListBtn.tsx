'use client'
import addProductToWashList, { removeItemFromWashlist } from "@/app/(washlist)/washlist/washlist.action";
import { getMyUserWashlist } from "@/app/_services/washlist.service"; 
import { WashlistContext } from "@/app/(washlist)/washlist/WashlistContext";
import { useContext, useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { toast } from "sonner";
import { ProductType } from "@/app/_interfaces/products";

export default function AddWishListBtn({ id }: { id: string }) {
  const { updateWashlistCount } = useContext(WashlistContext);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    async function checkWishlist() {
      const res = await getMyUserWashlist(); 
      if (res?.data?.some((item: ProductType) => item._id === id)) {
        setIsAdded(true); 
      }
    }
    checkWishlist();
  }, [id]);

  async function handleToggleWishlist() {
    if (isAdded) {
      const count = await removeItemFromWashlist(id);
      if (count !== null) {
        toast.success("Product removed from wishlist", {
          position: "top-right",
          duration: 1500,
          style: {
          color: "green",
          fontWeight: "600",
        },
        });
        updateWashlistCount(count);
        setIsAdded(false); 
      }
      return;
    }

    const count = await addProductToWashList(id);
    if (count !== null) {
      toast.success("Product added successfully to your wishlist", {
        position: "top-right",
        duration: 1500,
        style: {
          color: "green",
          fontWeight: "600",
        },
      });
      updateWashlistCount(count);
      setIsAdded(true); 
    }
  }

  return (
    <MdFavorite
      size={25}
      onClick={handleToggleWishlist}
      className={
        isAdded
          ? "text-red-600 cursor-pointer" 
          : "text-gray-400 cursor-pointer" 
      }
    />
  );
}
