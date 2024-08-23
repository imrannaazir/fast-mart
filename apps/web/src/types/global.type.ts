import { ReactNode } from "react";

export type TLinkItem = {
  id: string | number;
  path: string;
  label: string;
  children?: TLinkItem[];
  icon?: ReactNode;
  image?: string;
  logo?: string;
};

export type THeroCoverProps = {
  id: number;
  photo: unknown;
  topHeader: string | null;
  offerAmount: string | null;
  subHeading: string | null;
  heading: string;
  description: string | null;
  path: string;
};

export type TAppProductCardProps = {
  compare_price: string;
  id: string;
  price: number;
  title: string;
  photo: string;
};
