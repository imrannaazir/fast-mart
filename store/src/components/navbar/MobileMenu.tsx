import Link from "next/link";
import { BiHome } from "react-icons/bi";
import CategoryDrawer from "./CategoryDrawer";
import Image from "next/image";
import assets from "@/assets";

const MobileMenu = () => {
  return (
    <div className="md:hidden  fixed bottom-0 w-full  bg-primary text-background py-[10px] flex justify-center gap-4 items-center">
      {/* home */}
      <Link href={"/"} className="flex items-center justify-center flex-col">
        <BiHome className="w-5 h-5" />
        <span>Home</span>
      </Link>
      {/* category */}
      <CategoryDrawer />
      {/* search */}
      <Link href={"/"} className="flex items-center justify-center flex-col">
        <Image
          src={assets.svg.magnifying_glass}
          alt="wishlist"
          width={20}
          height={20}
        />
        <span>Search</span>
      </Link>
      {/* wishlist */}
      <Link href={"/"} className="flex items-center justify-center flex-col">
        <Image src={assets.svg.hearth} alt="wishlist" width={20} height={20} />
        <span>My Wishlist</span>
      </Link>
      {/* cart */}
      <Link href={"/"} className="flex items-center justify-center flex-col">
        <Image src={assets.svg.bag} alt="wishlist" width={20} height={20} />
        <span>Cart</span>
      </Link>
    </div>
  );
};

export default MobileMenu;
