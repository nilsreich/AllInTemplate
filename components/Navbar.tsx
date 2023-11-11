import { MenuIcon } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { LangSwitch } from "@/components/LangSwitch";
import AuthButton from "@/components/AuthButton";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between gap-2 p-2 border-b">
      <MenuIcon />
      <div className="grow">TestApp</div>
      <div className="flex items-center gap-2">
        <AuthButton />
        <ModeToggle />
        <LangSwitch />
      </div>
    </nav>
  );
};
