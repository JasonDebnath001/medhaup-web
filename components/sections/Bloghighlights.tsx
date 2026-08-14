"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookOpen, Clock, Newspaper } from "lucide-react";
import type { BlogPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";

/* ----------------------------------------------------------------
   BlogHighlights — dark showcase strip on the homepage.

   Latest post gets the big featured card; the next two stack
   beside it. Renders nothing when there are no published posts,
   so the homepage degrades gracefully (same pattern as
   OngoingBatch / SubjectSyllabus).
----------------------------------------------------------------- */

const ease = [0.22, 1, 0.36, 1] as const;

function Cover({
  post,
  sizes,
  priorityIcon = 40,
}: {
  post: BlogPost;
  sizes: string;
  priorityIcon?: number;
}) {
  if (post.cover) {
    return (
      <Image
        src={post.cover}
        alt={post.title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
    );
  }
  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-navy to-navy-dark">
      <BookOpen size={priorityIcon} className="text-orange" />
    </div>
  );
}

function Meta({ post, light = false }: { post: BlogPost; light?: boolean }) {
  return (
    <div
      className={`flex items-center gap-4 text-xs ${
        light ? "text-white/50" : "text-navy/50"
      }`}
    >
      <span>{formatDate(post.date)}</span>
      <span className="flex items-center gap-1">
        <Clock size={12} /> {post.readMins} min read
      </span>
    </div>
  );
}

export default function BlogHighlights({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;

  const [featured, ...rest] = posts;
  const side = rest.slice(0, 2);

  return (
    <section
      aria-labelledby="blog-highlights-heading"
      className="relative overflow-hidden bg-navy py-20 sm:py-28"
    >
      {/* Faint grid, echoing the hero / syllabus treatment */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Slowly breathing glow blobs */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-orange/20 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* ---------- Heading row ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              <Newspaper size={13} className="text-orange" />
              From the Blog
            </span>
            <h2
              id="blog-highlights-heading"
              className="font-heading mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              Fresh strategies, straight from the{" "}
              <span className="text-orange">medhaup desk</span>
            </h2>
            <p className="mt-4 text-white/65">
              Exam strategy, subject guides and preparation tips for ANM/GNM
              aspirants — written by our faculty in simple language.
            </p>
          </div>

          <Link
            href="/blogs"
            className="group hidden items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-orange hover:bg-orange sm:inline-flex"
          >
            View all articles
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* ---------- Cards ---------- */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Featured (latest) */}
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className={side.length ? "lg:col-span-3" : "lg:col-span-5"}
          >
            <Link
              href={`/blogs/${featured.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy-dark/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-orange/20"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Cover
                  post={featured}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priorityIcon={52}
                />
                <span className="absolute left-4 top-4 rounded-full bg-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg shadow-orange/30">
                  Latest
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                {featured.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-orange/10 px-2.5 py-1 text-[11px] font-semibold text-orange"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="font-heading mt-3 text-xl font-extrabold leading-snug text-navy transition-colors duration-200 group-hover:text-orange sm:text-2xl">
                  {featured.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-navy/65 sm:text-[15px]">
                  {featured.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <Meta post={featured} />
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-orange">
                    Read article
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Two most-recent runners-up */}
          {side.length > 0 && (
            <div className="grid gap-6 lg:col-span-2 lg:grid-rows-2">
              {side.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.12 + i * 0.12, ease }}
                >
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-orange/50 hover:bg-white/10"
                  >
                    <div className="relative aspect-[16/7] overflow-hidden">
                      <Cover
                        post={post}
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priorityIcon={32}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-heading line-clamp-2 text-base font-bold leading-snug text-white transition-colors duration-200 group-hover:text-orange">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/60">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <Meta post={post} light />
                        <ArrowUpRight
                          size={16}
                          className="text-orange transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        {/* Mobile "view all" */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-10 text-center sm:hidden"
        >
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/25 transition-all duration-200 hover:bg-orange-dark"
          >
            View all articles
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}