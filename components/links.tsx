"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

type link = {
  href: string;
  label: string;
};

const links: link[] = [
  { href: "/", label: "Home" },
  { href: "/notes", label: "Notes" },
  { href: "/community", label: "Community" },
  { href: "/users", label: "Users" },
];

const Links = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
      {links.map((link: link, i) => (
        <div
          key={i}
          className="flex items-center gap-4"
        >
          <Link
            href={link.href}
            className={`hover:text-muted-foreground transition-colors duration-150 ${pathname === link.href ? "text-muted-foreground opacity-85 scale-95" : ""}`}
          >
            {link.label}
          </Link>
          {i < links.length - 1 && <Separator orientation="vertical" />}
        </div>
      ))}
    </div>
  );
};
export default Links;
