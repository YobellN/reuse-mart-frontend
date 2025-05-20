"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import SearchForm from "@/components/home/search-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { IResponse, User } from "@/services/utils";

type HomeNavbarProps = {
  user?: IResponse<User>;
};
//& React.ComponentProps<typeof Sidebar>

export default function HomeNavbar({
  user,
  ...props
}: {
  user?: IResponse<User>;
}) {
  return (
    <>
      <div className="h-16 sm:h-32 w-full bg-bright-green flex-col content-center sm:content-between shadow-sm sticky top-0 z-50">
        <div className="bg-green-600 mb-2 px-2 md:px-0 md:p-0 hidden sm:flex ">
          <div className="mx-auto flex items-center justify-end md:w-5/6">
            <nav className="py-1.5 flex justify-end gap-6 text-[12px] text-white font-medium">
              <Link
                href={"/about"}
                className="hover:text-lime-300 transition-colors duration-200"
              >
                Tentang ReuseMart
              </Link>
              <Link
                href={"/about"}
                className="hover:text-lime-300 transition-colors duration-200"
              >
                Informasi Penitipan
              </Link>
              <Link
                href={"/about"}
                className="hover:text-lime-300 transition-colors duration-200"
              >
                Kategori Barang Titipan
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex px-2 md:p-0 place-content-between md:w-5/6 m-auto">
          <div className="relative sm:w-38 sm:h-16 shrink hidden sm:block">
            <Link href="/home">
              <Image
                src="/ReuseMart_horizontal.png"
                alt="Reuse Mart Logo"
                width={300}
                height={300}
                className="brightness-0 invert"
              />
            </Link>
          </div>

          <div className="relative h-16 content-center w-2/3 flex-col">
            <div className="flex shrink h-10 items-center bg-white rounded-sm py-1 mx-1 shadow-sm">
              <SearchForm />
            </div>
          </div>

          <div className="flex h-16 w-30 items-center justify-end">
            <div className="h-10 me-2 w-10 bg-white hover:bg-slate-100 rounded-full py-1 shadow-sm flex items-center justify-center ">
              <Link href="#">
                <ShoppingCart className="text-green-600 me-[1px] stroke-2" />
              </Link>
            </div>

            {user === undefined ? (
              <div className="h-10 ms-2 w-16 bg-white hover:bg-slate-100 rounded-md py-1 shadow-sm flex items-center justify-center ">
                <Link href="/login" className="text-green-600 font-medium">
                  Login
                </Link>
              </div>
            ) : (
              <div className="h-10 m-1 w-10  bg-white hover:bg-slate-100 rounded-full py-1 shadow-sm flex items-center justify-center">
                <Link href="/profile">
                  <Avatar className=" rounded-lg ">
                    <AvatarImage src={user.data?.nama} alt={user.data?.nama} />
                    <AvatarFallback className="rounded-lg font-semibold text-green-600">
                      {user ? user.data?.nama.charAt(0) : "G"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="w-5/6 mx-auto flex items-start justify-center">
          <nav className="px-2 hidden pb-2 w-2/3 sm:flex justify-start text-[12px] text-white overflow-hidden whitespace-nowrap truncate">
            <Link
              href="/home"
              className="px-2 hover:text-lime-300 transition-colors duration-200"
            >
              Produk Bergaransi
            </Link>{" "}
            |{" "}
            <Link
              href="/home"
              className="px-2 hover:text-lime-300 transition-colors duration-200"
            >
              Pakaian & Aksesori
            </Link>{" "}
            |{" "}
            <Link
              href="/home"
              className="px-2 hover:text-lime-300 transition-colors duration-200"
            >
              Otomotif & Aksesori
            </Link>{" "}
            |{" "}
            <Link
              href="/home"
              className="px-2 hover:text-lime-300 transition-colors duration-200"
            >
              Perabotan Rumah Tangga
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
