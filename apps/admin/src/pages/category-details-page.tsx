import CategoryForm from "@/components/forms/product/category-form";
import { useGetSingleCategoryQuery } from "@/redux/features/category/categoryApi";
import { TCategoryFieldsValues } from "@repo/utils/types";
import { useParams } from "react-router-dom";

const CategoryDetailsPage = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetSingleCategoryQuery(id!, {
    skip: !id,
  });
  const category = data?.data;
  const defaultValues: TCategoryFieldsValues = {
    title: category?.title as string,
    collections: category?.collections as string[],
    description: category?.description,
    image: category?.image?._id,
  };
  return <CategoryForm isLoading={isFetching} defaultValues={defaultValues} imgUrl={category?.image?.url} />;
};

export default CategoryDetailsPage;
