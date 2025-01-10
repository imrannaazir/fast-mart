import BrandForm from "@/components/forms/product/brand-form";
import { TBrandFieldValues } from "@repo/utils/types";

const AddBrand = () => {
  const defaultValues: TBrandFieldValues = {
    name: "",
    cover_photo: "",
    description: "",
    logo: "",
    slogan: "",
  };
  return <BrandForm coverImageUrl="" defaultValues={defaultValues} logoUrl="" title={"Create brand"} />;
};

export default AddBrand;
