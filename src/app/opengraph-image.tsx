import { ImageResponse } from "next/og";
import { weddingConfig } from "@/config/wedding.config";

export const alt = weddingConfig.seo.imageAlt;
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
          alignItems: "center",
          justifyContent: "center",
          color: "#201b18",
          background:
            "linear-gradient(135deg, #f8f3ea 0%, #fffdf8 48%, #ead6d2 100%)",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(154,113,56,.55)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 58,
            left: 70,
            letterSpacing: 8,
            fontSize: 15,
            textTransform: "uppercase",
            color: "#8b693d",
          }}
        >
          {weddingConfig.event.displayDate}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 118, letterSpacing: -8 }}>
            {weddingConfig.identity.partnerOne}
          </div>
          <div
            style={{
              margin: "-16px 0",
              fontSize: 52,
              fontStyle: "italic",
              color: "#9a7138",
            }}
          >
            &amp;
          </div>
          <div style={{ fontSize: 118, letterSpacing: -8 }}>
            {weddingConfig.identity.partnerTwo}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 58,
            right: 70,
            letterSpacing: 5,
            fontSize: 14,
            textTransform: "uppercase",
            color: "#8b693d",
          }}
        >
          Florence · Italy
        </div>
      </div>
    ),
    size,
  );
}
