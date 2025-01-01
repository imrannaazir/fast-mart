import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
const AppBreadCrumbs = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/")?.filter((x) => x);
  const formattedPaths = [
    ...paths.map((name, index) => {
      const path = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        label: name.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2"),
        path,
      };
    }),
  ];

  return (
    <div className="flex items-center gap-2 lg:col-span-3">
      <SidebarTrigger className="text-background -ml-1" />
      <Separator orientation="vertical" className="mr-2 hidden h-4 lg:block" />
      <Breadcrumb className="hidden lg:block">
        <BreadcrumbList className="text-xs sm:gap-1">
          <BreadcrumbItem className="cursor-pointer">
            <Link to={"/"}>
              <BreadcrumbLink className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                Home
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          {formattedPaths.length > 0 && <BreadcrumbSeparator />}
          {formattedPaths.length > 0 &&
            formattedPaths.map(({ label, path }, i) => (
              <React.Fragment key={i}>
                <BreadcrumbItem
                  className={`${i + 1 === formattedPaths.length ? "font-medium" : "cursor-pointer font-normal"}`}
                >
                  <Link to={path}>
                    <BreadcrumbLink className="capitalize">{label}</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                {i + 1 < formattedPaths.length && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default AppBreadCrumbs;
