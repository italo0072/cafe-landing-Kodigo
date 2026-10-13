import Link from "next/link";
import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Origen, Producto } from "@/lib/types";
import { menuBebidas, procesoSteps, testimonios } from "@/lib/content";
import { imagenes } from "@/lib/media";
import { CatalogoCarousel } from "@/components/CatalogoCarousel";

export const revalidate = 60;
export const dynamic = 'force-dynamic';

async function getProductos(): Promise<Producto[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("productos")
    .select("*, origenes(*)")
    .order("destacado", { ascending: false })
    .order("categoria", { ascending: true });

  if (error) {
    throw new Error(`No se pudieron cargar los productos: ${error.message}`);
  }
  return data ?? [];
}

async function getOrigenes(): Promise<Origen[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("origenes")
    .select("*")
    .order("pais", { ascending: true });

  if (error) {
    throw new Error(`No se pudieron cargar los orígenes: ${error.message}`);
  }
  return data ?? [];
}

export default async function HomePage() {
  const [productos, origenes] = await Promise.all([
    getProductos(),
    getOrigenes(),
  ]);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-roast-900/10">
        <div className="absolute inset-0">
          <Image
            src={imagenes.hero}
            alt="Fachada de La Calesa de noche, con su letrero y carreta"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-roast-900/70" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1.2fr_1fr] md:items-end md:py-32">
          <div>
            <p className="mb-4 text-sm text-gold">
              Cafetería y tostadora en Alegría, Usulután
            </p>
            <h1 className="font-display text-5xl leading-[1.05] text-cream md:text-7xl">
              De la finca a
              <br />
              la taza, sin
              <br />
              atajos.
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <p className="max-w-prose text-lg leading-relaxed text-parchment/85 md:text-xl">
              Tostamos café de Alegría y de otros cinco países en lotes
              pequeños, y horneamos postres a diario para acompañar cada
              taza.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#catalogo"
                className="rounded-full bg-cherry px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-gold"
              >
                Ver el catálogo
              </a>
              <Link
                href="/visitanos"
                className="underline-grow self-center text-sm text-parchment"
              >
                Cómo llegar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="nosotros" className="bg-cream py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
            <Image
              src={imagenes.nosotros}
              alt="Fachada de La Calesa de día, con sus toldos amarillos"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div>
            <p className="text-sm text-cherry">Nuestra historia</p>
            <h2 className="mt-3 font-display text-3xl text-roast-900 md:text-4xl">
              Empezamos con una libra de café y una libreta de notas de cata.
            </h2>
            <div className="mt-5 space-y-5 text-roast-700">
              <p className="leading-relaxed">
                La Calesa nació en 2019 en un local de cuatro mesas en Alegría,
                Usulután, a la sombra del volcán Tecapa y muy cerca de la
                Laguna de Alegría. Decidimos dejar de comprar café ya tostado
                y empezar a tostar el nuestro, incluyendo el que se cultiva
                en las parcelas vecinas.
              </p>
              <p className="leading-relaxed">
                Hoy seguimos siendo un equipo pequeño. Tostamos varias veces
                por semana en el mismo local donde servimos el café,
                horneamos los postres cada mañana y catamos cada lote antes
                de ponerlo en el menú.
              </p>
              <p className="border-l-2 border-cherry pl-4 font-display text-xl text-roast-900">
                Creemos que un buen café empieza mucho antes del molino.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-roast-900/10 bg-parchment py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl text-roast-900 md:text-4xl">
            De la finca a la taza
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {procesoSteps.map((paso) => (
              <div key={paso.numero}>
                <span className="font-display text-4xl text-cherry/70">
                  {paso.numero}
                </span>
                <h3 className="mt-3 font-display text-xl text-roast-900">
                  {paso.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-roast-700">
                  {paso.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-10">
          <p className="text-sm text-cherry">Fotos reales del local</p>
          <h2 className="mt-2 font-display text-3xl text-roast-900 md:text-4xl">
            Catálogo
          </h2>
          <p className="mt-2 max-w-prose text-sm text-roast-500">
            Pasa el cursor para pausar, o haz clic en una foto para ver el
            detalle y el precio.
          </p>
        </div>

        {productos.length === 0 ? (
          <p className="rounded-lg border border-dashed border-roast-500/30 p-8 text-roast-700">
            Todavía no hay productos cargados en la base de datos. Agrega
            registros a la tabla <code>productos</code> en Supabase para
            verlos aquí.
          </p>
        ) : (
          <CatalogoCarousel productos={productos} />
        )}
      </section>

      <section id="menu" className="bg-roast-900 py-16 text-parchment md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm text-gold">En el local</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            Menú de bebidas
          </h2>
          <p className="mt-3 max-w-prose text-parchment/70">
            Precios tomados directamente de la carta física del local.
            También servimos comida mexicana, carnes y mariscos —pregunta
            por la carta completa en tu mesa.
          </p>
          <div className="mt-12 grid gap-12 sm:grid-cols-2">
            {menuBebidas.map((grupo) => (
              <div key={grupo.categoria}>
                <h3 className="border-b border-parchment/20 pb-3 font-display text-xl text-gold">
                  {grupo.categoria}
                </h3>
                <ul className="mt-4 space-y-4">
                  {grupo.items.map((item) => (
                    <li key={item.nombre}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-parchment">{item.nombre}</span>
                        <span className="h-px flex-1 border-b border-dotted border-parchment/25" />
                        <span className="text-parchment/90">
                          ${item.precio}
                        </span>
                      </div>
                      {item.nota && (
                        <p className="mt-0.5 text-xs text-parchment/50">
                          {item.nota}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm text-cherry">Trazabilidad</p>
          <h2 className="mt-2 font-display text-3xl text-roast-900 md:text-4xl">
            Nuestros orígenes
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {origenes.map((origen) => (
              <Link
                key={origen.id}
                href={`/origenes/${origen.slug}`}
                className="group overflow-hidden rounded-xl border border-roast-900/10 transition-colors hover:border-cherry/40"
              >
                {origen.imagen_url && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-roast-900/5">
                    <Image
                      src={origen.imagen_url}
                      alt={origen.nombre}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs text-roast-500">{origen.pais}</p>
                  <h3 className="mt-2 font-display text-2xl text-roast-900">
                    {origen.nombre}
                  </h3>
                  {origen.altitud && (
                    <p className="mt-1 text-sm text-roast-500">
                      {origen.altitud} m s. n. m.
                    </p>
                  )}
                  <p className="mt-3 line-clamp-2 text-sm text-roast-700">
                    {origen.descripcion}
                  </p>
                  <span className="underline-grow mt-4 inline-block text-sm text-cherry">
                    Explorar
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-roast-900/10 bg-parchment py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm text-cherry">Google Maps</p>
          <h2 className="mt-2 font-display text-3xl text-roast-900 md:text-4xl">
            Lo que dicen en las mesas de al lado
          </h2>
          <p className="mt-2 max-w-prose text-sm text-roast-500">
            Reseñas de ejemplo, inspiradas en el tipo de comentarios que
            recibe un lugar como este. Reemplázalas por las reseñas reales
            de tu ficha de Google Maps cuando publiques el sitio.
          </p>
        </div>

        <div className="mt-10 overflow-hidden">
          <div className="marquee-track">
            {[...testimonios, ...testimonios].map((t, i) => (
              <figure
                key={`${t.autor}-${i}`}
                className="mx-4 w-80 shrink-0 rounded-xl border border-roast-900/10 bg-cream p-6"
              >
                <div className="flex items-center gap-1 text-gold" aria-hidden="true">
                  {"★★★★★"}
                </div>
                <blockquote className="mt-3 text-base leading-snug text-roast-900">
                  “{t.cita}”
                </blockquote>
                <figcaption className="mt-4 text-sm text-roast-500">
                  {t.autor} · {t.detalle}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-husk py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-cherry">Alegría, Usulután</p>
            <h2 className="mt-2 font-display text-2xl text-roast-900 md:text-3xl">
              Encuéntranos en el mapa y planifica tu visita
            </h2>
          </div>
          <Link
            href="/visitanos"
            className="rounded-full bg-roast-900 px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-cherry"
          >
            Ver ubicación y horario
          </Link>
        </div>
      </section>
    </main>
  );
}
