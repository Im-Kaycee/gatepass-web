"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { MarketplaceListing } from "@/types";
import { useAuthStore } from "@/store/auth";

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect
      x="1"
      y="2"
      width="12"
      height="11"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M1 6h12" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M4 1v2M10 1v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M1 1h5.5l6 6a2 2 0 010 2.83l-2.67 2.67a2 2 0 01-2.83 0L1 6.5V1z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="4" cy="4" r="1" fill="currentColor" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M5 3l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 2v12M2 8h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ListingCard({ listing }: { listing: MarketplaceListing }) {
  const originalPrice = Number(listing.original_price) || 0;
  const resalePrice = Number(listing.price) || 0;
  const premiumPercent =
    originalPrice > 0
      ? Math.round(((resalePrice - originalPrice) / originalPrice) * 100)
      : 0;

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "transform 0.3s, border-color 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.borderColor = "#333";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Card top */}
      <div
        style={{
          padding: "20px",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            display: "flex",
            gap: "6px",
          }}
        >
          {premiumPercent > 0 && (
            <span
              style={{
                padding: "3px 8px",
                borderRadius: "100px",
                fontSize: "11px",
                fontWeight: 500,
                background: "rgba(255,107,53,0.15)",
                color: "var(--orange)",
                border: "1px solid rgba(255,107,53,0.3)",
              }}
            >
              +{premiumPercent}%
            </span>
          )}
          <span
            style={{
              padding: "3px 8px",
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
        </div>

        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
            marginBottom: "6px",
            paddingRight: "80px",
          }}
        >
          {listing.event_name}
        </div>
        <div style={{ fontSize: "12px", color: "var(--muted)" }}>
          Sold by {listing.seller_name}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--muted)",
            }}
          >
            <CalendarIcon />
            {formatDate(listing.event_date)}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--muted)",
            }}
          >
            <TagIcon />
            Original price: ₦{originalPrice.toLocaleString()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                fontWeight: 800,
                color: "var(--lime)",
              }}
            >
              ₦{resalePrice.toLocaleString()}
            </div>
            {premiumPercent > 0 && (
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  textDecoration: "line-through",
                }}
              >
                ₦{originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <Link
            href={`/marketplace/${listing.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "10px 20px",
              background: "var(--lime)",
              color: "var(--black)",
              borderRadius: "100px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "var(--font-body)",
              transition: "all 0.2s",
            }}
          >
            Buy ticket <ChevronIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  const { isAuthenticated } = useAuthStore();
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["marketplace"],
    queryFn: async () => {
      const { data } = await api.get("/marketplace/");
      return data;
    },
  });

  const listings: MarketplaceListing[] = data?.results || data || [];

  const filtered = listings.filter(
    (l) =>
      l.event_name.toLowerCase().includes(search.toLowerCase()) ||
      l.seller_name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--black)",
        paddingTop: "80px",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "clamp(40px, 5vw, 60px) clamp(24px, 5vw, 48px) 0",
          borderBottom: "1px solid var(--border)",
          background: "var(--card)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "32px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
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
                {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: 800,
                  letterSpacing: "-2px",
                  lineHeight: 0.95,
                }}
              >
                Marketplace
              </h1>
            </div>

            {isAuthenticated && (
              <Link
                href="/marketplace/list"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  background: "var(--lime)",
                  color: "var(--black)",
                  borderRadius: "100px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "var(--font-body)",
                }}
              >
                <PlusIcon />
                List a ticket
              </Link>
            )}
          </div>

          {/* Search */}
          <div
            style={{
              position: "relative",
              maxWidth: "500px",
              paddingBottom: "24px",
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events or sellers..."
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--card2)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--white)",
                fontSize: "14px",
                fontFamily: "var(--font-body)",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(193,255,114,0.4)")
              }
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>
        </div>
      </div>

      {/* Listings */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "clamp(32px, 4vw, 48px) clamp(24px, 5vw, 48px)",
        }}
      >
        {isLoading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "16px",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: "260px",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            ))}
          </div>
        )}

        {isError && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "var(--muted)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: "12px",
              }}
            >
              Something went wrong
            </div>
            <p>Could not load listings. Please try again.</p>
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M4 16h24M16 4v24"
                  stroke="var(--muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <rect
                  x="4"
                  y="4"
                  width="24"
                  height="24"
                  rx="4"
                  stroke="var(--muted)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              {search ? "No listings found" : "No listings yet"}
            </div>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "15px",
                maxWidth: "300px",
                margin: "0 auto 32px",
              }}
            >
              {search
                ? "Try a different search term."
                : "Be the first to list a ticket for resale."}
            </p>
            {isAuthenticated && !search && (
              <Link
                href="/marketplace/list"
                style={{
                  padding: "14px 32px",
                  background: "var(--lime)",
                  color: "var(--black)",
                  borderRadius: "100px",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 500,
                  fontFamily: "var(--font-body)",
                }}
              >
                List a ticket
              </Link>
            )}
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "16px",
            }}
          >
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
