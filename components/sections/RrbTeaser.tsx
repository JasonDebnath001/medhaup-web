import Link from "next/link";
import { ArrowRight, TrainFront } from "lucide-react";
import { RRB_PATH } from "@/lib/rrb";

export default function RrbTeaser() {
  return (
    <section
      aria-labelledby="rrb-teaser-heading"
      className="bg-cream px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-3xl bg-navy p-6 text-white sm:p-10 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange">
            <TrainFront size={18} aria-hidden="true" />
            RRB Nursing Preparation
          </p>
          <h2
            id="rrb-teaser-heading"
            className="font-heading mt-5 text-3xl font-extrabold sm:text-4xl"
          >
            Take your nursing career to the railways.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Prepare for Nursing Superintendent recruitment with medhaup. Explore
            the nursing subjects, full syllabus and 100-mark CBT pattern.
          </p>
        </div>
        <Link
          href={RRB_PATH}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 font-bold text-navy hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Explore RRB Nursing <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
