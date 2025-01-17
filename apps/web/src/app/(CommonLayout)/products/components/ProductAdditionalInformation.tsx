import { formatCurrency } from "@repo/utils/functions";
import { TProduct } from "@repo/utils/types";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import React from "react";

interface FixedDataType {
  key: React.Key;
  name: string;
  description: string;
}

const fixedColumns: TableColumnsType<FixedDataType> = [
  {
    title: "Name",
    dataIndex: "name",
    fixed: true,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
];

type TProductAdditionalInformationProps = {
  product: TProduct;
};

const ProductAdditionalInformation: React.FC<TProductAdditionalInformationProps> = ({ product }) => {
  const fixedData: FixedDataType[] = [
    {
      key: 1,
      name: "Price",
      description: formatCurrency(product?.compare_price!),
    },
    {
      key: 2,
      name: "Discounted Price",
      description: formatCurrency(product?.price!),
    },
    {
      key: 3,
      name: "Quantity",
      description: `${product?.quantity} pcs`,
    },
    {
      key: 4,
      name: "Weight",
      description: product?.weight!?.toString() || "N/A",
    },
    {
      key: 5,
      name: "Unit",
      description: product?.unit || "N/A",
    },
  ];
  return <Table columns={fixedColumns} dataSource={fixedData} pagination={false} bordered />;
};

export default ProductAdditionalInformation;
