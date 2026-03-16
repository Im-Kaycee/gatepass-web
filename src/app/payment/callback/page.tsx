"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const reference = searchParams.get("reference");
  const trxref = searchParams.get("trxref");

  useEffect(() => {
    // Invalidate tickets and orders so they refetch fresh data
    queryClient.invalidateQueries({ queryKey: ["my-tickets"] });
    queryClient.invalidateQueries({ queryKey: ["my-tickets-valid"] });
    queryClient.invalidateQueries({ queryKey: ["marketplace"] });

    // Give the webhook a moment to process then redirect
    const timer = setTimeout(() => {
      if (reference?.startsWith("resale_")) {
        router.push("/my-tickets");
      } else {
        router.push("/my-tickets");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [reference, trxref]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--black)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-body)",
        gap: "24px",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "rgba(193,255,114,0.1)",
          border: "1px solid rgba(193,255,114,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M5 14l6 6L23 8"
            stroke="var(--lime)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: 800,
            letterSpacing: "-1px",
            marginBottom: "8px",
          }}
        >
          Payment successful
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "15px" }}>
          Your ticket is being processed. Redirecting you now...
        </p>
      </div>

      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "2px solid var(--border)",
          borderTop: "2px solid var(--lime)",
          animation: "spin 0.8s linear infinite",
        }}
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
