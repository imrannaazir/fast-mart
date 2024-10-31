import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

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
    width: 300,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
];

const fixedData: FixedDataType[] = [];
for (let i = 0; i < 10; i += 1) {
  fixedData.push({
    key: i,
    name: ["Light", "Bamboo", "Little"][i % 3] as string,
    description: "Everything that has a beginning, has an end.",
  });
}

const ProductAdditionalInformation: React.FC = () => (
  <Table columns={fixedColumns} dataSource={fixedData} pagination={false} bordered />
);

export default ProductAdditionalInformation;
