export type TVariant = {
  _id?: string;
  variant_name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TOption = {
  _id?: string;
  option_name: string;
  variantId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProductVariantOption = {
  _id: string;
  variantId: string | TVariant;
  options: TOption[];
};

export type TProductVariant = {
  _id: string;
  productId: string;
  productVariantOptions: string[];
};
