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
import { TCollectionDropdownItemProps } from "@/components/navbar/DropdownCategories";
import { collections } from "@/constants/db";

/* const baseApi = process.env.NEXT_PUBLIC_DB_URL;

// fetching collections
const getAllCollections = async () => {
  const res = await fetch(`${baseApi}/collections`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories!");
  }
  const data = await res.json();
  return data?.data;
}; */

const HomePage = async () => {
  // const collections = await getAllCollections();

  // transform collections data
  const collectionsDropdownItems: TCollectionDropdownItemProps[] = collections?.map((collection: any) => ({
    id: collection?._id,
    name: collection?.title,
    iconName: collection?.icon?.name || "ban",
    categories: collection?.categories?.map((category: any) => ({
      id: category?._id,
      name: category?.title,
    })),
  }));
  return (
    <div>
      <HomePageHero />
      {/* products  by category */}
      <HomeSectionLayout
        className="mt-10"
        leftSideContent={<HomeLeftSideCategoriesBar collections={collectionsDropdownItems} />}
        rightSideContent={<HomeProductsByCategory collections={collectionsDropdownItems} />}
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

      {/* featured blogs */}
      <HomeSectionLayout
        className="mt-10"
        leftSideContent={<CustomerCommentsSidebar />}
        rightSideContent={<HomeFeaturedBlogs />}
      />
      {/* news letter  */}
      <HomePageNewsLetter />
    </div>
  );
};

export default HomePage;
