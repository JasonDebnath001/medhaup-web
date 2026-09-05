"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Heart,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import {
  getCampaignTimeRemaining,
  teachersDayCampaign as campaign,
  teachersDayWhatsAppUrl,
} from "@/lib/teachersDayCampaign";
import { useTeachersDayCampaign } from "./CampaignProvider";
import styles from "./TeachersDayCampaign.module.css";

function track(event: string, placement: string) {
  if (process.env.NEXT_PUBLIC_GA_ID)
    sendGAEvent("event", event, { campaign_id: campaign.id, placement });
}

export function TeachersDayWhatsAppLink({
  placement,
  className,
}: {
  placement: string;
  className?: string;
}) {
  return (
    <a
      className={className ?? styles.whatsapp}
      href={teachersDayWhatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("teachers_day_whatsapp_click", placement)}
    >
      <MessageCircle size={18} aria-hidden="true" /> Claim{" "}
      {campaign.formattedPrice} offer{" "}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

export function CampaignAnnouncementBar() {
  return (
    <aside
      className={styles.announcement}
      aria-label="Teachers’ Day weekend offer"
    >
      <div className={styles.announcementInner}>
        <GraduationCap
          className={styles.announcementIcon}
          size={21}
          aria-hidden="true"
        />
        <p>
          <strong>Teachers’ Day Special</strong>
          <span>
            {campaign.formattedPrice} batch · This weekend, till Sunday
          </span>
        </p>
        <Link
          href="/#teachers-day-offer"
          onClick={() =>
            track("teachers_day_offer_cta_click", "announcement_bar")
          }
        >
          View offer <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}

export function TeachersDayOffer({ compact = false }: { compact?: boolean }) {
  const { now, phase } = useTeachersDayCampaign();
  useEffect(() => {
    if (phase === "live")
      track(
        "teachers_day_offer_view",
        compact ? "course_or_admission" : "homepage_feature",
      );
  }, [phase, compact]);
  if (phase !== "live") return null;
  const time = getCampaignTimeRemaining(now, phase);
  if (compact)
    return (
      <aside
        className={styles.compact}
        aria-label="Teachers’ Day special batch price"
      >
        <div>
          <span className={styles.eyebrow}>
            <GraduationCap size={16} aria-hidden="true" /> Teachers’ Day weekend
          </span>
          <h2>Start your nursing journey for {campaign.formattedPrice}.</h2>
          <p>
            {campaign.batchName} · {campaign.deadlineLabel}
          </p>
          <p lang="bn">শুধু এই সপ্তাহান্তে — আজই Admission নিশ্চিত করুন!</p>
        </div>
        <TeachersDayWhatsAppLink placement="course_or_admission" />
      </aside>
    );
  return (
    <section
      id="teachers-day-offer"
      className={styles.section}
      aria-labelledby="teachers-day-heading"
    >
      <div className={styles.shell}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            <Sparkles size={16} aria-hidden="true" /> A little thank you. A
            brighter beginning.
          </span>
          <h2 id="teachers-day-heading">
            Great teachers.
            <br />
            Bigger dreams.
            <br />
            <em>A special start.</em>
          </h2>
          <p className={styles.intro}>
            For the teachers who believe in us, and the nurses we dream of
            becoming. Celebrate Teachers’ Day with a new step towards ANM/GNM
            2027.
          </p>
          <p className={styles.bengali} lang="bn">
            নার্সিং Entrance Preparation শুরু করার সেরা সময় এখনই।
          </p>
          <div className={styles.dedication}>
            <BookOpen size={30} strokeWidth={1.3} aria-hidden="true" />
            <span>
              To every teacher who makes a difference.
              <br />
              <strong>Happy Teachers’ Day, with love from medhaup.</strong>
            </span>
            <Heart size={17} aria-hidden="true" />
          </div>
        </div>
        <article className={styles.offerCard}>
          <div className={styles.cardTop}>
            <span>TEACHERS’ DAY SPECIAL</span>
            <GraduationCap size={30} strokeWidth={1.4} aria-hidden="true" />
          </div>
          <h3 lang="bn">{campaign.batchName}</h3>
          <p className={styles.courseLabel}>WBJEEB ANM/GNM 2027 preparation</p>
          <div className={styles.priceBlock}>
            <span>YOUR SPECIAL BATCH PRICE</span>
            <p>
              {campaign.formattedPrice}
              <span>only</span>
            </p>
          </div>
          <p className={styles.weekend} lang="bn">
            শুধু এই সপ্তাহান্তের জন্য!
          </p>
          <div className={styles.deadline}>
            <CalendarDays size={16} aria-hidden="true" />
            <span>
              {campaign.dateLabel}
              <br />
              <strong>Ends {campaign.deadlineLabel}</strong>
            </span>
          </div>
          <div className={styles.countdown}>
            <span>Make this weekend count</span>
            <div
              className={styles.timeGrid}
              role="timer"
              aria-live="off"
              aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds remaining`}
            >
              {[
                [time.days, "DAYS"],
                [time.hours, "HRS"],
                [time.minutes, "MIN"],
                [time.seconds, "SEC"],
              ].map(([value, label]) => (
                <div key={label}>
                  <strong>{String(value).padStart(2, "0")}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <TeachersDayWhatsAppLink placement="homepage_feature" />
          <p className={styles.contact}>
            Admission WhatsApp: {campaign.whatsappDisplay}
          </p>
          <p className={styles.note} lang="bn">
            আজই Admission নিশ্চিত করুন!{" "}
            <Heart size={13} fill="currentColor" aria-hidden="true" />
          </p>
        </article>
      </div>
    </section>
  );
}

export function MobileCampaignCTA() {
  return (
    <aside
      className={styles.sticky}
      aria-label="Teachers’ Day offer quick action"
    >
      <p>
        <strong>Teachers’ Day · {campaign.formattedPrice}</strong>
        <span>Ends Sunday, 6 September</span>
      </p>
      <TeachersDayWhatsAppLink
        placement="mobile_sticky"
        className={styles.stickyButton}
      />
    </aside>
  );
}
