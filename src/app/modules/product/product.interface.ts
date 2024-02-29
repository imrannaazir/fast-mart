import { Types } from 'mongoose';

type TStatus = 'in-stock' | 'out-of-stock';

export type TFeature = Record<string, string>;
export type TProduct = {
  name: string;
  description?: string;
  brand: Types.ObjectId;
  category: Types.ObjectId;

  price: number;
  quantity: number;
  weight?: number;
  unit?: string;

  compatibility?: string;
  dimensions?: string;
  operatingSystem?: Types.ObjectId;
  powerSource?: Types.ObjectId;
  connectivity?: Types.ObjectId;

  features?: TFeature;
  tags?: [Types.ObjectId];

  image?: string;
  status: TStatus;
  model?: string;
  createdBy?: Types.ObjectId;
};
