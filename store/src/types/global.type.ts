import { ReactNode } from "react";

export type TLinkItem = {
  id: number;
  path: string;
  icon?: ReactNode;
  label: string;
  children?: TLinkItem[];
  image?: string;
  logo?: string;
};
