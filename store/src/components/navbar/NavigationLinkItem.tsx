import { TLinkItem } from "@/types";
import Link from "next/link";
import AppLinkButton from "../ui/AppLinkButton";
import { LiaAngleDownSolid } from "react-icons/lia";

const NavigationLinkItem = ({ link }: { link: TLinkItem }) => {
  return (
    <Link
      key={link.id}
      href={link.path}
      className="group flex items-center gap-1 text-gray-700 hover:text-primary transition-colors duration-300"
    >
      {link.icon}
      <AppLinkButton>{link.label}</AppLinkButton>
      <LiaAngleDownSolid
        className={
          !!link.children?.length
            ? "block group-hover:-rotate-180 transition-transform duration-300"
            : "hidden"
        }
        size={14}
      />
    </Link>
  );
};

export default NavigationLinkItem;
