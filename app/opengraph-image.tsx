import { ImageResponse } from "next/og";
import { getCampaignPhase, rakhiCampaign } from "@/lib/rakhiCampaign";

export const alt = "medhaup ANM GNM 2027 preparation and special offers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 60;

export default function OpenGraphImage() {
  const campaignActive = getCampaignPhase(Date.now()) !== "expired";

  if (campaignActive) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
            overflow: "hidden",
            background: "#021142",
            color: "#FFFFFF",
            padding: "64px 70px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 300,
              height: 5,
              background: "#FA6F2D",
              opacity: 0.82,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 190,
              height: 190,
              left: 655,
              top: 208,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              border: "20px solid #FA6F2D",
              boxShadow:
                "0 0 0 8px #FFFFFF, 0 0 0 16px #FA6F2D, 0 0 0 28px #021142, 0 0 0 31px #FA6F2D",
              background: "#021142",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: 800,
              }}
            >
              <span style={{ fontSize: 45, lineHeight: 1 }}>28</span>
              <span style={{ color: "#FA6F2D", fontSize: 16, letterSpacing: 3 }}>
                AUG
              </span>
              <span style={{ color: "#FFFFFF", fontSize: 9, letterSpacing: 2 }}>
                2026
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 650,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", fontSize: 34, fontWeight: 800 }}>
              medha<span style={{ color: "#FA6F2D" }}>up</span>
            </div>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginTop: 55,
                border: "1px solid #FA6F2D",
                borderRadius: 999,
                padding: "9px 16px",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              RAKHI OFFER · 28 AUGUST 2026
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                maxWidth: 610,
                fontSize: 58,
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: -2,
              }}
            >
              Rakhi Special for ANM/GNM 2027.
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              right: 62,
              top: 70,
              bottom: 70,
              width: 340,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: 30,
              padding: "42px 36px",
              color: "#021142",
              background: "#FFFFFF",
              boxShadow: "inset 0 7px 0 #FA6F2D",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2 }}>
              ANM/GNM 2027 BATCH
            </span>
            <span
              style={{
                marginTop: 35,
                color: "#FA6F2D",
                fontSize: 70,
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: -3,
              }}
            >
              {rakhiCampaign.formattedPrice}
            </span>
            <span style={{ marginTop: 12, fontSize: 15, fontWeight: 700 }}>
              ONE-DAY SPECIAL PRICE
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 42,
                border: "2px dashed #FA6F2D",
                borderRadius: 14,
                padding: "15px 17px",
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              <span>USE CODE</span>
              <span>{rakhiCampaign.couponCode}</span>
            </div>
          </div>
        </div>
      ),
      size,
    );
  }

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
