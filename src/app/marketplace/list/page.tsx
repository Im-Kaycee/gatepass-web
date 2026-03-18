"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Ticket } from "@/types";
import { useAuthStore } from "@/store/auth";

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

export default function ListTicketPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: authLoading, user } = useAuthStore();
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);
  useEffect(() => {
    if (
      !authLoading &&
      isAuthenticated &&
      user &&
      !user.paystack_subaccount_code
    ) {
      router.push("/onboarding");
    }
  }, [isAuthenticated, authLoading, user]);

  const { data: tickets = [], isLoading } = useQuery<Ticket[]>({
    queryKey: ["my-tickets-valid"],
    queryFn: async () => {
      const { data } = await api.get("/tickets/my-tickets/");
      return data.filter((t: Ticket) => t.status === "VALID");
    },
    enabled: isAuthenticated,
  });

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);
  const priceNum = Number(price);
  const originalPrice = Number(selectedTicket?.ticket_type_price) || 0;
  const maxPrice = originalPrice * 1.3;
  const premiumPercent =
    originalPrice > 0 && priceNum > 0
      ? Math.round(((priceNum - originalPrice) / originalPrice) * 100)
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !price) return;
    setIsSubmitting(true);
    setError("");

    try {
      await api.post("/marketplace/list/", {
        ticket_id: selectedTicketId,
        price: priceNum,
      });
      queryClient.invalidateQueries({ queryKey: ["marketplace"] });
      queryClient.invalidateQueries({ queryKey: ["my-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["my-tickets-valid"] });
      router.push("/marketplace");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
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
          maxWidth: "520px",
          margin: "0 auto",
          padding: "clamp(40px, 5vw, 60px) clamp(24px, 5vw, 48px)",
        }}
      >
        <Link
          href="/marketplace"
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
          <BackIcon /> Marketplace
        </Link>

        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--lime)",
              marginBottom: "12px",
            }}
          >
            Resell your ticket
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1,
            }}
          >
            List a ticket
          </h1>
        </div>

        {isLoading ? (
          <div
            style={{
              height: "200px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              animation: "shimmer 1.5s infinite",
            }}
          />
        ) : tickets.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              No valid tickets
            </div>
            <p
              style={{
                color: "var(--muted)",
                marginBottom: "24px",
                fontSize: "14px",
              }}
            >
              You don&apos;t have any valid tickets to list.
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
              Browse events
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Ticket selector */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--muted)",
                  marginBottom: "12px",
                }}
              >
                Select a ticket
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => {
                      setSelectedTicketId(ticket.id);
                      setPrice("");
                    }}
                    style={{
                      padding: "16px 20px",
                      background:
                        selectedTicketId === ticket.id
                          ? "rgba(193,255,114,0.06)"
                          : "var(--card)",
                      border: `1px solid ${
                        selectedTicketId === ticket.id
                          ? "rgba(193,255,114,0.4)"
                          : "var(--border)"
                      }`,
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "15px",
                          fontWeight: 700,
                          marginBottom: "2px",
                        }}
                      >
                        {ticket.event_name}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                        {ticket.ticket_type_name}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "var(--lime)",
                      }}
                    >
                      ₦
                      {(Number(ticket.ticket_type_price) || 0).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price input */}
            {selectedTicket && (
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--muted)",
                    marginBottom: "8px",
                  }}
                >
                  Listing price
                </label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontFamily: "var(--font-display)",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--muted)",
                    }}
                  >
                    ₦
                  </span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    min={1}
                    max={maxPrice}
                    required
                    style={{
                      width: "100%",
                      padding: "14px 16px 14px 32px",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      color: "var(--white)",
                      fontSize: "15px",
                      fontFamily: "var(--font-body)",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                  />
                </div>

                {/* Price guidance */}
                <div
                  style={{
                    marginTop: "12px",
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "10px",
                    fontSize: "13px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "var(--muted)",
                    }}
                  >
                    <span>Original price</span>
                    <span>₦{originalPrice.toLocaleString()}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "var(--muted)",
                    }}
                  >
                    <span>Maximum (130%)</span>
                    <span>₦{maxPrice.toLocaleString()}</span>
                  </div>
                  {priceNum > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "6px",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        color: priceNum > maxPrice ? "#ff6666" : "var(--lime)",
                        fontWeight: 500,
                      }}
                    >
                      <span>Your price</span>
                      <span>
                        ₦{priceNum.toLocaleString()}
                        {premiumPercent !== 0 &&
                          ` (${premiumPercent > 0 ? "+" : ""}${premiumPercent}%)`}
                      </span>
                    </div>
                  )}
                </div>

                {priceNum > maxPrice && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#ff6666",
                      marginTop: "8px",
                    }}
                  >
                    Price cannot exceed ₦{maxPrice.toLocaleString()} (130% of
                    original).
                  </p>
                )}
              </div>
            )}

            {error && (
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
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={
                !selectedTicketId ||
                !price ||
                priceNum > maxPrice ||
                priceNum < 1 ||
                isSubmitting
              }
              style={{
                width: "100%",
                padding: "16px",
                background:
                  !selectedTicketId ||
                  !price ||
                  priceNum > maxPrice ||
                  isSubmitting
                    ? "rgba(193,255,114,0.3)"
                    : "var(--lime)",
                color: "var(--black)",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 500,
                cursor:
                  !selectedTicketId ||
                  !price ||
                  priceNum > maxPrice ||
                  isSubmitting
                    ? "not-allowed"
                    : "pointer",
                fontFamily: "var(--font-body)",
                transition: "all 0.2s",
              }}
            >
              {isSubmitting ? "Listing..." : "List for sale"}
            </button>

            <p
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                textAlign: "center",
                marginTop: "12px",
                lineHeight: 1.5,
              }}
            >
              Your ticket status will change to &quot;Listed&quot; until it
              sells or you cancel the listing.
            </p>
          </form>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
