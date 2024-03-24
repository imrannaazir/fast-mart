import AddOrEditProductForm from "@/components/forms/AddOrEditProductForm";
import { setDefaultValuesEmpty } from "@/redux/features/product/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AddProductPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDefaultValuesEmpty());
  }, [dispatch]);

  return (
    <section className="pb-6">
      <AddOrEditProductForm />
    </section>
  );
};

export default AddProductPage;
