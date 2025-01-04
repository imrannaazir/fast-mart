import { TBrand } from "@repo/utils/types";
import AppLogo from "../ui/AppLogo";
import HeaderNavbarIcons from "./HeaderNavIcons";
import HeaderSearch from "./HeaderSearch";
import MobileNavMenuDrawer from "./MobileNavMenuDrawer";

const Header = ({ brands }: { brands: TBrand[] }) => {
  return (
    <div className="flex items-center justify-between py-6">
      {/* mobile navigation menu drawer */}
      <MobileNavMenuDrawer brands={brands} />
      {/* logo */}
      <AppLogo />
      {/* search input */}
      <HeaderSearch />
      {/* navigation icons */}
      <HeaderNavbarIcons />
    </div>
  );
};

export default Header;
