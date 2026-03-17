"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { Ticket } from "@/types";
import { useAuthStore } from "@/store/auth";
import QRCode from "react-qr-code";

const QR_PATTERN = [
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1,
  0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1,
];

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

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 2h6l6 6a2 2 0 010 2.83l-3.17 3.17a2 2 0 01-2.83 0L2 8V2z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="5" cy="5" r="1.5" fill="currentColor" />
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
      label: "Listed for sale",
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
        padding: "6px 14px",
        borderRadius: "100px",
        fontSize: "13px",
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

export default function TicketPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const {
    data: ticket,
    isLoading,
    isError,
  } = useQuery<Ticket>({
    queryKey: ["ticket", params.id],
    queryFn: async () => {
      const { data } = await api.get(`/tickets/${params.id}/`);
      return data;
    },
    enabled: isAuthenticated,
  });

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

  if (isError || !ticket) {
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
            Ticket not found
          </div>
          <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
            This ticket doesn&apos;t exist or you don&apos;t have access to it.
          </p>
          <Link
            href="/my-tickets"
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
            Back to my tickets
          </Link>
        </div>
      </div>
    );
  }

  const price = Number(ticket.ticket_type_price) || 0;

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
          maxWidth: "560px",
          margin: "0 auto",
          padding: "clamp(40px, 5vw, 60px) clamp(24px, 5vw, 48px)",
        }}
      >
        {/* Back link */}
        <Link
          href="/my-tickets"
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
          <BackIcon /> My tickets
        </Link>

        {/* Ticket stub */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            overflow: "hidden",
            marginBottom: "24px",
          }}
        >
          {/* Top section */}
          <div
            style={{
              padding: "32px",
              background:
                ticket.status === "VALID"
                  ? "linear-gradient(135deg, #1a2a0a 0%, #0f1a05 100%)"
                  : ticket.status === "CHECKED_IN"
                    ? "linear-gradient(135deg, #0a1a2a 0%, #051020 100%)"
                    : "linear-gradient(135deg, #1a1a1a 0%, #111 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "16px",
                }}
              >
                Gate<span style={{ color: "var(--lime)" }}>pass</span>
              </span>
              <StatusBadge status={ticket.status} />
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
              {ticket.event_name}
            </h1>

            <div
              style={{
                fontSize: "14px",
                color:
                  ticket.status === "VALID"
                    ? "rgba(193,255,114,0.7)"
                    : "var(--muted)",
              }}
            >
              {ticket.ticket_type_name}
            </div>
          </div>

          {/* Perforated divider */}
          <div
            style={{
              height: "1px",
              position: "relative",
              margin: "0 -1px",
            }}
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

          {/* Details */}
          <div style={{ padding: "32px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "28px",
              }}
            >
              {[
                {
                  icon: <TagIcon />,
                  label: "Ticket type",
                  value: ticket.ticket_type_name,
                },
                {
                  icon: <TagIcon />,
                  label: "Price paid",
                  value: `₦${price.toLocaleString()}`,
                },
                {
                  icon: <CalendarIcon />,
                  label: "Purchased",
                  value: new Date(ticket.created_at).toLocaleDateString(
                    "en-NG",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  ),
                },
                ...(ticket.event_type === "OFFLINE"
                  ? [
                      {
                        icon: <LocationIcon />,
                        label: "Type",
                        value: "In-person",
                      },
                    ]
                  : [
                      {
                        icon: <LinkIcon />,
                        label: "Type",
                        value: "Online",
                      },
                    ]),
              ].map(({ icon, label, value }) => (
                <div key={label}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "var(--muted)",
                      marginBottom: "6px",
                    }}
                  >
                    <span style={{ color: "var(--lime)", opacity: 0.7 }}>
                      {icon}
                    </span>
                    {label}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 500 }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Online join link */}
            {ticket.event_type === "ONLINE" && ticket.online_link && (
              <div
                style={{
                  padding: "16px",
                  background: "rgba(193,255,114,0.05)",
                  border: "1px solid rgba(193,255,114,0.15)",
                  borderRadius: "12px",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--lime)",
                    marginBottom: "8px",
                    opacity: 0.7,
                  }}
                >
                  Join link
                </div>

                <a
                  href={ticket.online_link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "var(--lime)",
                    textDecoration: "none",
                    fontSize: "14px",
                    wordBreak: "break-all",
                  }}
                >
                  {ticket.online_link}
                </a>
              </div>
            )}

            {/* QR code */}
            {ticket.status === "VALID" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  padding: "28px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "16px",
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    background: "white",
                    borderRadius: "12px",
                  }}
                >
                  <QRCode
                    value={`${process.env.NEXT_PUBLIC_SITE_URL}/checkin?ticket_id=${ticket.id}&sig=${ticket.qr_signature}`}
                    size={160}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      marginBottom: "4px",
                    }}
                  >
                    Show at entrance
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                    HMAC signed · Unique to you · One-time use
                  </div>
                </div>
              </div>
            )}

            {ticket.status === "CHECKED_IN" && (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  background: "rgba(59,130,246,0.05)",
                  border: "1px solid rgba(59,130,246,0.15)",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#60a5fa",
                    marginBottom: "4px",
                  }}
                >
                  You&apos;re checked in
                </div>
                <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                  This ticket has been used for entry.
                </div>
              </div>
            )}

            {ticket.status === "CANCELLED" && (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  background: "rgba(255,68,68,0.05)",
                  border: "1px solid rgba(255,68,68,0.15)",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#ff6666",
                    marginBottom: "4px",
                  }}
                >
                  Ticket cancelled
                </div>
                <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                  This ticket is no longer valid.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        {ticket.status === "VALID" && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/marketplace/list"
              style={{
                flex: 1,
                padding: "14px",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                textAlign: "center",
                color: "var(--white)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                transition: "all 0.2s",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "#444")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)")
              }
            >
              List for resale
            </Link>
            <Link
              href="/events"
              style={{
                flex: 1,
                padding: "14px",
                background: "var(--lime)",
                color: "var(--black)",
                borderRadius: "12px",
                textAlign: "center",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "var(--font-body)",
              }}
            >
              Find more events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
