import AppCard from "@/components/ui/AppCard";
import HomePageCashbackBanner from "./HomePageCashbackBanner";
import HomeSectionTop from "./HomeSectionTop";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import {
  drinksCover,
  juiceCover,
  summerVegetablesCover,
} from "../../../../constant/global.content";

const BestSellerProductsSection = () => {
  return (
    <section>
      <HomePageCashbackBanner />

      {/* banners */}
      <div className="grid lg:grid-cols-3 max-h-[236px] gap-6 mt-10">
        <AppCard
          cover={juiceCover}
          className="lg:col-span-2 lg:max-h-full"
          size="sm"
        />
        <div className="hidden lg:block">
          <AppCard
            cover={drinksCover}
            className=" lg:max-h-full"
            variant="primary"
            size="sm"
          />
        </div>
      </div>

      <HomeSectionTop
        className="mt-10"
        heading="Our Best Seller"
        description="A virtual assistant collects the products from your list"
      />

      {/* best seller products */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
        {Array.from({ length: 8 }).map((_product, i) => (
          <AppProductCard key={i} />
        ))}
      </div>

      {/* vegetable banner    */}
      <AppCard
        cover={summerVegetablesCover}
        className="justify-center lg:justify-end mt-10"
      />
    </section>
  );
};

export default BestSellerProductsSection;
