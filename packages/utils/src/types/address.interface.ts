export type TAddress = {
  _id?: string;
  userId?: string;
  fullAddress: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  default: boolean;
  addressType: "home" | "work";
  created?: Date;
  updated?: Date;
};
