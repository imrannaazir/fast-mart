import AddOrEditProductForm from "@/components/forms/AddOrEditProductForm";
import { useGetAllFeatureNamesQuery } from "@/redux/features/featureName/featureNameApi";
import { assignFeatureName } from "@/redux/features/featureName/featureNameSlice";
import { useGetProductByIdQuery } from "@/redux/features/product/productApi";
import { setDefaultValues } from "@/redux/features/product/productSlice";
import { assignTag } from "@/redux/features/tag/tagSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TCollection } from "@/types/product.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { data: featuresNamesData } = useGetAllFeatureNamesQuery(undefined);

  const featureNames: TCollection[] = featuresNamesData?.data;

  const dispatch = useAppDispatch();

  const { id: initialId } = useParams();
  const [id, setId] = useState(initialId);

  const { data, isLoading } = useGetProductByIdQuery(id);

  useEffect(() => {
    if (!isLoading && data && featureNames) {
      const { tags, features, brand, category, ...restProductData } = data.data;

      // Save selected feature names in the redux store
      const dbSavedFeatureNames = Object.keys(features);

      const selectedFeatureNames = featureNames.map((featureName) => {
        if (dbSavedFeatureNames.includes(featureName.name)) {
          return featureName;
        }
      });

      selectedFeatureNames.forEach((featureName) => {
        if (featureName) {
          dispatch(assignFeatureName(featureName));
        }
      });

      // Save selected tags in the redux store
      tags?.forEach((tag: TCollection) => {
        dispatch(assignTag(tag));
      });

      // Update defaultValues
      dispatch(
        setDefaultValues({
          ...restProductData,
          category: category?._id,
          brand: brand?._id,
          tags: tags.map((tag: TCollection) => tag._id),
          features,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data, isLoading, dispatch]);

  useEffect(() => {
    setId(initialId);
  }, [initialId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="pb-6">
      <AddOrEditProductForm productIdToUpdate={id} />
    </section>
  );
};

export default UpdateProduct;
