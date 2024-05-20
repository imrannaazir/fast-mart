import AppCard from "@/components/ui/AppCard";
import HomePageCashbackBanner from "./HomePageCashbackBanner";
import HomeSectionTop from "./HomeSectionTop";
import { THeroCoverProps } from "./Hero";
import assets from "@/assets";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";

const BestSellerProductsSection = () => {
  // juice cover
  const juiceCover: THeroCoverProps = {
    id: 1,
    subHeading: "Get Ready To",
    heading: "TAKE ON THE DAY!",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate.",
    photo: assets.images.banners.juice,
    path: "",
    offerAmount: null,
    topHeader: null,
  };

  // drinks cover
  const drinksCover: THeroCoverProps = {
    id: 2,
    subHeading: "SUMMARY",
    heading: "Products",
    offerAmount: "20% Off",
    photo: assets.images.banners.drinks,
    path: "",
    description: null,
    topHeader: null,
  };

  // summer vegetables
  const summerVegetablesCover: THeroCoverProps = {
    id: 3,
    subHeading: null,
    heading: "VEGETABLE",
    offerAmount: null,
    photo: assets.images.banners.summer_vegetable,
    path: "",
    description: "Save up to 5% OFF",
    topHeader: "SUMMER",
  };
  return (
    <section>
      <HomePageCashbackBanner />

      {/* banners */}
      <div className="grid grid-cols-3 max-h-[236px] gap-6 mt-10">
        <AppCard
          cover={juiceCover}
          className="col-span-2 max-h-full"
          size="sm"
        />
        <AppCard
          cover={drinksCover}
          className="max-h-full"
          variant="primary"
          size="sm"
        />
      </div>

      <HomeSectionTop
        className="mt-10"
        heading="Our Best Seller"
        description="A virtual assistant collects the products from your list"
      />

      {/* best seller products */}
      <div className="grid grid-cols-4 gap-3 mt-6">
        {Array.from({ length: 8 }).map((_product, i) => (
          <AppProductCard key={i} />
        ))}
      </div>

      {/* vegetable banner    */}
      <AppCard cover={summerVegetablesCover} className="justify-end mt-10" />
    </section>
  );
};

export default BestSellerProductsSection;
