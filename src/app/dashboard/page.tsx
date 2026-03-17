"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import CopyButton from "@/components/ui/CopyButton";

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

const TicketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M2 7a2 2 0 012-2h12a2 2 0 012 2v1a2 2 0 000 4v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1a2 2 0 000-4V7z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const RevenueIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10 6v8M7.5 8.5C7.5 7.4 8.6 7 10 7s2.5.4 2.5 1.5S11.4 10 10 10s-2.5.6-2.5 1.5S8.6 13 10 13s2.5-.4 2.5-1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const AttendanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2 17c0-3.31 2.69-6 6-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13 12l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EventsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect
      x="2"
      y="3"
      width="16"
      height="15"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M2 8h16" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6 2v2M14 2v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          background: accent
            ? "rgba(193,255,114,0.1)"
            : "rgba(255,255,255,0.05)",
          border: `1px solid ${
            accent ? "rgba(193,255,114,0.2)" : "rgba(255,255,255,0.1)"
          }`,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accent ? "var(--lime)" : "var(--muted)",
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "var(--muted)",
            marginBottom: "6px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: 800,
            letterSpacing: "-1px",
            color: accent ? "var(--lime)" : "var(--white)",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function EventRow({ event }: { event: any }) {
  return (
    <Link
      href={`/dashboard/${event.event_id}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        textDecoration: "none",
        color: "inherit",
        transition: "border-color 0.2s",
        gap: "16px",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "#333")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
      }
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "-0.3px",
            marginBottom: "4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {event.event_title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            color: "var(--muted)",
          }}
        >
          <CalendarIcon />
          {new Date(event.event_date).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--lime)",
            marginBottom: "2px",
          }}
        >
          ₦{Number(event.net_revenue).toLocaleString()}
        </div>
        <div style={{ fontSize: "12px", color: "var(--muted)" }}>
          {event.tickets_sold} sold
        </div>
      </div>
      <div style={{ color: "var(--muted)", flexShrink: 0 }}>
        <ChevronIcon />
      </div>
      <CopyButton
        text={`${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.event_id}`}
        label="Copy"
      />
    </Link>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const params = new URLSearchParams();
  if (dateFrom) params.set("date_from", dateFrom);
  if (dateTo) params.set("date_to", dateTo);

  const { data: overview, isLoading } = useQuery({
    queryKey: ["dashboard-overview", params.toString()],
    queryFn: async () => {
      const { data } = await api.get(
        `/events/dashboard/overview/?${params.toString()}`,
      );
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

  const events = overview?.events || [];

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
        {/* Header */}
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
              Organizer
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
              Dashboard
            </h1>
          </div>
          <Link
            href="/events/create"
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
            <PlusIcon /> New event
          </Link>
        </div>

        {/* Date filters */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "32px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "13px", color: "var(--muted)" }}>
            Filter by date:
          </span>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            style={{
              padding: "8px 12px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--white)",
              fontSize: "13px",
              fontFamily: "var(--font-body)",
              outline: "none",
              colorScheme: "dark",
            }}
          />
          <span style={{ fontSize: "13px", color: "var(--muted)" }}>to</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            style={{
              padding: "8px 12px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--white)",
              fontSize: "13px",
              fontFamily: "var(--font-body)",
              outline: "none",
              colorScheme: "dark",
            }}
          />
          {(dateFrom || dateTo) && (
            <button
              onClick={() => {
                setDateFrom("");
                setDateTo("");
              }}
              style={{
                padding: "8px 12px",
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--muted)",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Overview stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <StatCard
            label="Total events"
            value={String(overview?.total_events || 0)}
            icon={<EventsIcon />}
          />
          <StatCard
            label="Tickets sold"
            value={String(overview?.total_tickets_sold || 0)}
            icon={<TicketIcon />}
          />
          <StatCard
            label="Net revenue"
            value={`₦${Number(overview?.total_net_revenue || 0).toLocaleString()}`}
            icon={<RevenueIcon />}
            accent
          />
          <StatCard
            label="Checked in"
            value={String(overview?.total_checked_in || 0)}
            icon={<AttendanceIcon />}
          />
        </div>

        {/* Events list */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Your events
            </h2>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              {events.length} event{events.length !== 1 ? "s" : ""}
            </span>
          </div>

          {events.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                No events yet
              </div>
              <p
                style={{
                  color: "var(--muted)",
                  marginBottom: "24px",
                  fontSize: "14px",
                }}
              >
                Create your first event to start selling tickets.
              </p>
              <Link
                href="/events/create"
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
                Create event
              </Link>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {events.map((event: any) => (
                <EventRow key={event.event_id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
