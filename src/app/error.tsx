"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(1200px_circle_at_50%_-10%,theme(colors.indigo.200/.35),transparent_55%)] dark:bg-[radial-gradient(1200px_circle_at_50%_-10%,theme(colors.indigo.500/.14),transparent_55%)]">
      <div className="max-w-md w-full rounded-2xl border border-black/5 bg-white/70 p-6 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-black/5 flex items-center justify-center dark:bg-white/10">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Something went wrong</h1>
            <p className="text-xs text-muted-foreground">Try again or refresh the page.</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground break-words">{error.message}</p>

        <button
          onClick={reset}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-background text-sm font-medium shadow hover:opacity-95 active:opacity-90"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </main>
  );
}
