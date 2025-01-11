import ProductForm from "@/components/forms/product/product-form";
import { TImageUrl } from "@/components/ui/multi-image-upload";
import { useGetProductByIdQuery } from "@/redux/features/product/productApi";
import { TProduct, TProductFieldValues, TProductVariantOption } from "@repo/utils/types";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetProductByIdQuery(id, { skip: !id });
  const product = data?.data as TProduct;
  const variants = (product?.variants as TProductVariantOption[])?.map((variant) => ({
    variantId: variant?.options[0]?.variantId,
    options: variant?.options?.map((option) => option?._id as string),
  }));
  const defaultValues: TProductFieldValues = {
    _id: product?._id,
    price: product?.price,
    title: product?.title,
    brand: product?.brand?._id || undefined,
    categories: product?.categories?.map((category) => category?._id) || [],
    collections: product?.collections?.map((collection) => collection?._id as string) || [],
    compare_price: product?.compare_price || 0,
    description: product?.description || "",
    media: product?.media?.map((img) => img?._id as string) || [],
    quantity: product?.quantity || 0,
    status: product?.status,
    tags: product?.tags?.map((tag) => tag?._id as string) || [],
    unit: product?.unit,
    weight: product?.weight,
    variants,
  };

  const images: TImageUrl[] =
    product?.media?.map((img) => ({
      _id: img?._id as string,
      url: img?.url,
    })) || [];

  return <ProductForm images={images} title={product?.title} isLoading={isFetching} defaultValues={defaultValues} />;
};

export default ProductDetails;
