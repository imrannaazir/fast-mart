import AddProductForm from "@/components/forms/AddProductForm";
import { FaArrowLeftLong } from "react-icons/fa6";

const AddProductPage = () => {
  return (
    <section>
      <h1 className="text-xl flex items-center gap-2 my-4">
        <FaArrowLeftLong size="15" />
        Add Product
      </h1>
      <AddProductForm />
    </section>
  );
};

export default AddProductPage;
