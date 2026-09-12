import type { NursingEntranceSummary } from "@/lib/nursing-entrance-catalog";

export default function NursingEntranceOg({
  course,
}: {
  course: NursingEntranceSummary;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "60px 72px",
        background: "#1a0c70",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 30, fontWeight: 700 }}>medhaup</span>
        <span
          style={{
            border: "1px solid #fe7b30",
            borderRadius: 50,
            padding: "12px 22px",
            fontSize: 18,
            color: "#fe7b30",
            letterSpacing: 3,
          }}
        >
          COMING SOON
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>
          {course.name}.
        </span>
        <span style={{ fontSize: 38, color: "#fe7b30", marginTop: 12 }}>
          {course.degree} entrance preparation
        </span>
        <span style={{ fontSize: 23, color: "#ffffffb3", marginTop: 20 }}>
          {course.audience}
        </span>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {["Subjects & syllabus", "Exam pattern", "Launch updates"].map(
          (label, index) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "center",
                flex: 1,
                borderRadius: 16,
                padding: "24px 16px",
                color: "#1a0c70",
                background: index === 1 ? "#fff0e4" : "#e5f0fb",
                fontSize: 22,
              }}
            >
              {label}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
