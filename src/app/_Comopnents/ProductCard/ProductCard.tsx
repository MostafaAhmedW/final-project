import { FaStar } from "react-icons/fa";
import { ProductCardProps } from "./ProductCard.types";
import Link from "next/link";
import Image from "next/image";
import AddProductBtn from './../AddProductBtn/AddProductBtn';
import AddWishListBtn from "../AddWishListBtn/AddWishListBtn";

export default function ProductCard({ product }: ProductCardProps) {
  return (


    <div key={product.id} className="bg-gray-100 p-px rounded-lg mt-12">

      <Link href={`/productDetails/${product.id}`}>

        <Image src={product.imageCover} width={400}
          height={400} className="w-full rounded-md " alt={product.title} />

        <h2 className="text-[#65ac57] pt-2 ms-1">{product.title.split(' ', 2).join(' ')}</h2>

        <h5 className="ms-1 dark:text-black">Price: {product.priceAfterDiscount ? <>

          <span className="line-through decoration-red-600 ms-0.5 ">{product.price} </span>

          <span className=" ms-1">{product.priceAfterDiscount} LE</span>

        </> : <span className="">{product.price} LE</span>} </h5>


      </Link>
       <div className="flex justify-between items-center ">

        <p className=" flex items-center ms-1 dark:text-black">{product.ratingsAverage} <FaStar className="ms-1.5 text-yellow-300 " /></p>

        <div className="cursor-pointer">
          <AddWishListBtn id={product.id}/>
        </div>

       </div>

      <AddProductBtn id={product.id} />

    </div>

  )
}
