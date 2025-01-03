import { columns } from "@/components/dataTable/user/columns";
import { UserDataTable } from "@/components/dataTable/user/data-table";
import Page from "@/components/layout/Page";
import {
  selectLimit,
  selectOrderBy,
  selectPage,
  selectSearchTerm,
  selectSortBy,
  setMeta,
} from "@/redux/features/filter/filterSlice";

import { useGetAllUsersQuery } from "@/redux/features/user/user-api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import queryString from "query-string";
import { useEffect, useState } from "react";

const CustomerListPage = () => {
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

  const { data, isFetching } = useGetAllUsersQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);
  const users = data?.data || [];

  return (
    <Page title="Customer">
      <div className="mx-auto">
        <UserDataTable columns={columns} data={users} isLoading={isFetching} />
      </div>
    </Page>
  );
};

export default CustomerListPage;
