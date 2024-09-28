export type TCartItem = {
  _id: string;
  userId: string;
  productId: string;
  variantId: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};
