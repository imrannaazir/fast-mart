import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import HomeSectionTop from "./HomeSectionTop";

const HomeProductsByCategory = () => {
  return (
    <div className="">
      {/* Top Save Today */}
      {/* top header  */}
      <HomeSectionTop
        heading="Top Save Today"
        description="Don't miss this opportunity at a special discount just for this week."
      />
      <div className="grid grid-cols-4 gap-3 mt-6">
        {Array.from({ length: 8 }).map((_product, i) => (
          <AppProductCard key={i} />
        ))}
      </div>
      {/* Bowse By Categories */}
      {/* top header  */}
      <HomeSectionTop
        heading="Bowse By Categories"
        description="Top Categories Of The Week"
      />
      <div className="grid grid-cols-4 gap-3 mt-6">
        {Array.from({ length: 8 }).map((_product, i) => (
          <AppProductCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default HomeProductsByCategory;
