"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  Settings,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import clsx from "clsx";
import { supabaseBrowser } from "@/lib/supabase/client";
import { COLLECTIONS } from "@/lib/admin/collections";

type AdminNavigationProps = {
  pathname: string;
  onNavigate?: () => void;
  onLogout: () => Promise<void>;
};

function AdminNavigation({
  pathname,
  onNavigate,
  onLogout,
}: AdminNavigationProps) {
  const linkClass = (active: boolean) =>
    clsx(
      "flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
      active
        ? "bg-orange text-white"
        : "text-white/70 hover:bg-white/10 hover:text-white",
    );

  return (
    <>
      <nav
        aria-label="Admin navigation"
        className="mt-2 min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain"
      >
        <Link
          href="/admin"
          onClick={onNavigate}
          aria-current={pathname === "/admin" ? "page" : undefined}
          className={clsx(linkClass(pathname === "/admin"), "gap-2.5")}
        >
          <LayoutDashboard size={17} aria-hidden="true" /> Dashboard
        </Link>
        {COLLECTIONS.map((collection) => {
          const active = pathname === `/admin/${collection.slug}`;
          return (
            <Link
              key={collection.slug}
              href={`/admin/${collection.slug}`}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={linkClass(active)}
            >
              {collection.title}
            </Link>
          );
        })}
        <Link
          href="/admin/settings"
          onClick={onNavigate}
          aria-current={pathname === "/admin/settings" ? "page" : undefined}
          className={clsx(linkClass(pathname === "/admin/settings"), "gap-2.5")}
        >
          <Settings size={17} aria-hidden="true" /> Site Settings
        </Link>
      </nav>
      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          void onLogout();
        }}
        className="mt-3 flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      >
        <LogOut size={17} aria-hidden="true" /> Log out
      </button>
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) return;
    const supabase = supabaseBrowser();
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
        return;
      }
      // Session alone isn't enough — verify membership in the admins table.
      const { data: admin } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      if (!admin) {
        await supabase.auth.signOut();
        router.replace("/admin/login");
      } else {
        setReady(true);
      }
    });
  }, [isLogin, pathname, router]);

  useEffect(() => {
    if (!navOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [navOpen]);

  if (isLogin) return <>{children}</>;

  if (!ready)
    return (
      <div className="grid min-h-dvh place-items-center bg-cream">
        <Loader2 className="animate-spin text-navy" />
      </div>
    );

  const logout = async () => {
    await supabaseBrowser().auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-dvh overflow-x-hidden bg-cream">
      <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-white/10 bg-navy px-4 shadow-sm lg:hidden">
        <p className="font-heading text-base font-extrabold text-white">
          medhaup <span className="text-orange">Admin</span>
        </p>
        <button
          type="button"
          onClick={() => setNavOpen(true)}
          aria-label="Open admin menu"
          aria-expanded={navOpen}
          className="grid h-11 w-11 place-items-center rounded-xl text-white transition-colors hover:bg-white/10"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </header>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-navy/10 bg-navy p-4 lg:flex">
        <p className="font-heading px-2 py-3 text-lg font-extrabold text-white">
          medhaup <span className="text-orange">Admin</span>
        </p>
        <AdminNavigation pathname={pathname} onLogout={logout} />
      </aside>

      {navOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close admin menu"
            onClick={() => setNavOpen(false)}
            className="absolute inset-0 bg-navy/55 backdrop-blur-sm"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Admin menu"
            className="absolute inset-y-0 right-0 flex h-dvh w-[min(20rem,calc(100vw-3rem))] flex-col bg-navy p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-heading px-2 py-3 text-lg font-extrabold text-white">
                medhaup <span className="text-orange">Admin</span>
              </p>
              <button
                type="button"
                onClick={() => setNavOpen(false)}
                aria-label="Close admin menu"
                autoFocus
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white transition-colors hover:bg-white/10"
              >
                <X size={21} aria-hidden="true" />
              </button>
            </div>
            <AdminNavigation
              pathname={pathname}
              onNavigate={() => setNavOpen(false)}
              onLogout={logout}
            />
          </aside>
        </div>
      )}

      <main className="min-w-0 px-4 py-5 sm:px-6 sm:py-7 lg:ml-60 lg:p-8 xl:p-10">
        {children}
      </main>
    </div>
  );
}
