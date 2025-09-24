import AddProductBtn from "@/app/_Comopnents/AddProductBtn/AddProductBtn";
import { ProductType } from "@/app/_interfaces/products";
import { getMyUserWashlist } from "@/app/_services/washlist.service";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import RemoveItemWashlsitBtn from "./RemoveItemWashlsitBtn";

export default async function Washlistpage() {

    async function getUserWashlist(){
        
   const res =  await getMyUserWashlist();
   return res;
 
    }
 const {count , data } = await  getUserWashlist();


 return (
    <div className="container max-w-7xl mx-auto py-8 px-4 mt-16">

      <h1 className="text-3xl font-bold text-green-700 mb-4">Your Wishlist</h1>

      <div className="bg-gray-100 p-4 rounded-md shadow-sm mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div>

          <h3 className="text-gray-700">
            Items: <span className="font-bold">{count}</span>
          </h3>
        </div>
        </div>

      {count === 0 && <p className="text-gray-600">Your wishlist is empty!</p>}

      <div className="overflow-x-auto hidden md:block">
        <Table className="table-fixed w-full">
          <TableCaption>Products you saved to your wishlist.</TableCaption>
          <TableHeader className="border-gray-100 border">
            <TableRow>
              <TableHead className="w-[40%]">Product</TableHead>
              <TableHead className="w-[20%]">Price</TableHead>
              <TableHead className="w-[25%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border-gray-100 border">
            {data.map((item: ProductType) => (
              <TableRow key={item._id} >

                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.imageCover}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="rounded-md shadow"
                    />
                    <span className="font-semibold text-gray-800 dark:text-white">{item.title.split(' ', 2).join(' ')}</span>
                  </div>
                </TableCell>

                <TableCell className="text-gray-700 dark:text-white">{item.price} LE</TableCell>

                <TableCell className="text-right flex justify-end gap-2">

                    <AddProductBtn id={item._id} />

                 <RemoveItemWashlsitBtn id={item._id}/>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-4 md:hidden">
        {data.map((item: ProductType) => (
          <div key={item._id} className="p-4 border rounded-lg shadow-sm bg-white">

            <div className="flex items-center gap-3 mb-3">
              <Image
                src={item.imageCover}
                alt={item.title}
                width={90}
                height={90}
                className="rounded-md shadow"
              />
              <span className="font-semibold text-gray-800">{item.title}</span>
            </div>

            <p className="text-gray-700">Price: {item.price} LE</p>

            <div className="flex justify-between mt-3 items-center">
           <AddProductBtn id={item._id} />
              <RemoveItemWashlsitBtn id={item._id}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
