import assets from "@/assets";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { serverFetcher } from "@/libs/server-fetcher";
import { TAppProductCardProps } from "@/types";
import { TProduct } from "@repo/utils/types";
import queryString from "query-string";
import ProductPagination from "./components/Pagination";
import SelectSortBy from "./components/SelectSortBy";
import SideBarFilter from "./components/SideBarFilter";

const searchBreadcrumbItems: TAppBreadcrumbItem[] = [
  {
    title: "Search",
    href: "/search",
  },
];
const SearchPage = async ({ searchParams }: { searchParams: { q: string } }) => {
  const searchTerm = searchParams.q;
  console.log(searchParams);
  const query = queryString.stringify({
    searchTerm,
  });

  const response = await serverFetcher<TProduct[]>(`/products?${query}`);
  const products = response?.data;
  const meta = response?.meta;

  console.log({ meta });
  const skip = meta?.limit! * (meta?.page! - 1);
  return (
    <>
      <AppBreadcrumb title={`Search Results for "${searchParams.q || "All"}"`} items={searchBreadcrumbItems} />
      <Container className="flex gap-6">
        {/* left */}
        <SideBarFilter maxPrice={823} />
        {/* right */}
        <section className="w-full">
          {/* header  */}
          <div className="flex justify-between">
            <span>
              Showing {skip + 1}-{skip + meta?.limit!} of {meta?.total} result
            </span>
            <SelectSortBy />
          </div>
          {/* products list */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-4">
            {products?.map((product) => {
              const { compare_price, _id, price, title, media } = product || {};
              const productCardData: TAppProductCardProps = {
                compare_price: compare_price!,
                price,
                title,
                id: _id!,
                photo: media?.[0]?.url || (assets.images.blank_image as string),
              };
              return <AppProductCard key={product._id} product={productCardData} />;
            })}
          </div>

          {/* pagination */}
          <ProductPagination defaultCurrent={meta?.page!} defaultPageSize={meta?.totalPage!} total={meta?.totalPage!} />
        </section>
      </Container>
    </>
  );
};

export default SearchPage;
