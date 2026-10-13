import Image from "next/image";
import type { Metadata } from "next";
import { contacto, horarios, ubicacion } from "@/lib/content";
import { imagenes } from "@/lib/media";

export const metadata: Metadata = {
  title: "Visítanos — La Calesa",
  description:
    "Encuéntranos en Alegría, Usulután, El Salvador. Dirección, horario y mapa.",
};

export default function VisitanosPage() {
  const mapaSrc = `https://www.google.com/maps?q=${ubicacion.lat},${ubicacion.lng}&z=16&output=embed`;
  const mapaEnlace = `https://www.google.com/maps/place/?q=place_id:${contacto.googlePlaceId}`;

  return (
    <main>
      <section className="border-b border-roast-900/10 bg-parchment">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-sm text-cherry">Visítanos</p>
          <h1 className="mt-2 font-display text-4xl text-roast-900 md:text-5xl">
            Te esperamos en Alegría, Usulután
          </h1>
          <p className="mt-4 max-w-prose text-lg text-roast-700">
            A un paso de la Laguna de Alegría, en las faldas del volcán
            Tecapa. Ven a probar el café que se cultiva a pocos minutos de
            aquí.
          </p>
          <p className="mt-3 text-sm text-roast-500">
            ★ {contacto.googleRating} en Google ({contacto.googleReviewCount}{" "}
            reseñas)
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-roast-900/5">
          <Image
            src={imagenes.visitanos}
            alt="Terraza de la cafetería en Alegría, Usulután"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <p className="mt-2 text-xs text-roast-500">
          La terraza real de La Calesa, junto a su letrero de entrada.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
        <div className="overflow-hidden rounded-xl border border-roast-900/10">
          <iframe
            title="Ubicación de La Calesa en Alegría, Usulután"
            src={mapaSrc}
            width="100%"
            height="460"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[460px] w-full"
          />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl text-roast-900">Dirección</h2>
            <p className="mt-2 text-roast-700">{contacto.direccion}</p>
            <p className="mt-1 text-sm text-roast-500">
              Coordenadas: {ubicacion.gradosSexagesimales}
            </p>
            <a
              href={mapaEnlace}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-grow mt-3 inline-block text-sm text-cherry"
            >
              Ver ficha real en Google Maps
            </a>
          </div>

          <div>
            <h2 className="font-display text-xl text-roast-900">Horario</h2>
            <ul className="mt-3 space-y-2">
              {horarios.map((h) => (
                <li
                  key={h.dia}
                  className="flex items-center justify-between border-b border-roast-900/10 pb-2 text-roast-700 last:border-0"
                >
                  <span>{h.dia}</span>
                  <span className="text-roast-900">{h.horas}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-roast-900">Contacto</h2>
            <p className="mt-2 text-roast-700">{contacto.telefono}</p>
            <p className="text-roast-700">{contacto.correo}</p>
            <p className="text-roast-700">{contacto.instagram}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
