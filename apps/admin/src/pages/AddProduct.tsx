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

    // compare_price: undefined,
    // description: undefined,
    // media: undefined,
    // price: undefined,
    // quantity: undefined,
    // status: undefined,
    // title: '',
    // unit: undefined,
    // variants: undefined,
    // weight: undefined,
  };
  return <ProductForm title="Add product" defaultValues={defaultValues} />;
};

export default AddProductPage;
