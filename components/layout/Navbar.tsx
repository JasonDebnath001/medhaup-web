"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import clsx from "clsx";

// Structured as an array of objects with optional `children` —
// items with `children` render as a hover dropdown on desktop
// and an indented sub-list in the mobile menu.
type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "ANM/GNM Course", href: "/course" },
  {
    label: "Study Material",
    href: "/resources",
    children: [
      { label: "Free Resources", href: "/resources" },
      { label: "Syllabus", href: "/syllabus" },
      { label: "Previous Year Papers", href: "/pyq" },
      { label: "Current Affairs", href: "/current-affairs" },
    ],
  },
  { label: "Store", href: "/store" },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpenPath, setMobileOpenPath] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mobileOpen = mobileOpenPath === pathname;

  // Shadow + frosted background once scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape key closes the mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpenPath(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* An item is "active" when the current path matches it or any of
     its children. Exact match for "/", prefix match elsewhere. */
  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    if (pathname.startsWith(item.href)) return true;
    return item.children?.some((c) => pathname.startsWith(c.href)) ?? false;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className={clsx(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled
            ? "border-white/10 bg-navy/95 shadow-lg shadow-navy/30 backdrop-blur-md"
            : "border-transparent bg-navy",
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="medhaup ANM GNM preparation"
            width={300}
            height={150}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-haspopup={item.children ? "menu" : undefined}
                  className={clsx(
                    "relative z-10 flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 lg:px-3.5",
                    active ? "text-white" : "text-white/65 hover:text-white",
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-orange"
                  />
                )}

                {/* Dropdown (desktop, hover/focus) */}
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="min-w-52 rounded-2xl border border-navy/10 bg-white p-2 shadow-xl shadow-navy/15">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={clsx(
                              "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                              pathname === child.href
                                ? "bg-orange/10 text-orange"
                                : "text-navy/75 hover:bg-navy/5 hover:text-navy",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right side: CTA always visible + hamburger on mobile */}
        <div className="flex items-center gap-2">
          <Link
            href="/admission"
            className="group flex items-center gap-1.5 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange/30 transition-all duration-200 hover:bg-orange-dark hover:shadow-lg hover:shadow-orange/40 hover:ring-2 hover:ring-white/30 sm:px-5 sm:py-2.5"
          >
            Take Admission
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpenPath(mobileOpen ? null : pathname)}
            className="grid h-10 w-10 place-items-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — closes on outside click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpenPath(null)}
              className="fixed inset-0 z-40 bg-navy/30 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              id="mobile-menu"
              ref={panelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex w-[78%] max-w-xs flex-col bg-white shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
                <span className="font-heading text-sm font-bold uppercase tracking-wider text-navy/50">
                  Menu
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpenPath(null)}
                  className="grid h-9 w-9 place-items-center rounded-full text-navy transition-colors hover:bg-navy/5"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable link list (9 items + children need it on
                  short screens) */}
              <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(item);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.045 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={clsx(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                          active
                            ? "bg-navy text-white"
                            : "text-navy/80 hover:bg-navy/5 hover:text-navy",
                        )}
                      >
                        {item.label}
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                        )}
                      </Link>

                      {/* Children — indented sub-list. slice(1) skips
                          "Free Resources" since the parent row already
                          links to /resources. */}
                      {item.children && (
                        <ul className="ml-4 mt-1 space-y-0.5 border-l-2 border-navy/10 pl-3">
                          {item.children.slice(1).map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={clsx(
                                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                                  pathname === child.href
                                    ? "font-semibold text-orange"
                                    : "text-navy/60 hover:text-navy",
                                )}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              <div className="border-t border-navy/10 p-4">
                <Link
                  href="/admission"
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange px-4 py-3 font-semibold text-white shadow-md shadow-orange/30 transition-colors hover:bg-orange-dark"
                >
                  Take Admission <ArrowRight size={17} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
