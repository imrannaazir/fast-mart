import AppCard from "@/components/ui/AppCard";
import HomePageCashbackBanner from "./HomePageCashbackBanner";
import HomeSectionTop from "./HomeSectionTop";
import { THeroCoverProps } from "./Hero";
import assets from "@/assets";

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
    </section>
  );
};

export default BestSellerProductsSection;
