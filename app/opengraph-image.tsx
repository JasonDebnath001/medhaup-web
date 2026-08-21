import { ImageResponse } from "next/og";

export const alt = "medhaup ANM GNM 2027 preparation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#fffaf3",
          color: "#1a0c70",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 430,
            height: 430,
            borderRadius: 999,
            background: "#fe7b30",
            opacity: 0.14,
            right: -120,
            top: -160,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 330,
            height: 330,
            borderRadius: 999,
            background: "#1a0c70",
            opacity: 0.08,
            left: -130,
            bottom: -180,
          }}
        />
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
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            medha<span style={{ color: "#fe7b30" }}>up</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: "#fe7b30",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              WBJEEB Nursing Entrance
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                maxWidth: 930,
                fontSize: 68,
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: -2,
              }}
            >
              ANM &amp; GNM 2027 Preparation
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 28,
                color: "#1a0c70b8",
              }}
            >
              Bengali + English classes, PYQs, mock tests and study resources
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#1a0c7099" }}>
            Concept Clear. Score Up. · medhaup.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
