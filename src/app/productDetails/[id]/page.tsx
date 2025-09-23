import { getSpecifiedProduct } from "@/app/_services/products.service";
import React from "react";
import { FaStar } from "react-icons/fa";
import ProductSlider from './../../_Comopnents/ProductSlider/ProductSlider';
import AddProductBtn from "@/app/_Comopnents/AddProductBtn/AddProductBtn";
import AddWishListBtn from './../../_Comopnents/AddWishListBtn/AddWishListBtn';
type ProductDetailsProps = {
  params: {
    id: string;
  };
};

export default async function productDetails({ params }: ProductDetailsProps) {

  const onbjectDetails = await getSpecifiedProduct(params.id);

  if (!onbjectDetails) {
    return;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-start container mx-auto gap-8 py-8 mt-16 ">
      <div className="col-span-1">

        <ProductSlider images={onbjectDetails?.images || []} />

      </div>

      <div className="col-span-3 ms-5">

        <h1 className="text-4xl font-bold mb-5 dark:text-[#65ac57]">{onbjectDetails?.title}</h1>

        <p className="text-gray-600 text-lg mb-5 dark:text-gray-200">
          {onbjectDetails?.description}
        </p>

        <div className="flex gap-4 my-3">

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {onbjectDetails?.category.name}
          </span>

          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            {onbjectDetails?.brand.name}
          </span>

        </div>

        <h5 className="font-semibold text-xl flex items-center gap-2 ">
          Price:
          {onbjectDetails?.priceAfterDiscount ? (
            <>
              <span className="line-through decoration-red-600 text-gray-500">
                {onbjectDetails?.price} 
              </span>
              <span className="font-bold ">
                {onbjectDetails?.priceAfterDiscount} LE
              </span>
            </>
          ) : (
            <span className="font-bold">{onbjectDetails?.price} LE</span>
          )}
        </h5>

           <div className="flex justify-between items-center ">

          <p className="flex items-center text-lg gap-2 mt-2 dark:text-white">
            <span>{onbjectDetails?.ratingsAverage}</span>
            <FaStar className="text-yellow-400" />
          </p>

          <div className=" mt-2.5 cursor-pointer">
            <AddWishListBtn id={onbjectDetails.id} />
          </div>

           </div>

        <AddProductBtn id={onbjectDetails?.id} />

      </div>
    </div>
  );
}
