export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-10 h-10 w-52 animate-pulse rounded bg-roast-900/10" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-roast-900/10"
          >
            <div className="aspect-[4/3] w-full animate-pulse bg-roast-900/10" />
            <div className="space-y-2 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-roast-900/10" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-roast-900/10" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
