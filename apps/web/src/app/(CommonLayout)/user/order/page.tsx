import { serverFetcher } from "@/libs/server-fetcher";
import { TOrder } from "@repo/utils/types";
import { Empty } from "antd";
import HomeSectionTop from "../../components/HomeSectionTop";
import OrderCard from "../components/order-card";

const getMyOrders = async () => {
  const response = await serverFetcher<TOrder[]>("/orders/me/all", {
    cache: "no-store",
  });

  return response?.data;
};

const OrderPage = async () => {
  const orders = await getMyOrders();

  return (
    <div>
      <HomeSectionTop heading="My Orders History" description="" />
      {orders?.length ? (
        <div className="mt-6 grid gap-6">{orders?.map((order) => <OrderCard order={order} key={order?._id} />)}</div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default OrderPage;
