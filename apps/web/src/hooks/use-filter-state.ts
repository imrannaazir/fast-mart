import { FormProps, useForm } from "antd/es/form/Form";
import { useRouter, useSearchParams } from "next/navigation";

export type TFiltersAttribute = {
  priceRange: number[];
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
  const [form] = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();

  //   clear filters
  const clearFilters = () => {
    form.resetFields();
  };

  // handleValuesChanges
  const handleValuesChanges: FormProps["onValuesChange"] = (_changedValues, values: TFiltersAttribute) => {
    const newParams = new URLSearchParams(searchParams.toString());

    filterableFields.forEach((field: keyof TFiltersAttribute) => {
      if (field === "priceRange" && values["priceRange"]?.length) {
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

  return { form, clearFilters, handleValuesChanges, roundedMaxPrice };
};
