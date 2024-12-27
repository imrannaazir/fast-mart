import { useGetAllOrdersQuery } from "@/redux/features/order/order-api";

const OrderListPage = () => {
  const { data, isFetching } = useGetAllOrdersQuery("");
  console.log(data, isFetching);

  return <div>OrderListPage</div>;
};

export default OrderListPage;
