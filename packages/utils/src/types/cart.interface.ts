export type TCartItem = {
  _id: string;
  userId: string;
  productId: string;
  options?: string[];
  quantity: number;
  type: CartActionType;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CartActionType = "add" | "remove";

export type TCartItemInput = Omit<TCartItem, "_id" | "updatedAt" | "createdAt" | "quantity">;
