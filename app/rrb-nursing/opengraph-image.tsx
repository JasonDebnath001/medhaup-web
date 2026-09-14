import { ImageResponse } from "next/og";

export const alt = "RRB Nursing preparation course at medhaup";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#1a0c70",
          color: "white",
          padding: "70px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#ff974d",
            fontSize: 24,
            letterSpacing: 4,
          }}
        >
          NURSING SUPERINTENDENT PREPARATION
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            marginTop: 32,
          }}
        >
          RRB Nursing.
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 18 }}>
          Nursing Superintendent preparation
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 48 }}>
          {["Subjects & syllabus", "100 marks", "90-minute CBT"].map((text) => (
            <div
              key={text}
              style={{
                display: "flex",
                border: "1px solid #7770a7",
                borderRadius: 16,
                padding: "16px 22px",
                fontSize: 23,
              }}
            >
              {text}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 52,
            color: "#ff974d",
            fontSize: 27,
          }}
        >
          medhaup.com
        </div>
      </div>
    ),
    size,
  );
}
