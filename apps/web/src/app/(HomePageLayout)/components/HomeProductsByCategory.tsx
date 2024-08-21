import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import HomeSectionTop from "./HomeSectionTop";
import HomePageCategories from "./HomePageCategories";
import HomePageOfferCards from "./HomePageOfferCards";
import { TCollectionDropdownItemProps } from "@/components/navbar/DropdownCategories";
import { TAppProductCardProps } from "@/types";
import { products } from "@/constants/db";

/* const baseApi = process.env.NEXT_PUBLIC_DB_URL;

// fetching products
const getProducts = async () => {
  const res = await fetch(`${baseApi}/products`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products!");
  }
  const data = await res.json();
  return data?.data;
}; */

const HomeProductsByCategory = async ({ collections }: { collections: TCollectionDropdownItemProps[] }) => {
  // const products = await getProducts();

  const productsForCard: TAppProductCardProps[] = products?.map((product: any) => ({
    id: product?._id,
    title: product?.title,
    price: product?.price,
    compare_price: product?.compare_price,
    photo: product?.media?.[0]?.url,
  }));

  return (
    <div className="">
      {/* Top Save Today */}
      {/* top header  */}
      <HomeSectionTop
        heading="Top Save Today"
        description="Don't miss this opportunity at a special discount just for this week."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsForCard?.map((product) => <AppProductCard key={product?.id} product={product} />)}
      </div>
      {/* Bowse By Categories */}
      {/* top header  */}
      <HomeSectionTop className="mt-6" heading="Bowse By Categories" description="Top Categories Of The Week" />
      <HomePageCategories collections={collections} />
      <HomePageOfferCards />
    </div>
  );
};

export default HomeProductsByCategory;
