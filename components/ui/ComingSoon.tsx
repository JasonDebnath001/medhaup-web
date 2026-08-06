import Link from "next/link";
import { Hourglass, ArrowLeft, MessageCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import { waChatUrl } from "@/lib/settings";

type Props = {
  title: string;
  message?: string;
};

export default async function ComingSoon({ title, message }: Props) {
  const settings = await getSiteSettings();

  return (
    <main>
      <section className="flex min-h-[70vh] items-center bg-cream pt-28 pb-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-orange/10 text-orange">
            <Hourglass size={28} />
          </div>
          <span className="mt-6 inline-block rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-navy shadow-sm">
            COMING SOON
          </span>
          <h1 className="font-heading mt-5 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {title} is <span className="text-orange">on the way</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-navy/70">
            {message ??
              "We're preparing this section right now. Check back soon — or message us on WhatsApp and we'll tell you the moment it's live."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waChatUrl(
                settings,
                `Hi, please let me know when "${title}" goes live on the MedhaUp website.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark sm:w-auto"
            >
              <MessageCircle size={16} /> Notify me on WhatsApp
            </a>
            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy/5 sm:w-auto"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
