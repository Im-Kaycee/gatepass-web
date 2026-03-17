"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Event, TicketType } from "@/types";
import { useAuthStore } from "@/store/auth";
import CopyButton from "@/components/ui/CopyButton";

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

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 4.5V8l2.5 2.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6.5 9.5a3.5 3.5 0 005 0l2-2a3.5 3.5 0 00-5-5L7 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9.5 6.5a3.5 3.5 0 00-5 0l-2 2a3.5 3.5 0 005 5L9 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

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

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TicketTypeCard({
  ticketType,
  selected,
  quantity,
  onSelect,
  onQuantityChange,
}: {
  ticketType: TicketType;
  selected: boolean;
  quantity: number;
  onSelect: () => void;
  onQuantityChange: (q: number) => void;
}) {
  const available = ticketType.available;
  const isSoldOut = available <= 0;

  return (
    <div
      onClick={() => !isSoldOut && onSelect()}
      style={{
        padding: "20px",
        background: selected ? "rgba(193,255,114,0.06)" : "var(--card2)",
        border: `1px solid ${selected ? "rgba(193,255,114,0.4)" : "var(--border)"}`,
        borderRadius: "14px",
        cursor: isSoldOut ? "not-allowed" : "pointer",
        transition: "all 0.2s",
        opacity: isSoldOut ? 0.5 : 1,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "17px",
              fontWeight: 700,
              letterSpacing: "-0.3px",
              marginBottom: "4px",
            }}
          >
            {ticketType.name}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <UserIcon />
            {isSoldOut
              ? "Sold out"
              : `${available} of ${ticketType.quantity} remaining`}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 800,
              color: isSoldOut ? "var(--muted)" : "var(--lime)",
            }}
          >
            ₦{ticketType.price.toLocaleString()}
          </div>
          <div style={{ fontSize: "11px", color: "var(--muted)" }}>
            per ticket
          </div>
        </div>
      </div>

      {selected && !isSoldOut && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px solid rgba(193,255,114,0.15)",
          }}
        >
          <span style={{ fontSize: "13px", color: "var(--muted)" }}>
            Quantity:
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              style={{
                width: "28px",
                height: "28px",
                background: "var(--border)",
                border: "none",
                borderRadius: "50%",
                color: "var(--white)",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-body)",
              }}
            >
              -
            </button>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 700,
                minWidth: "24px",
                textAlign: "center",
              }}
            >
              {quantity}
            </span>
            <button
              onClick={() =>
                onQuantityChange(Math.min(6, available, quantity + 1))
              }
              style={{
                width: "28px",
                height: "28px",
                background: "var(--lime)",
                border: "none",
                borderRadius: "50%",
                color: "var(--black)",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-body)",
              }}
            >
              +
            </button>
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontFamily: "var(--font-display)",
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--lime)",
            }}
          >
            ₦{(ticketType.price * quantity).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery<Event>({
    queryKey: ["event", params.id],
    queryFn: async () => {
      const { data } = await api.get(`/events/${params.id}/`);
      return data;
    },
  });

  const selectedType = event?.ticket_types.find((t) => t.id === selectedTypeId);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (!selectedTypeId) return;

    setIsPurchasing(true);
    setPurchaseError("");

    try {
      const { data } = await api.post("/tickets/purchase/", {
        ticket_type_id: selectedTypeId,
        quantity,
      });
      window.location.href = data.payment_url;
    } catch (err: any) {
      setPurchaseError(
        err.response?.data?.detail || "Something went wrong. Please try again.",
      );
    } finally {
      setIsPurchasing(false);
    }
  };

  if (isLoading) {
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
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "48px clamp(24px, 5vw, 48px)",
          }}
        >
          {[200, 400, 300].map((w, i) => (
            <div
              key={i}
              style={{
                height: "24px",
                width: `${w}px`,
                background: "var(--card)",
                borderRadius: "6px",
                marginBottom: "16px",
                animation: "shimmer 1.5s infinite",
                maxWidth: "100%",
              }}
            />
          ))}
          <div
            style={{
              height: "400px",
              background: "var(--card)",
              borderRadius: "16px",
              marginTop: "32px",
              animation: "shimmer 1.5s infinite",
            }}
          />
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

  if (isError || !event) {
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
            Event not found
          </div>
          <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
            This event may have been removed or doesn&apos;t exist.
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
      {/* Hero image */}
      <div
        style={{
          width: "100%",
          height: "clamp(240px, 40vh, 480px)",
          background: event.image_url
            ? `url(${event.image_url}) center/cover`
            : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 40%, var(--black) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "clamp(24px, 5vw, 48px)",
          }}
        >
          <Link
            href="/events"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "100px",
              color: "var(--white)",
              textDecoration: "none",
              fontSize: "13px",
              transition: "all 0.2s",
            }}
          >
            <BackIcon /> Back to events
          </Link>
        </div>
        {!event.image_url && (
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "clamp(24px, 5vw, 48px)",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 8vw, 80px)",
              fontWeight: 800,
              letterSpacing: "-3px",
              color: "rgba(255,255,255,0.08)",
              lineHeight: 1,
            }}
          >
            {event.title.toUpperCase()}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 48px) 80px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 360px",
          gap: "48px",
          alignItems: "start",
          marginTop: "-60px",
          position: "relative",
        }}
        className="event-layout"
      >
        {/* Left — event info */}
        <div>
          {/* Type badge */}
          <div style={{ marginBottom: "16px" }}>
            <span
              style={{
                padding: "5px 12px",
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: 500,
                background:
                  event.event_type === "ONLINE"
                    ? "rgba(193,255,114,0.15)"
                    : "rgba(255,107,53,0.15)",
                color:
                  event.event_type === "ONLINE"
                    ? "var(--lime)"
                    : "var(--orange)",
                border: `1px solid ${
                  event.event_type === "ONLINE"
                    ? "rgba(193,255,114,0.3)"
                    : "rgba(255,107,53,0.3)"
                }`,
              }}
            >
              {event.event_type === "ONLINE"
                ? "Online event"
                : "In-person event"}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1,
              marginBottom: "24px",
            }}
          >
            {event.title}
          </h1>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "32px",
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
              <div style={{ color: "var(--lime)", flexShrink: 0 }}>
                <CalendarIcon />
              </div>
              {formatDate(event.event_date)} at {formatTime(event.event_date)}
            </div>

            {event.event_type === "OFFLINE" && event.venue && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "15px",
                  color: "var(--muted)",
                }}
              >
                <div style={{ color: "var(--lime)", flexShrink: 0 }}>
                  <LocationIcon />
                </div>
                {event.venue}
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "15px",
                color: "var(--muted)",
              }}
            >
              <div style={{ color: "var(--lime)", flexShrink: 0 }}>
                <ClockIcon />
              </div>
              {event.duration_hours} hour{event.duration_hours !== 1 ? "s" : ""}
            </div>

            {event.event_type === "ONLINE" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "15px",
                  color: "var(--muted)",
                }}
              >
                <div style={{ color: "var(--lime)", flexShrink: 0 }}>
                  <LinkIcon />
                </div>
                Join link provided after purchase
              </div>
            )}
          </div>

          {/* Organizer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 20px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(193,255,114,0.1)",
                border: "1px solid rgba(193,255,114,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--lime)",
              }}
            >
              {event.created_by[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                Hosted by
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {event.created_by}
              </div>
            </div>
          </div>
          <CopyButton
            text={`${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.id}`}
            label="Copy event link"
          />

          {/* Description */}
          <div style={{ marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                marginBottom: "16px",
              }}
            >
              About this event
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "var(--muted)",
                lineHeight: 1.8,
                fontWeight: 300,
                whiteSpace: "pre-wrap",
              }}
            >
              {event.description}
            </p>
          </div>
        </div>

        {/* Right — ticket selection */}
        <div
          style={{
            position: "sticky",
            top: "100px",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "24px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              marginBottom: "20px",
            }}
          >
            Get tickets
          </h2>

          {event.is_sold_out ? (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                background: "var(--card2)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--muted)",
                  marginBottom: "8px",
                }}
              >
                Sold out
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted)" }}>
                Check the marketplace for resale tickets.
              </p>
              <Link
                href="/marketplace"
                style={{
                  display: "inline-block",
                  marginTop: "16px",
                  padding: "10px 24px",
                  border: "1px solid var(--border)",
                  borderRadius: "100px",
                  color: "var(--white)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
              >
                View marketplace
              </Link>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                {event.ticket_types.map((tt) => (
                  <TicketTypeCard
                    key={tt.id}
                    ticketType={tt}
                    selected={selectedTypeId === tt.id}
                    quantity={quantity}
                    onSelect={() => {
                      setSelectedTypeId(tt.id);
                      setQuantity(1);
                    }}
                    onQuantityChange={setQuantity}
                  />
                ))}
              </div>

              {purchaseError && (
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
                  {purchaseError}
                </div>
              )}

              <button
                onClick={handlePurchase}
                disabled={!selectedTypeId || isPurchasing}
                style={{
                  width: "100%",
                  padding: "16px",
                  background:
                    selectedTypeId && !isPurchasing
                      ? "var(--lime)"
                      : "rgba(193,255,114,0.3)",
                  color: "var(--black)",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor:
                    selectedTypeId && !isPurchasing ? "pointer" : "not-allowed",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {isPurchasing
                  ? "Redirecting to payment..."
                  : !isAuthenticated
                    ? "Log in to purchase"
                    : selectedType
                      ? `Pay ₦${(selectedType.price * quantity).toLocaleString()}`
                      : "Select a ticket type"}
              </button>

              {selectedTypeId && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    textAlign: "center",
                    marginTop: "12px",
                    lineHeight: 1.5,
                  }}
                >
                  You will be redirected to Paystack to complete payment
                  securely.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 768px) {
          .event-layout {
            grid-template-columns: 1fr !important;
            margin-top: -20px !important;
          }
        }
      `}</style>
    </div>
  );
}
