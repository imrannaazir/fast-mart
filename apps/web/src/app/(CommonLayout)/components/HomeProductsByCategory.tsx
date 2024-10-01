import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import HomeSectionTop from "./HomeSectionTop";
import HomePageCategories from "./HomePageCategories";
import HomePageOfferCards from "./HomePageOfferCards";
import { TCollectionDropdownItemProps } from "@/components/navbar/DropdownCategories";
import { TAppProductCardProps } from "@/types";
import apiCall from "@/libs/api";
import { TProduct } from "@repo/utils/types";

const getProducts = async () => {
  const response = await apiCall<TProduct[]>("/products", {
    next: {
      revalidate: 3600,
    },
  });

  return response.data;
};

const HomeProductsByCategory = async ({ collections }: { collections: TCollectionDropdownItemProps[] }) => {
  const products = (await getProducts()) as TProduct[];

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
