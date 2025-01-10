import BrandForm from "@/components/forms/product/brand-form";
import { useGetSingleBrandQuery } from "@/redux/features/brand/brandApi";
import { TBrandFieldValues, TImage } from "@repo/utils/types";
import { useParams } from "react-router-dom";

const BrandDetailsPage = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetSingleBrandQuery(id!, {
    skip: !id,
  });

  const brand = data?.data;
  const defaultValues: TBrandFieldValues = {
    name: brand?.name as string,
    cover_photo: (brand?.cover_photo as TImage)?._id,
    description: brand?.description,
    logo: (brand?.logo as TImage)?._id,
    slogan: brand?.slogan,
  };
  return (
    <BrandForm
      title={brand?.name as string}
      defaultValues={defaultValues}
      coverImageUrl={(brand?.cover_photo as TImage)?.url}
      logoUrl={(brand?.logo as TImage)?.url}
      isLoading={isFetching}
    />
  );
};

export default BrandDetailsPage;
