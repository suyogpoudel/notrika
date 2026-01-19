import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import Links from "@/components/links";

const Navbar = () => {
    return (
        <nav className="bg-card px-6 py-3 flex justify-between items-center w-full">
            <Link
                href="/"
                className="text-primary font-semibold text-xl hover:opacity-85 transition duration-200"
            >
                Notrika
            </Link>

            <Links/>

            <div className="flex items-center justify-between gap-2 ">
                <Button
                    asChild
                    size="lg"
                    variant="secondary"
                >
                    <Link href="/sign-up">Sign Up</Link>
                </Button>

                <Button
                    asChild
                    size="lg"
                >
                    <Link href="/sign-in">Sign In</Link>
                </Button>

                <Separator orientation="vertical"/>

                <ThemeToggle/>
            </div>
        </nav>
    )
}
export default Navbar
