import { columns } from "@/components/dataTable/order/columns";
import { useEffect, useState } from "react";
import queryString from "query-string";
import {
  selectFilterByDate,
  selectLimit,
  selectPage,
  setMeta,
} from "@/redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetAllOrderQuery } from "@/redux/features/sell/sellApi";
import { TOrder } from "@/types/order.type";
import { OrderDataTable } from "@/components/dataTable/order/data-table";

const OrderList = () => {
  // invoke hooks

  // local state
  const [skip, setSkip] = useState(true);

  const dispatch = useAppDispatch();
  const date = useAppSelector(selectFilterByDate);
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);
  // query parameter
  const query = queryString.stringify({ date, page, limit });
  const { data, isLoading } = useGetAllOrderQuery(query, { skip });
  const orders: TOrder[] = data?.data?.result || [];

  if (data?.data?.meta) {
    dispatch(setMeta(data?.data?.meta));
  }
  // make skip  to get all product
  useEffect(() => {
    setSkip(false);
  }, [query]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {/* header */}
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Orders</h3>
      </div>

      {/* product list */}
      <div className="container mx-auto py-10">
        <OrderDataTable columns={columns} data={orders} />
      </div>
    </div>
  );
};

export default OrderList;
