import AppCard from "@/components/ui/AppCard";
import assets from "@/assets";
import { THeroCoverProps } from "@/types";

const FoodCupBoardProductsSidebar = () => {
  const cover: THeroCoverProps = {
    topHeader: "Seafood",
    description: null,
    heading: "PRODUCTS",
    id: 1,
    offerAmount: null,
    photo: assets.images.banners.seafood,
    path: "",
    subHeading: "FRESHES",
  };
  return <AppCard cover={cover} variant="primary" className="" size="lg" />;
};

export default FoodCupBoardProductsSidebar;
