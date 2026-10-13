"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-3xl text-roast-900">
        No pudimos cargar el catálogo
      </h1>
      <p className="mt-3 text-roast-700">
        {error.message ||
          "Ocurrió un problema al conectar con la base de datos. Verifica que las variables de entorno de Supabase estén configuradas."}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-cherry px-6 py-2.5 text-sm font-medium text-parchment"
      >
        Intentar de nuevo
      </button>
    </main>
  );
}
