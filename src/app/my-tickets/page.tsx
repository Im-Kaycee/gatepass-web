"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Ticket } from "@/types";
import { useAuthStore } from "@/store/auth";

const QR_PATTERN = [
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1,
  0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1,
];

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

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
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

function StatusBadge({ status }: { status: Ticket["status"] }) {
  const configs: Record<
    Ticket["status"],
    { label: string; bg: string; color: string; border: string }
  > = {
    VALID: {
      label: "Valid",
      bg: "rgba(193,255,114,0.1)",
      color: "var(--lime)",
      border: "rgba(193,255,114,0.3)",
    },
    CHECKED_IN: {
      label: "Checked in",
      bg: "rgba(59,130,246,0.1)",
      color: "#60a5fa",
      border: "rgba(59,130,246,0.3)",
    },
    LISTED_FOR_SALE: {
      label: "Listed",
      bg: "rgba(255,107,53,0.1)",
      color: "var(--orange)",
      border: "rgba(255,107,53,0.3)",
    },
    CANCELLED: {
      label: "Cancelled",
      bg: "rgba(255,68,68,0.1)",
      color: "#ff6666",
      border: "rgba(255,68,68,0.3)",
    },
  };

  const config = configs[status];

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "100px",
        fontSize: "11px",
        fontWeight: 500,
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
      }}
    >
      {config.label}
    </span>
  );
}

function QRBack({ ticket }: { ticket: Ticket }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        gap: "20px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "15px",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {ticket.event_name}
      </div>

      <div
        style={{
          padding: "16px",
          background: "white",
          borderRadius: "12px",
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "3px",
          width: "140px",
          height: "140px",
        }}
      >
        {QR_PATTERN.map((v, i) => (
          <div
            key={i}
            style={{
              borderRadius: "1px",
              background: v ? "#000" : "#fff",
            }}
          />
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: "11px",
          color: "var(--muted)",
          lineHeight: 1.5,
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color: "var(--white)",
            marginBottom: "4px",
          }}
        >
          {ticket.ticket_type_name}
        </div>
        Show this at the entrance
      </div>

      <Link
        href={`/tickets/${ticket.id}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: "10px 24px",
          background: "var(--lime)",
          color: "var(--black)",
          borderRadius: "100px",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 500,
          fontFamily: "var(--font-body)",
        }}
      >
        View full ticket
      </Link>

      <div style={{ fontSize: "11px", color: "var(--muted)" }}>
        Tap to flip back
      </div>
    </div>
  );
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  const [flipped, setFlipped] = useState(false);
  const price = Number(ticket.ticket_type_price) || 0;

  return (
    <div
      style={{ perspective: "1000px", cursor: "pointer" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
          minHeight: "280px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "24px",
              background:
                ticket.status === "VALID"
                  ? "linear-gradient(135deg, #1a2a0a 0%, #0f1a05 100%)"
                  : ticket.status === "CHECKED_IN"
                    ? "linear-gradient(135deg, #0a1a2a 0%, #051020 100%)"
                    : "linear-gradient(135deg, #1a1a1a 0%, #111 100%)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "13px",
                }}
              >
                Gate<span style={{ color: "var(--lime)" }}>pass</span>
              </span>
              <StatusBadge status={ticket.status} />
            </div>

            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                lineHeight: 1.1,
                marginBottom: "4px",
              }}
            >
              {ticket.event_name}
            </div>

            <div
              style={{
                fontSize: "12px",
                color:
                  ticket.status === "VALID"
                    ? "rgba(193,255,114,0.6)"
                    : "var(--muted)",
              }}
            >
              {ticket.ticket_type_name}
            </div>
          </div>

          <div style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "16px",
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
                {new Date(ticket.created_at).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
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
                <TagIcon />₦{price.toLocaleString()}
              </div>

              {ticket.event_type === "ONLINE" && ticket.online_link && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    color: "var(--lime)",
                  }}
                >
                  <LocationIcon />
                  <a
                    href={ticket.online_link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: "var(--lime)", textDecoration: "none" }}
                  >
                    Join link
                  </a>
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "var(--muted)",
              }}
            >
              <span>Tap to view QR code</span>
              <ChevronIcon />
            </div>
          </div>
        </div>

        {flipped && <QRBack ticket={ticket} />}
      </div>
    </div>
  );
}

export default function MyTicketsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [filter, setFilter] = useState<"ALL" | Ticket["status"]>("ALL");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  // useQuery must be called before any conditional return
  const { data: tickets = [], isLoading } = useQuery<Ticket[]>({
    queryKey: ["my-tickets"],
    queryFn: async () => {
      const { data } = await api.get("/tickets/my-tickets/");
      return data;
    },
    enabled: isAuthenticated,
  });

  // Now safe to return early
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

  const filtered =
    filter === "ALL" ? tickets : tickets.filter((t) => t.status === filter);

  const counts = {
    ALL: tickets.length,
    VALID: tickets.filter((t) => t.status === "VALID").length,
    CHECKED_IN: tickets.filter((t) => t.status === "CHECKED_IN").length,
    LISTED_FOR_SALE: tickets.filter((t) => t.status === "LISTED_FOR_SALE")
      .length,
    CANCELLED: tickets.filter((t) => t.status === "CANCELLED").length,
  };

  const filters: { key: "ALL" | Ticket["status"]; label: string }[] = [
    { key: "ALL", label: "All" },
    { key: "VALID", label: "Valid" },
    { key: "CHECKED_IN", label: "Checked in" },
    { key: "LISTED_FOR_SALE", label: "Listed" },
    { key: "CANCELLED", label: "Cancelled" },
  ];

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
          padding: "clamp(40px, 5vw, 60px) clamp(24px, 5vw, 48px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "40px",
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
              {tickets.length} ticket{tickets.length !== 1 ? "s" : ""}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-1.5px",
                lineHeight: 1,
              }}
            >
              My tickets
            </h1>
          </div>

          <Link
            href="/events"
            style={{
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
            Find more events
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          {filters.map(({ key, label }) =>
            counts[key] > 0 || key === "ALL" ? (
              <button
                key={key}
                onClick={() => setFilter(key)}
                style={{
                  padding: "8px 16px",
                  background: filter === key ? "var(--lime)" : "var(--card)",
                  border: `1px solid ${filter === key ? "var(--lime)" : "var(--border)"}`,
                  borderRadius: "100px",
                  color: filter === key ? "var(--black)" : "var(--muted)",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {label}
                {counts[key] > 0 && (
                  <span
                    style={{
                      marginLeft: "6px",
                      fontSize: "11px",
                      opacity: 0.7,
                    }}
                  >
                    {counts[key]}
                  </span>
                )}
              </button>
            ) : null,
          )}
        </div>

        {isLoading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "16px",
            }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: "280px",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            ))}
          </div>
        )}

        {!isLoading && tickets.length === 0 && (
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
                <rect
                  x="4"
                  y="6"
                  width="24"
                  height="20"
                  rx="3"
                  stroke="var(--muted)"
                  strokeWidth="1.5"
                />
                <path d="M4 13h24" stroke="var(--muted)" strokeWidth="1.5" />
                <circle
                  cx="16"
                  cy="21"
                  r="3"
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
              No tickets yet
            </div>

            <p
              style={{
                color: "var(--muted)",
                fontSize: "15px",
                maxWidth: "300px",
                margin: "0 auto 32px",
              }}
            >
              Browse upcoming events and grab your first ticket.
            </p>

            <Link
              href="/events"
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
              Discover events
            </Link>
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
            {filtered.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}

        {!isLoading && filter !== "ALL" && filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "var(--muted)",
            }}
          >
            No {filter.toLowerCase().replace("_", " ")} tickets.
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
