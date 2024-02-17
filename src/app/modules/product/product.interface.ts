import { Types } from 'mongoose';

type TStatus = 'in-stock' | 'out-of-stock';

export type TFeature = Record<string, string>;
export type TProduct = {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  status: TStatus;
  model?: string;
  weight?: number;
  unit?: string;
  compatibility?: string;
  dimensions?: string;
  image?: string;
  brand: Types.ObjectId;
  category: Types.ObjectId;
  operatingSystem?: Types.ObjectId;
  powerSource?: Types.ObjectId;
  connectivity?: Types.ObjectId;
  features?: TFeature[];
  tags?: [Types.ObjectId];
};
