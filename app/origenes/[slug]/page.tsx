import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Origen, Producto } from "@/lib/types";

export const revalidate = 60;

async function getOrigenConCafes(
  slug: string
): Promise<{ origen: Origen; cafes: Producto[] } | null> {
  const supabase = createServerSupabaseClient();

  const { data: origen, error: origenError } = await supabase
    .from("origenes")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (origenError) {
    throw new Error(`No se pudo cargar el origen: ${origenError.message}`);
  }
  if (!origen) return null;

  const { data: cafes, error: cafesError } = await supabase
    .from("productos")
    .select("*")
    .eq("origen_id", origen.id)
    .eq("categoria", "cafe");

  if (cafesError) {
    throw new Error(`No se pudieron cargar los cafés: ${cafesError.message}`);
  }

  return { origen, cafes: cafes ?? [] };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getOrigenConCafes(slug);
  return {
    title: result ? `${result.origen.nombre} — La Calesa` : "Origen no encontrado",
  };
}

export default async function OrigenDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getOrigenConCafes(slug);

  if (!result) {
    notFound();
  }

  const { origen, cafes } = result;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Link href="/#catalogo" className="underline-grow text-sm text-cherry">
        ← Volver al catálogo
      </Link>

      {origen.imagen_url && (
        <div className="relative mt-8 aspect-[16/7] w-full overflow-hidden rounded-xl bg-roast-900/5">
          <Image
            src={origen.imagen_url}
            alt={origen.nombre}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      <p className="mt-8 text-sm text-roast-500">{origen.pais}</p>
      <h1 className="mt-2 font-display text-4xl text-roast-900 md:text-5xl">
        {origen.nombre}
      </h1>
      {origen.altitud && (
        <p className="mt-2 text-roast-500">{origen.altitud} m s. n. m.</p>
      )}
      <p className="mt-6 max-w-prose leading-relaxed text-roast-700">
        {origen.descripcion}
      </p>

      <h2 className="mt-14 font-display text-2xl text-roast-900">
        Cafés de este origen
      </h2>
      {cafes.length === 0 ? (
        <p className="mt-4 text-roast-700">
          Todavía no hay cafés cargados para este origen.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {cafes.map((cafe) => (
            <Link
              key={cafe.id}
              href={`/productos/${cafe.slug}`}
              className="group rounded-xl border border-roast-900/10 p-5 transition-colors hover:border-cherry/40"
            >
              <h3 className="font-display text-xl text-roast-900">
                {cafe.nombre}
              </h3>
              <p className="mt-1 text-sm text-roast-500">{cafe.proceso}</p>
              <span className="underline-grow mt-3 inline-block text-sm text-cherry">
                Ver detalle
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
