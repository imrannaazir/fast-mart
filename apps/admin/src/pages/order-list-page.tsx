import { columns } from "@/components/dataTable/order/columns";
import Page from "@/components/layout/Page";
import {
  selectLimit,
  selectOrderBy,
  selectPage,
  selectSearchTerm,
  selectSortBy,
  setMeta,
} from "@/redux/features/filter/filterSlice";

import { OrderDataTable } from "@/components/dataTable/order/data-table";
import { useGetAllOrdersQuery } from "@/redux/features/order/order-api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TOrder } from "@repo/utils/types";
import queryString from "query-string";
import { useEffect, useState } from "react";

const OrderListPage = () => {
  // invoke hooks

  const [skip, setSkip] = useState(true);

  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);
  const sort = useAppSelector(selectSortBy) || "createdAt";
  const order = useAppSelector(selectOrderBy);
  const searchTerm = useAppSelector(selectSearchTerm);

  // query parameter
  const query = queryString.stringify({
    page,
    limit,
    sort: order === "asc" ? `${sort}` : `-${sort}`,
    searchTerm,
  });

  const { data, isFetching } = useGetAllOrdersQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);
  const orders = (data?.data || []) as TOrder[];

  return (
    <Page title="Orders">
      <div className="mx-auto">
        <OrderDataTable columns={columns} data={orders} isLoading={isFetching} />
      </div>
    </Page>
  );
};

export default OrderListPage;
