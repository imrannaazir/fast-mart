import { TLinkItem } from "@/types";
import Link from "next/link";
import AppLinkButton from "../ui/AppLinkButton";
import { LiaAngleDownSolid } from "react-icons/lia";

const NavigationLinkItem = ({ link }: { link: TLinkItem }) => {
  return (
    <Link
      key={link.id}
      href={link.path}
      className="hover:text-primary group flex items-center gap-1 text-gray-700 transition-colors duration-300"
    >
      {link.icon}
      <AppLinkButton>{link.label}</AppLinkButton>
      <LiaAngleDownSolid
        className={
          !!link.children?.length ? "block transition-transform duration-300 group-hover:-rotate-180" : "hidden"
        }
        size={14}
      />
    </Link>
  );
};

export default NavigationLinkItem;
