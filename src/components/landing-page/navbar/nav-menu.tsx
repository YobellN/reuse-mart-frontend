import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-2 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:min-w-[250px] data-[orientation=vertical]:items-start">
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className={`
            text-md rounded-none transition-all duration-100 ease-in-out
            hover:border-b-3 hover:border-white hover:bg-transparent hover:text-white
            group-data-[orientation=vertical]:hover:text-green-600
            dark:group-data-[orientation=vertical]:hover:text-green-500
            group-data-[orientation=vertical]:hover:border-green-600
          `}
        >
          <Link
            href="#"
            className="group-data-[orientation=vertical]:min-w-[250px]"
          >
            Home
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className={`
            text-md rounded-none transition-all duration-100 ease-in-out
            hover:border-b-3 hover:border-white hover:bg-transparent hover:text-white
            group-data-[orientation=vertical]:hover:text-green-600
            dark:group-data-[orientation=vertical]:hover:text-green-500
            group-data-[orientation=vertical]:hover:border-green-600
          `}
        >
          <Link
            href="#"
            className="group-data-[orientation=vertical]:min-w-[250px]"
          >
            Blog
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className={`
            text-md rounded-none transition-all duration-100 ease-in-out
            hover:border-b-3 hover:border-white hover:bg-transparent hover:text-white
            group-data-[orientation=vertical]:hover:text-green-600
            dark:group-data-[orientation=vertical]:hover:text-green-500
            group-data-[orientation=vertical]:hover:border-green-600
          `}
        >
          <Link
            href="#"
            className="group-data-[orientation=vertical]:min-w-[250px]"
          >
            About
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          asChild
          className={`
            text-md rounded-none transition-all duration-100 ease-in-out
            hover:border-b-3 hover:border-white hover:bg-transparent hover:text-white
            group-data-[orientation=vertical]:hover:text-green-600
            dark:group-data-[orientation=vertical]:hover:text-green-500
            group-data-[orientation=vertical]:hover:border-green-600
          `}
        >
          <Link
            href="#"
            className="group-data-[orientation=vertical]:min-w-[250px]"
          >
            Contact Us
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
