import AddOrEditProductForm from "@/components/forms/AddOrEditProductForm";
import { useGetProductByIdQuery } from "@/redux/features/product/productApi";
import { assignTag } from "@/redux/features/tag/tagSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TCollection, TProductDefaultValue } from "@/types/product.type";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { tags, ...restProductData } = data.data;

  // save selected tag in the redux store
  tags?.map((tag: TCollection) => {
    dispatch(assignTag(tag));
  });

  const defaultValues = {
    ...restProductData,
    tags: tags.map((tag: TCollection) => tag._id),
  };

  return (
    <section className="pb-6">
      <AddOrEditProductForm
        defaultValues={defaultValues as TProductDefaultValue}
      />
    </section>
  );
};

export default UpdateProduct;
