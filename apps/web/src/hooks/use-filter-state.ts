import { FormProps, useForm } from "antd/es/form/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export type TFiltersAttribute = {
  priceRange?: number[];
  collections?: string[];
  categories?: string[];
  brands?: string[];
  ratings?: string[];
};

// Create a type representing the keys of TFiltersAttribute
export type FilterableField = keyof TFiltersAttribute;

export const filterableFields: FilterableField[] = ["priceRange", "collections", "categories", "brands", "ratings"];

export const useFilterState = (maxPrice: number) => {
  const roundedMaxPrice = Math.ceil(maxPrice / 10) * 10;
  const [range, setRange] = useState([0, roundedMaxPrice]);
  const [form] = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();

  //   clear filters
  const clearFilters = () => {
    form.resetFields();
    setRange([0, roundedMaxPrice]);
  };

  // handleValuesChanges
  const handleValuesChanges: FormProps["onValuesChange"] = (changedValues, values: TFiltersAttribute) => {
    setRange(values?.priceRange || [0, roundedMaxPrice]);
    const newParams = new URLSearchParams(searchParams.toString());

    filterableFields.forEach((field: keyof TFiltersAttribute) => {
      if (field === "priceRange") {
        const [minPrice, maxPrice] = values.priceRange || [];
        newParams.set("minPrice", minPrice!.toString());
        newParams.set("maxPrice", maxPrice!.toString());
      } else {
        if (values[field]?.length) {
          newParams.set(field, values[field].join(","));
        } else {
          newParams.delete(field);
        }
      }
    });
    router.push(`/search?${newParams}`, {
      scroll: false,
    });
  };

  return { range, setRange, form, clearFilters, handleValuesChanges };
};
