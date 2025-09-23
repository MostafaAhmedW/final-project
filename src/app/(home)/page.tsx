
import ProductCard from "../_Comopnents/ProductCard/ProductCard";
import { getAllproducts } from "../_services/products.service";
import { lazy, Suspense } from "react";
import Loader from "../_Comopnents/Loader/Loader";
import MainSkider from "../_Comopnents/MainSlider/MainSkider";

const CategorySlider = lazy( () => import( '../_Comopnents/CategorySlider/CategorySlider' ) )

export default async function Home() {

const allProducts = await getAllproducts();

  return (
    <>

      <div className="flex flex-col gap-5">
        <MainSkider showDots={false} />

        <div >
          <Suspense fallback={ <Loader/> }>
          
          <CategorySlider />

          </Suspense>
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 container mx-auto">
        {allProducts?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
