import CollectionForm from "@/components/forms/product/collection-form";
import { TCollectionFieldValues } from "@repo/utils/types";

const AddCollectionPage = () => {
  const defaultValues: TCollectionFieldValues = {
    title: "",
    description: "",
    icon: "",
    image: "",
  };
  return <CollectionForm defaultValues={defaultValues} />;
};

export default AddCollectionPage;
