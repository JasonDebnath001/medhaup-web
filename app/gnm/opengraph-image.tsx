import { ImageResponse } from "next/og";
import { GNM_YEARS } from "@/lib/gnm";

export const alt = "GNM 1st, 2nd and 3rd year courses coming soon to medhaup";
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
        <span style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3 }}>
          Your next chapter in nursing.
        </span>
        <span style={{ fontSize: 34, color: "#fe7b30", marginTop: 22 }}>
          General Nursing &amp; Midwifery
        </span>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {GNM_YEARS.map((year, index) => (
          <div
            key={year.id}
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              gap: 20,
              borderRadius: 16,
              padding: "22px 26px",
              color: "#1a0c70",
              background: ["#ede9fb", "#fff0e4", "#e9effc"][index],
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 700 }}>{year.number}</span>
            <span style={{ fontSize: 25, fontWeight: 700 }}>
              GNM {year.label}
            </span>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
