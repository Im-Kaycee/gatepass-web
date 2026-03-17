"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { MarketplaceListing } from "@/types";
import { useAuthStore } from "@/store/auth";
import CopyButton from "@/components/ui/CopyButton";
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

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="1"
      y="2"
      width="14"
      height="13"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M5 1v2M11 1v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function MarketplaceListingPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user } = useAuthStore();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const { data: listing, isLoading } = useQuery<MarketplaceListing>({
    queryKey: ["listing", params.id],
    queryFn: async () => {
      const { data } = await api.get(`/marketplace/${params.id}/`);
      return data;
    },
    enabled: isAuthenticated,
  });

  const handlePurchase = async () => {
    setIsPurchasing(true);
    setError("");
    try {
      const { data } = await api.post("/marketplace/purchase/", {
        listing_id: params.id,
      });
      window.location.href = data.payment_url;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Something went wrong.");
      setIsPurchasing(false);
    }
  };

  if (authLoading || isLoading) {
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

  if (!listing) {
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
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "32px",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            Listing not found
          </div>
          <Link
            href="/marketplace"
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
            Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const originalPrice = Number(listing.original_price) || 0;
  const resalePrice = Number(listing.price) || 0;
  const premiumPercent =
    originalPrice > 0
      ? Math.round(((resalePrice - originalPrice) / originalPrice) * 100)
      : 0;
  const isOwnListing = user?.username === listing.seller_name;

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

        {/* Listing card */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            overflow: "hidden",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              padding: "32px",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "100px",
                  fontSize: "11px",
                  fontWeight: 500,
                  background: "rgba(193,255,114,0.1)",
                  color: "var(--lime)",
                  border: "1px solid rgba(193,255,114,0.2)",
                }}
              >
                Resale
              </span>
              {premiumPercent > 0 && (
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontWeight: 500,
                    background: "rgba(255,107,53,0.1)",
                    color: "var(--orange)",
                    border: "1px solid rgba(255,107,53,0.3)",
                  }}
                >
                  +{premiumPercent}% premium
                </span>
              )}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 4vw, 32px)",
                fontWeight: 800,
                letterSpacing: "-1px",
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              {listing.event_name}
            </h1>
            <div style={{ fontSize: "14px", color: "var(--muted)" }}>
              Listed by {listing.seller_name}
            </div>
          </div>{" "}
          <CopyButton
            text={`${process.env.NEXT_PUBLIC_SITE_URL}/marketplace/${listing.id}`}
            label="Copy listing link"
          />
          {/* Perforated divider */}
          <div
            style={{ height: "1px", position: "relative", margin: "0 -1px" }}
          >
            <div
              style={{
                position: "absolute",
                left: "-12px",
                top: "-12px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "var(--black)",
                border: "1px solid var(--border)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "-12px",
                top: "-12px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "var(--black)",
                border: "1px solid var(--border)",
              }}
            />
            <div
              style={{
                borderTop: "1px dashed rgba(255,255,255,0.08)",
                position: "absolute",
                left: "12px",
                right: "12px",
                top: 0,
              }}
            />
          </div>
          <div style={{ padding: "32px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "15px",
                  color: "var(--muted)",
                }}
              >
                <span style={{ color: "var(--lime)", opacity: 0.7 }}>
                  <CalendarIcon />
                </span>
                {new Date(listing.event_date).toLocaleDateString("en-NG", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Price breakdown */}
            <div
              style={{
                padding: "20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                  fontSize: "14px",
                  color: "var(--muted)",
                }}
              >
                <span>Original price</span>
                <span>₦{originalPrice.toLocaleString()}</span>
              </div>
              {premiumPercent > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                    fontSize: "14px",
                    color: "var(--orange)",
                  }}
                >
                  <span>Resale premium</span>
                  <span>+{premiumPercent}%</span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "var(--lime)",
                  }}
                >
                  ₦{resalePrice.toLocaleString()}
                </span>
              </div>
            </div>

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

            {isOwnListing ? (
              <div
                style={{
                  padding: "16px",
                  textAlign: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  fontSize: "14px",
                  color: "var(--muted)",
                }}
              >
                This is your listing. You cannot buy your own ticket.
              </div>
            ) : (
              <button
                onClick={handlePurchase}
                disabled={isPurchasing}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: isPurchasing
                    ? "rgba(193,255,114,0.5)"
                    : "var(--lime)",
                  color: "var(--black)",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor: isPurchasing ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {isPurchasing
                  ? "Redirecting to payment..."
                  : `Buy for ₦${resalePrice.toLocaleString()}`}
              </button>
            )}

            <p
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                textAlign: "center",
                marginTop: "12px",
                lineHeight: 1.5,
              }}
            >
              Ownership transfers automatically after payment. Powered by
              Paystack.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
