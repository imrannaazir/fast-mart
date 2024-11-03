export type TAddress = {
  _id?: string;
  userId?: string;
  fullName: string;
  phoneNumber: string;
  fullAddress: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  default: boolean;
  addressType: "home" | "work";
  createdAt?: Date;
  updatedAt?: Date;
};

export type TAddressInput = Omit<TAddress, "_id" | "createdAt" | "updatedAt" | "default" | "userId">;
