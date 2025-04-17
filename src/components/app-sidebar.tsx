"use client"

import * as React from "react"
import {
  AlertCircle,
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
import { User } from "@/services/auth/get-user"
import { IResponse } from "@/services/utils"

const data = {
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
      title: "Data Master Jabatan",
      url: "/admin/jabatan",
      icon: Bot,
      role: "Admin"
    },
    {
      title: "Data Master Penitip",
      url: "/cs/penitip",
      icon: User2,
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

type AppSidebarProps = {
  user: IResponse<User>;
} & React.ComponentProps<typeof Sidebar>

type UserProfile = {
  name: string | undefined
  email: string | undefined
  avatar: string
}
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const userProfile: UserProfile = {
    email: user.data?.email,
    name: user.data?.nama,
    avatar: "/avatars/shadcn.jpg",
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel>Data Master {user?.data?.role}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {data.navMain
              .filter((value) => value.role === user?.data?.role)
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
        <NavUser user={userProfile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
