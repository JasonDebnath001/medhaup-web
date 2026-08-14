"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Newspaper } from "lucide-react";
import clsx from "clsx";
import type { BlogPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function BlogsContent({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState<string>("All");

  // Only show filter pills for tags that actually exist on posts
  const tags = useMemo(() => {
    const present = [...new Set(posts.flatMap((p) => p.tags))];
    return ["All", ...present];
  }, [posts]);

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.tags.includes(active));

  // Newest post gets the featured slot (only in the unfiltered view)
  const [featured, ...rest] = filtered;
  const showFeatured = active === "All" && featured;
  const gridPosts = showFeatured ? rest : filtered;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="bg-cream pt-32 pb-12 sm:pt-40">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-navy shadow-sm">
            <Newspaper size={14} className="text-orange" />
            medhaup blog
          </span>
          <h1 className="font-heading mt-6 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Prepare <span className="text-orange">smarter</span>, not just
            harder
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            Study strategy, subject guides and exam updates for the ANM/GNM
            exam — written by our faculty in simple language.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* ---------- Tag filter ---------- */}
          {tags.length > 2 && (
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  aria-pressed={active === t}
                  className={clsx(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active === t
                      ? "bg-navy text-white"
                      : "border border-navy/15 bg-white text-navy/70 hover:border-navy/30 hover:text-navy"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {/* ---------- Featured (latest) post ---------- */}
          {showFeatured && (
            <Link
              href={`/blogs/${featured.slug}`}
              className="group mb-12 grid overflow-hidden rounded-3xl border border-navy/10 bg-cream shadow-sm transition-shadow hover:shadow-lg md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                {featured.cover ? (
                  <Image
                    src={featured.cover}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-navy">
                    <BookOpen size={48} className="text-orange" />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-orange px-2.5 py-1 text-[11px] font-bold text-white">
                    LATEST
                  </span>
                  {featured.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-orange/10 px-2.5 py-1 text-[11px] font-semibold text-orange"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="font-heading mt-4 text-2xl font-extrabold leading-tight text-navy transition-colors group-hover:text-orange sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-navy/65 sm:text-[15px]">
                  {featured.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-4 text-xs text-navy/50 sm:text-sm">
                  <span>{formatDate(featured.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {featured.readMins} min read
                  </span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
                  Read article
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          )}

          {/* ---------- Grid ---------- */}
          {gridPosts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {gridPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-[16/9]">
                        {post.cover ? (
                          <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="grid h-full w-full place-items-center bg-navy">
                            <BookOpen size={32} className="text-orange" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="rounded-full bg-orange/10 px-2 py-0.5 text-[10px] font-semibold text-orange"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                        <h2 className="font-heading mt-2.5 line-clamp-2 text-lg font-bold leading-snug text-navy transition-colors group-hover:text-orange">
                          {post.title}
                        </h2>
                        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-navy/60">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-navy/5 pt-3.5 text-xs text-navy/45">
                          <span>{formatDate(post.date)}</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {post.readMins} min
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Filter produced nothing (can happen if a tag only exists on drafts) */}
          {filtered.length === 0 && (
            <p className="py-16 text-center text-navy/55">
              No articles under &ldquo;{active}&rdquo; yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}