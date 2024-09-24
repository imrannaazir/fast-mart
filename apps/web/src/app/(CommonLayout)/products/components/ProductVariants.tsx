"use client";

import { TOption, TProductVariantOption, TVariant } from "@repo/utils/types";
import { Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";

type TProductVariantsProps = {
  variants: TProductVariantOption[];
};

const ProductVariants: FC<TProductVariantsProps> = ({ variants }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleVariantClick = (variantName: string, optionName: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(variantName, optionName);

    // Update the URL without causing a page reload
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-4">
      {variants?.map((variant) => {
        const variantName = (variant?.variantId as TVariant)?.variant_name;

        return (
          <div key={variant?._id as string}>
            <h3 className="mb-2 font-semibold">{variantName}</h3>
            <div className="flex flex-wrap gap-2">
              {variant?.options?.map((option) => {
                const optionName = (option as TOption)?.option_name;
                const isSelected = searchParams.get(variantName) === optionName;

                return (
                  <Button
                    key={option?._id as string}
                    ghost={isSelected}
                    type={isSelected ? "primary" : "default"}
                    onClick={() => handleVariantClick(variantName, optionName)}
                  >
                    {optionName}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariants;
