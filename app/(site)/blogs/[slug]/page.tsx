import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import { getPostBySlug, getSiteSettings } from "@/lib/data";
import { waChatUrl } from "@/lib/settings";
import MarkdownContent from "@/components/ui/MarkdownContent";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found | MedhaUp" };
  return {
    title: `${post.title} | MedhaUp Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
  ]);
  if (!post) notFound();

  return (
    <main>
      <article className="bg-cream pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy/60 transition-colors hover:text-orange"
          >
            <ArrowLeft size={15} /> All articles
          </Link>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-orange/10 px-2.5 py-1 text-[11px] font-semibold text-orange"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-heading mt-4 text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-navy/55">
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {post.readMins} min read
            </span>
          </div>

          {post.cover && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-navy/10 shadow-lg">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mt-10">
            <MarkdownContent content={post.content} />
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
            <h2 className="font-heading text-xl font-bold text-navy">
              Have a question about your preparation?
            </h2>
            <p className="mt-2 text-sm text-navy/65">
              Message us on WhatsApp — Bengali or English, we reply the same
              day.
            </p>

            
            <a  href={waChatUrl(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}