import Link from "next/link";
import { contacto, horarios, navLinks } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-roast-900 text-parchment">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl">La Calesa</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-parchment/50">
            {contacto.nombreCompleto}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-parchment/70">
            Tostamos café de origen único en lotes pequeños, directo desde la
            finca hasta tu taza.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-parchment/90">Navegación</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="underline-grow text-sm text-parchment/70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-parchment/90">Horario</p>
          <ul className="mt-4 space-y-2 text-sm text-parchment/70">
            {horarios.map((h) => (
              <li key={h.dia} className="flex justify-between gap-4">
                <span>{h.dia}</span>
                <span>{h.horas}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-parchment/70">
            {contacto.direccion}
          </p>
          <p className="mt-1 text-sm text-parchment/70">{contacto.telefono}</p>
        </div>
      </div>
      <div className="border-t border-parchment/10 py-6 text-center text-xs text-parchment/50">
        © {new Date().getFullYear()} La Calesa. Proyecto Kodigo - italo Garcia
      </div>
    </footer>
  );
}
