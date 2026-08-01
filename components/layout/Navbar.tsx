"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import clsx from "clsx";

// Structured as an array of objects with optional `children` so
// "ANM/GNM Course" can become a dropdown later without a rewrite.
type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "ANM/GNM Course", href: "/course" }, // add `children` here later
  { label: "Free Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Shadow + frosted background once scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Escape key closes the mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
            alt="Logo"
            width={300}
            height={150}
            priority
            className="h-10 w-auto sm:h-12"
          />
          {/* Fallback while you drop the real logo into /public — delete after */}
          {/* <span className="font-heading text-lg font-extrabold text-navy">LOGO</span> */}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "relative z-10 block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 lg:px-4",
                    active ? "text-white" : "text-white/65 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-orange"
                  />
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
            onClick={() => setMobileOpen((v) => !v)}
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
              onClick={() => setMobileOpen(false)}
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
              className="fixed inset-y-0 right-0 z-50 flex w-[78%] max-w-xs flex-col bg-white shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
                <span className="font-heading text-sm font-bold uppercase tracking-wider text-navy/50">
                  Menu
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full text-navy transition-colors hover:bg-navy/5"
                >
                  <X size={20} />
                </button>
              </div>

              <ul className="flex flex-col gap-1 px-3 py-4">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.055 }}
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
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto border-t border-navy/10 p-4">
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
