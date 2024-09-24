"use client";
import { Form, Select } from "antd";

const SelectSortBy = () => {
  const sortByOptions = [
    { label: "Most Popularity", id: 1, sortBy: "d", sortOrder: "asc" },
    { label: "Less Popularity", id: 2, sortBy: "", sortOrder: "desc" },
    { label: "Latest", id: 3, sortBy: "createdAt", sortOrder: "desc" },
    { label: "Oldest", id: 4, sortBy: "createdAt", sortOrder: "desc" },
    { label: "Low to High Price", id: 5, sortBy: "price", sortOrder: "desc" },
    { label: "High To Low Price", id: 6, sortBy: "price", sortOrder: "desc" },
  ];

  return (
    <Form>
      <Form.Item name="sort" label="Sort by">
        <Select className="min-w-[160px]" placeholder="Select a option" onChange={() => {}}>
          {sortByOptions.map((option) => (
            <Select.Option key={option.id} value={option.id}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SelectSortBy;
