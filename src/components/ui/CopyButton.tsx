"use client";

import { useState } from "react";

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect
      x="4"
      y="4"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M2 10V2.5A.5.5 0 012.5 2H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2.5 7l3 3 6-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CopyButton({
  text,
  label = "Copy link",
  successLabel = "Copied!",
}: {
  text: string;
  label?: string;
  successLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 16px",
        background: copied ? "rgba(193,255,114,0.1)" : "var(--card)",
        border: `1px solid ${copied ? "rgba(193,255,114,0.3)" : "var(--border)"}`,
        borderRadius: "100px",
        color: copied ? "var(--lime)" : "var(--muted)",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        transition: "all 0.2s",
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? successLabel : label}
    </button>
  );
}
