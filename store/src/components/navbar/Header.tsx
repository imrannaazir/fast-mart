import HeaderSearch from "./HeaderSearch";
import HeaderNavbarIcons from "./HeaderNavIcons";
import AppLogo from "../ui/AppLogo";

const Header = () => {
  return (
    <div className="flex justify-between items-center py-6">
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
