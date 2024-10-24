import { TCartItem, TCartStateItem, TProduct } from "@repo/utils/types";

export const generateCartState = (cartList: TCartItem[]): TCartStateItem[] => {
  return (
    cartList?.map((item) => {
      const product = item.product as TProduct;
      return {
        _id: item._id,
        productId: product?._id!,
        productPrice: product?.price,
        productTitle: product?.title,
        quantity: item?.quantity,
        options: item?.options,
        productImg: product?.media![0]?.url!,
      };
    }) || []
  );
};
