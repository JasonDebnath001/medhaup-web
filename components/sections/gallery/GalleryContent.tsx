"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";
import clsx from "clsx";
import type { GalleryItem } from "@/lib/data";

const CATEGORY_LABELS: Record<string, string> = {
  Classes: "Classes",
  Toppers: "Our Toppers",
  Events: "Events",
};

export default function GalleryContent({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(() => {
    const present = [...new Set(items.map((g) => g.category))];
    return ["All", ...present];
  }, [items]);

  const filtered =
    active === "All" ? items : items.filter((g) => g.category === active);

  return (
    <>
      <section className="bg-cream pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-navy shadow-sm">
            <Camera size={14} className="text-orange" />
            GALLERY
          </span>
          <h1 className="font-heading mt-6 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Inside <span className="text-orange">MedhaUp</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            Live classes, our rank holders, and the moments in between.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {categories.length > 2 && (
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={clsx(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === c
                      ? "bg-navy text-white"
                      : "bg-navy/5 text-navy/70 hover:bg-navy/10"
                  )}
                >
                  {c === "All" ? "All" : CATEGORY_LABELS[c] ?? c}
                </button>
              ))}
            </div>
          )}

          {/* Masonry via CSS columns */}
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((g) => (
                <motion.figure
                  key={g.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group relative overflow-hidden rounded-2xl border border-navy/10 shadow-sm break-inside-avoid"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={800}
                    height={
                      g.aspect === "tall"
                        ? 1000
                        : g.aspect === "wide"
                          ? 500
                          : 800
                    }
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  {g.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-white">
                      {g.caption}
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}