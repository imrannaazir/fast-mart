"use client";
import { Pagination, PaginationProps } from "antd";
import { FC } from "react";

type TProductPaginationProps = {
  total: number;
  defaultPageSize: number;
  defaultCurrent: number;
};

const ProductPagination: FC<TProductPaginationProps> = ({ defaultCurrent, defaultPageSize, total }) => {
  const onPaginationChange: PaginationProps["onChange"] = (page, pageSize) => {
    console.log({ page, pageSize });
  };

  return (
    <Pagination
      className="my-6"
      total={total}
      defaultPageSize={defaultPageSize}
      defaultCurrent={defaultCurrent}
      onChange={onPaginationChange}
    />
  );
};

export default ProductPagination;
