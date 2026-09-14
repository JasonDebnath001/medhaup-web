import { ImageResponse } from "next/og";

export const alt = "NORCET syllabus, exam pattern and subjects on medhaup";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#1a0c70",
        color: "#ffffff",
        padding: "72px 80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 480,
          borderRadius: 999,
          background: "#14b8a6",
          opacity: 0.18,
          right: -140,
          top: -180,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: 999,
          background: "#fe7b30",
          opacity: 0.16,
          left: -140,
          bottom: -200,
        }}
      />
      {/* ECG trace */}
      <svg
        viewBox="0 0 1200 120"
        width="1200"
        height="120"
        style={{ position: "absolute", left: 0, top: 440, opacity: 0.35 }}
      >
        <path
          d="M0 60H240L262 60L276 22L292 102L308 44L322 60H540L562 60L576 18L592 106L608 40L622 60H840L862 60L876 26L892 98L908 46L922 60H1200"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            medha<span style={{ color: "#fe7b30" }}>up</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 22px",
              borderRadius: 999,
              border: "2px solid rgba(20,184,166,0.5)",
              background: "rgba(20,184,166,0.12)",
              color: "#14b8a6",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#14b8a6",
              }}
            />
            NORCET PREPARATION
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#14b8a6",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            AIIMS Nursing Officer Exam
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              maxWidth: 980,
              fontSize: 68,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            NORCET Syllabus, Exam Pattern &amp; Subjects
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 28,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            Two stages · 100 questions · 90 minutes · Bengali + English course
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Concept Clear. Score Up. · medhaup.com/norcet
        </div>
      </div>
    </div>,
    size,
  );
}
