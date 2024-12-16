"use client";
import { Select, SelectProps } from "antd";
import Form from "antd/es/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

const sortByOptions = [
  { label: "Latest", id: 3, sortBy: "createdAt", sortOrder: "desc" },
  { label: "Oldest", id: 4, sortBy: "createdAt", sortOrder: "asc" },
  { label: "Low to High Price", id: 5, sortBy: "price", sortOrder: "asc" },
  { label: "High To Low Price", id: 6, sortBy: "price", sortOrder: "desc" },
];

const SelectSortBy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const currentSortByOption = useMemo(() => {
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");
    return (
      sortByOptions?.find((option) => option.sortBy === sortBy && option.sortOrder === sortOrder) || sortByOptions[0]
    );
  }, [searchParams]);

  const updateUrlParams = useCallback((option: (typeof sortByOptions)[0]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sortBy", option.sortBy);
    newParams.set("sortOrder", option.sortOrder);
    router.push(`/search?${newParams}`);
  }, []);

  const onSelectOption: SelectProps["onChange"] = useCallback(
    (value: number) => {
      const selectedOption = sortByOptions?.find((option) => option.id === value);
      if (selectedOption) {
        updateUrlParams(selectedOption);
      }
    },
    [searchParams, router]
  );

  useEffect(() => {
    if (!searchParams.get("sortBy") || !searchParams.get("sortOrder")) {
      updateUrlParams(sortByOptions[0] as (typeof sortByOptions)[0]);
    }
  }, [searchParams, updateUrlParams]);

  return (
    <Form form={form} initialValues={{ sort: currentSortByOption?.id }}>
      <Form.Item name="sort" label="Sort By">
        <Select onChange={onSelectOption} className="min-w-[160px]" placeholder="Select a option">
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
