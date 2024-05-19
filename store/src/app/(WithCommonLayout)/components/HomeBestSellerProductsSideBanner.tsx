import AppCard from "@/components/ui/AppCard";
import { THeroCoverProps } from "./Hero";
import assets from "@/assets";
import HomePageTrendingProducts from "./HomePageTrendingProducts";

const HomeBestSellerProductsSideBanner = () => {
  const freshVegetableCover: THeroCoverProps = {
    id: 1,
    description: "Super Offer to 50% Off",
    offerAmount: "Organic",
    subHeading: "FRESH",
    heading: "VEGETABLES",
    photo: assets.images.banners.fresh_vegetable,
    path: "/",
    topHeader: null,
  };
  return (
    <div className="h-full flex flex-col gap-10">
      <AppCard className="h-full items-start" cover={freshVegetableCover} />
      <HomePageTrendingProducts />
    </div>
  );
};

export default HomeBestSellerProductsSideBanner;
