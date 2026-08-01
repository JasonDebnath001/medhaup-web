"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function CourseCTA() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-navy text-white">
            <GraduationCap size={26} />
          </span>
          <h2 className="font-heading mt-5 text-2xl font-extrabold text-navy sm:text-3xl">
            Like the free material?{" "}
            <span className="text-orange">The full course goes deeper.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-navy/65">
            Live classes, weekly mocks, complete notes and doubt support for
            12 months — ₹1,800 total, EMI available.
          </p>
          <Link
            href="/course#fees"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/30 transition-all duration-200 hover:bg-orange-dark hover:shadow-xl"
          >
            See the Full Course
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}