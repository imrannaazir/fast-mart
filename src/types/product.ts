export type TCollection = {
  _id: string;
  name: string;
};
export type TFeature = Record<string, string>;
export type TStatus = "in-stock" | "out-of-stock";
export type TProduct = {
  name: string;
  description?: string;
  brand: TCollection;
  category: TCollection;

  price: number;
  quantity: number;
  weight?: number;
  unit?: string;

  compatibility?: string;
  dimensions?: string;
  operatingSystem?: TCollection;
  powerSource?: TCollection;
  connectivity?: TCollection;

  features?: TFeature[];
  tags?: [TCollection];

  image?: string;
  status: TStatus;
  model?: string;
  createdBy?: TCollection;
};
