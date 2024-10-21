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
import Container from "@/components/ui/Container";
import { TCollection } from "@repo/utils/types";
import apiCall from "@/libs/api";
import { getAllMyWishlistItems } from "@/actions/wishlist";
import { getSession } from "@/libs/auth-utils";

export const getAllCollections = async () => {
  const response = await apiCall<TCollection[]>("/collections", {
    next: { revalidate: 3600 },
  });

  return response.data;
};

const HomePage = async () => {
  const collections = (await getAllCollections()) as TCollection[];

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
    <Container>
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
    </Container>
  );
};

export default HomePage;
