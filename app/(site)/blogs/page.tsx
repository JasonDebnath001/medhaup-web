import { getPosts } from "@/lib/data";
import BlogsContent from "@/components/sections/blogs/BlogContent";
import ComingSoon from "@/components/ui/ComingSoon";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, createPageMetadata, createPageSchema } from "@/lib/seo";

export const revalidate = 60;

const title = "ANM/GNM Preparation Blog: Tips & Strategy";
const description =
  "Read ANM/GNM study strategies, subject guides, exam updates and preparation tips for the WBJEEB nursing entrance exam from medhaup faculty.";

export const metadata = createPageMetadata({
  title,
  description,
  path: "/blogs",
  keywords: [
    "ANM GNM preparation blog",
    "ANM GNM study tips",
    "ANM GNM exam strategy",
    "WBJEEB nursing exam updates",
  ],
});

export default async function BlogsPage() {
  const posts = await getPosts(); // published only, newest first
  const schema = createPageSchema({
    type: "Blog",
    path: "/blogs",
    name: `${title} | medhaup`,
    description,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blogs" },
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/blogs/${post.slug}`),
        name: post.title,
      })),
    },
  });

  if (posts.length === 0) {
    return (
      <>
        <JsonLd data={schema} />
        <ComingSoon
          title="Blog"
          message="Our first preparation guides are being written right now. Message us on WhatsApp and we'll send them to you the day they're published."
        />
      </>
    );
  }

  return (
    <main>
      <JsonLd data={schema} />
      <BlogsContent posts={posts} />
    </main>
  );
}
