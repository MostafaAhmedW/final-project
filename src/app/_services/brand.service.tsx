import { BrandType } from "../_interfaces/products";
import { ProductType } from '@/app/_interfaces/products';

export default async function getAllBrands() : Promise<null |BrandType[] > {
 try {
    
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands` , { cache:'force-cache'})
   const finalRes = await res.json();

return finalRes.data;
   

 } catch (error) {
   console.log(error);
    return null;
    
 }


}

export async function getSpecifiedBrand(
  id: string
): Promise<BrandType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );

    const finalRes = await res.json();
    return finalRes.data;
  } catch (error) {
    console.log(error);
    return null;
    
  }
}


export async function getBrandProduct(
  brandId: string
): Promise<ProductType[] | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
    );

    const finalRes = await res.json();

    return finalRes.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}