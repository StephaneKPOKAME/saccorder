import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 90,
          background: "#F1F3F2",
          position: "relative",
          display: "flex",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 50,
            width: 20,
            height: 50,
            borderRadius: 99,
            background: "#0C0E0F",
            transform: "rotate(-24deg)",
            transformOrigin: "bottom center",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 50,
            width: 20,
            height: 50,
            borderRadius: 99,
            background: "#0C0E0F",
            transform: "rotate(24deg)",
            transformOrigin: "bottom center",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 100,
            width: 20,
            height: 40,
            borderRadius: 99,
            background: "#0C0E0F",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
