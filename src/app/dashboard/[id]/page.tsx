"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
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

function StatCard({
  label,
  value,
  accent,
  orange,
}: {
  label: string;
  value: string;
  accent?: boolean;
  orange?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "20px",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "var(--muted)",
          marginBottom: "8px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "26px",
          fontWeight: 800,
          letterSpacing: "-1px",
          color: accent
            ? "var(--lime)"
            : orange
              ? "var(--orange)"
              : "var(--white)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function EventDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "attendance"
  >("overview");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [ordersPage, setOrdersPage] = useState(1);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const { data: summary } = useQuery({
    queryKey: ["dashboard-summary", params.id, dateFrom, dateTo],
    queryFn: async () => {
      const p = new URLSearchParams();
      if (dateFrom) p.set("date_from", dateFrom);
      if (dateTo) p.set("date_to", dateTo);
      const { data } = await api.get(
        `/events/${params.id}/dashboard/summary/?${p}`,
      );
      return data;
    },
    enabled: isAuthenticated,
  });

  const { data: ticketTypes } = useQuery({
    queryKey: ["dashboard-ticket-types", params.id],
    queryFn: async () => {
      const { data } = await api.get(
        `/events/${params.id}/dashboard/ticket-types/`,
      );
      return data;
    },
    enabled: isAuthenticated,
  });

  const { data: orders } = useQuery({
    queryKey: ["dashboard-orders", params.id, dateFrom, dateTo, ordersPage],
    queryFn: async () => {
      const p = new URLSearchParams();
      if (dateFrom) p.set("date_from", dateFrom);
      if (dateTo) p.set("date_to", dateTo);
      p.set("page", String(ordersPage));
      const { data } = await api.get(
        `/events/${params.id}/dashboard/orders/?${p}`,
      );
      return data;
    },
    enabled: isAuthenticated && activeTab === "orders",
  });

  const { data: attendance } = useQuery({
    queryKey: ["dashboard-attendance", params.id],
    queryFn: async () => {
      const { data } = await api.get(
        `/events/${params.id}/dashboard/attendance/`,
      );
      return data;
    },
    enabled: isAuthenticated && activeTab === "attendance",
  });

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

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "orders", label: "Orders" },
    { key: "attendance", label: "Attendance" },
  ] as const;

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

        {/* Header */}
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
            Event dashboard
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1,
              marginBottom: "8px",
            }}
          >
            {summary?.event || "Loading..."}
          </h1>
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

        {/* Summary stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <StatCard
            label="Tickets sold"
            value={String(summary?.total_tickets_sold || 0)}
          />
          <StatCard
            label="Net revenue"
            value={`₦${Number(summary?.net_revenue || 0).toLocaleString()}`}
            accent
          />
          <StatCard
            label="Checked in"
            value={String(summary?.total_checked_in || 0)}
            orange
          />
          <StatCard
            label="Attendance rate"
            value={summary?.attendance_rate || "0%"}
          />
          <StatCard label="Capacity" value={String(summary?.capacity || 0)} />
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "2px",
            padding: "4px",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            marginBottom: "32px",
            width: "fit-content",
          }}
        >
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: "8px 20px",
                background: activeTab === key ? "var(--border)" : "transparent",
                border: "none",
                borderRadius: "9px",
                color: activeTab === key ? "var(--white)" : "var(--muted)",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                marginBottom: "16px",
              }}
            >
              Ticket types
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {(ticketTypes || []).map((tt: any) => {
                const pct =
                  tt.quantity > 0
                    ? Math.round((tt.sold / tt.quantity) * 100)
                    : 0;
                return (
                  <div
                    key={tt.id}
                    style={{
                      padding: "20px",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "12px",
                        flexWrap: "wrap",
                        gap: "8px",
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
                          {tt.name}
                        </div>
                        <div
                          style={{ fontSize: "12px", color: "var(--muted)" }}
                        >
                          ₦{Number(tt.price).toLocaleString()} · {tt.sold} sold
                          · {tt.available} remaining
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "var(--lime)",
                          }}
                        >
                          ₦{Number(tt.net_revenue).toLocaleString()}
                        </div>
                        <div
                          style={{ fontSize: "11px", color: "var(--muted)" }}
                        >
                          net revenue
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        height: "6px",
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: "100px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "100px",
                          width: `${pct}%`,
                          background:
                            pct === 100 ? "var(--orange)" : "var(--lime)",
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "11px",
                        color: "var(--muted)",
                        marginTop: "6px",
                      }}
                    >
                      <span>{pct}% sold</span>
                      <span>
                        {tt.sold}/{tt.quantity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Orders tab */}
        {activeTab === "orders" && (
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                marginBottom: "16px",
              }}
            >
              Orders
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {(orders?.results || []).map((order: any) => (
                <div
                  key={order.order_id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1, minWidth: "160px" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: "2px",
                      }}
                    >
                      {order.buyer_name}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                      {order.buyer_email}
                    </div>
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                    {order.ticket_type} · x{order.quantity}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "var(--lime)",
                      }}
                    >
                      +₦{Number(order.net_earnings).toLocaleString()}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                      {new Date(order.purchased_at).toLocaleDateString(
                        "en-NG",
                        {
                          day: "numeric",
                          month: "short",
                        },
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {orders && (orders.next || orders.previous) && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "12px",
                    marginTop: "16px",
                  }}
                >
                  <button
                    onClick={() => setOrdersPage((p) => p - 1)}
                    disabled={!orders.previous}
                    style={{
                      padding: "8px 20px",
                      background: "transparent",
                      border: "1px solid var(--border)",
                      borderRadius: "100px",
                      color: orders.previous ? "var(--white)" : "var(--muted)",
                      cursor: orders.previous ? "pointer" : "not-allowed",
                      fontSize: "13px",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setOrdersPage((p) => p + 1)}
                    disabled={!orders.next}
                    style={{
                      padding: "8px 20px",
                      background: orders.next ? "var(--lime)" : "transparent",
                      border: `1px solid ${orders.next ? "var(--lime)" : "var(--border)"}`,
                      borderRadius: "100px",
                      color: orders.next ? "var(--black)" : "var(--muted)",
                      cursor: orders.next ? "pointer" : "not-allowed",
                      fontSize: "13px",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Attendance tab */}
        {activeTab === "attendance" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              <StatCard
                label="Total sold"
                value={String(attendance?.total_sold || 0)}
              />
              <StatCard
                label="Checked in"
                value={String(attendance?.total_checked_in || 0)}
                orange
              />
              <StatCard
                label="Remaining"
                value={String(attendance?.remaining || 0)}
              />
              <StatCard
                label="Attendance rate"
                value={attendance?.attendance_rate || "0%"}
                accent
              />
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                marginBottom: "16px",
              }}
            >
              Recent check-ins
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {(attendance?.recent_checkins || []).map(
                (log: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 20px",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      gap: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: "160px" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          marginBottom: "2px",
                        }}
                      >
                        {log.owner_name}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                        {log.owner_email}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--muted)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "2px",
                      }}
                    >
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "100px",
                          background: "rgba(193,255,114,0.1)",
                          color: "var(--lime)",
                          fontSize: "11px",
                          border: "1px solid rgba(193,255,114,0.2)",
                        }}
                      >
                        {log.ticket_type}
                      </span>
                      <span>
                        {new Date(log.scanned_at).toLocaleTimeString("en-NG", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ),
              )}

              {attendance?.recent_checkins?.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "var(--muted)",
                    fontSize: "14px",
                  }}
                >
                  No check-ins yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
