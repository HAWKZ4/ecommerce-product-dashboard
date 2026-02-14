"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function UpdatingBar({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="rounded-2xl border border-black/5 bg-white/70 p-3 shadow-sm backdrop-blur
                     dark:border-white/10 dark:bg-white/5"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Updating products…
            </span>

            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-indigo-500/70 to-cyan-500/70"
                initial={{ x: "-120%" }}
                animate={{ x: "320%" }}
                transition={{ duration: 1.0, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
