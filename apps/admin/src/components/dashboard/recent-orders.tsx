import { useGetAllOrdersQuery } from "@/redux/features/order/order-api";
import { getErrorMessage } from "@repo/utils/functions";
import { TOrder } from "@repo/utils/types";
import { ShoppingCart } from "lucide-react";
import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { Empty } from "../ui/empty";
import { DashboardCardHeader } from "./card-header";
import RecentOrderItem from "./recent-order-item";
import RecentOrderItemSkeleton from "./recent-order-item-skeleton";

export function RecentOrders() {
  const { data, isFetching, error } = useGetAllOrdersQuery("limit=5");
  const orders = (data?.data || []) as TOrder[];

  let content: ReactNode;
  if (isFetching) {
    content = Array.from({ length: 5 })?.map((_, i) => <RecentOrderItemSkeleton key={i} />);
  } else if (!isFetching && error) {
    content = <p className="text-destructive text-center">{getErrorMessage(error)}</p>;
  } else if (!isFetching && !error && orders?.length === 0) {
    content = <Empty title="No order" description="There is no recent sale!" icon={ShoppingCart} />;
  } else if (!isFetching && orders?.length) {
    content = orders?.map((order) => <RecentOrderItem key={order?._id} order={order} />);
  }
  return (
    <Card>
      <DashboardCardHeader title="Recent sales" description="Showing recent orders" />
      <CardContent>
        <div className="space-y-8">{content}</div>
      </CardContent>
    </Card>
  );
}
