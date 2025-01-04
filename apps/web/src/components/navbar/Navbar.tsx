import { TBrand, TCollection } from "@repo/utils/types";
import { FC, Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa";
import NavCategories from "./NavCategories";
import NavigationLinks from "./NavigationLinks";
type TNavbar = { brands: TBrand[]; collections: TCollection[] };
const Navbar: FC<TNavbar> = async ({ brands, collections }) => {
  return (
    <div className="hidden items-center justify-between lg:flex">
      <div className="flex items-center gap-4">
        <NavCategories collections={collections} />
        <Suspense fallback={<div>Loading...</div>}>
          <NavigationLinks brands={brands} />
        </Suspense>
      </div>
      <div className="flex items-center gap-1">
        <FaWhatsapp size={40} className="text-primary" />
        <div>
          <h3 className="text-sm font-semibold">CALL ANYTIME</h3>
          <h2 className="text-primary text-lg font-bold">280 355 211</h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
