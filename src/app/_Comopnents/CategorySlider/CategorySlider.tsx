import getAllCategorys from "@/app/_services/categores.service";
import MySwiper from "../MySwipe/MySwipe";

export default async function CategorySlider() {
  const allCategory = await getAllCategorys();

  if (allCategory == null) {
    return;
  }

  return (
    <div className="container mx-auto">
      <h1 className="  mb-6 text-3xl font-bold text-gray-600 dark:text-[#65ac57] mt-2.5">
        Shop Popular Categories
      </h1>


        <MySwiper
        slidesPerView={7}
        items={allCategory.map((category) => ({
          image: category.image,
          name: category.name
        }))}
        imageClass="h-28 w-28 mx-auto mt-2.5 rounded-md shadow-sm"
      />
    </div>
  );
}
