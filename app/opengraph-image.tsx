import { ImageResponse } from "next/og";

export const alt = "S'accorder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          background: "#0C0E0F",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              background: "#F1F3F2",
              position: "relative",
              display: "flex",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 42,
                top: 27,
                width: 11,
                height: 27,
                borderRadius: 99,
                background: "#0C0E0F",
                transform: "rotate(-24deg)",
                transformOrigin: "bottom center",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 42,
                top: 27,
                width: 11,
                height: 27,
                borderRadius: 99,
                background: "#0C0E0F",
                transform: "rotate(24deg)",
                transformOrigin: "bottom center",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 42,
                top: 54,
                width: 11,
                height: 21,
                borderRadius: 99,
                background: "#0C0E0F",
              }}
            />
          </div>
          <div style={{ display: "flex", fontSize: 72, color: "#F1F3F2" }}>
            s&apos;accorder
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#A3ABA8" }}>
          Mettre au clair les façons de travailler d&apos;une équipe
        </div>
      </div>
    ),
    { ...size },
  );
}
