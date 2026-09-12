export const JEPBN_PATH = "/jepbn";
export const JEMSCN_PATH = "/jemscn";

export const NURSING_ENTRANCE_COURSES = [
  {
    id: "jepbn",
    path: JEPBN_PATH,
    name: "JEPBN",
    degree: "Post Basic B.Sc. Nursing",
    audience: "For GNM-qualified nursing aspirants",
    teaser:
      "Build on your GNM foundation and prepare for the next step in your nursing education.",
  },
  {
    id: "jemscn",
    path: JEMSCN_PATH,
    name: "JEMScN",
    degree: "M.Sc. Nursing",
    audience: "For nursing graduates",
    teaser:
      "Bring your nursing knowledge into focus as you prepare for postgraduate study.",
  },
] as const;

export type NursingEntranceSummary = (typeof NURSING_ENTRANCE_COURSES)[number];
