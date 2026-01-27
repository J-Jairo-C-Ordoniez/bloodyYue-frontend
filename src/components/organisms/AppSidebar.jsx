"use client"

import Link from "../atoms/Link"
import NavClouds from "@/components/molecules/NavClouds"
import NavMain from "@/components/molecules/NavMain"
import NavSecondary from "@/components/molecules/NavSecondary"
import NavUser from "@/components/molecules/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../molecules/Sidebar"

import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconHelp,
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
      title: "Brands",
      url: "settings",
      icon: IconSettings,
    },
    {
      title: "Gestión de usuarios",
      url: "users",
      icon: IconUsers,
    },
    {
      title: "Gestión de roles y permisos",
      url: "roles",
      icon: IconListDetails,
    },
    {
      title: "Gestión de etiquetas",
      url: "labels",
      icon: IconDatabase,
    },
  ],
  navClouds: [
    {
      title: "Contenido",
      icon: IconCamera,
      isActive: true,
      url: "content",
      items: [
        {
          title: "Comisiones",
          url: "commissions",
        },
        {
          title: "Posts",
          url: "posts",
        },
      ],
    },
    {
      title: "Ventas y chat",
      icon: IconReport,
      url: "sales",
      items: [
        {
          title: "Historial de ventas",
          url: "sales-history",
        },
        {
          title: "Chats activos",
          url: "chats",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Ayuda",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Buscar",
      url: "#",
      icon: IconSearch,
    },
  ],
}

export default function AppSidebar({ onSelect }) {
  return (
    <Sidebar collapsible="offcanvas" className="bg-[#0B0B0E] border-r-0">
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
