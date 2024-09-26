import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import React from "react";
import SideBarFilter from "./components/SideBarFilter";
import SelectSortBy from "./components/SelectSortBy";
import { products } from "@/constants/db";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { TAppProductCardProps } from "@/types";
import ProductPagination from "./components/Pagination";

const SearchPage = ({ searchParams }: { searchParams: { q: string } }) => {
  const searchBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Search",
      href: "/search",
    },
  ];

  return (
    <>
      <AppBreadcrumb title={`Search Results for "${searchParams.q}"`} items={searchBreadcrumbItems} />
      <Container className="flex gap-6">
        {/* left */}
        <SideBarFilter maxPrice={823} />
        {/* right */}
        <section className="w-full">
          {/* header  */}
          <div className="flex justify-between">
            <span>Showing 1-20 of 50 result</span>
            <SelectSortBy />
          </div>
          {/* products list */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-4">
            {products.map((product) => {
              const { compare_price, _id, price, title, media } = product || {};
              const productCardData: TAppProductCardProps = {
                compare_price,
                price,
                title,
                id: _id,
                photo: media[0]?.url as string,
              };
              return <AppProductCard key={product._id} product={productCardData} />;
            })}
          </div>

          {/* pagination */}
          <ProductPagination defaultCurrent={1} defaultPageSize={5} total={products?.length} />
        </section>
      </Container>
    </>
  );
};

export default SearchPage;
