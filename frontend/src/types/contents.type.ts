export type TImage = {
  _id?: string;
  file_name: string;
  url: string;
  size: number;
  format: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TIcon = {
  _id: string;
  name: string;
  __v: number;
};

export type TCollection = {
  title: string;
  description?: string;
  icon?: TIcon;
  image?: TImage;
  noOfProducts?: number;
  _id: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TCategory = {
  _id: string;
  title: string;
  description?: string;
  image?: TImage;
  collection: TCollection;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
