import { Menu } from "antd";
import { ClassValue } from "clsx";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { LuBadgeInfo } from "react-icons/lu";
import { PiTruck } from "react-icons/pi";
import { TbBrandAngular, TbMessageQuestion } from "react-icons/tb";
import DropdownNavigationLink from "./DropdownNavigationLink";
import NavigationLinkItem from "./NavigationLinkItem";
// import { TBrand } from "@/types";
import { serverFetcher } from "@/libs/server-fetcher";
import { TBrand } from "@repo/utils/types";
import { Fragment } from "react";

export async function getBrandsData() {
  const res = await serverFetcher<TBrand[]>(`/brands`, {
    next: {
      revalidate: 3600,
    },
  });

  return res.data;
}

const NavigationLinks = async () => {
  // fetch brands data
  const data = await getBrandsData();
  const brands: TBrand[] = data || [];

  // transform into link item
  const brandListLinks = brands?.map((brand) => ({
    id: brand?._id as string,
    label: brand?.name,
    path: `/search?brands=${brand?._id}`,
    logo: brand?.logo?.url,
  }));

  // icon class name
  const iconClassName: ClassValue = "w-4 h-4";

  // navigation links
  const navigationLinks = [
    {
      id: 1,
      label: "Home",
      path: "/",
      icon: <AiOutlineHome className={iconClassName} />,
    },
    /*  {
      id: 2,
      label: "Shop",
      path: "/categories",
      icon: <HiOutlineShoppingBag className={iconClassName} />,
    }, */
    {
      id: 3,
      label: "Brands",
      path: "#",
      icon: <TbBrandAngular className={iconClassName} />,
      children: brandListLinks,
    },
    {
      id: 4,
      label: "Track Order",
      path: "/track-order",
      icon: <PiTruck />,
    },
    {
      id: 5,
      label: "About Us",
      path: "/about-us",
      icon: <LuBadgeInfo />,
    },
    {
      id: 6,
      label: "FAQ",
      path: "/faqs",
      icon: <TbMessageQuestion className={iconClassName} />,
    },
  ];

  // mobile menu link
  const mobileMenuLinks = navigationLinks.map((link) => ({
    label: <Link href={link.path}>{link.label}</Link>,
    key: link.id,
    icon: link.icon,
    children: link.children
      ? link.children.map((child) => ({
          label: <Link href={child.path}>{child.label}</Link>,
          key: child.id,
        }))
      : null,
  }));

  return (
    <Fragment>
      <div className="hidden items-center gap-6 text-lg lg:flex">
        {navigationLinks.map((link) =>
          link.children ? (
            <DropdownNavigationLink link={link} key={link.id} />
          ) : (
            <NavigationLinkItem link={link} key={link.id} />
          )
        )}
      </div>
      <Menu className="lg:hidden" style={{ width: 256 }} mode="inline" items={mobileMenuLinks} />
    </Fragment>
  );
};

export default NavigationLinks;
