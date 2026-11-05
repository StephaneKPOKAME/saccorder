import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          background: "#F1F3F2",
          position: "relative",
          display: "flex",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 14,
            top: 9,
            width: 4,
            height: 9,
            borderRadius: 99,
            background: "#0C0E0F",
            transform: "rotate(-24deg)",
            transformOrigin: "bottom center",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 14,
            top: 9,
            width: 4,
            height: 9,
            borderRadius: 99,
            background: "#0C0E0F",
            transform: "rotate(24deg)",
            transformOrigin: "bottom center",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 14,
            top: 18,
            width: 4,
            height: 7,
            borderRadius: 99,
            background: "#0C0E0F",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
