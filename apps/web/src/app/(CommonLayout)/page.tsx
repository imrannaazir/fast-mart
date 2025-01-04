import { TCollectionDropdownItemProps } from "@/components/navbar/DropdownCategories";
import Container from "@/components/ui/Container";
import HomeSectionLayout from "@/components/ui/HomeSectionLayout";
import { serverFetcher } from "@/libs/server-fetcher";
import { TCollection } from "@repo/utils/types";
import { Metadata } from "next";
import BestSellerProductsSection from "./components/BestSellerProductsSection";
import CustomerCommentsSidebar from "./components/CustomerCommentsSidebar";
import FoodCupBoardProducts from "./components/FoodCupboardProducts";
import FoodCupBoardProductsSidebar from "./components/FoodCupboardProductsSidebar";
import HomePageHero from "./components/Hero";
import HomeBestSellerProductsSideBanner from "./components/HomeBestSellerProductsSideBanner";
import HomeFeaturedBlogs from "./components/HomeFeaturedBlogs";
import HomeLeftSideCategoriesBar from "./components/HomeLeftSideCategoriesBar";
import HomePageNewsLetter from "./components/HomePageNewsLetter";
import HomeProductsByCategory from "./components/HomeProductsByCategory";

export const metadata: Metadata = {
  title: "Home | Fast Mart",
  description: "Fast Mart home page",
};

async function getAllCollections() {
  const response = await serverFetcher<TCollection[]>("/collections", {
    next: { revalidate: 3600 },
  });

  return response.data;
}

export default async function HomePage() {
  const collections = (await getAllCollections()) || [];

  // transform collections data
  const collectionsDropdownItems = collections?.map((collection) => ({
    id: collection?._id!,
    name: collection?.title!,
    iconName: collection?.icon || "Ban",
    categories: collection?.categories?.map((category) => ({
      id: category?._id,
      name: category?.title,
    })) as TCollectionDropdownItemProps[],
  })) as TCollectionDropdownItemProps[];

  return (
    <Container>
      <HomePageHero />
      {/* products by category */}
      <HomeSectionLayout
        className="mt-10"
        leftSideContent={<HomeLeftSideCategoriesBar collections={collections} />}
        rightSideContent={<HomeProductsByCategory collections={collectionsDropdownItems} />}
      />

      {/* food Cupboard */}
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
      {/* news letter */}
      <HomePageNewsLetter />
    </Container>
  );
}
