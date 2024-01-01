"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Home, Settings, Tags } from "lucide-react";
import { IoMdPricetag } from "react-icons/io";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { storeId } = useParams();

  // routes
  const routes = [
    {
      icon: Home,
      href: `/${storeId}`,
      label: "Dashboard",
      isActive: pathname === `/${storeId}`,
    },
    {
      icon: BsImage,
      href: `/${storeId}/billboards`,
      label: "Billboards",
      isActive: pathname === `/${storeId}/billboards`,
    },
    {
      icon: Tags,
      href: `/${storeId}/categories`,
      label: "Categories",
      isActive: pathname === `/${storeId}/categories`,
    },
    {
      icon: Home,
      href: `/${storeId}/sizes`,
      label: "Sizes",
      isActive: pathname === `/${storeId}/sizes`,
    },
    {
      icon: Home,
      href: `/${storeId}/colors`,
      label: "Colors",
      isActive: pathname === `/${storeId}/colors`,
    },
    {
      icon: IoMdPricetag,
      href: `/${storeId}/products`,
      label: "Products",
      isActive: pathname === `/${storeId}/products`,
    },
    {
      icon: BiSolidShoppingBagAlt,
      href: `/${storeId}/orders`,
      label: "Orders",
      isActive: pathname === `/${storeId}/orders`,
    },
    /*   {
      icon: Home,
      href: `/${storeId}/settings`,
      label: "Settings",
      isActive: pathname === `/${storeId}/settings`,
    }, */
  ];

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log(pathname === `/${storeId}/settings`);

  return (
    <nav className={cn(" h-full", className)}>
      <div className="h-full w-full flex flex-col justify-between px-4 py-6">
        {/* top */}
        <div className="flex-grow ">
          {/* <MainNav data={categories}/> */}

          <Command className="bg-transparent">
            <CommandList>
              {routes.length > 1 &&
                routes?.map((item) => (
                  <Link href={item.href} key={item.href}>
                    <CommandItem
                      className={cn(
                        "cursor-pointer",
                        `${item.isActive ? "bg-blue-500" : "bg-transparent"}`
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </CommandItem>
                  </Link>
                ))}
            </CommandList>
          </Command>
        </div>

        {/* bottom */}
        <div className="">
          {/* <MainNav data={categories}/> */}

          <Command className="bg-blue-500">
            <Link href={`/${storeId}/settings`} className="bg-yellow-100">
              <CommandItem
                className={cn(
                  "cursor-pointer",
                  `${
                    pathname === `/${storeId}/settings`
                      ? "bg-blue-500"
                      : "bg-red-500"
                  }`
                )}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </CommandItem>
            </Link>
          </Command>
        </div>
      </div>
    </nav>
  );
}
