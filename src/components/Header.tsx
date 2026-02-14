"use client";

import { useEffect, useState } from "react";
import { getCartCount } from "@/lib/cart";
import { ShoppingCart, Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ cartCount }: { cartCount: number }) {
  const [mountedCount, setMountedCount] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMountedCount(getCartCount());
    setMounted(true);
  }, []);

  const count = Math.max(cartCount, mountedCount);
  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/25">
      {/* subtle highlight line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent dark:via-indigo-400/20" />

      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-cyan-500/15 to-transparent dark:from-indigo-500/15 dark:via-cyan-500/10" />
              <Sparkles className="relative h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-sm sm:text-base font-semibold tracking-tight">
                Product Dashboard
              </h1>
              <p className="truncate text-xs text-muted-foreground">
                DummyJSON Inventory • Modern UI
              </p>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2">
            {/* Theme pill */}
            <button
              type="button"
              onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
              disabled={!mounted}
              aria-label="Toggle theme"
              className="group inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-white/95 active:scale-[0.99] disabled:opacity-70 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <span className="relative grid h-8 w-8 place-items-center rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
                {!mounted ? (
                  <span className="h-4 w-4" aria-hidden />
                ) : (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isDark ? "moon" : "sun"}
                      initial={{ opacity: 0, y: 4, rotate: -10 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, y: -4, rotate: 10 }}
                      transition={{ duration: 0.15 }}
                      className="grid place-items-center"
                    >
                      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </motion.span>
                  </AnimatePresence>
                )}
              </span>

              <span className="hidden sm:inline font-medium">
                {!mounted ? "Theme" : isDark ? "Dark" : "Light"}
              </span>
            </button>

            {/* Cart pill */}
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-white/95 active:scale-[0.99] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                aria-label="Cart"
              >
                <span className="grid h-8 w-8 place-items-center rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
                  <ShoppingCart className="h-4 w-4" />
                </span>
                <span className="hidden sm:inline font-medium">Cart</span>
              </button>

              <motion.span
                key={count}
                initial={{ scale: 0.85, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 520, damping: 28 }}
                className="absolute -top-2 -right-2 min-w-6 h-6 px-2 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-600 text-white text-xs flex items-center justify-center shadow"
                aria-label={`Cart count ${count}`}
              >
                {count}
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
