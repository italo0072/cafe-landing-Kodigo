import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Producto } from "@/lib/types";

export const revalidate = 60;

async function getProducto(slug: string): Promise<Producto | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("productos")
    .select("*, origenes(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo cargar el producto: ${error.message}`);
  }
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = await getProducto(slug);
  return {
    title: producto ? `${producto.nombre} — La Calesa` : "Producto no encontrado",
  };
}

const ETIQUETA_CATEGORIA: Record<Producto["categoria"], string> = {
  cafe: "Café",
  postre: "Postre",
  plato: "Platillo",
};

export default async function ProductoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = await getProducto(slug);

  if (!producto) {
    notFound();
  }

  const esCafe = producto.categoria === "cafe";

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Link href="/#catalogo" className="underline-grow text-sm text-cherry">
        ← Volver al catálogo
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-roast-900/5">
          {producto.imagen_url && (
            <Image
              src={producto.imagen_url}
              alt={producto.nombre}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          )}
        </div>

        <div>
          <span className="inline-block rounded-full bg-husk px-3 py-1 text-xs font-medium text-roast-700">
            {ETIQUETA_CATEGORIA[producto.categoria]}
          </span>

          {esCafe && producto.origenes && (
            <Link
              href={`/origenes/${producto.origenes.slug}`}
              className="underline-grow mt-3 block text-sm text-roast-500"
            >
              {producto.origenes.nombre}, {producto.origenes.pais}
            </Link>
          )}

          <h1 className="mt-3 font-display text-4xl text-roast-900 md:text-5xl">
            {producto.nombre}
          </h1>

          {esCafe && producto.proceso && (
            <p className="mt-2 text-roast-500">Proceso: {producto.proceso}</p>
          )}

          <p className="mt-6 max-w-prose leading-relaxed text-roast-700">
            {producto.descripcion}
          </p>
          <p className="mt-8 font-display text-3xl text-roast-900">
            {producto.precio_aproximado ? "aprox. " : ""}$
            {producto.precio.toFixed(2)}
          </p>
          {producto.precio_aproximado && (
            <p className="mt-1 text-xs text-roast-500">
              Precio de referencia. Confirma el precio exacto en tu mesa.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
