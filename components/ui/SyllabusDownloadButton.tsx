"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { SYLLABUS_DOWNLOADS } from "@/lib/syllabus";

type Props = {
  /** Extra classes for the trigger button (width overrides etc.) */
  className?: string;
  /** Where the dropdown opens relative to the button */
  align?: "left" | "center";
};

export default function SyllabusDownloadButton({
  className,
  align = "left",
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={clsx("relative w-full sm:w-auto", className)}>
      {/* ---- Trigger ---- */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="group flex w-full items-center justify-center gap-2 rounded-full border-2 border-navy/20 bg-white/60 px-7 py-3.5 font-semibold text-navy transition-all duration-200 hover:border-navy hover:bg-white sm:w-auto"
      >
        <Download
          size={18}
          className="transition-transform duration-200 group-hover:translate-y-0.5"
        />
        Download Syllabus
        <ChevronDown
          size={16}
          className={clsx(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {/* ---- Language menu ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={clsx(
              "absolute top-full z-30 mt-2 w-full min-w-64 overflow-hidden rounded-2xl border border-navy/10 bg-white p-1.5 shadow-xl shadow-navy/10 sm:w-72",
              align === "center"
                ? "left-1/2 -translate-x-1/2"
                : "left-0",
            )}
          >
            {SYLLABUS_DOWNLOADS.map((item) => (
              <a
                key={item.fileUrl}
                role="menuitem"
                href={item.fileUrl}
                download={item.fileName}
                onClick={() => setOpen(false)}
                className="group/item flex items-center gap-3 rounded-xl px-3.5 py-3 transition-colors duration-150 hover:bg-cream"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy/5 text-navy transition-colors duration-150 group-hover/item:bg-orange/10 group-hover/item:text-orange">
                  <FileText size={18} />
                </span>
                <span className="min-w-0 text-left">
                  <span className="block truncate text-sm font-semibold text-navy">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-navy/55">
                    {item.caption}
                  </span>
                </span>
                <Download
                  size={16}
                  className="ml-auto shrink-0 text-navy/30 transition-all duration-150 group-hover/item:translate-y-0.5 group-hover/item:text-orange"
                />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}