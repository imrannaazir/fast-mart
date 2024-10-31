"use client";
import { Pagination, PaginationProps } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

type TProductPaginationProps = {
  total: number;
  defaultPageSize: number;
  defaultCurrent: number;
};

const ProductPagination: FC<TProductPaginationProps> = ({ defaultCurrent, defaultPageSize, total }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const onPaginationChange: PaginationProps["onChange"] = (page, pageSize) => {
    newParams.set("page", page.toString());
    newParams.set("limit", pageSize.toString());

    router.push(`/search?${newParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Pagination
      className="my-6"
      total={total}
      defaultPageSize={Number(searchParams.get("limit")) || defaultPageSize}
      defaultCurrent={Number(searchParams.get("limit")) || defaultCurrent}
      onChange={onPaginationChange}
    />
  );
};

export default ProductPagination;
