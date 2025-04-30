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

export default function HomeNavbar({ user, ...props }: {user?: IResponse<User>}) {
  return (
    <>
      <div className="h-30 w-full bg-bright-green flex-col content-center">
        <div className="flex p-2 place-content-between md:w-5/6 m-auto">
          <div className="relative w-40 h-16 shrink hidden sm:block">
            <Link href="/home">
              <Image
                src="/ReuseMart_horizontal.png"
                alt="Reuse Mart Logo"
                fill
                objectFit="cover"
                className="brightness-0 invert"
              />
            </Link>
          </div>

          <div className="relative h-16 content-center w-2/3 ">
            <div className="flex shrink h-10 items-center bg-white rounded-sm py-1 mx-1 shadow-sm">
              <SearchForm />
            </div>
          </div>

          <div className="flex h-16 w-25 items-center place-content-between">
            <div className="h-10 m-1 w-10 bg-white hover:bg-slate-100 rounded-full py-1 shadow-sm flex items-center justify-center ">
              <Link href="#">
                <ShoppingCart className="text-lime-600 stroke-2" />
              </Link>
            </div>
            {user === undefined ? (
                <Link href="/login">
                  Login
                </Link>
            ) : (
              <div className="h-10 m-1 w-10  bg-white hover:bg-slate-100 rounded-full py-1 shadow-sm flex items-center justify-center">
                <Link href="/profile">
                  <Avatar className=" rounded-lg grayscale ">
                    <AvatarImage
                      src={user.data?.nama}
                      alt={user.data?.nama}
                    />
                    <AvatarFallback className="rounded-lg font-medium text-black">
                      {user? user.data?.nama.charAt(0) : "G"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
