import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-green-600 bg-transparent text-green-600 text-white hover:text-white border-2 border-white transition-all dark:bg-transparent dark:border-white duration-300"
        >
          <Menu strokeWidth={3} />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-2 ">
        <div className="w-30">
          <Logo />
        </div>
        <NavMenu
          orientation="vertical"
          className="data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-start data-[orientation=vertical]:items-start"
        />
      </SheetContent>
    </Sheet>
  );
};
