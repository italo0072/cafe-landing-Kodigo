export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-[4/3] w-full animate-pulse rounded-xl bg-roast-900/10" />
        <div className="space-y-4">
          <div className="h-4 w-1/3 animate-pulse rounded bg-roast-900/10" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-roast-900/10" />
          <div className="h-24 w-full animate-pulse rounded bg-roast-900/10" />
        </div>
      </div>
    </main>
  );
}
