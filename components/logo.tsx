const BASE_SIZE = 36;

export function Logo({ size = BASE_SIZE }: { size?: number }) {
  const scale = size / BASE_SIZE;

  return (
    <span
      className="relative inline-block shrink-0 rounded-pill bg-text"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute rounded-pill bg-bg"
        style={{
          left: 16 * scale,
          top: 10 * scale,
          width: 4 * scale,
          height: 10 * scale,
          transform: "rotate(-24deg)",
          transformOrigin: "bottom center",
        }}
      />
      <span
        className="absolute rounded-pill bg-bg"
        style={{
          left: 16 * scale,
          top: 10 * scale,
          width: 4 * scale,
          height: 10 * scale,
          transform: "rotate(24deg)",
          transformOrigin: "bottom center",
        }}
      />
      <span
        className="absolute rounded-pill bg-bg"
        style={{
          left: 16 * scale,
          top: 20 * scale,
          width: 4 * scale,
          height: 8 * scale,
        }}
      />
    </span>
  );
}

export function Wordmark({ logoSize = BASE_SIZE }: { logoSize?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Logo size={logoSize} />
      <span className="font-logo text-lg text-text">s&apos;accorder</span>
    </span>
  );
}
