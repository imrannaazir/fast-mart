import {
  useGetAllOptionsQuery,
  useGetAllVariantsQuery,
} from "@/redux/features/product/productApi";
import { FC, useEffect, useState } from "react";

import SelectTagOption from "../../ui/select-tag-option";
import { UseFormReturn } from "react-hook-form";
import { TProductFormValues } from "@/schemas/product.schema";
import { useAppDispatch } from "@/redux/hooks";
import { onOpen } from "@/redux/features/modal/modalSlice";
import CreateVariant from "./CreateVariant";

type TAddVariantProps = {
  form: UseFormReturn<TProductFormValues>;
};

const AddVariant: FC<TAddVariantProps> = ({ form }) => {
  const dispatch = useAppDispatch();

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

  // handle on variant add
  const handleOnVariantAdd = () => {
    dispatch(
      onOpen({
        title: "Create variant",
        description:
          "Enter a unique variant name to create new variant in your store.",
        children: <CreateVariant setValue={form.setValue} />,
      })
    );
  };
  // handle on option add
  const handleOnOptionAdd = () => {
    dispatch(
      onOpen({
        title: "Create options",
        description: "create options",
        children: "Hello world",
      })
    );
  };

  useEffect(() => {
    if (variantId) {
      setSkip(false);
    }
  }, [variantId]);

  return (
    <div className="flex space-x-4">
      <SelectTagOption
        onAdd={handleOnVariantAdd}
        isDisable={optionsValue?.length > 0}
        label="Variant"
        value={variantId || ""}
        options={variants}
        setValue={handleSetValue}
        type="single"
      />
      <SelectTagOption
        onAdd={handleOnOptionAdd}
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
