import { cn } from "@/lib/utils";
import { Circle, Home, ShoppingBag } from "lucide-react";
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
      isActive: true,
    },
    {
      icon: IoMdPricetag,
      label: "Product",
      children: [
        {
          icon: Home,
          href: `/add-product`,
          label: "Add",
          isActive: true,
        },
        {
          icon: Home,
          href: `/product-list`,
          label: "List",
          isActive: true,
        },
      ],
    },
    {
      icon: ShoppingBag,
      label: "Orders",
      href: "/order-list",
    },
  ];

  const { pathname } = useLocation();

  return (
    <nav
      className={cn(
        " h-full overflow-y-scroll custom-scrollbar mt-4 ",
        className
      )}
      {...props}
    >
      <div className="h-full w-full flex flex-col justify-between px-2 py-6">
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
                          {<item.icon />}
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
                    "flex items-center font-semibold   py-2 px-2  rounded-md",
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
        <div>settings</div>
      </div>
    </nav>
  );
}
