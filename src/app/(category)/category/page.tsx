import getAllCategorys from "@/app/_services/categores.service"
import Image from "next/image";

export default async function Category() {
    
  const res = await getAllCategorys();
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 container mx-auto mt-20">

        { res?.map( category => <div key={category._id} className="bg-white rounded-xl shadow-md dark:shadow-white hover:shadow-lg transition p-3 cursor-pointer hover:scale-105 duration-300  ">

        <Image width={500} height={500} src={ category.image } alt={ category.name } className="w-full h-60 rounded-md mb-3 cursor-pointer" />

       <h2 className="text-center text-lg font-semibold text-gray-800 dark:text-[#65ac57]">{category.name}</h2>

            
        </div> ) }

    </div>
  )
}
