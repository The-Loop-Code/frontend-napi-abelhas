"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants";

const navItems = [
  { href: ROUTES.AMOSTRAS, label: "Amostras" },
  { href: ROUTES.PRODUTORES, label: "Produtores" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-64 bg-base-200 flex flex-col">
      <div className="px-6 py-5 text-xl font-bold tracking-wide border-b border-base-300">
        🍯 NAPI Abelhas
      </div>
      <ul className="menu flex-1 p-4 gap-1">
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={pathname.startsWith(href) ? "active" : ""}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
