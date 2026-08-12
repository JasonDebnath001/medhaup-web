import type { MetadataRoute } from "next";
import { getPosts, type BlogPost } from "@/lib/data";

const SITE_URL = "https://medhaup.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: BlogPost[] = [];

  try {
    posts = await getPosts();
  } catch (error) {
    console.error("[sitemap] Failed to load blog posts:", error);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/course`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/syllabus`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/pyq`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/resources`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/current-affairs`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/store`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/admission`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/gallery`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const parsedDate = new Date(post.date);

    return {
      url: `${SITE_URL}/blogs/${post.slug}`,
      lastModified: Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}
