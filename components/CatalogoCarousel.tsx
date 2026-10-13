"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Producto } from "@/lib/types";

const ETIQUETA_CATEGORIA: Record<Producto["categoria"], string> = {
  cafe: "Café",
  postre: "Postre",
  plato: "Platillo",
};

export function CatalogoCarousel({ productos }: { productos: Producto[] }) {
  const [indice, setIndice] = useState(0);
  const [enPausa, setEnPausa] = useState(false);
  const total = productos.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const prefiereMenosMovimiento =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefiereMenosMovimiento || enPausa || total <= 1) return;

    timerRef.current = setInterval(() => {
      setIndice((i) => (i + 1) % total);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [enPausa, total]);

  if (total === 0) return null;

  const irA = (i: number) => setIndice(((i % total) + total) % total);

  return (
    <div
      className="relative"
      onMouseEnter={() => setEnPausa(true)}
      onMouseLeave={() => setEnPausa(false)}
    >
      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl md:h-[520px]">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{
            width: `${total * 100}%`,
            transform: `translateX(-${(100 / total) * indice}%)`,
          }}
        >
          {productos.map((producto) => (
            <Link
              key={producto.id}
              href={`/productos/${producto.slug}`}
              className="relative h-full shrink-0"
              style={{ width: `${100 / total}%` }}
            >
              {producto.imagen_url && (
                <Image
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  fill
                  priority={producto === productos[0]}
                  className="object-cover"
                  sizes="100vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-roast-900/90 via-roast-900/10 to-transparent" />

              <span className="absolute left-5 top-5 rounded-full bg-cream px-3 py-1 text-xs font-medium text-roast-900">
                {ETIQUETA_CATEGORIA[producto.categoria]}
              </span>
              {producto.destacado && (
                <span className="absolute right-5 top-5 rounded-full bg-cherry px-3 py-1 text-xs font-medium text-parchment">
                  Destacado
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="font-display text-2xl text-cream md:text-3xl">
                  {producto.nombre}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-parchment/85 md:text-base">
                  {producto.descripcion}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="font-display text-2xl text-gold">
                    {producto.precio_aproximado ? "aprox. " : ""}$
                    {producto.precio.toFixed(2)}
                  </span>
                  <span className="underline-grow text-sm text-cream">
                    Ver detalle
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Producto anterior"
            onClick={() => irA(indice - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-2 text-roast-900 shadow transition-colors hover:bg-cream"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Producto siguiente"
            onClick={() => irA(indice + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 p-2 text-roast-900 shadow transition-colors hover:bg-cream"
          >
            ›
          </button>

          <div className="mt-4 flex justify-center gap-2">
            {productos.map((producto, i) => (
              <button
                key={producto.id}
                type="button"
                aria-label={`Ir a ${producto.nombre}`}
                onClick={() => irA(i)}
                className={`h-2 rounded-full transition-all ${
                  i === indice ? "w-6 bg-cherry" : "w-2 bg-roast-900/20"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
