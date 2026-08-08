import type { Metadata } from "next";
import { getPosts } from "@/lib/data";
import BlogsContent from "@/components/sections/blogs/BlogContent";
import ComingSoon from "@/components/ui/ComingSoon";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog — ANM/GNM CET Preparation Tips & Strategy | MedhaUp",
  description:
    "Study strategy, subject guides, exam updates and preparation tips for the WBJEE ANM/GNM CET — written by the MedhaUp faculty in simple language.",
};

export default async function BlogsPage() {
  const posts = await getPosts(); // published only, newest first

  if (posts.length === 0) {
    return (
      <ComingSoon
        title="Blog"
        message="Our first preparation guides are being written right now. Message us on WhatsApp and we'll send them to you the day they're published."
      />
    );
  }

  return (
    <main>
      <BlogsContent posts={posts} />
    </main>
  );
}
