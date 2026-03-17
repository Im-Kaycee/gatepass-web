"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M10 3L5 8l5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CheckInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();

  const ticketId = searchParams.get("ticket_id");
  const sig = searchParams.get("sig");

  const [checkInState, setCheckInState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [checkInError, setCheckInError] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const { data: verification, isLoading: verifying } = useQuery({
    queryKey: ["verify-ticket", ticketId, sig],
    queryFn: async () => {
      const { data } = await api.get(`/tickets/verify/${ticketId}/?sig=${sig}`);
      return data;
    },
    enabled: !!ticketId && !!sig && isAuthenticated,
    retry: false,
  });

  const handleCheckIn = async () => {
    setCheckInState("loading");
    setCheckInError("");

    try {
      await api.post(`/tickets/${ticketId}/checkin/`);
      queryClient.invalidateQueries({
        queryKey: ["verify-ticket", ticketId, sig],
      });
      setCheckInState("success");
    } catch (err: any) {
      setCheckInError(
        err.response?.data?.detail || "Check-in failed. Please try again.",
      );
      setCheckInState("error");
    }
  };

  if (authLoading || verifying) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--black)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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

  if (!ticketId || !sig) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--black)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-body)",
        }}
      >
        <div style={{ textAlign: "center", padding: "24px" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            Invalid QR code
          </div>
          <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
            This QR code is missing required information.
          </p>
          <Link
            href="/events"
            style={{
              padding: "12px 28px",
              background: "var(--lime)",
              color: "var(--black)",
              borderRadius: "100px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Back to events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--black)",
        paddingTop: "80px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          padding: "clamp(40px, 5vw, 60px) clamp(24px, 5vw, 48px)",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--muted)",
            textDecoration: "none",
            fontSize: "14px",
            marginBottom: "32px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--white)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
          }
        >
          <BackIcon /> Dashboard
        </Link>

        {/* Verification result */}
        {!verification && !verifying && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              background: "rgba(255,68,68,0.06)",
              border: "1px solid rgba(255,68,68,0.2)",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(255,68,68,0.1)",
                border: "1px solid rgba(255,68,68,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="#ff6666"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 800,
                marginBottom: "8px",
                color: "#ff6666",
              }}
            >
              Invalid ticket
            </div>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>
              This QR code is invalid or the ticket has expired.
            </p>
          </div>
        )}

        {verification && checkInState !== "success" && (
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {/* Top */}
            <div
              style={{
                padding: "28px",
                background:
                  verification.status === "VALID"
                    ? "linear-gradient(135deg, #1a2a0a 0%, #0f1a05 100%)"
                    : "linear-gradient(135deg, #1a1a1a 0%, #111 100%)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "14px",
                  }}
                >
                  Gate<span style={{ color: "var(--lime)" }}>pass</span>
                </span>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontWeight: 500,
                    background:
                      verification.status === "VALID"
                        ? "rgba(193,255,114,0.1)"
                        : "rgba(255,68,68,0.1)",
                    color:
                      verification.status === "VALID"
                        ? "var(--lime)"
                        : "#ff6666",
                    border: `1px solid ${
                      verification.status === "VALID"
                        ? "rgba(193,255,114,0.3)"
                        : "rgba(255,68,68,0.3)"
                    }`,
                  }}
                >
                  {verification.status}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  marginBottom: "4px",
                }}
              >
                {verification.event}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color:
                    verification.status === "VALID"
                      ? "rgba(193,255,114,0.6)"
                      : "var(--muted)",
                }}
              >
                {verification.owner}
              </div>
            </div>

            <div style={{ padding: "28px" }}>
              {/* Signature valid indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 16px",
                  background: verification.signature_valid
                    ? "rgba(193,255,114,0.06)"
                    : "rgba(255,68,68,0.06)",
                  border: `1px solid ${
                    verification.signature_valid
                      ? "rgba(193,255,114,0.2)"
                      : "rgba(255,68,68,0.2)"
                  }`,
                  borderRadius: "10px",
                  marginBottom: "24px",
                  fontSize: "13px",
                  color: verification.signature_valid
                    ? "var(--lime)"
                    : "#ff6666",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  {verification.signature_valid ? (
                    <path
                      d="M3 8l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M4 4l8 8M12 4l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
                {verification.signature_valid
                  ? "Valid QR signature"
                  : "Invalid QR signature"}
              </div>

              {checkInError && (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "rgba(255,68,68,0.08)",
                    border: "1px solid rgba(255,68,68,0.2)",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "#ff6666",
                    marginBottom: "16px",
                  }}
                >
                  {checkInError}
                </div>
              )}

              {verification.status === "VALID" ? (
                <button
                  onClick={handleCheckIn}
                  disabled={checkInState === "loading"}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background:
                      checkInState === "loading"
                        ? "rgba(193,255,114,0.5)"
                        : "var(--lime)",
                    color: "var(--black)",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 500,
                    cursor:
                      checkInState === "loading" ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.2s",
                  }}
                >
                  {checkInState === "loading" ? "Checking in..." : "Check in"}
                </button>
              ) : (
                <div
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    background: "rgba(255,68,68,0.06)",
                    border: "1px solid rgba(255,68,68,0.2)",
                    borderRadius: "12px",
                    fontSize: "14px",
                    color: "#ff6666",
                  }}
                >
                  This ticket cannot be used for entry.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success state */}
        {checkInState === "success" && (
          <div
            style={{
              padding: "48px 32px",
              textAlign: "center",
              background: "rgba(193,255,114,0.06)",
              border: "1px solid rgba(193,255,114,0.2)",
              borderRadius: "20px",
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
                margin: "0 auto 20px",
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
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                marginBottom: "8px",
              }}
            >
              Checked in
            </div>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "15px",
                marginBottom: "8px",
              }}
            >
              {verification?.owner}
            </p>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "14px",
                marginBottom: "32px",
              }}
            >
              {verification?.event}
            </p>
            <button
              onClick={() => {
                setCheckInState("idle");
                setCheckInError("");
              }}
              style={{
                padding: "12px 32px",
                background: "var(--lime)",
                color: "var(--black)",
                border: "none",
                borderRadius: "100px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Scan next ticket
            </button>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
