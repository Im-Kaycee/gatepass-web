"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { fetchUser } = useAuthStore();
  const [message, setMessage] = useState("Confirming your payment...");

  useEffect(() => {
    const handleCallback = async () => {
      setMessage("Confirming your payment...");

      // Force fresh user fetch to ensure correct user is loaded
      await fetchUser();

      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ["my-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["my-tickets-valid"] });
      queryClient.invalidateQueries({ queryKey: ["marketplace"] });

      setMessage("Payment confirmed. Loading your tickets...");

      // Give webhook a moment to process then redirect
      setTimeout(() => {
        router.push("/my-tickets");
      }, 2000);
    };

    handleCallback();
  }, []);

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
        <p style={{ color: "var(--muted)", fontSize: "15px" }}>{message}</p>
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
