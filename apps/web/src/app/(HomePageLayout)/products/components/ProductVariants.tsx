"use client";
import { TOption, TProductVariantOption, TVariant } from "@repo/utils/types";
import { Button } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";

type TProductVariantsProps = {
  variants: TProductVariantOption[];
};

const ProductVariants: FC<TProductVariantsProps> = ({ variants }) => {
  const searchParams = useSearchParams();

  // Memoize searchParamsObj to avoid recalculating on every render
  const searchParamsObj = useMemo(() => {
    const params: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }, [searchParams]);

  const generateLink = (variantName: string, optionName: string, restQueryObj: Record<string, string>) => {
    const urlParams = new URLSearchParams({
      [variantName]: optionName,
      ...restQueryObj,
    });
    return `?${urlParams.toString()}`;
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
                // coping query object
                const restQueryObj = { ...searchParamsObj };
                // current variant
                const currentVariant = searchParamsObj[variantName];
                delete restQueryObj[variantName];

                // current option
                const optionName = (option as TOption)?.option_name;

                return (
                  <Link key={option?._id as string} href={generateLink(variantName, optionName, restQueryObj)}>
                    <Button type={currentVariant === optionName ? "primary" : "default"}>{optionName}</Button>
                  </Link>
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
