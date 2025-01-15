import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { serverFetcher } from "@/libs/server-fetcher";
import { TBrand, TCategory, TCollection } from "@repo/utils/types";
import { Suspense } from "react";
import SideBarFilter from "./components/SideBarFilter";
import MobileFilterMenu from "./components/mobile-filter-menu";
import SearchedProductList from "./searched-product-list";

export type TProductSearchParams = {
  q: string;
  collections: string;
  minPrice: string;
  maxPrice: string;
  categories: string;
  ratings: string;
  brands: string;
  sortOrder: "desc" | "asc";
  sortBy: string;
  page: string;
  limit: string;
};
const searchBreadcrumbItems: TAppBreadcrumbItem[] = [
  {
    title: "Search",
    href: "/search",
  },
];
const SearchPage = async ({ searchParams }: { searchParams: TProductSearchParams }) => {
  const categoryQuery = searchParams?.collections
    ?.split(",")
    ?.map((collection) => `collections=${encodeURIComponent(collection)}`)
    .join("&");

  const brandResponse = await serverFetcher<TBrand[]>(`/brands`, {
    cache: "no-store",
  });
  const collectionResponse = await serverFetcher<TCollection[]>("/collections", {
    cache: "no-store",
  });

  const categoryResponse = await serverFetcher<TCategory[]>(`/categories?${categoryQuery}`, {
    cache: "no-store",
  });

  const maxPriceResponse = await serverFetcher<{ highRange: number }>("/products/highest-price", {
    cache: "no-store",
  });

  const brands = brandResponse?.data || [];
  const collections = collectionResponse?.data || [];
  const categories = categoryResponse?.data || [];
  const maxPrice = maxPriceResponse?.data?.highRange || 100;
  return (
    <>
      <AppBreadcrumb title={`Search Results for "${searchParams.q || "All"}"`} items={searchBreadcrumbItems} />
      <Container className="mb-6 flex gap-6">
        {/* left */}
        <SideBarFilter
          className="hidden lg:block"
          brands={brands}
          collections={collections}
          categories={categories}
          maxPrice={maxPrice}
        />
        {/* right */}
        <section className="w-full">
          <MobileFilterMenu
            className="mb-4 lg:hidden"
            brands={brands}
            collections={collections}
            categories={categories}
            maxPrice={823}
          />
          {/* header  */}
          <Suspense fallback={<p>loading...</p>}>
            <SearchedProductList searchParams={searchParams} />
          </Suspense>
        </section>
      </Container>
    </>
  );
};

export default SearchPage;
