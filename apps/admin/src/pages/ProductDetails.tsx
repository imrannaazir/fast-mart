import ProductForm from "@/components/forms/product/product-form";
import { useGetProductByIdQuery } from "@/redux/features/product/productApi";
import { TProduct, TProductFieldValues } from "@repo/utils/types";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetProductByIdQuery(id, { skip: !id });
  const product = data?.data as TProduct;

  const defaultValues: TProductFieldValues = {
    price: product?.price,
    title: product?.title,
    brand: product?.brand?._id || "",
    categories: product?.categories?.map((category) => category?._id) || [],
    collections: product?.collections?.map((collection) => collection?._id as string) || [],
    compare_price: product?.compare_price || 0,
    description: product?.description || "",
    media: product?.media?.map((img) => img?._id as string) || [],
    quantity: product?.quantity || 0,
    status: product?.status,
    tags: product?.tags?.map((tag) => tag?._id as string) || [],
    unit: product?.unit,
    // variant: product?.variants?.map((variant)=>variant),
    weight: product?.weight,
  };
  return <ProductForm title={product?.title} isLoading={isFetching} defaultValues={defaultValues} />;
};

export default ProductDetails;
