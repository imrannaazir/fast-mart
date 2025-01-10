import CategoryForm from "@/components/forms/product/category-form";
import { TCategoryFieldsValues } from "@repo/utils/types";

const AddCategory = () => {
  const defaultValues: TCategoryFieldsValues = {
    collections: [],
    title: "",
    description: "",
    image: "",
  };
  return <CategoryForm defaultValues={defaultValues} title="Create Category" />;
};

export default AddCategory;
