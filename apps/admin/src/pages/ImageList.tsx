import { columns } from "@/components/dataTable/image/columns";
import { ImageDataTable } from "@/components/dataTable/image/data-table";
import Page from "@/components/layout/Page";
import {
  selectLimit,
  selectOrderBy,
  selectPage,
  selectSearchTerm,
  selectSortBy,
  setMeta,
} from "@/redux/features/filter/filterSlice";
import { useGetAllImagesQuery } from "@/redux/features/image/image.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TImage } from "@repo/utils/types";
import queryString from "query-string";
import { useEffect, useState } from "react";

const ImageListPage = () => {
  const [skip, setSkip] = useState(true);

  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);
  const sortBy = useAppSelector(selectSortBy);
  const orderBy = useAppSelector(selectOrderBy);
  const searchTerm = useAppSelector(selectSearchTerm);

  let sort = "-createdAt";
  if (sortBy) {
    sort = orderBy === "desc" ? `-${sortBy}` : sortBy;
  }
  // query parameter
  const query = queryString.stringify({ page, limit, sort, searchTerm });
  const { data, isFetching } = useGetAllImagesQuery(query, { skip });

  useEffect(() => {
    setSkip(false);
  }, [query]);

  useEffect(() => {
    dispatch(setMeta(data?.meta));
  }, [data?.meta, dispatch]);

  const images = (data?.data || []) as TImage[];
  return (
    <Page title="Images">
      <div className="mx-auto">
        <ImageDataTable columns={columns} data={images} isLoading={isFetching} />
      </div>
    </Page>
  );
};

export default ImageListPage;
