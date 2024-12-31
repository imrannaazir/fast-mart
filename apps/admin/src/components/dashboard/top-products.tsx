import { useGetTopProductsQuery } from "@/redux/features/product/productApi";
import { getErrorMessage } from "@repo/utils/functions";
import { TTopProduct } from "@repo/utils/types";
import { Package } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Empty } from "../ui/empty";
import { DashboardCardHeader } from "./card-header";
import RecentOrderItemSkeleton from "./recent-order-item-skeleton";
import TopProductItem from "./top-product-item";

export function TopProducts() {
  const { data, isFetching, error } = useGetTopProductsQuery(``);
  const products = (data?.data || []) as TTopProduct[];

  let content: ReactNode;
  if (isFetching) {
    content = Array.from({ length: 5 })?.map((_, i) => <RecentOrderItemSkeleton key={i} />);
  } else if (!isFetching && error) {
    content = <p className="text-destructive text-center">{getErrorMessage(error)}</p>;
  } else if (!isFetching && !error && products?.length === 0) {
    content = (
      <Empty title="No products" description="There is no product founded!" icon={Package}>
        <Link to={"/products/new"}>
          <Button size={"sm"}>Add Product</Button>
        </Link>
      </Empty>
    );
  } else if (!isFetching && products?.length) {
    content = products.map((product) => <TopProductItem key={product?._id} product={product} />);
  }
  return (
    <Card>
      <DashboardCardHeader title="Top products" description="Showing most sold products" />
      <CardContent>
        <div className="space-y-8">{content}</div>
      </CardContent>
    </Card>
  );
}
