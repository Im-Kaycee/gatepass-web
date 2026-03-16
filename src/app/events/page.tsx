"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Event } from "@/types";

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10.5 10.5L14 14"
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

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="1"
      y="1"
      width="6"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="9"
      y="1"
      width="6"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="1"
      y="9"
      width="6"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="9"
      y="9"
      width="6"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M5 4h9M5 8h9M5 12h9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="2" cy="4" r="1" fill="currentColor" />
    <circle cx="2" cy="8" r="1" fill="currentColor" />
    <circle cx="2" cy="12" r="1" fill="currentColor" />
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

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(price: number | null) {
  if (!price) return "Free";
  return `₦${price.toLocaleString()}`;
}

function EventCardGrid({ event }: { event: Event }) {
  return (
    <Link
      href={`/events/${event.id}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
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
      {/* Image */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          background: event.image_url
            ? `url(${event.image_url}) center/cover`
            : "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          position: "relative",
        }}
      >
        {!event.image_url && (
          <span
            style={{
              position: "absolute",
              bottom: "12px",
              left: "16px",
              fontFamily: "var(--font-display)",
              fontSize: "28px",
              fontWeight: 800,
              color: "rgba(255,255,255,0.12)",
              letterSpacing: "-1px",
            }}
          >
            {event.title.split(" ")[0].toUpperCase()}
          </span>
        )}
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            padding: "4px 10px",
            borderRadius: "100px",
            fontSize: "11px",
            fontWeight: 500,
            background:
              event.event_type === "ONLINE"
                ? "rgba(193,255,114,0.15)"
                : "rgba(255,107,53,0.15)",
            color:
              event.event_type === "ONLINE" ? "var(--lime)" : "var(--orange)",
            border: `1px solid ${
              event.event_type === "ONLINE"
                ? "rgba(193,255,114,0.3)"
                : "rgba(255,107,53,0.3)"
            }`,
          }}
        >
          {event.event_type === "ONLINE" ? "Online" : "Offline"}
        </span>
        {event.is_sold_out && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              padding: "4px 10px",
              borderRadius: "100px",
              fontSize: "11px",
              fontWeight: 500,
              background: "rgba(255,255,255,0.1)",
              color: "var(--muted)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Sold out
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "12px",
            color: "var(--muted)",
            marginBottom: "10px",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <LocationIcon />
            {event.event_type === "ONLINE" ? "Online" : event.venue}
          </span>
          <span>·</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <CalendarIcon />
            {formatDate(event.event_date)}
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "17px",
            fontWeight: 700,
            letterSpacing: "-0.5px",
            marginBottom: "16px",
            lineHeight: 1.2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {event.title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 800,
              color: event.is_sold_out ? "var(--muted)" : "var(--lime)",
            }}
          >
            {event.is_sold_out ? "Sold out" : formatPrice(event.lowest_price)}
            {!event.is_sold_out && event.ticket_types.length > 1 && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {" "}
                from
              </span>
            )}
          </div>
          {!event.is_sold_out && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "13px",
                color: "var(--muted)",
              }}
            >
              Get tickets <ChevronIcon />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function EventCardList({ event }: { event: Event }) {
  return (
    <Link
      href={`/events/${event.id}`}
      style={{
        display: "flex",
        gap: "20px",
        textDecoration: "none",
        color: "inherit",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        overflow: "hidden",
        padding: "16px",
        transition: "border-color 0.2s",
        alignItems: "center",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "#333")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
      }
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          flexShrink: 0,
          borderRadius: "10px",
          background: event.image_url
            ? `url(${event.image_url}) center/cover`
            : "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              padding: "3px 8px",
              borderRadius: "100px",
              fontSize: "11px",
              fontWeight: 500,
              background:
                event.event_type === "ONLINE"
                  ? "rgba(193,255,114,0.15)"
                  : "rgba(255,107,53,0.15)",
              color:
                event.event_type === "ONLINE" ? "var(--lime)" : "var(--orange)",
              border: `1px solid ${
                event.event_type === "ONLINE"
                  ? "rgba(193,255,114,0.3)"
                  : "rgba(255,107,53,0.3)"
              }`,
            }}
          >
            {event.event_type === "ONLINE" ? "Online" : "Offline"}
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "-0.3px",
            marginBottom: "6px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {event.title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "12px",
            color: "var(--muted)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <LocationIcon />
            {event.event_type === "ONLINE" ? "Online" : event.venue}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <CalendarIcon />
            {formatDate(event.event_date)}
          </span>
        </div>
      </div>
      <div
        style={{
          flexShrink: 0,
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 800,
            color: event.is_sold_out ? "var(--muted)" : "var(--lime)",
            marginBottom: "8px",
          }}
        >
          {event.is_sold_out ? "Sold out" : formatPrice(event.lowest_price)}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "13px",
            color: "var(--muted)",
            justifyContent: "flex-end",
          }}
        >
          View <ChevronIcon />
        </div>
      </div>
    </Link>
  );
}

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [available, setAvailable] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (eventType) params.set("event_type", eventType);
  if (dateFrom) params.set("date_from", dateFrom);
  if (dateTo) params.set("date_to", dateTo);
  if (priceMin) params.set("price_min", priceMin);
  if (priceMax) params.set("price_max", priceMax);
  if (available) params.set("available", "true");
  params.set("page", String(page));

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events", params.toString()],
    queryFn: async () => {
      const { data } = await api.get(`/events/?${params.toString()}`);
      return data;
    },
  });

  const events: Event[] = data?.results || [];
  const totalCount = data?.count || 0;
  const hasNext = !!data?.next;
  const hasPrev = !!data?.previous;

  const inputStyle = {
    padding: "10px 14px",
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    color: "var(--white)",
    fontSize: "14px",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--black)",
        fontFamily: "var(--font-body)",
        paddingTop: "80px",
      }}
    >
      {/* Page header */}
      <div
        style={{
          padding: "clamp(40px, 5vw, 60px) clamp(24px, 5vw, 48px) 0",
          borderBottom: "1px solid var(--border)",
          background: "var(--card)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
              {totalCount > 0
                ? `${totalCount} events found`
                : "Discover events"}
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
              What&apos;s happening
            </h1>
          </div>

          {/* Search bar */}
          <div
            style={{
              position: "relative",
              marginBottom: "24px",
              maxWidth: "600px",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
                pointerEvents: "none",
              }}
            >
              <SearchIcon />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search events, venues, organizers..."
              style={{
                width: "100%",
                padding: "14px 16px 14px 44px",
                background: "var(--card2)",
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
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Filters */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              paddingBottom: "24px",
              alignItems: "center",
            }}
          >
            <select
              value={eventType}
              onChange={(e) => {
                setEventType(e.target.value);
                setPage(1);
              }}
              style={{ ...inputStyle, cursor: "pointer" }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(193,255,114,0.4)")
              }
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            >
              <option value="">All types</option>
              <option value="OFFLINE">Offline</option>
              <option value="ONLINE">Online</option>
            </select>

            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPage(1);
              }}
              style={{ ...inputStyle, colorScheme: "dark" }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(193,255,114,0.4)")
              }
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />

            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPage(1);
              }}
              style={{ ...inputStyle, colorScheme: "dark" }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(193,255,114,0.4)")
              }
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />

            <input
              type="number"
              value={priceMin}
              onChange={(e) => {
                setPriceMin(e.target.value);
                setPage(1);
              }}
              placeholder="Min price"
              style={{ ...inputStyle, width: "120px" }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(193,255,114,0.4)")
              }
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />

            <input
              type="number"
              value={priceMax}
              onChange={(e) => {
                setPriceMax(e.target.value);
                setPage(1);
              }}
              placeholder="Max price"
              style={{ ...inputStyle, width: "120px" }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(193,255,114,0.4)")
              }
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "var(--muted)",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <div
                onClick={() => {
                  setAvailable(!available);
                  setPage(1);
                }}
                style={{
                  width: "36px",
                  height: "20px",
                  borderRadius: "100px",
                  background: available ? "var(--lime)" : "var(--border)",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: available ? "18px" : "2px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: available ? "var(--black)" : "var(--muted)",
                    transition: "left 0.2s",
                  }}
                />
              </div>
              Available only
            </label>

            {/* View toggle */}
            <div
              style={{
                display: "flex",
                gap: "4px",
                padding: "4px",
                background: "var(--card2)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                marginLeft: "auto",
              }}
            >
              {(["grid", "list"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    padding: "6px 10px",
                    background:
                      viewMode === mode ? "var(--border)" : "transparent",
                    border: "none",
                    borderRadius: "7px",
                    color: viewMode === mode ? "var(--white)" : "var(--muted)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {mode === "grid" ? <GridIcon /> : <ListIcon />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div
        style={{
          padding: "clamp(32px, 4vw, 48px) clamp(24px, 5vw, 48px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {isLoading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                viewMode === "grid"
                  ? "repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
                  : "1fr",
              gap: "16px",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: viewMode === "grid" ? "320px" : "130px",
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
                marginBottom: "12px",
                color: "var(--white)",
              }}
            >
              Something went wrong
            </div>
            <p>Could not load events. Please try again.</p>
          </div>
        )}

        {!isLoading && !isError && events.length === 0 && (
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
                marginBottom: "12px",
                color: "var(--white)",
              }}
            >
              No events found
            </div>
            <p>Try adjusting your filters or search term.</p>
          </div>
        )}

        {!isLoading && events.length > 0 && (
          <>
            <div
              style={{
                display: viewMode === "grid" ? "grid" : "flex",
                flexDirection: viewMode === "list" ? "column" : undefined,
                gridTemplateColumns:
                  viewMode === "grid"
                    ? "repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
                    : undefined,
                gap: "16px",
              }}
            >
              {events.map((event) =>
                viewMode === "grid" ? (
                  <EventCardGrid key={event.id} event={event} />
                ) : (
                  <EventCardList key={event.id} event={event} />
                ),
              )}
            </div>

            {/* Pagination */}
            {(hasNext || hasPrev) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "48px",
                }}
              >
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={!hasPrev}
                  style={{
                    padding: "10px 24px",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: "100px",
                    color: hasPrev ? "var(--white)" : "var(--muted)",
                    cursor: hasPrev ? "pointer" : "not-allowed",
                    fontSize: "14px",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.2s",
                  }}
                >
                  Previous
                </button>
                <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                  Page {page}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!hasNext}
                  style={{
                    padding: "10px 24px",
                    background: hasNext ? "var(--lime)" : "transparent",
                    border: `1px solid ${hasNext ? "var(--lime)" : "var(--border)"}`,
                    borderRadius: "100px",
                    color: hasNext ? "var(--black)" : "var(--muted)",
                    cursor: hasNext ? "pointer" : "not-allowed",
                    fontSize: "14px",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.2s",
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
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
