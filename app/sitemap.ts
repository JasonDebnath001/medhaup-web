import type { MetadataRoute } from "next";
import {
  getDailyCA,
  getGallery,
  getPosts,
  type BlogPost,
  type DailyCA,
  type GalleryItem,
} from "@/lib/data";

const SITE_URL = "https://medhaup.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: BlogPost[] = [];
  let gallery: GalleryItem[] = [];
  let dailyCurrentAffairs: DailyCA[] = [];

  try {
    [posts, gallery, dailyCurrentAffairs] = await Promise.all([
      getPosts(),
      getGallery(),
      getDailyCA(),
    ]);
  } catch (error) {
    console.error("[sitemap] Failed to load dynamic content:", error);
  }

  const latestBlogDate = posts
    .map((post) => new Date(post.date))
    .find((date) => !Number.isNaN(date.getTime()));
  const latestCurrentAffairsDate = dailyCurrentAffairs
    .map((item) => new Date(item.date))
    .find((date) => !Number.isNaN(date.getTime()));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/arushi.png`],
    },
    {
      url: `${SITE_URL}/course`,
      changeFrequency: "weekly",
      priority: 0.95,
      images: [`${SITE_URL}/arushi.png`],
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
      lastModified: latestCurrentAffairsDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: latestBlogDate,
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
      images: gallery.map((item) =>
        item.src.startsWith("http") ? item.src : `${SITE_URL}${item.src}`,
      ),
    },
    {
      url: `${SITE_URL}/wall-of-success`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
      images: [
        "https://ik.imagekit.io/medhaup/WhatsApp%20Image%202026-08-01%20at%201.26.23%20AM%20(1).png",
      ],
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
      images: post.cover
        ? [
            post.cover.startsWith("http")
              ? post.cover
              : `${SITE_URL}${post.cover}`,
          ]
        : undefined,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}
