import ProductForm from "@/components/forms/product/product-form";
import { TProductFieldValues } from "@repo/utils/types";

const AddProductPage = () => {
  // const isDirty = form.formState.isDirty;

  // useEffect(() => {
  //   if (isDirty) {
  //     dispatch(setIsDirty(true));
  //   } else {
  //     dispatch(setIsDirty(false));
  //   }
  // }, [dispatch, isDirty]);

  const defaultValues: TProductFieldValues = {
    price: 0,
    title: "",
    brand: "",
    quantity: 0,
    compare_price: 0,
    description: "",
    weight: 0,
  };
  return <ProductForm title="Add product" defaultValues={defaultValues} images={[]} />;
};

export default AddProductPage;
