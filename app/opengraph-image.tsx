import { ImageResponse } from "next/og";
import {
  getCampaignPhase,
  teachersDayCampaign as campaign,
} from "@/lib/teachersDayCampaign";
export const alt = "medhaup ANM GNM 2027 preparation and special offers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

export default function Image() {
  if (getCampaignPhase(Date.now()) === "live") {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 38,
          background: "#faf9f7",
          color: "#1a0c70",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            border: "2px solid #1a0c7026",
            padding: 38,
            borderRadius: 12,
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "58%",
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 800 }}>medhaup</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ color: "#1a0c70", fontSize: 18, letterSpacing: 2 }}>
                A SPECIAL THANK YOU
              </div>
              <div
                style={{
                  fontSize: 66,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginTop: 16,
                }}
              >
                Happy Teachers’ Day.
              </div>
              <div style={{ fontSize: 24, marginTop: 24 }}>
                Great teachers. Bigger dreams.
              </div>
              <div style={{ fontSize: 24, marginTop: 5 }}>
                ANM / GNM 2027 preparation
              </div>
            </div>
            <div style={{ fontSize: 17 }}>Bengali + English · medhaup.com</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 30,
              width: "42%",
              borderRadius: 12,
              background: "#1a0c70",
              color: "#faf9f7",
            }}
          >
            <div style={{ color: "#fe7b30", fontSize: 18 }}>
              WEEKEND SPECIAL
            </div>
            <div style={{ fontSize: 82, fontWeight: 800, marginTop: 24 }}>
              {campaign.formattedPrice}
            </div>
            <div style={{ fontSize: 20, marginTop: 4 }}>
              Special batch price
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderTop: "1px solid #ffffff40",
                marginTop: 30,
                paddingTop: 22,
                fontSize: 18,
              }}
            >
              <div>{campaign.dateLabel}</div>
              <div style={{ marginTop: 8, color: "#fe7b30" }}>
                Till Sunday, 11:59 p.m. IST
              </div>
              <div style={{ display: "flex", marginTop: 24 }}>
                WhatsApp {campaign.whatsappDisplay}
              </div>
            </div>
          </div>
        </div>
      </div>,
      { ...size, headers: { "Cache-Control": "no-store" } },
    );
  }
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#faf9f7",
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
    </div>,
    size,
  );
}
