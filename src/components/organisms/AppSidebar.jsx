"use client"

import Link from "../atoms/Link"
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
} from "../ui/sidebar"

import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

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

export default function AppSidebar({ onSelect }) {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="/profile/dashboard">
                <span className="text-base font-semibold">BloodyYue</span>
              </Link>
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
