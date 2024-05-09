import { FaWhatsapp } from "react-icons/fa";
import NavCategories from "./NavCategories";
import NavigationLinks from "./NavigationLinks";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Categories */}
        <NavCategories />
        {/* nav links */}
        <NavigationLinks />
      </div>
      {/* cta  */}
      <div className="flex items-center gap-1">
        <FaWhatsapp size={40} className="text-primary" />
        <div>
          <h3 className="text-sm font-semibold">CALL ANYTIME</h3>
          <h2 className="text-primary font-bold text-lg">280 355 211</h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
