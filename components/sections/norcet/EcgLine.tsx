"use client";

import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

type Props = {
  className?: string;
  /** Seconds before the line starts drawing. */
  delay?: number;
  /** Draw as soon as mounted instead of waiting to scroll into view. */
  immediate?: boolean;
};

/* A single ECG trace that draws itself. Inherits `currentColor` so the
   parent controls the tint (teal on navy, navy on cream). */
export default function EcgLine({
  className,
  delay = 0.2,
  immediate = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const animate = { pathLength: 1, opacity: 1 };

  return (
    <svg
      viewBox="0 0 1200 120"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={clsx("block h-full w-full", className)}
    >
      <motion.path
        d="M0 60H240L262 60L276 22L292 102L308 44L322 60H540L562 60L576 18L592 106L608 40L622 60H840L862 60L876 26L892 98L908 46L922 60H1200"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0.35 }}
        {...(immediate
          ? { animate }
          : { whileInView: animate, viewport: { once: true, amount: 0.3 } })}
        transition={{ duration: 2.2, ease: "easeInOut", delay }}
      />
    </svg>
  );
}
