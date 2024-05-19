import HomeSectionLayout from "@/components/ui/HomeSectionLayout";
import HomePageHero from "./components/Hero";
import HomeLeftSideCategoriesBar from "./components/HomeLeftSideCategoriesBar";
import HomeProductsByCategory from "./components/HomeProductsByCategory";
import FoodCupBoardProducts from "./components/FoodCupboardProducts";
import FoodCupBoardProductsSidebar from "./components/FoodCupboardProductsSidebar";
import HomeBestSellerProductsSideBanner from "./components/HomeBestSellerProductsSideBanner";
import BestSellerProductsSection from "./components/BestSellerProductsSection";

const HomePage = () => {
  return (
    <div>
      <HomePageHero />
      {/* products  by category */}
      <HomeSectionLayout
        className="mt-10 "
        leftSideContent={<HomeLeftSideCategoriesBar />}
        rightSideContent={<HomeProductsByCategory />}
      />

      {/* food Cupboard  */}
      <HomeSectionLayout
        className="mt-10"
        leftSideContent={<FoodCupBoardProductsSidebar />}
        rightSideContent={<FoodCupBoardProducts />}
      />

      {/* our best seller products */}
      <HomeSectionLayout
        className="mt-10"
        leftSideContent={<HomeBestSellerProductsSideBanner />}
        rightSideContent={<BestSellerProductsSection />}
      />
    </div>
  );
};

export default HomePage;
