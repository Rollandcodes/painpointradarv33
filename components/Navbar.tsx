"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (!pathname) return false;
    return href === "/" ? pathname === href : pathname.startsWith(href);
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-semibold uppercase tracking-tight text-white">
            pr
          </div>
          <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
            PainPointRadar
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition duration-150 hover:text-indigo-600 ${
                  isActive(link.href)
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/signin"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition duration-150 hover:text-indigo-600"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-150 hover:bg-indigo-500"
            >
              Get started
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition duration-150 hover:bg-slate-100 md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              {isOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {isOpen ? (
        <div className="border-t bg-white md:hidden">
          <Container className="flex flex-col gap-2 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition duration-150 hover:bg-slate-50 hover:text-indigo-600 ${
                  isActive(link.href) ? "bg-indigo-50 text-indigo-700" : "text-slate-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/signin"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition duration-150 hover:bg-slate-50 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition duration-150 hover:bg-indigo-500"
                onClick={() => setIsOpen(false)}
              >
                Get started
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
