import { cache } from "react";
import { supabaseServer } from "./supabase/server";
import { SITE_DEFAULTS, type SiteSettings } from "./settings";

export { waChatUrl } from "./settings";
export type { SiteSettings };

/* snake_case DB rows → camelCase props the components use */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toCamel = <T>(row: Record<string, any>): T =>
  Object.fromEntries(
    Object.entries(row).map(([k, v]) => [
      k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
      v,
    ])
  ) as T;

async function fetchPublished<T>(
  table: string,
  orderBy: string,
  ascending = false
): Promise<T[]> {
  const { data, error } = await supabaseServer()
    .from(table)
    .select("*")
    .eq("published", true)
    .order(orderBy, { ascending });
  if (error) {
    console.error(`[data] ${table}:`, error.message);
    return [];
  }
  return (data ?? []).map((r) => toCamel<T>(r));
}

/* ---------- Types (camelCase mirrors of the tables) ---------- */
export type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  mrp: number | null;
  language: string;
  image: string;
  inStock: boolean;
  isNew: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover: string | null;
  date: string;
  readMins: number;
  tags: string[];
};

export type PYQ = {
  id: string;
  title: string;
  year: number;
  description: string;
  language: string;
  fileSize: string;
  paperUrl: string;
  answerKeyUrl: string | null;
  isNew: boolean;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string | null;
  category: string;
  aspect: "tall" | "wide" | "square";
};

export type MonthlyCA = {
  id: string;
  title: string;
  month: string;
  description: string;
  language: string;
  fileSize: string;
  fileUrl: string;
  isNew: boolean;
};

export type DailyCA = {
  id: string;
  headline: string;
  detail: string;
  date: string;
  tag: string;
};

export type Resource = {
  id: string;
  title: string;
  category: string;
  description: string;
  language: string;
  fileSize: string;
  fileUrl: string;
  isNew: boolean;
};

export type SubjectSyllabus = {
  id: string;
  sid: string;
  name: string;
  blurb: string;
  questions: number;
  fileUrl: string;
  fileName: string;
};

export type SyllabusDownload = {
  id: string;
  label: string;
  caption: string;
  fileUrl: string;
  fileName: string;
};

export type Batch = {
  id: string;
  name: string;
  startDate: string;
  mode: string;
  timing: string;
  seatsFilled: number;
  seatsTotal: number;
};

const isValidPublicSlug = (slug: string) =>
  slug.length > 0 &&
  slug.length <= 160 &&
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

/* ---------- Fetchers (published rows only) ---------- */
export const getProducts = () =>
  fetchPublished<Product>("products", "created_at");
export const getPosts = async () =>
  (await fetchPublished<BlogPost>("blog_posts", "date", false)).filter(
    (post) => isValidPublicSlug(post.slug),
  );
export const getPYQs = () => fetchPublished<PYQ>("pyqs", "year");
export const getGallery = () =>
  fetchPublished<GalleryItem>("gallery_items", "created_at");
export const getMonthlyCA = () =>
  fetchPublished<MonthlyCA>("current_affairs_monthly", "created_at");
export const getDailyCA = () =>
  fetchPublished<DailyCA>("current_affairs_daily", "date");
export const getResources = () =>
  fetchPublished<Resource>("resources", "created_at");
export const getSubjects = () =>
  fetchPublished<SubjectSyllabus>("syllabus_subjects", "questions");
export const getSyllabusDownloads = () =>
  fetchPublished<SyllabusDownload>("syllabus_downloads", "created_at", true);
export const getBatches = () => fetchPublished<Batch>("batches", "created_at");

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!isValidPublicSlug(slug)) return null;

  const { data, error } = await supabaseServer()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("[data] blog_posts by slug:", error.message);
    return null;
  }
  return data ? toCamel<BlogPost>(data) : null;
});

/* ---------- Site settings, merged over safe defaults ---------- */
export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabaseServer()
    .from("site_settings")
    .select("data")
    .eq("id", 1)
    .maybeSingle();
  if (error) {
    console.error("[data] site_settings:", error.message);
    return SITE_DEFAULTS;
  }
  return { ...SITE_DEFAULTS, ...(data?.data ?? {}) };
}
