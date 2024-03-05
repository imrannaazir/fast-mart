export type TCollection = {
  _id: string;
  name: string;
};
export type TFeature = Record<string, string>;
export type TStatus = "in-stock" | "out-of-stock";
export type TProduct = {
  _id: string;
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

export type TProductDefaultValue = {
  name?: string;
  description?: string;
  brand?: string;
  tags?: [];
  category?: string;
  connectivity?: string;
  dimensions?: string;
  operatingSystem?: string;
  powerSource?: string;
  price?: string;
  quantity?: string;
  unit?: string;
  weight?: string;
  features?: object;
  featureName?: string;
};
