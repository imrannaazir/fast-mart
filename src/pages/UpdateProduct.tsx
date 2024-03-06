import AddOrEditProductForm from "@/components/forms/AddOrEditProductForm";
import { useGetAllFeatureNamesQuery } from "@/redux/features/featureName/featureNameApi";
import { assignFeatureName } from "@/redux/features/featureName/featureNameSlice";
import { useGetProductByIdQuery } from "@/redux/features/product/productApi";
import { assignTag } from "@/redux/features/tag/tagSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TCollection, TProductDefaultValue } from "@/types/product.type";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { data: featuresNamesData } = useGetAllFeatureNamesQuery(undefined);

  const featureNames: TCollection[] = featuresNamesData?.data;

  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);

  useEffect(() => {
    if (!isLoading && data && featureNames) {
      const { tags, features } = data.data;

      // Save selected feature names in the redux store
      const dbSavedFeatureNames = Object.keys(features);

      const selectedFeatureNames = featureNames.map((featureName) => {
        if (dbSavedFeatureNames.includes(featureName.name)) {
          return featureName;
        }
      });
      console.log(selectedFeatureNames);

      selectedFeatureNames.forEach((featureName) => {
        if (featureName) {
          dispatch(assignFeatureName(featureName));
        }
      });

      // Save selected tags in the redux store
      tags?.forEach((tag: TCollection) => {
        dispatch(assignTag(tag));
      });
    }
  }, [data, isLoading, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { tags, features, ...restProductData } = data.data;
  const defaultValues = {
    ...restProductData,
    tags: tags.map((tag: TCollection) => tag._id),
    features,
  };

  return (
    <section className="pb-6">
      <AddOrEditProductForm
        defaultValues={defaultValues as TProductDefaultValue}
      />
    </section>
  );
};

export default UpdateProduct;
