import HomeSectionLayout from "@/components/ui/HomeSectionLayout";
import HomePageHero from "./components/Hero";
import HomeLeftSideCategoriesBar from "./components/HomeLeftSideCategoriesBar";
import HomeProductsByCategory from "./components/HomeProductsByCategory";

const HomePage = () => {
  return (
    <div>
      <HomePageHero />
      {/* by category */}
      <HomeSectionLayout
        className="mt-10 "
        leftSideContent={<HomeLeftSideCategoriesBar />}
        rightSideContent={<HomeProductsByCategory />}
      />
      <div className="h-[200vh]"></div>
    </div>
  );
};

export default HomePage;
