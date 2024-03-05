import AddOrEditProductForm from "@/components/forms/AddOrEditProductForm";
import { TProductDefaultValue } from "@/types/product.type";

const AddProductPage = () => {
  // default values
  const defaultValues = {
    name: "",
    description: "",
    brand: "",
    tags: [],
    category: "",
    connectivity: "",
    dimensions: "",
    operatingSystem: "",
    powerSource: "",
    price: "",
    quantity: "",
    unit: "",
    weight: "",
    features: {},
    featureName: "",
  };
  return (
    <section className="pb-6">
      <AddOrEditProductForm
        defaultValues={defaultValues as TProductDefaultValue}
      />
    </section>
  );
};

export default AddProductPage;
