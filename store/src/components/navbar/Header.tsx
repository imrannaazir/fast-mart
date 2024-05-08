import Link from "next/link";
import HeaderSearch from "./HeaderSearch";
import HeaderNavbarIcons from "./HeaderNavIcons";

const Header = () => {
  return (
    <div className="flex justify-between items-center py-6">
      {/* logo */}
      <Link className="text-4xl font-bold" href={"/"}>
        <span className="text-primary">Fast</span>
        <span className="text-foreground/85">mart</span>
        <span className="text-primary">.</span>
      </Link>

      {/* search input */}
      <HeaderSearch />

      {/* navigation icons */}
      <HeaderNavbarIcons />
    </div>
  );
};

export default Header;
