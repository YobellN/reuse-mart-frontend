"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Settings2,
  User2,
} from "lucide-react"


import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import Link from "next/link"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "ReUse Mart",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Data Master Pegawai",
      url: "/admin/pegawai",
      icon: User2,
      role: "Admin"
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      role: "Admin"
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      role: "CS"
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      role: "CS"
    },
  ],
}

type User = {
  nama: string;
  email: string;
  no_telp: string;
  role: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<User | null>(null);


  React.useEffect(() => {
    console.log(localStorage.getItem("user"));
    setUser(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null);
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel>Data Master Admin</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {data.navMain
              .filter((item) => !item.role || item.role === user?.role)
              .map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
