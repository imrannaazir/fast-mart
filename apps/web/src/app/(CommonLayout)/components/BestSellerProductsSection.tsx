import AppCard from "@/components/ui/AppCard";
import HomePageCashbackBanner from "./HomePageCashbackBanner";
import HomeSectionTop from "./HomeSectionTop";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { drinksCover, juiceCover, summerVegetablesCover } from "@/constants/global.content";
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

const BestSellerProductsSection = async () => {
  // const products = await getProducts();

  const productsForCard: TAppProductCardProps[] = products?.map((product: any) => ({
    id: product?._id,
    title: product?.title,
    price: product?.price,
    compare_price: product?.compare_price,
    photo: product?.media?.[0]?.url,
  }));
  return (
    <section>
      <HomePageCashbackBanner />

      {/* banners */}
      <div className="mt-10 grid max-h-[236px] gap-6 lg:grid-cols-3">
        <AppCard cover={juiceCover} className="lg:col-span-2 lg:max-h-full" size="sm" />
        <div className="hidden lg:block">
          <AppCard cover={drinksCover} className="lg:max-h-full" variant="primary" size="sm" />
        </div>
      </div>

      <HomeSectionTop
        className="mt-10"
        heading="Our Best Seller"
        description="A virtual assistant collects the products from your list"
      />

      {/* best seller products */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsForCard?.map((product) => <AppProductCard key={product?.id} product={product} />)}
      </div>

      {/* vegetable banner    */}
      <AppCard cover={summerVegetablesCover} className="mt-10 justify-center lg:justify-end" />
    </section>
  );
};

export default BestSellerProductsSection;