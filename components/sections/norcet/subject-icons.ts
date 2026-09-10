import {
  Apple,
  Baby,
  BarChart3,
  Bone,
  Brain,
  ClipboardCheck,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Microscope,
  Pill,
  Presentation,
  Scale,
  Stethoscope,
  Users,
  FileText,
  type LucideIcon,
} from "lucide-react";
import type { NorcetWeight } from "@/lib/norcet";

/* Icon per subject, keyed by the id in lib/norcet.ts so the data file
   stays plain (serializable) and the visuals live with the UI. */
export const NORCET_SUBJECT_ICONS: Record<string, LucideIcon> = {
  "medical-surgical-nursing": Stethoscope,
  "fundamentals-of-nursing": ClipboardCheck,
  "obstetric-gynaecological-nursing": HeartHandshake,
  "community-health-nursing": Users,
  "child-health-nursing": Baby,
  "mental-health-nursing": Brain,
  "anatomy-physiology": Bone,
  pharmacology: Pill,
  microbiology: Microscope,
  "nutrition-biochemistry": Apple,
  "psychology-sociology": Lightbulb,
  "nursing-research-statistics": BarChart3,
  "nursing-education-management": Presentation,
  "nursing-ethics-professional-trends": Scale,
  "general-knowledge-aptitude-english": Globe2,
};

export const FALLBACK_SUBJECT_ICON: LucideIcon = FileText;

export const WEIGHT_LABEL: Record<NorcetWeight, string> = {
  "very-high": "Very high",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const WEIGHT_BADGE: Record<NorcetWeight, string> = {
  "very-high": "bg-orange text-white",
  high: "bg-navy text-white",
  medium: "bg-teal/15 text-teal-dark",
  low: "bg-navy/8 text-navy/60",
};

export const WEIGHT_BAR: Record<NorcetWeight, string> = {
  "very-high": "bg-gradient-to-r from-orange to-orange-dark",
  high: "bg-navy",
  medium: "bg-teal",
  low: "bg-navy/35",
};
