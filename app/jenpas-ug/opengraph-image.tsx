import { ImageResponse } from "next/og";
import { JENPAS_PAPERS } from "@/lib/jenpas";

export const alt =
  "JENPAS(UG) Paper I and Paper II preparation coming soon to medhaup";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
        <span style={{ fontSize: 80, fontWeight: 700, letterSpacing: -3 }}>
          JENPAS(UG).
        </span>
        <span style={{ fontSize: 38, color: "#fe7b30", marginTop: 14 }}>
          Your next step in healthcare.
        </span>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {JENPAS_PAPERS.map((paper, index) => (
          <div
            key={paper.id}
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: 10,
              borderRadius: 16,
              padding: "22px 26px",
              color: "#1a0c70",
              background: ["#e5f0fb", "#fff0e4"][index],
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 700 }}>{paper.label}</span>
            <span style={{ fontSize: 21 }}>{paper.title}</span>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
