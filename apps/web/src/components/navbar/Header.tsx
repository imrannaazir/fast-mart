import HeaderSearch from "./HeaderSearch";
import HeaderNavbarIcons from "./HeaderNavIcons";
import AppLogo from "../ui/AppLogo";
import MobileNavMenuDrawer from "./MobileNavMenuDrawer";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-6">
      {/* mobile navigation menu drawer */}
      <MobileNavMenuDrawer />
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
