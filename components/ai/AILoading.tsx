import AILogo from "./AILogo";
import styles from "./AIChatEffects.module.css";

export default function AILoading() {
  return (
    <div role="status" aria-live="polite" className={styles.loading}>
      <span className="sr-only">medhaup AI is preparing an answer</span>
      <AILogo
        size={24}
        decorative
        className="mt-1.5 size-6 shrink-0 ring-1 ring-navy/10"
      />
      <div className={styles.thinkingBubble} aria-hidden="true">
        <span className={styles.thinkingText}>Thinking</span>
        <span className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
      </div>
    </div>
  );
}
