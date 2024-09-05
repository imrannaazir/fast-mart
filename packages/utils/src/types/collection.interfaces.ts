import { TIcon } from "./icons.interface";
import { TImage } from "./image.interface";
import { TUser } from "./user.interface";

export type TCollection = {
  _id?: string;
  title: string;
  description?: string;
  image?: TImage;
  icon?: TIcon;
  createdBy?: TUser;
  createdAt?: Date;
  updatedAt?: Date;
};
