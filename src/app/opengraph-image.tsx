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
          color: "#f8e8c2",
          background:
            "radial-gradient(circle at 50% 52%, #174b53 0%, #071f2a 42%, #02080d 100%)",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(213,173,109,.48)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 142,
            bottom: -150,
            width: 916,
            height: 690,
            border: "1px solid rgba(213,173,109,.28)",
            borderRadius: "50% 50% 0 0 / 38% 38% 0 0",
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
            color: "#d5ad6d",
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
              color: "#d1a85f",
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
            color: "#d5ad6d",
          }}
        >
          Toshkent · O‘zbekiston
        </div>
      </div>
    ),
    size,
  );
}
