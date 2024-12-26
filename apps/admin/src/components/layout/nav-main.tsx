"use client";

import { ChevronRight, Circle, CircleDot } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import paths from "@/routes/admin.routes";
import sidebarGenerator from "@/utils/sidebarGenerator";
import { Link, useLocation } from "react-router-dom";

export function NavMain() {
  const { pathname } = useLocation();
  const items = sidebarGenerator(paths)?.filter((item) => !!item?.label);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) =>
          item?.children?.length ? (
            <Link key={item?.label} to={item?.href}>
              <Collapsible asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item?.label}>
                      {item?.icon && item.icon}
                      <span>{item?.label}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item?.children?.map((subItem) => {
                        const isActive = pathname.includes(`${item?.href}/${subItem?.href}`);
                        const Icon = isActive ? CircleDot : Circle;
                        return (
                          <SidebarMenuSubItem key={subItem.label}>
                            <SidebarMenuSubButton isActive={isActive} asChild>
                              <Link to={`${item?.href}/${subItem?.href}`}>
                                <span>
                                  <Icon className="h-3 w-3" />
                                </span>

                                <span>{subItem.label}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </Link>
          ) : (
            <Link key={item?.label} to={item?.href as string}>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname.includes(item?.href as string)} tooltip={item?.label}>
                  {item?.icon && item?.icon}
                  <span>{item?.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
