import { ProductType } from '@/app/_interfaces/products';
import { CartRsponseType, getUserCart } from '@/app/_services/cart.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import RemoveItemBtn from './RemoveItemBtn';
import ChangeCountBtn from './ChangeCountBtn';
import RemoveAllCart from './RemoveAllCart';
import Link from 'next/link';

export type ItemType = {
  count: number;
  _id: string;
  price: number;
  product: ProductType;

};

export default async function CartPage() {
  async function handleGetUserCart(): Promise<CartRsponseType> {
    const res = await getUserCart();
    return res;
  }

  const { numOfCartItems, products, totalCartPrice } = await handleGetUserCart();

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 mt-16">

      <h1 className="text-3xl font-bold text-green-700 mb-4">Your Cart</h1>

      <div className="bg-gray-100 p-4 rounded-md shadow-sm mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="font-semibold text-lg dark:text-black">
            Total: <span className="text-green-600">{totalCartPrice} LE</span>
          </h2>

          <h3 className="text-gray-700">
            Items: <span className="font-bold">{numOfCartItems}</span>
          </h3>
        </div>

        <div className="flex gap-2">

          <Link href='/cart/payment'>
          <Button className="cursor-pointer">Pay</Button>
          </Link>
          
          <RemoveAllCart/>
        </div>
      </div>

      <div className="overflow-x-auto hidden md:block">
        <Table className="table-fixed w-full">
          <TableCaption>Your current shopping cart.</TableCaption>
          <TableHeader className="border-gray-100 border">
            <TableRow>
              <TableHead className="w-[40%]">Product</TableHead>
              <TableHead className="w-[20%]">Price</TableHead>
              <TableHead className="w-[20%]">Count</TableHead>
              <TableHead className="w-[20%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border-gray-100 border">
            {products.map((item: ItemType) => (
              <TableRow key={item._id}>

                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={100}
                      height={100}
                      className="rounded-md shadow"
                    />
                    <span className="font-semibold text-gray-800 dark:text-white">{item.product.title.split(' ', 2).join(' ')}</span>
                  </div>
                </TableCell>

                <TableCell className="text-gray-700 dark:text-white">{item.price} LE</TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 dark:text-white">

                   
                    <ChangeCountBtn isIncrement id={item.product.id} newCount={item.count + 1} />

                    <Input className="w-12 text-center" value={item.count} readOnly />

                    <ChangeCountBtn id={item.product.id} newCount={item.count - 1}/>

                  </div>
                </TableCell>

                <TableCell className="text-right">
                  
                  <RemoveItemBtn id={item.product.id} />
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-4 md:hidden">
        {products.map((item: ItemType) => (
          <div key={item._id} className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                width={80}
                height={80}
                className="rounded-md shadow"
              />
              <span className="font-semibold text-gray-800 dark:text-white">{item.product.title}</span>
            </div>
            <p className="text-gray-700 dark:text-white">Price: {item.price} LE</p>
            <p className="text-gray-700 dark:text-white">Count: {item.count}</p>
            <div className="flex justify-between mt-3">
              <div className="flex items-center gap-2 dark:text-white">
                <Button className="cursor-pointer" size="sm" variant="outline">
                  -
                </Button>
                <Input className="w-12 text-center" value={item.count} readOnly />
                <Button className="cursor-pointer" size="sm" variant="outline">
                  +
                </Button>
              </div>
              <Button className="cursor-pointer" variant={'destructive'}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
