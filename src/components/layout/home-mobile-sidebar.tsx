"use client";

import Link from "next/link";
import { headerItems } from "@/constants/text-constants";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function HomeMobileSidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="md:hidden">
      <SidebarHeader className="p-4">
        <p className="text-base font-bold text-accent">Menu</p>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {headerItems?.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url} className="text-accent font-semibold">
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
