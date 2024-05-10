import { AiOutlineHome } from "react-icons/ai";
import { TbBrandAngular, TbMessageQuestion } from "react-icons/tb";
import { ClassValue } from "clsx";
import { LuBadgeInfo } from "react-icons/lu";
import { PiTruck } from "react-icons/pi";
import NavigationLinkItem from "./NavigationLinkItem";
import DropdownNavigationLink from "./DropdownNavigationLink";
const NavigationLinks = () => {
  const iconClassName: ClassValue = "w-4 h-4";
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
      path: "/brands",
      icon: <TbBrandAngular className={iconClassName} />,
      children: [
        {
          id: 1,
          label: "Apple",
          path: "apple",
        },
        {
          id: 2,
          label: "Samsung",
          path: "samsung",
        },
        {
          id: 3,
          label: "Sony",
          path: "sony",
        },
        {
          id: 4,
          label: "Nokia",
          path: "nokia",
        },
        {
          id: 5,
          label: "Huawei",
          path: "huawei",
        },
      ],
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

  return (
    <div className="flex items-center gap-6 text-lg ">
      {navigationLinks.map((link) =>
        link.children ? (
          <DropdownNavigationLink link={link} key={link.id} />
        ) : (
          <NavigationLinkItem link={link} key={link.id} />
        )
      )}
    </div>
  );
};

export default NavigationLinks;
