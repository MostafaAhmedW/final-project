import { ProductType } from "../_interfaces/products";

export async function getAllproducts(): Promise<ProductType[] | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, { cache:"force-cache" } );
    // const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);

    const finalRes = await res.json();

    // console.log('finalRes',finalRes.data);
    return finalRes.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export async function getSpecifiedProduct(
  id: string
): Promise<ProductType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    const finalRes = await res.json();

    return finalRes.data;
  } catch (error) {
    return null;
  }
}
