import CollectionForm from "@/components/forms/product/collection-form";
import { useGetSingleCollectionQuery } from "@/redux/features/collection/collection.api";
import { TCollectionFieldValues } from "@repo/utils/types";
import { useParams } from "react-router-dom";

const CollectionDetailsPage = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetSingleCollectionQuery(id!, {
    skip: !id,
  });
  const collection = data?.data;
  const defaultValues: TCollectionFieldValues = {
    _id: collection?._id,
    title: collection?.title as string,
    description: collection?.description,
    icon: collection?.icon,
    image: collection?.image?._id,
  };

  return (
    <CollectionForm
      title={collection?.title as string}
      defaultValues={defaultValues}
      imgUrl={collection?.image?.url}
      isLoading={isFetching}
    />
  );
};

export default CollectionDetailsPage;
