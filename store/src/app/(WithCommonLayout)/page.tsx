import HomeSectionLayout from "@/components/ui/HomeSectionLayout";
import HomePageHero from "./components/Hero";
import HomeLeftSideCategoriesBar from "./components/HomeLeftSideCategoriesBar";
import HomeProductsByCategory from "./components/HomeProductsByCategory";
import FoodCupBoardProducts from "./components/FoodCupboardProducts";
import FoodCupBoardProductsSidebar from "./components/FoodCupboardProductsSidebar";
import HomeBestSellerProductsSideBanner from "./components/HomeBestSellerProductsSideBanner";
import BestSellerProductsSection from "./components/BestSellerProductsSection";
import HomeFeaturedBlogs from "./components/HomeFeaturedBlogs";
import CustomerCommentsSidebar from "./components/CustomerCommentsSidebar";
import HomePageNewsLetter from "./components/HomePageNewsLetter";

const HomePage = () => {
  return (
    <div>
      <HomePageHero />
      {/* products  by category */}
      {/* <HomeSectionLayout
        className="mt-10 "
        leftSideContent={<HomeLeftSideCategoriesBar />}
        rightSideContent={<HomeProductsByCategory />}
      /> */}

      {/* food Cupboard  */}
      {/* <HomeSectionLayout
        className="mt-10"
        leftSideContent={<FoodCupBoardProductsSidebar />}
        rightSideContent={<FoodCupBoardProducts />}
      /> */}

      {/* our best seller products */}
      {/* <HomeSectionLayout
        className="mt-10"
        leftSideContent={<HomeBestSellerProductsSideBanner />}
        rightSideContent={<BestSellerProductsSection />}
      /> */}

      {/* featured blogs */}
      {/* <HomeSectionLayout
        className="mt-10"
        leftSideContent={<CustomerCommentsSidebar />}
        rightSideContent={<HomeFeaturedBlogs />}
      /> */}
      {/* news letter  */}
      {/* <HomePageNewsLetter /> */}
    </div>
  );
};

export default HomePage;
