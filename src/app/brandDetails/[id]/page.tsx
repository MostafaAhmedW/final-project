import { getBrandProduct, getSpecifiedBrand } from "@/app/_services/brand.service"
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import AddWishListBtn from './../../_Comopnents/AddWishListBtn/AddWishListBtn';
import AddProductBtn from "@/app/_Comopnents/AddProductBtn/AddProductBtn";
type DetailsDetailsProps = {
  params: {
    id: string;
  };
};
export default async function brandDetails({ params }: DetailsDetailsProps) {

  const brand = await getSpecifiedBrand(params.id)

  const products = await getBrandProduct(params.id)
    if (!products) {
    return;
  }

  return (

    <div className="container mx-auto p-6">

      <div className="text-center mb-8">

        <img
          src={brand?.image}
          alt={brand?.name}
          className="w-40 h-40 object-contain mx-auto mb-4"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 cursor-pointer">

        {products && products.length > 0 ? (
          products.map((product) => (

            <Link href={`/productDetails/${product._id}`} key={product._id}>

            <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg hover:scale-105 transition duration-300 cursor-pointer flex flex-col h-full">

                <div className="w-full h-48 flex items-center justify-center overflow-hidden mb-3">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="object-contain w-full h-full"
                  />
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.title}
                </h2>

                <div className="flex flex-col gap-1 mb-2 ">
                  {product?.priceAfterDiscount ? (
                    <>
                      <span className="line-through decoration-red-600 text-gray-500">
                        {product.price} EGP
                      </span>
                      <span className="font-bold text-green-600">
                        {product.priceAfterDiscount} EGP
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-green-600">{product.price} EGP</span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <p className="flex items-center text-lg gap-2 mt-auto dark:text-black">
                  <span>{product?.ratingsAverage}</span>
                  <FaStar className="text-yellow-400" />
                </p>

                <div className=" mt-2.5 cursor-pointer">
                  <AddWishListBtn id={product._id} />
                </div>

                </div>

               <AddProductBtn id={product._id} />

              </div>


            </Link>

          ))
        ) : (
          <p className="col-span-full text-center text-red-600 font-semibold text-lg">
            No products available for this brand 🚫
          </p>
        )}
      </div>
    </div>
  );
}
