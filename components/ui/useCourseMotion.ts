"use client";

import { useReducedMotion } from "framer-motion";

export function useCourseMotion() {
  const reduceMotion = useReducedMotion();

  function transition(delay: number) {
    return {
      duration: reduceMotion ? 0 : 0.5,
      delay: reduceMotion ? 0 : delay,
      ease: "easeOut" as const,
    };
  }

  return {
    reduceMotion,
    enter: (delay = 0) => ({
      initial: reduceMotion ? (false as const) : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: transition(delay),
    }),
    reveal: (delay = 0) => ({
      initial: reduceMotion ? (false as const) : { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-40px" },
      transition: transition(delay),
    }),
  };
}
