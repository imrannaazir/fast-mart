import AppCard from "@/components/ui/AppCard";
import { heroCovers } from "../../../../constant/global.content";

const HomePageHero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12  gap-4 mt-10">
      {heroCovers.map((cover, i) => (
        <AppCard
          cover={cover}
          variant={
            i === 0 ? "primary" : i > 0 && i < 3 ? "secondary" : "accent"
          }
          size={i === 0 ? "lg" : i > 0 && i < 3 ? "sm" : "lg"}
          className={
            i === 0
              ? "lg:col-span-8 row-span-2 md:col-span-2"
              : i > 0 && i < 2
              ? "lg:col-span-4  xl:min-h-[240px] xl:min-w-[407px] "
              : " lg:col-span-3 "
          }
          key={i}
        />
      ))}
    </div>
  );
};

export default HomePageHero;
