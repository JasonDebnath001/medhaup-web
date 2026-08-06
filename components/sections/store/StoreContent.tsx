"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, MessageCircle, BadgeCheck, Truck } from "lucide-react";
import clsx from "clsx";
import { useSite } from "@/components/provider/SiteProvider";
import type { Product } from "@/lib/data";

const CATEGORY_ORDER = ["Books", "Printed Notes", "Test Series", "Combo"];

export default function StoreContent({ products }: { products: Product[] }) {
  const SITE = useSite();
  const [active, setActive] = useState<string>("All");

  const buyOnWhatsApp = (p: Product) =>
    `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(
      `Hi, I want to buy "${p.title}" (₹${p.price}) from the MedhaUp store.`
    )}`;

  // Only show filter pills for categories that actually have products
  const categories = useMemo(() => {
    const present = new Set(products.map((p) => p.category));
    return ["All", ...CATEGORY_ORDER.filter((c) => present.has(c))];
  }, [products]);

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="bg-cream pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-navy shadow-sm">
            <ShoppingBag size={14} className="text-orange" />
            MEDHAUP STORE
          </span>
          <h1 className="font-heading mt-6 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Study material that&apos;s{" "}
            <span className="text-orange">actually enough</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            Books, printed notes and test series built only for the WBJEEB
            ANM/GNM pattern. Order on WhatsApp — delivered across West Bengal.
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-navy/70">
            <li className="flex items-center gap-2">
              <BadgeCheck size={16} className="text-orange" /> Written by our
              faculty
            </li>
            <li className="flex items-center gap-2">
              <Truck size={16} className="text-orange" /> Home delivery in WB
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- Grid ---------- */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Filters */}
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
                  {c === "Combo" ? "Combos" : c}
                </button>
              ))}
            </div>
          )}

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] bg-cream">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center text-navy/20">
                        <ShoppingBag size={40} />
                      </div>
                    )}
                    {p.isNew && (
                      <span className="absolute left-3 top-3 rounded-full bg-orange px-2.5 py-1 text-[11px] font-bold text-white">
                        NEW
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-orange">
                      {p.category}
                    </span>
                    <h2 className="font-heading mt-1.5 text-lg font-bold text-navy">
                      {p.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">
                      {p.description}
                    </p>

                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="font-heading text-2xl font-extrabold text-navy">
                          ₹{p.price}
                          {p.mrp && (
                            <span className="ml-2 text-sm font-medium text-navy/40 line-through">
                              ₹{p.mrp}
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 text-xs text-navy/50">
                          {p.language}
                        </p>
                      </div>
                    </div>

                    {p.inStock ? (
                      
                    <a    href={buyOnWhatsApp(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-orange px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
                      >
                        <MessageCircle size={16} /> Order on WhatsApp
                      </a>
                    ) : (
                      <span className="mt-4 flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-navy/10 px-4 py-3 text-sm font-semibold text-navy/40">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}