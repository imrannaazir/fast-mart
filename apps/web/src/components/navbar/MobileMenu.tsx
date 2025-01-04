import assets from "@/assets";
import { TCollection } from "@repo/utils/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BiHome } from "react-icons/bi";
import CategoryDrawer from "./CategoryDrawer";

type TMobileMenuProps = {
  collections: TCollection[];
};

const MobileMenu: FC<TMobileMenuProps> = ({ collections }) => {
  return (
    <div className="bg-primary text-background fixed bottom-0 z-50 flex w-full items-center justify-center gap-4 py-[10px] md:hidden">
      {/* home */}
      <Link href={"/"} className="flex flex-col items-center justify-center">
        <BiHome className="h-5 w-5" />
        <span>Home</span>
      </Link>
      {/* category */}
      <CategoryDrawer collections={collections} />
      {/* search */}
      <Link href={"/"} className="flex flex-col items-center justify-center">
        <Image src={assets.svg.magnifying_glass} alt="wishlist" width={20} height={20} />
        <span>Search</span>
      </Link>
      {/* wishlist */}
      <Link href={"/"} className="flex flex-col items-center justify-center">
        <Image src={assets.svg.hearth} alt="wishlist" width={20} height={20} />
        <span>My Wishlist</span>
      </Link>
      {/* cart */}
      <Link href={"/"} className="flex flex-col items-center justify-center">
        <Image src={assets.svg.bag} alt="wishlist" width={20} height={20} />
        <span>Cart</span>
      </Link>
    </div>
  );
};

export default MobileMenu;
