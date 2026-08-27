"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase/client";
import { COLLECTIONS } from "@/lib/admin/collections";

type Stat = { slug: string; title: string; total: number; published: number };

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const supabase = supabaseBrowser();
    Promise.all(
      COLLECTIONS.map(async (c) => {
        const [{ count: total }, { count: published }] = await Promise.all([
          supabase.from(c.table).select("*", { count: "exact", head: true }),
          supabase
            .from(c.table)
            .select("*", { count: "exact", head: true })
            .eq("published", true),
        ]);
        return {
          slug: c.slug,
          title: c.title,
          total: total ?? 0,
          published: published ?? 0,
        };
      }),
    ).then(setStats);
  }, []);

  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold text-navy">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-navy/60">
        Manage the content currently published across the website.
      </p>
      <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.slug}
            href={`/admin/${s.slug}`}
            className="min-w-0 rounded-2xl border border-navy/10 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
          >
            <p className="text-sm font-semibold text-navy/60">{s.title}</p>
            <p className="font-heading mt-2 break-words text-3xl font-extrabold text-navy">
              {s.published}
              <span className="text-base font-semibold text-navy/40">
                {" "}
                / {s.total} live
              </span>
            </p>
            {s.published === 0 && (
              <span className="mt-2 inline-block rounded-full bg-orange/10 px-2.5 py-1 text-[11px] font-bold text-orange">
                SHOWING COMING SOON
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
