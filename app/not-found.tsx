import Link from "next/link";
import { ArrowRight, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-cream px-4 pt-32 pb-20">
      {/* Faint grid — same treatment as the Hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a0c70 1px, transparent 1px), linear-gradient(to bottom, #1a0c70 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange/15 blur-3xl"
      />

      <div className="relative text-center">
        <p className="font-heading text-[6rem] font-extrabold leading-none text-navy/10 sm:text-[8rem]">
          404
        </p>
        <h1 className="font-heading -mt-6 text-3xl font-extrabold text-navy sm:text-4xl">
          This page doesn&apos;t <span className="text-orange">exist</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-slate-600">
          The link may be old or mistyped. Everything you need for ANM/GNM
          preparation is still here:
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/25 transition-all duration-200 hover:bg-orange-dark"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link
            href="/resources"
            className="group flex items-center gap-2 rounded-full border border-navy/15 bg-white px-7 py-3.5 font-semibold text-navy transition-all duration-200 hover:border-orange hover:text-orange"
          >
            <BookOpen size={18} />
            Free Resources
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
