import {
  useGetAllOptionsQuery,
  useGetAllVariantsQuery,
} from "@/redux/features/product/productApi";
import { FC, useEffect, useState } from "react";

import SelectTagOption from "../ui/select-tag-option";
import { UseFormReturn } from "react-hook-form";
import { TProductFormValues } from "@/schemas/product.schema";

type TAddVariantProps = {
  form: UseFormReturn<TProductFormValues>;
};

const AddVariant: FC<TAddVariantProps> = ({ form }) => {
  const [skip, setSkip] = useState(true);
  const variantId = form.watch("variant.variant._id");
  const optionsValue = form.watch("variant.options");
  const { data: variantsData } = useGetAllVariantsQuery(undefined);
  const { data: optionsData } = useGetAllOptionsQuery(variantId, { skip });
  const variants =
    variantsData?.data?.map((variant) => ({
      label: variant.variant_name,
      value: variant._id,
    })) || [];
  const options =
    optionsData?.data?.map((option) => ({
      label: option.option_name,
      value: option._id,
    })) || [];

  const handleSetValue = (value: string | string[]) => {
    if (typeof value === "string") {
      form.setValue("variant.variant._id", value);
    } else {
      form.setValue("variant.options", value);
    }
  };

  useEffect(() => {
    if (variantId) {
      setSkip(false);
    }
  }, [variantId]);

  return (
    <div className="flex space-x-4">
      <SelectTagOption
        isDisable={optionsValue.length > 0}
        label="Variant"
        value={variantId || ""}
        options={variants}
        setValue={handleSetValue}
        type="single"
      />
      <SelectTagOption
        label="Options"
        isDisable={!variantId}
        value={optionsValue || []}
        options={options}
        setValue={handleSetValue}
        type="multi"
      />
    </div>
  );
};

export default AddVariant;
