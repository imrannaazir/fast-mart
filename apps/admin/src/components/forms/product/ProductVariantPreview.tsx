import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllOptionsQuery, useGetAllVariantsQuery } from "@/redux/features/product/productApi";
import { createProductSchema } from "@repo/utils/zod-schemas";
import { Trash } from "lucide-react";
import queryString from "query-string";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type TProductVariantPreview = {
  form: UseFormReturn<z.infer<typeof createProductSchema>>;
  productVariant: { options: string[]; variantId: string };
};

const ProductVariantPreview: FC<TProductVariantPreview> = ({ form, productVariant }) => {
  const variantId = productVariant.variantId;
  const variantOptions = productVariant.options;

  const optionsQuery = queryString.stringify({
    _id: variantOptions,
  });

  const { data: optionsData, isFetching: isOptionsLoading } = useGetAllOptionsQuery(optionsQuery);

  const variants = form.watch("variants");

  const { data: variantData, isFetching: isVariantLoading } = useGetAllVariantsQuery({ _id: variantId });
  const handleRemoveProductVariant = () => {
    const filteredVariants = variants?.filter((variant) => variant.variantId !== variantId);

    form.setValue("variants", filteredVariants);
  };
  return (
    <div className="flex items-center space-x-4">
      {isVariantLoading ? (
        <LoadingButton className="w-[200px]" />
      ) : (
        <Button variant={"outline"} disabled className="w-[200px]">
          {variantData?.data?.[0]?.variant_name}{" "}
        </Button>
      )}
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {isOptionsLoading ? (
              <SelectItem disabled value="loading">
                Loading...
              </SelectItem>
            ) : (
              <SelectItem className="" disabled value="loading">
                {optionsData?.data?.map((option) => (
                  <SelectItem disabled value={option._id as string}>
                    {option?.option_name}
                  </SelectItem>
                ))}
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={handleRemoveProductVariant} type="reset" variant={"destructive"}>
        <Trash className="p-1" />
      </Button>
    </div>
  );
};

export default ProductVariantPreview;
