import assets from "@/assets";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { serverFetcher } from "@/libs/server-fetcher";
import { TAppProductCardProps } from "@/types";
import { TProduct } from "@repo/utils/types";
import { Result } from "antd";
import queryString from "query-string";
import ProductPagination from "./components/Pagination";
import SelectSortBy from "./components/SelectSortBy";
import { TProductSearchParams } from "./page";

const SearchedProductList = async ({ searchParams }: { searchParams: TProductSearchParams }) => {
  const queryObj: Record<string, string> = {};
  if (searchParams?.q) {
    queryObj["searchTerm"] = encodeURIComponent(searchParams.q);
  }

  if (searchParams?.minPrice) {
    queryObj["lowPrice"] = searchParams?.minPrice;
  }
  if (searchParams?.maxPrice) {
    queryObj["highPrice"] = searchParams?.maxPrice;
  }
  if (searchParams?.collections) {
    queryObj["collections"] = searchParams?.collections;
  }
  if (searchParams?.brands) {
    queryObj["brands"] = searchParams?.brands;
  }
  if (searchParams?.categories) {
    queryObj["categories"] = searchParams?.categories;
  }

  if (searchParams?.sortBy && searchParams) {
    queryObj["sort"] = searchParams?.sortOrder === "desc" ? `-${searchParams?.sortBy}` : searchParams?.sortBy;
  }

  queryObj["limit"] = searchParams?.limit || "24";
  queryObj["page"] = searchParams?.page || "1";

  const query = queryString.stringify(queryObj);
  const response = await serverFetcher<TProduct[]>(`/products?${query}`, {
    cache: "no-store",
  });
  const products = response?.data;
  const meta = response?.meta;
  const skip = meta?.limit! * (meta?.page! - 1);
  return (
    <section>
      <div className="flex justify-between">
        <span>
          Showing {skip + 1}-{skip + meta?.limit!} of {meta?.total} result
        </span>
        <SelectSortBy />
      </div>
      {/* products list */}
      {products?.length === 0 ? (
        <Result status={"404"} title="No product" subTitle="There is no product for this filters." />
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
      )}

      {/* pagination */}
      <ProductPagination defaultCurrent={meta?.page!} defaultPageSize={meta?.totalPage!} total={meta?.totalPage!} />
    </section>
  );
};

export default SearchedProductList;
