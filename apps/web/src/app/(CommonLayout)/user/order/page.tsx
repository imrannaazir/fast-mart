import { serverFetcher } from "@/libs/server-fetcher";
import { TOrder } from "@repo/utils/types";
import HomeSectionTop from "../../components/HomeSectionTop";
import OrderCard from "../components/order-card";

const getMyOrders = async () => {
  const response = await serverFetcher<TOrder[]>("/orders/me/all");
  if (!response.success) {
    throw new Error(response.message);
  }
  return response?.data;
};

const OrderPage = async () => {
  const orders = await getMyOrders();
  console.log(orders);

  return (
    <div>
      <HomeSectionTop heading="My Orders History" description="" />
      <div className="mt-6 grid gap-6">{orders?.map((_order, i) => <OrderCard key={i} />)}</div>
    </div>
  );
};

export default OrderPage;
