import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-3xl text-roast-900">
        No encontramos ese origen
      </h1>
      <p className="mt-3 text-roast-700">
        Puede que el enlace esté mal escrito o que el origen ya no exista en
        el catálogo.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-cherry px-6 py-2.5 text-sm font-medium text-parchment"
      >
        Ver el catálogo completo
      </Link>
    </main>
  );
}
