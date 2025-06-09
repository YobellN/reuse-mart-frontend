"use client"

import * as React from "react"
import {
  BookOpen,
  Calendar,
  DollarSign,
  GalleryVerticalEnd,
  HandHelping,
  Home,
  Package,
  TimerReset,
  ToyBrick,
  Truck,
  User2,
  Archive,
  Check,
  HistoryIcon,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
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
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import Link from "next/link";
import { IResponse, User } from "@/services/utils";
import {
  IconArchive,
  IconCalendarStats,
  IconClipboardList,
  IconGift,
  IconInbox,
  IconMoneybag,
  IconReceipt,
  IconTag,
  IconTrash,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const data = {
  teams: [
    {
      name: "ReUse Mart",
      logo: GalleryVerticalEnd,
      plan: "E-Commerce",
    },
  ],
  navMain: [
    {
      title: "Data Master Pegawai",
      url: "/admin/pegawai",
      icon: User2,
      role: "Admin",
    },
    {
      title: "Data Master Jabatan",
      url: "/admin/jabatan",
      icon: User2,
      role: "Admin",
    },
    {
      title: "Data Master Organisasi",
      url: "/admin/organisasi",
      icon: Home,
      role: "Admin",
    },
    {
      title: "Data Master Merchandise",
      url: "/admin/merchandise",
      icon: BookOpen,
      role: "Admin",
    },
    {
      title: "Cek Top Seller",
      url: "/admin/top-seller",
      icon: ToyBrick,
      role: "Admin",
    },
    {
      title: "Data Master Penitip",
      url: "/cs/penitip",
      icon: User2,
      role: "CS",
    },
    {
      title: "Daftar Pembayaran",
      url: "/cs/pembayaran",
      icon: DollarSign,
      role: "CS",
    },
    {
      title: "Riwayat Pembayaran",
      url: "/cs/riwayat-pembayaran",
      icon: HistoryIcon,
      role: "CS",
    },
    {
      title: "Daftar Produk",
      url: "/cs/produk",
      icon: BookOpen,
      role: "CS",
    },
    {
      title: "History Transaksi Merchandise",
      url: "/cs/riwayat-transaksi-merchandise",
      icon: ToyBrick,
      role: "CS",
    },
    {
      title: "Daftar Klaim Merchandise",
      url: "/cs/transaksi-merchandise",
      icon: ToyBrick,
      role: "CS",
    },
    {
      title: "Request Donasi",
      url: "/organisasi/request-donasi",
      icon: IconMoneybag,
      role: "Organisasi",
    },
    {
      title: "Data Produk Titipan",
      url: "/penitip/data-barang-titipan",
      icon: ToyBrick,
      role: "Penitip",
    },
    {
      title: "Data Barang Terjual",
      url: "/penitip/data-barang-terjual",
      icon: ToyBrick,
      role: "Penitip",
    },
    {
      title: "Perpanjang Produk Titipan",
      url: "/penitip/perpanjang",
      icon: TimerReset,
      role: "Penitip",
    },
    {
      title: "Pengambilan Produk Titipan",
      url: "/penitip/pengambilan",
      icon: HandHelping,
      role: "Penitip",
    },
    {
      title: "Riwayat Pengambilan Produk Titipan",
      url: "/penitip/riwayat-pengambilan",
      icon: Calendar,
      role: "Penitip",
    },
    {
      title: "Produk Titipan",
      url: "/gudang/produk-titipan",
      icon: Package,
      role: "Gudang",
    },
    {
      title: "Transaksi Penitipan",
      url: "/gudang/transaksi-penitipan",
      icon: Archive,
      role: "Gudang",
    },
    {
      title: "Konfirmasi Pengambilan Produk",
      url: "/gudang/pengambilan-produk-titipan",
      icon: Check,
      role: "Gudang",
    },
    {
      title: "Penjadwalan Pengiriman Transaksi",
      url: "/gudang/pengiriman",
      icon: Truck,
      role: "Gudang",
    },
    {
      title: "Riwayat Pengiriman Transaksi",
      url: "/gudang/riwayat-pengiriman",
      icon: IconReceipt,
      role: "Gudang",
    },
    {
      title: "Penjadwalan Pengambilan Transaksi",
      url: "/gudang/pengambilan",
      icon: Truck,
      role: "Gudang",
    },
    {
      title: "Konfirmasi Pengambilan Transaksi",
      url: "/gudang/pengambilan-transaksi",
      icon: Check,
      role: "Gudang",
    },
    {
      title: "Riwayat Pengambilan Transaksi",
      url: "/gudang/riwayat-pengambilan",
      icon: IconReceipt,
      role: "Gudang",
    },
    {
      title: "Daftar Request Donasi",
      url: "/owner/request-donasi",
      icon: IconInbox,
      role: "Owner",
    },
    {
      title: "Barang Siap Donasi",
      url: "/owner/data-barang-donasi",
      icon: IconGift,
      role: "Owner",
    },
    {
      title: "Riwayat Donasi",
      url: "/owner/riwayat-donasi",
      icon: IconReceipt,
      role: "Owner",
    },
    {
      title: "Laporan Donasi Barang",
      url: "/owner/laporan-donasi-barang",
      icon: IconGift,
      role: "Owner",
    },
    {
      title: "Laporan Penjualan Bulanan",
      url: "/owner/laporan-penjualan-bulanan",
      icon: IconCalendarStats,
      role: "Owner",
    },
    {
      title: "Laporan Komisi Per Produk",
      url: "/owner/laporan-komisi-per-produk",
      icon: IconReceipt,
      role: "Owner",
    },
    {
      title: "Laporan Stok Gudang",
      url: "/owner/laporan-stok-gudang",
      icon: IconArchive,
      role: "Owner",
    },
    {
      title: "Laporan Penjualan Per Kategori",
      url: "/owner/laporan-penjualan-per-kategori",
      icon: IconTag,
      role: "Owner",
    },
    {
      title: "Laporan Barang Hangus",
      url: "/owner/laporan-barang-hangus",
      icon: IconTrash,
      role: "Owner",
    },
    {
      title: "Laporan Request Donasi",
      url: "/owner/laporan-request-donasi",
      icon: IconInbox,
      role: "Owner",
    },
    {
      title: "Laporan Transaksi Penitip",
      url: "/owner/laporan-transaksi-penitip",
      icon: IconClipboardList,
      role: "Owner",
    },
  ],
};

type AppSidebarProps = {
  user: IResponse<User>;
} & React.ComponentProps<typeof Sidebar>;

type UserProfile = {
  name: string | undefined;
  email: string | undefined;
  avatar: string;
  role: string | undefined;
};
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();

  const userProfile: UserProfile = {
    email: user.data?.email,
    name: user.data?.nama,
    avatar: "/avatars/shadcn.jpg",
    role: user.data?.role,
  };

  function getBaseRouteByRole(role: string | undefined): string {
    switch (role) {
      case "Admin":
        return "/admin";
      case "CS":
        return "/cs";
      case "Gudang":
        return "/gudang";
      case "Penitip":
        return "/penitip";
      case "Organisasi":
        return "/organisasi";
      case "Owner":
        return "/owner";
      default:
        return "/";
    }
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={data.teams}
          link={getBaseRouteByRole(user?.data?.role)}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupLabel>Data Master {user?.data?.role}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {user?.data?.role === "Owner" ? (
              <>
                <SidebarGroupLabel>Donasi Barang</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.navMain
                      .filter((item) =>
                        [
                          "Daftar Request Donasi",
                          "Barang Siap Donasi",
                          "Riwayat Donasi",
                        ].includes(item.title)
                      )
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={item.url}
                              className={
                                pathname === item.url
                                  ? "text-green-600 font-semibold"
                                  : "text-muted-foreground"
                              }
                            >
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>

                <hr className="my-3 border-t border-stone-400 w-9/10 mx-auto" />

                <SidebarGroupLabel>Laporan</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.navMain
                      .filter((item) =>
                        [
                          "Laporan Penjualan Bulanan",
                          "Laporan Komisi Per Produk",
                          "Laporan Penjualan Per Kategori",
                          "Laporan Donasi Barang",
                          "Laporan Barang Hangus",
                          "Laporan Request Donasi",
                          "Laporan Transaksi Penitip",
                          "Laporan Stok Gudang",
                        ].includes(item.title)
                      )
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={item.url}
                              className={
                                pathname === item.url
                                  ? "text-green-600 font-semibold"
                                  : "text-muted-foreground"
                              }
                            >
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </>
            ) : user?.data?.role === "Gudang" ? (
              <>
                <SidebarGroupLabel className="font-bold">
                  Transaksi Penitipan Barang
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.navMain
                      .filter((item) =>
                        ["Produk Titipan", "Transaksi Penitipan"].includes(
                          item.title
                        )
                      )
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={item.url}
                              className={
                                pathname === item.url
                                  ? "text-green-600 font-semibold"
                                  : "text-muted-foreground"
                              }
                            >
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>

                <hr className="my-2 border-t border-black/10 w-9/10 mx-auto" />

                <SidebarGroupLabel className="font-bold">
                  Pengambilan Produk Titipan
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.navMain
                      .filter((item) =>
                        ["Konfirmasi Pengambilan Produk"].includes(item.title)
                      )
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={item.url}
                              className={
                                pathname === item.url
                                  ? "text-green-600 font-semibold"
                                  : "text-muted-foreground"
                              }
                            >
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>

                <hr className="my-2 border-t border-black/10 w-9/10 mx-auto" />

                <SidebarGroupLabel className="font-bold">
                  Penjadwalan Pengiriman Produk
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.navMain
                      .filter((item) =>
                        [
                          "Penjadwalan Pengiriman Transaksi",
                          "Riwayat Pengiriman Transaksi",
                        ].includes(item.title)
                      )
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={item.url}
                              className={
                                pathname === item.url
                                  ? "text-green-600 font-semibold"
                                  : "text-muted-foreground"
                              }
                            >
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>

                <hr className="my-2 border-t border-black/10 w-9/10 mx-auto" />

                <SidebarGroupLabel className="font-bold">
                  Penjadwalan Pengambilan Produk
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.navMain
                      .filter((item) =>
                        [
                          "Penjadwalan Pengambilan Transaksi",
                          "Konfirmasi Pengambilan Transaksi",
                          "Riwayat Pengambilan Transaksi",
                        ].includes(item.title)
                      )
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={item.url}
                              className={
                                pathname === item.url
                                  ? "text-green-600 font-semibold"
                                  : "text-muted-foreground"
                              }
                            >
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </>
            ) : (
              // default untuk selain owner
              <>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.navMain
                      .filter((value) => value.role === user?.data?.role)
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={item.url}
                              className={
                                pathname === item.url
                                  ? "text-green-600 font-semibold"
                                  : "text-muted-foreground"
                              }
                            >
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userProfile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
