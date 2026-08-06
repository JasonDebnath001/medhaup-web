"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, Settings, Loader2 } from "lucide-react";
import clsx from "clsx";
import { supabaseBrowser } from "@/lib/supabase/client";
import { COLLECTIONS } from "@/lib/admin/collections";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }
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

  if (isLogin) return <>{children}</>;

  if (!ready)
    return (
      <div className="grid min-h-screen place-items-center bg-cream">
        <Loader2 className="animate-spin text-navy" />
      </div>
    );

  const logout = async () => {
    await supabaseBrowser().auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-navy/10 bg-navy p-4">
        <p className="font-heading px-2 py-3 text-lg font-extrabold text-white">
          MedhaUp <span className="text-orange">Admin</span>
        </p>
        <nav className="mt-2 flex-1 space-y-0.5 overflow-y-auto">
          <Link
            href="/admin"
            className={clsx(
              "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === "/admin"
                ? "bg-orange text-white"
                : "text-white/65 hover:bg-white/10 hover:text-white"
            )}
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              href={`/admin/${c.slug}`}
              className={clsx(
                "block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === `/admin/${c.slug}`
                  ? "bg-orange text-white"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              )}
            >
              {c.title}
            </Link>
          ))}
          <Link
            href="/admin/settings"
            className={clsx(
              "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === "/admin/settings"
                ? "bg-orange text-white"
                : "text-white/65 hover:bg-white/10 hover:text-white"
            )}
          >
            <Settings size={16} /> Site Settings
          </Link>
        </nav>
        <button
          onClick={logout}
          className="mt-3 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-white/65 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut size={16} /> Log out
        </button>
      </aside>

      <main className="ml-60 flex-1 p-8">{children}</main>
    </div>
  );
}