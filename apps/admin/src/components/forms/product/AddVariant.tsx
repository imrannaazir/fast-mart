import { useGetAllOptionsQuery, useGetAllVariantsQuery } from "@/redux/features/product/productApi";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import OptionSelector from "@/components/ui/option-selector";
import { cn } from "@/lib/utils";
import { onOpen } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TLabelValuePair } from "@/types";
import { createProductSchema } from "@repo/utils/zod-schemas";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import CreateOption from "./CreateOption";
import CreateVariant from "./CreateVariant";
import ProductVariantPreview from "./ProductVariantPreview";

type TAddVariantProps = {
  form: UseFormReturn<z.infer<typeof createProductSchema>>;
};

const AddVariant: FC<TAddVariantProps> = ({ form }) => {
  //  hook
  const dispatch = useAppDispatch();

  // watch form value
  const variantId = form.watch("variant.variantId");
  const optionsValue = form.watch("variant.options");
  const productVariants = form.watch("variants") || [];

  // query hook
  const { data: variantsData, isFetching: isVariantFetching } = useGetAllVariantsQuery(undefined);
  const { data: optionsData, isFetching: isOptionFetching } = useGetAllOptionsQuery(`variantId=${variantId}`, {
    skip: !variantId,
  });

  /* 
* filter variants : if already crated a variant with the variant name filter out that variant
 1. by some method checked is any entry in the selected product variant that variantId matches with the variant filter out that variant. 

*/
  const filteredVariants = variantsData?.data.filter((variant) => {
    const isAlreadySelected = productVariants.some((item) => {
      return item.variantId === variant._id;
    });
    return !isAlreadySelected;
  });

  // restructure variants
  const variants = filteredVariants?.map((variant) => ({
    label: variant.variant_name,
    value: variant._id,
  }));

  //  re structured options
  const options: TLabelValuePair[] =
    optionsData?.data?.map((option) => ({
      label: option.option_name as string,
      value: option._id as string,
    })) || [];

  // handle select
  const handleSetValue = (value: string | string[]) => {
    if (typeof value === "string") {
      form.setValue("variant.variantId", value);
    } else {
      form.setValue("variant.options", value);
    }
  };

  // handle on variant add
  const handleOnVariantAdd = () => {
    dispatch(
      onOpen({
        title: "Create variant",
        description: "Enter a unique variant name to create new variant in your store.",
        children: <CreateVariant setValue={form.setValue} />,
      })
    );
  };

  // handle on option add
  const handleOnOptionAdd = () => {
    dispatch(
      onOpen({
        title: "Create options",
        description: "Enter a unique variant name to create new variant in your store.",
        children: <CreateOption setValue={form.setValue} selectedOptions={optionsValue || []} variantId={variantId} />,
      })
    );
  };

  // handle add product variant
  const handleAddProductVariant = () => {
    const addingVariants = [...productVariants, { variantId: variantId, options: optionsValue }];
    // clear variant
    form.setValue("variants", addingVariants);
    form.setValue("variant", { options: [], variantId: "" });
  };

  return (
    <div>
      <div className={cn("mb-4 space-y-4", !productVariants.length && "hidden")}>
        {productVariants?.length &&
          productVariants?.map((variant) => (
            <ProductVariantPreview key={variant.variantId} productVariant={variant} form={form} />
          ))}
      </div>
      <div className="grid gap-4 *:w-full lg:grid-cols-2">
        {/* PREVIEW  */}

        {/* select variant name */}
        <OptionSelector
          width="w-full"
          onAdd={handleOnVariantAdd}
          isDisable={optionsValue?.length > 0}
          label="Name"
          value={variantId || ""}
          options={variants as TLabelValuePair[]}
          setValue={handleSetValue}
          type="single"
          isLoading={isVariantFetching}
        />

        {/* select variant option */}
        <OptionSelector
          width="w-full"
          onAdd={handleOnOptionAdd}
          label="Options"
          isDisable={!variantId}
          value={optionsValue || []}
          options={options}
          setValue={handleSetValue}
          type="multi"
          isLoading={isOptionFetching}
        />

        <Button type="reset" className="mt-6" disabled={!optionsValue?.length} onClick={handleAddProductVariant}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddVariant;
