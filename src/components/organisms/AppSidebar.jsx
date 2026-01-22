"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavClouds } from "@/components/molecules/NavClouds"
import { NavMain } from "@/components/molecules/NavMain"
import { NavSecondary } from "@/components/molecules/NavSecondary"
import { NavUser } from "@/components/molecules/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin User",
    email: "admin@bloodyyue.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "metrics",
      icon: IconDashboard,
    },
    {
      title: "Settings",
      url: "settings",
      icon: IconSettings,
    },
    {
      title: "User Management",
      url: "users",
      icon: IconUsers,
    },
    {
      title: "Roles & Permits",
      url: "roles",
      icon: IconListDetails,
    },
    {
      title: "Labels",
      url: "labels",
      icon: IconDatabase,
    },
  ],
  navClouds: [
    {
      title: "Content",
      icon: IconCamera,
      isActive: true,
      url: "content",
      items: [
        {
          title: "Commissions",
          url: "commissions",
        },
        {
          title: "Posts",
          url: "posts",
        },
      ],
    },
    {
      title: "Sales & Chat",
      icon: IconReport,
      url: "sales",
      items: [
        {
          title: "Sales History",
          url: "sales-history",
        },
        {
          title: "Active Chats",
          url: "chats",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({
  onSelect,
  ...props
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onSelect={onSelect} />
        <NavClouds items={data.navClouds} onSelect={onSelect} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
