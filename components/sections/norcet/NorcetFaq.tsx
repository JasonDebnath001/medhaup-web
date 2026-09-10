import { NORCET_COURSE, NORCET_FAQS } from "@/lib/norcet";

export default function NorcetFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="norcet-faq-heading"
      className="bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
            Frequently Asked Questions
          </span>
          <h2
            id="norcet-faq-heading"
            className="font-heading mt-4 text-3xl font-extrabold text-navy sm:text-4xl"
          >
            NORCET <span className="text-orange">questions</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-navy/60">
            Quick answers about the exam, who can sit for it, and what the
            medhaup course will look like.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {NORCET_FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-navy/10 bg-cream px-5 py-4 shadow-sm open:border-teal/40 open:bg-white"
            >
              <summary className="font-heading flex cursor-pointer list-none items-center justify-between gap-4 font-bold leading-6 text-navy marker:hidden [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl font-normal leading-none text-teal transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 border-t border-navy/10 pt-3 text-sm leading-7 text-navy/65">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={NORCET_COURSE.waitlistAnchor}
            className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange/25 transition-all hover:bg-orange-dark hover:shadow-xl"
          >
            Join the NORCET waitlist
          </a>
        </div>
      </div>
    </section>
  );
}
