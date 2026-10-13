import Link from "next/link";
import { navLinks } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-roast-900/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl text-roast-900">
          La Calesa
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline-grow text-sm text-roast-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/visitanos"
          className="rounded-full bg-roast-900 px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-cherry"
        >
          Visítanos
        </Link>
      </div>
    </header>
  );
}
