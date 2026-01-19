import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import Links from "@/components/links";
import AuthButtons from "./auth-buttons";

const Navbar = () => {
  return (
    <nav className="bg-card px-6 py-3 flex justify-between items-center w-full">
      <Link
        href="/"
        className="text-primary font-semibold text-xl hover:opacity-85 transition duration-200"
      >
        Notrika
      </Link>

      <Links />

      <div className="flex items-center justify-between gap-2 ">
        <AuthButtons />

        <Separator orientation="vertical" />

        <ThemeToggle />
      </div>
    </nav>
  );
};
export default Navbar;
