"use client";

import { motion } from "framer-motion";
import { MessageCircle, BellRing, ArrowRight } from "lucide-react";

/* Replace with your real channel invite link */
const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/YOUR_CHANNEL_ID";

export default function WhatsAppStrip() {
  return (
    <section className="bg-white pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl bg-navy p-8 sm:p-10"
        >
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange/20 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#25D366] text-white shadow-lg">
                <MessageCircle size={28} />
              </span>
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-white">
                  New resources drop on{" "}
                  <span className="text-orange">WhatsApp first</span>
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-white/65 md:mx-0">
                  Join the free MedhaUp channel — get every new PDF, mock test
                  and exam update the moment it&apos;s released.
                </p>
              </div>
            </div>

            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex shrink-0 items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white shadow-lg shadow-black/20 transition-all duration-200 hover:brightness-110"
            >
              <BellRing size={18} />
              Join Free Channel
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}