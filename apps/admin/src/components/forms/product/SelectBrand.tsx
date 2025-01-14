import OptionSelector from "@/components/ui/option-selector";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandApi";
import { onOpen } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { createProductSchema } from "@repo/utils/zod-schemas";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import BrandForm from "./brand-form";

type TSelectBrandProps = {
  form: UseFormReturn<z.infer<typeof createProductSchema>>;
};

const SelectBrand: FC<TSelectBrandProps> = ({ form }) => {
  const dispatch = useAppDispatch();
  const { data: brandsData, isFetching } = useGetAllBrandsQuery(undefined);

  // handle on brand add
  const handleOnBrandAdd = () => {
    dispatch(
      onOpen({
        title: "Create brand",
        description: "Enter all required information to create new brand in your store.",
        children: <BrandForm title="Add Brand" productForm={form} isInModal={true} />,
        className: "w-full max-w-6xl mx-4",
      })
    );
  };

  //brand
  const brands =
    brandsData?.data?.map((brand) => ({
      label: brand.name,
      value: brand._id as string,
    })) || [];

  // handle set collection
  const handleSetBrand = (value: string[] | string) => {
    form.setValue("brand", value as string);
  };
  return (
    <OptionSelector
      label="Brand"
      onAdd={handleOnBrandAdd}
      options={brands}
      setValue={handleSetBrand}
      value={form.watch("brand") || ""}
      isDisable={false}
      isLoading={isFetching}
      type="single"
      width="w-full"
      className="mt-2"
    />
  );
};

export default SelectBrand;
