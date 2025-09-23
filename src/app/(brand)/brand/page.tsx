import getAllBrands from "@/app/_services/brand.service"
import Image from "next/image";
import Link from "next/link";

export default async function page() {

  const res = await getAllBrands()

  return (
    <div className=" mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 container m-auto  p-4 ">

      {res?.map(brand => <Link key={brand._id} href={`/brandDetails/${brand._id} `}>


        <div className="bg-white rounded-xl shadow-md dark:shadow-white hover:shadow-lg p-3 cursor-pointer " >

          <Image width={500} height={500} src={brand.image} alt={brand.name} className="w-full object-contain rounded-md mb-3 cursor-pointer" />

          <h2 className="text-center text-lg font-semibold text-green-600"> {brand.name} </h2>

        </div>

      </Link>)}

    </div>
  )
}
