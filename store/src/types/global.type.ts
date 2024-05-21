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
