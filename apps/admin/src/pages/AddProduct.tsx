import ProductForm from "@/components/forms/product/product-form";

const AddProductPage = () => {
  // const isDirty = form.formState.isDirty;

  // useEffect(() => {
  //   if (isDirty) {
  //     dispatch(setIsDirty(true));
  //   } else {
  //     dispatch(setIsDirty(false));
  //   }
  // }, [dispatch, isDirty]);

  return <ProductForm title="Add product" images={[]} />;
};

export default AddProductPage;
