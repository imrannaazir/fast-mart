import { cn } from "@/lib/utils";
import paths from "@/routes/admin.routes";
import sidebarGenerator from "@/utils/sidebarGenerator";
import { Circle, Settings } from "lucide-react";
import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const routes = sidebarGenerator(paths);

  const { pathname } = useLocation();

  let sidebarNavRoute: ReactNode;
  if (routes && routes.length) {
    sidebarNavRoute = routes?.map((item, i) => {
      // if there is children of the route
      if (item?.children && item.children.length) {
        return (
          <div key={i}>
            <Accordion className="w-[235px]" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-2 py-1">
                  <p className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="">
                  {item.children.map((child, i) => (
                    <NavLink
                      className={cn(
                        "flex items-center rounded-md py-2 pl-6 font-semibold",
                        pathname?.includes(`${item?.href}/${child?.href}`) ? "bg-background" : ""
                      )}
                      to={`/${item.href}/${child?.href}`}
                      key={i}
                    >
                      <Circle className="mr-2 h-2 w-2" />
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      }
      // if there is not children of the route
      else if (!item?.children && item?.href) {
        return (
          <NavLink
            className={cn(
              "flex w-[235px] items-center gap-2 rounded-md px-2 py-2 font-semibold",
              pathname?.includes(item?.href) ? "bg-background" : ""
            )}
            to={item?.href}
            key={item?.href}
          >
            {item?.icon}
            <span>{item?.label}</span>
          </NavLink>
        );
      }
    });
  }

  return (
    <nav className={cn("custom-scrollbar h-full overflow-y-scroll", className)} {...props}>
      <div className="flex h-full w-full flex-col justify-between px-2 pb-6">
        {/* top */}
        <div className="flex-grow">{sidebarNavRoute}</div>

        {/* end */}
        <NavLink
          className={cn(
            "flex w-[235px] items-center gap-2 rounded-md px-2 py-2 font-semibold",
            pathname === "/settings" ? "bg-background" : ""
          )}
          to={"/settings"}
          key={"/settings"}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}
