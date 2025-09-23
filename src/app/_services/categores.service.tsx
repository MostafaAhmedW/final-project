import { CategoryType } from "../_interfaces/products";

export default async function getAllCategorys(): Promise<null | CategoryType[]> {
   try {

      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
      const finalRes = await res.json();

      return finalRes.data;


   } catch (error) {
      return null

   }


}
