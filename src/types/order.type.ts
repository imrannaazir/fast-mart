export type TOrder = {
  _id?: string;
  buyer_name: string;
  product: {
    _id: string;
    name: string;
  };
  quantity: number;
  totalCost: number;
  createdBy?: string;
  soldAt: string;
  createdAt?: string;
  updatedAt?: string;
};
