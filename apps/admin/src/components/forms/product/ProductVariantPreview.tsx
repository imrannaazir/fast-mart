import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { Skeleton } from "@/components/ui/skeleton";
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
        <Button variant={"outline"} className="w-[200px] disabled:opacity-100" disabled>
          {variantData?.data?.find((item) => item?._id === productVariant.variantId)?.variant_name}
        </Button>
      )}
      <Button variant={"outline"} className="flex-grow justify-start overflow-hidden disabled:opacity-100" disabled>
        {isOptionsLoading ? (
          <div className="flex gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
          </div>
        ) : (
          optionsData?.data?.map((option) => (
            <Badge key={option?._id} variant={"secondary"} className="rounded-sm px-1 font-normal">
              {option?.option_name}
            </Badge>
          ))
        )}
      </Button>

      <Button size={"icon"} onClick={handleRemoveProductVariant} type="reset" variant={"destructive"}>
        <Trash className="" />
      </Button>
    </div>
  );
};

export default ProductVariantPreview;
