"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { storeId } = useParams();

  // routes
  const routes = [
    {
      href: `/${storeId}`,
      label: "Dashboard",
      isActive: pathname === `/${storeId}`,
    },
    {
      href: `/${storeId}/billboards`,
      label: "Billboards",
      isActive: pathname === `/${storeId}/billboards`,
    },
    {
      href: `/${storeId}/categories`,
      label: "Categories",
      isActive: pathname === `/${storeId}/categories`,
    },
    {
      href: `/${storeId}/sizes`,
      label: "Sizes",
      isActive: pathname === `/${storeId}/sizes`,
    },
    {
      href: `/${storeId}/colors`,
      label: "Colors",
      isActive: pathname === `/${storeId}/colors`,
    },
    {
      href: `/${storeId}/settings`,
      label: "Settings",
      isActive: pathname === `/${storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.isActive
              ? "text-black dark:text-white "
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
