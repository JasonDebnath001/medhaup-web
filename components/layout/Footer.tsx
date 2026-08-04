"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { FaYoutube, FaInstagram, FaTelegram } from "react-icons/fa6";

/* ---------------- Data — edit here ---------------- */

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "ANM/GNM Course", href: "/course" },
  { label: "Free Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Take Admission", href: "/admission" },
];

const RESOURCE_LINKS = [
  { label: "Download Syllabus", href: "/resources" },
  { label: "Previous Year Papers", href: "/resources" },
  { label: "Mock Tests", href: "/resources" },
  { label: "Exam Pattern Guide", href: "/course" },
];

/* Placeholders — replace with real handles/numbers before launch */
const SOCIALS = [
  { label: "YouTube", href: "https://youtube.com/@medhaup", icon: FaYoutube },
  { label: "Instagram", href: "https://instagram.com/medhaup", icon: FaInstagram },
  { label: "Telegram", href: "https://t.me/medhaup", icon: FaTelegram },
];

const CONTACT = [
  { icon: Phone, value: "+91 8910840928", href: "tel:+918910840928" },
  { icon: Mail, value: "contact@medhaup.com", href: "mailto:contact@medhaup.com" },
  { icon: MapPin, value: "Kolkata, West Bengal", href: undefined },
];

/* ---------------- Component ---------------- */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-orange/10 blur-3xl"
      />

      {/* ---- CTA strip ---- */}
      <div className="relative border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 py-10 text-center sm:px-6 md:flex-row md:text-left"
        >
          <div>
            <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
              Ready to start your{" "}
              <span className="text-orange">nursing journey?</span>
            </h2>
            <p className="mt-2 text-white/60">
              Seats are limited per batch — reserve yours today.
            </p>
          </div>
          <Link
            href="/admission"
            className="group flex shrink-0 items-center gap-2 rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/25 transition-all duration-200 hover:bg-orange-dark hover:shadow-xl"
          >
            Take Admission
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* ---- Main columns ---- */}
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="MedhaUp"
              width={180}
              height={52}
              className=""
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            West Bengal&apos;s focused preparation platform for the WBJEE
            ANM/GNM CET — taught in Bengali and English.
          </p>
          <ul className="mt-5 flex gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-200 hover:border-orange hover:bg-orange hover:text-white"
                >
                  <s.icon size={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer quick links">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white/40">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-orange"
                >
                  <span className="h-1 w-1 rounded-full bg-orange opacity-0 transition-opacity group-hover:opacity-100" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resources */}
        <nav aria-label="Footer resources">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white/40">
            Resources
          </h3>
          <ul className="mt-4 space-y-2.5">
            {RESOURCE_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-orange"
                >
                  <span className="h-1 w-1 rounded-full bg-orange opacity-0 transition-opacity group-hover:opacity-100" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white/40">
            Contact
          </h3>
          <ul className="mt-4 space-y-3.5">
            {CONTACT.map((c) => (
              <li key={c.value} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 text-orange">
                  <c.icon size={16} />
                </span>
                {c.href ? (
                  <a
                    href={c.href}
                    className="text-sm text-white/70 transition-colors hover:text-orange"
                  >
                    {c.value}
                  </a>
                ) : (
                  <span className="text-sm text-white/70">{c.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6">
          <p className="text-xs text-white/45">
            © {year} MedhaUp. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            Made with{" "}
            <span aria-hidden="true" className="text-orange">
              ♥
            </span>{" "}
            for West Bengal&apos;s future nurses
          </p>
        </div>
      </div>
    </footer>
  );
}