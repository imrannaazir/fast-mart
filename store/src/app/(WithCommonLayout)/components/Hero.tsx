import assets from "@/assets";
import AppCard from "@/components/ui/AppCard";
export type THeroCoverProps = {
  id: number;
  photo: unknown;
  topHeader: string | null;
  offerAmount: string | null;
  subHeading: string | null;
  heading: string;
  description: string | null;
  path: string;
};
const HomePageHero = () => {
  const heroCovers: THeroCoverProps[] = [
    {
      id: 1,
      photo: assets.images.banners.vegetables,
      topHeader: "Exclusive offer",
      offerAmount: "30% Off",
      subHeading: "STAY HOME & DELIVERED YOUR",
      heading: "DAILY NEEDS",
      description:
        "Vegetables contain many vitamins and minerals that are good for your health.",
      path: "/",
    },
    {
      id: 2,
      photo: assets.images.banners.nuts,
      topHeader: null,
      offerAmount: "45% Off",
      subHeading: null,
      heading: "Nut Collection",
      description: "We deliver organic vegetables & fruits",
      path: "/",
    },
    {
      id: 3,
      photo: assets.images.banners.fruits,
      topHeader: null,
      offerAmount: "35% Off",
      subHeading: null,
      heading: "Organic Market",
      description: "Start your daily shopping with some Organic food",
      path: "/",
    },
    {
      id: 4,
      photo: assets.images.banners.eggs,
      topHeader: null,
      offerAmount: "5% Off",
      subHeading: null,
      heading: "Hot Deals on New Items",
      description: "Daily Essentials Eggs & Dairy",
      path: "/",
    },
    {
      id: 5,
      photo: assets.images.banners.fresh_fruits,
      topHeader: null,
      offerAmount: "5% Off",
      subHeading: null,
      heading: "Buy More & Save More",
      description: "Fresh Vegetables",
      path: "/",
    },
    {
      id: 6,
      photo: assets.images.banners.meats,
      topHeader: null,
      offerAmount: "5% Off",
      subHeading: null,
      heading: "Organic Meat Prepared",
      description: "Delivered to Your Home",
      path: "/",
    },
    {
      id: 7,
      photo: assets.images.banners.snacks,
      topHeader: null,
      offerAmount: "5% Off",
      subHeading: null,
      heading: "Buy More & Save More",
      description: "Nuts & Snacks",
      path: "/",
    },
  ];
  return (
    <div className="grid grid-cols-12  gap-4 mt-10">
      {heroCovers.map((cover, i) => (
        <AppCard
          cover={cover}
          variant={
            i === 0 ? "primary" : i > 0 && i < 3 ? "secondary" : "accent"
          }
          size={i === 0 ? "lg" : i > 0 && i < 3 ? "sm" : "lg"}
          className={
            i === 0
              ? "col-span-8 row-span-2"
              : i > 0 && i < 2
              ? "col-span-4"
              : " col-span-3 "
          }
          key={i}
        />
      ))}
    </div>
  );
};

export default HomePageHero;
