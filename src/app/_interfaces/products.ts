export type ProductType = {
  id: string;
  title: string;
  imageCover: string;
  description: string;
  category: CategoryType;
  brand: BrandType;
  price: number;
  ratingsAverage: number;
  priceAfterDiscount?: number;
  _id: string ;
  images:string[];
};

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type BrandType = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};
