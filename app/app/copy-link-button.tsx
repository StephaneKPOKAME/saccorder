"use client";

import { useState } from "react";

export function CopyLinkButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const link = `${window.location.origin}/r/${token}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded-pill border border-border-strong bg-transparent px-5 py-2 text-sm font-medium text-text transition focus:outline-none focus:shadow-halo-lg"
    >
      {copied ? "Lien copié" : "Copier le lien"}
    </button>
  );
}
