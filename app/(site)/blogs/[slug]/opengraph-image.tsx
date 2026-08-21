import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/data";

export const alt = "medhaup ANM GNM preparation article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.title ?? "ANM/GNM Preparation Guide";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fffaf3",
          color: "#1a0c70",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 440,
            height: 440,
            borderRadius: 999,
            background: "#fe7b30",
            opacity: 0.14,
            right: -130,
            top: -170,
          }}
        />
        <div style={{ display: "flex", fontSize: 36, fontWeight: 800 }}>
          medha<span style={{ color: "#fe7b30" }}>up</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#fe7b30",
              fontSize: 23,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            ANM/GNM Preparation Blog
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: title.length > 70 ? 50 : 59,
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#1a0c7099" }}>
          Practical guidance for West Bengal nursing aspirants · medhaup.com
        </div>
      </div>
    ),
    size,
  );
}
