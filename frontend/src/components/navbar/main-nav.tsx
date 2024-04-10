import { cn } from "@/lib/utils";
import {
  BarChart2,
  Circle,
  Home,
  Images,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { IoMdPricetag } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  // routes
  const routes = [
    {
      icon: Home,
      href: `/`,
      label: "Home",
    },
    {
      icon: ShoppingBag,
      label: "Orders",
      href: "/orders",
      children: [
        {
          label: "Add",
          href: "new",
        },
        {
          label: "List",
          href: "list",
        },
      ],
    },
    {
      icon: IoMdPricetag,
      label: "Product",
      href: "products",
      children: [
        {
          href: `new`,
          label: "Add",
        },
        {
          href: `list`,
          label: "List",
        },
      ],
    },
    {
      icon: User,
      label: "Customers",
      href: "/customers",
      children: [
        {
          href: "new",
          label: "Add",
        },
        {
          href: "list",
          label: "List",
        },
      ],
    },
    {
      icon: Images,
      label: "Contents",
      href: "/contents",
      children: [
        {
          label: "Images",
          href: "images",
        },
        {
          label: "Collections",
          href: "collections",
        },
        {
          label: "Categories",
          href: "categories",
        },
        {
          label: "Brands",
          href: "brands",
        },
        {
          label: "Variants",
          href: "variants",
        },
      ],
    },
    {
      icon: BarChart2,
      label: "Analytics",
      href: "/analytics",
    },
  ];

  const { pathname } = useLocation();

  return (
    <nav
      className={cn(" h-full overflow-y-scroll custom-scrollbar   ", className)}
      {...props}
    >
      <div className="h-full w-full flex flex-col justify-between px-2 pt-10 pb-6">
        {/* top */}
        <div className="flex-grow ">
          {routes.length > 0 &&
            routes?.map((item, i) =>
              item.children ? (
                <div key={i}>
                  <Accordion className="w-[235px]" type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="  py-1 px-2">
                        <p className="flex items-center gap-2 ">
                          {<item.icon className="mr-2 h-4 w-4" />}
                          {item.label}
                        </p>
                      </AccordionTrigger>
                      <AccordionContent className="">
                        {item.children.map((item, i) => (
                          <Link
                            className={cn(
                              "flex items-center font-semibold  pl-6 py-2 rounded-md",
                              pathname === item.href ? "bg-background" : ""
                            )}
                            to={item.href}
                            key={i}
                          >
                            <Circle className="mr-2 h-2 w-2" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ) : (
                <Link
                  className={cn(
                    "flex items-center font-semibold gap-2  py-2 px-2  rounded-md w-[235px]",
                    pathname === item.href ? "bg-background" : ""
                  )}
                  to={item.href}
                  key={item.href}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            )}
        </div>

        {/* end */}
        <Link
          className={cn(
            "flex items-center font-semibold  gap-2 py-2 px-2  rounded-md w-[235px]",
            pathname === "/settings" ? "bg-background" : ""
          )}
          to={"/settings"}
          key={"/settings"}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
