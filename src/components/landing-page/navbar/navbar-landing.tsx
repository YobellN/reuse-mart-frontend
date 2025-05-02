"use client";

import { Button } from "@/components/ui/button";
import { LogoWhite } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { SunIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function NavbarLandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <nav
        className={clsx(
          "h-18 transition-colors duration-300",
          scrolled
            ? "bg-bright-green shadow-md border-b"
            : "bg-[#4ade80] border-none"
        )}
      >
        <div className="h-full flex items-center justify-between w-full md:w-5/6 mx-auto px-2 md:px-0">
          <div className="flex items-center gap-8">
            <Link href={"/about"}>
              <LogoWhite />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Menu */}
            <NavMenu className="hidden md:block text-white font-semibold" />

            <div
              className="h-9 ms-2 w-20 bg-white hover:bg-green-700 text-green-600 hover:text-white transition-all duration-300
             rounded-sm py-1 shadow-sm flex items-center justify-center border-green-600"
            >
              <Link href="/home" className=" font-medium">
                Belanja
              </Link>
            </div>
            <Button
              size="icon"
              variant="outline"
              className="hover:bg-green-700 bg-white dark:bg-white text-green-600 hover:text-white border-green-600 dark:border-green-600 transition-all duration-300"
            >
              <SunIcon />
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
