"use client";

import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useEffect, useRef } from "react";

const MARQUEE_ITEMS = [
  "Music concerts",
  "Tech conferences",
  "Comedy shows",
  "Fashion shows",
  "Art exhibitions",
  "Food festivals",
  "Sports events",
  "Webinars",
  "Music concerts",
  "Tech conferences",
  "Comedy shows",
  "Fashion shows",
  "Art exhibitions",
  "Food festivals",
  "Sports events",
  "Webinars",
];

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Afrobeats Night — The Grand Return",
    venue: "Eko Hotel, Lagos",
    date: "Dec 14, 2026",
    price: "₦15,000",
    type: "OFFLINE",
    color: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    label: "AFROBEATS",
    featured: true,
  },
  {
    id: 2,
    title: "Web3 Summit Lagos 2026",
    venue: "Zoom",
    date: "Dec 20, 2026",
    price: "₦5,000",
    type: "ONLINE",
    color: "linear-gradient(135deg, #2d1b1b 0%, #3d1515 50%, #5c1a1a 100%)",
    label: "TECH",
    featured: false,
  },
  {
    id: 3,
    title: "LOL Night — Stand-Up Special",
    venue: "Terra Kulture, Lagos",
    date: "Jan 5, 2027",
    price: "₦8,000",
    type: "OFFLINE",
    color: "linear-gradient(135deg, #1a2d1a 0%, #1a3d1a 50%, #1a5c1a 100%)",
    label: "COMEDY",
    featured: false,
  },
  {
    id: 4,
    title: "Lagos Fashion Week 2027",
    venue: "Landmark, Lagos",
    date: "Jan 12, 2027",
    price: "₦25,000",
    type: "OFFLINE",
    color: "linear-gradient(135deg, #2d2d1b 0%, #3d3d15 50%, #5c5c1a 100%)",
    label: "FASHION",
    featured: false,
  },
];

const STEPS = [
  {
    number: "01",
    icon: "🔍",
    title: "Discover events",
    desc: "Browse concerts, conferences, and shows happening near you or online.",
  },
  {
    number: "02",
    icon: "🎫",
    title: "Buy your ticket",
    desc: "Secure checkout powered by Paystack. Your ticket lands instantly.",
  },
  {
    number: "03",
    icon: "📱",
    title: "Show your QR",
    desc: "Walk up, scan, and you're in. No printouts, no stress.",
  },
  {
    number: "04",
    icon: "🔄",
    title: "Can't make it? Resell",
    desc: "List on the marketplace. Ownership transfers automatically.",
  },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "Instant split payments",
    desc: "Revenue hits your account the moment someone pays. No waiting, no manual transfers.",
  },
  {
    icon: "🎟",
    title: "Multiple ticket tiers",
    desc: "Create General, VIP, and Early Bird tickets with individual capacities.",
  },
  {
    icon: "📊",
    title: "Real-time dashboard",
    desc: "See sales, revenue, and attendance live. Staff can run check-ins from their phones.",
  },
  {
    icon: "🌐",
    title: "Online & offline events",
    desc: "Host in-person or virtual — automatic join link delivery included.",
  },
];

const QR_PATTERN = [
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1,
  0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1,
];

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore();

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".animate-in").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(24px)";
      (el as HTMLElement).style.transition =
        "opacity 0.6s ease, transform 0.6s ease";
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--black)", minHeight: "100vh" }}>
      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(100px, 15vh, 140px) 48px 80px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(193,255,114,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(255,107,53,0.06) 0%, transparent 50%)
          `,
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            border: "1px solid rgba(193,255,114,0.3)",
            borderRadius: "100px",
            fontSize: "13px",
            color: "var(--lime)",
            marginBottom: "32px",
            background: "rgba(193,255,114,0.05)",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--lime)",
              animation: "pulse 2s infinite",
            }}
          />
          Now live in Nigeria
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(36px, 7vw, 96px)",
            lineHeight: 0.95,
            letterSpacing: "-3px",
            marginBottom: "24px",
            maxWidth: "900px",
            position: "relative",
          }}
        >
          Your pass to
          <br />
          <span style={{ color: "var(--lime)" }}>everything</span>
          <span style={{ color: "var(--orange)" }}>.</span>
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "var(--muted)",
            maxWidth: "440px",
            lineHeight: 1.6,
            marginBottom: "48px",
            fontWeight: 300,
            position: "relative",
          }}
        >
          Buy, sell, and manage event tickets — all in one place. No middlemen.
          No stress.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "80px",
            position: "relative",
          }}
        >
          <Link
            href="/events"
            style={{
              padding: "16px 36px",
              background: "var(--lime)",
              color: "var(--black)",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s",
              fontFamily: "var(--font-body)",
            }}
          >
            Find events near you
          </Link>
          <Link
            href="/events/create"
            style={{
              padding: "16px 36px",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--white)",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s",
              fontFamily: "var(--font-body)",
            }}
          >
            Host an event →
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {[
            { number: "12k+", label: "Tickets sold" },
            { number: "400+", label: "Events hosted" },
            { number: "₦0", label: "Hidden fees" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{ display: "flex", alignItems: "center", gap: "48px" }}
            >
              {i > 0 && (
                <div
                  style={{
                    width: "1px",
                    height: "40px",
                    background: "var(--border)",
                  }}
                />
              )}
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "var(--white)",
                    display: "block",
                  }}
                >
                  {stat.number}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--muted)",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div
        style={{
          padding: "24px 0",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
          background: "var(--card)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "48px",
            animation: "marquee 25s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {MARQUEE_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--muted)",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--lime)",
                  flexShrink: 0,
                }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* EVENTS */}
      <section
        style={{ padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 48px)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "48px",
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
              Upcoming events
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-1.5px",
                lineHeight: 1,
              }}
            >
              What&apos;s happening
            </h2>
          </div>
          <Link
            href="/events"
            style={{
              padding: "10px 20px",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              color: "var(--white)",
              textDecoration: "none",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
          >
            View all events →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "16px",
          }}
        >
          {MOCK_EVENTS.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="animate-in"
              style={{
                gridColumn: "span 1",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
                display: "block",
                transition: "transform 0.3s, border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.borderColor = "#333";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: event.featured ? "21/9" : "16/9",
                  background: event.color,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "40px",
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.12)",
                    letterSpacing: "-2px",
                    padding: "16px",
                    lineHeight: 1,
                  }}
                >
                  {event.label}
                </span>
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
                      event.type === "ONLINE"
                        ? "rgba(193,255,114,0.15)"
                        : "rgba(255,107,53,0.15)",
                    color:
                      event.type === "ONLINE" ? "var(--lime)" : "var(--orange)",
                    border: `1px solid ${
                      event.type === "ONLINE"
                        ? "rgba(193,255,114,0.3)"
                        : "rgba(255,107,53,0.3)"
                    }`,
                  }}
                >
                  {event.type === "ONLINE" ? "Online" : "Offline"}
                </span>
              </div>
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
                  <span>
                    {event.type === "ONLINE" ? "🌐" : "📍"} {event.venue}
                  </span>
                  <span>·</span>
                  <span>{event.date}</span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                    marginBottom: "16px",
                    lineHeight: 1.2,
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
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "var(--lime)",
                    }}
                  >
                    {event.price}
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "var(--muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {" "}
                      from
                    </span>
                  </div>
                  <button
                    style={{
                      padding: "8px 18px",
                      background: "var(--lime)",
                      color: "var(--black)",
                      border: "none",
                      borderRadius: "100px",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      transition: "all 0.2s",
                    }}
                  >
                    Get tickets
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 48px)",
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
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
            Simple process
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
            }}
          >
            How Gatepass works
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2px",
            background: "var(--border)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="animate-in"
              style={{
                background: "var(--card)",
                padding: "clamp(24px, 3vw, 40px) clamp(20px, 2.5vw, 32px)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "64px",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.04)",
                  lineHeight: 1,
                  marginBottom: "24px",
                  display: "block",
                }}
              >
                {step.number}
              </span>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(193,255,114,0.1)",
                  border: "1px solid rgba(193,255,114,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  fontSize: "18px",
                }}
              >
                {step.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                  marginBottom: "10px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TICKET VISUAL */}
      <section
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 48px)",
          display: "flex",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1", minWidth: "280px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--lime)",
              marginBottom: "16px",
            }}
          >
            Your digital ticket
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1,
              marginBottom: "20px",
            }}
          >
            A ticket that
            <br />
            feels like a <span style={{ color: "var(--lime)" }}>ticket</span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "16px",
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: "400px",
              marginBottom: "32px",
            }}
          >
            Every Gatepass ticket has a unique QR code signed to you.
            Tamper-proof, scannable, and yours.
          </p>
          <Link
            href="/register"
            style={{
              padding: "16px 36px",
              background: "var(--lime)",
              color: "var(--black)",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              display: "inline-block",
            }}
          >
            Get your first ticket
          </Link>
        </div>

        {/* Ticket stub */}
        <div
          style={{
            flex: "1",
            minWidth: "280px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "min(360px, 100%)",
              background: "var(--card2)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              overflow: "hidden",
              transform: "rotate(-2deg)",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.transform =
                "rotate(0deg) scale(1.02)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.transform =
                "rotate(-2deg)")
            }
          >
            <div
              style={{
                padding: "28px",
                background: "linear-gradient(135deg, #1a2a0a 0%, #0f1a05 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "14px",
                    color: "var(--white)",
                  }}
                >
                  Gate<span style={{ color: "var(--lime)" }}>pass</span>
                </span>
                <span
                  style={{ fontSize: "11px", color: "rgba(193,255,114,0.5)" }}
                >
                  VALID
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
                Afrobeats Night
              </div>
              <div style={{ fontSize: "12px", color: "rgba(193,255,114,0.7)" }}>
                Hosted by Kaycee Events
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginTop: "20px",
                }}
              >
                {[
                  { label: "Date", value: "Dec 14, 2026" },
                  { label: "Time", value: "8:00 PM" },
                  { label: "Venue", value: "Eko Hotel" },
                  { label: "City", value: "Lagos" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: "rgba(255,255,255,0.4)",
                        marginBottom: "4px",
                      }}
                    >
                      {label}
                    </label>
                    <span style={{ fontSize: "13px", fontWeight: 500 }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Perforated divider */}
            <div
              style={{
                height: "1px",
                background: "var(--border)",
                position: "relative",
                margin: "0 -1px",
              }}
            >
              {[-12, null].map((left, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: left !== null ? "-12px" : undefined,
                    right: left === null ? "-12px" : undefined,
                    top: "-12px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "var(--black)",
                    border: "1px solid var(--border)",
                  }}
                />
              ))}
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

            <div
              style={{
                padding: "28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--muted)",
                    marginBottom: "4px",
                  }}
                >
                  Ticket holder
                </label>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  Kelechi A.
                </span>
              </div>
              <span
                style={{
                  padding: "6px 14px",
                  background: "rgba(193,255,114,0.1)",
                  border: "1px solid rgba(193,255,114,0.2)",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--lime)",
                }}
              >
                VIP
              </span>
            </div>

            <div
              style={{
                margin: "0 28px 28px",
                padding: "20px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* QR */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "8px",
                  flexShrink: 0,
                  padding: "6px",
                  background: "white",
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "2px",
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
                  fontSize: "12px",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--white)",
                    marginBottom: "2px",
                  }}
                >
                  Scan to enter
                </strong>
                Unique QR · HMAC signed · One-time use
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORGANIZER */}
      <section
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 48px)",
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ marginBottom: "16px" }}>
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
            For event organizers
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1,
            }}
          >
            Host events.
            <br />
            Get paid <span style={{ color: "var(--orange)" }}>instantly</span>.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "center",
            marginTop: "64px",
          }}
        >
          <div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="animate-in"
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(193,255,114,0.08)",
                      border: "1px solid rgba(193,255,114,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "16px",
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "15px",
                        fontWeight: 700,
                        marginBottom: "4px",
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {f.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--muted)",
                        lineHeight: 1.5,
                        fontWeight: 300,
                      }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "40px" }}>
              <Link
                href={isAuthenticated ? "/dashboard" : "/register"}
                style={{
                  padding: "16px 36px",
                  background: "var(--lime)",
                  color: "var(--black)",
                  borderRadius: "100px",
                  fontSize: "16px",
                  fontWeight: 500,
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  display: "inline-block",
                }}
              >
                {isAuthenticated ? "Go to dashboard" : "Start hosting for free"}
              </Link>
            </div>
          </div>

          {/* Dashboard preview */}
          <div
            style={{
              background: "var(--card2)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
                paddingBottom: "16px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                Afrobeats Night — Dashboard
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  color: "var(--lime)",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--lime)",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                Live
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {[
                { label: "Tickets sold", value: "342", color: "var(--white)" },
                { label: "Net revenue", value: "₦4.1M", color: "var(--lime)" },
                { label: "Checked in", value: "218", color: "var(--orange)" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "var(--muted)",
                      marginBottom: "6px",
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "22px",
                      fontWeight: 800,
                      letterSpacing: "-0.5px",
                      color: s.color,
                    }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {[
              { label: "General", sold: 280, total: 300, pct: 93 },
              { label: "VIP", sold: 52, total: 60, pct: 87 },
              {
                label: "Early Bird",
                sold: 10,
                total: 10,
                pct: 100,
                orange: true,
              },
            ].map((bar) => (
              <div key={bar.label} style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "var(--muted)",
                    marginBottom: "6px",
                  }}
                >
                  <span>
                    {bar.label} ({bar.sold} sold)
                  </span>
                  <span>
                    {bar.sold}/{bar.total}
                  </span>
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
                      width: `${bar.pct}%`,
                      background: bar.orange ? "var(--orange)" : "var(--lime)",
                      transition: "width 1s ease",
                    }}
                  />
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--muted)",
                  marginBottom: "12px",
                }}
              >
                Recent orders
              </div>
              {[
                { name: "Amara O.", type: "VIP", amount: "₦30,000" },
                { name: "Tunde B.", type: "General x2", amount: "₦24,000" },
                { name: "Fatima K.", type: "General", amount: "₦12,000" },
              ].map((order) => (
                <div
                  key={order.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "13px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "var(--muted)" }}>
                    {order.name} · {order.type}
                  </span>
                  <span style={{ color: "var(--lime)", fontWeight: 500 }}>
                    +{order.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(80px, 10vw, 120px) clamp(24px, 5vw, 48px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(193,255,114,0.07) 0%, transparent 70%)",
          }}
        />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 0.95,
            marginBottom: "24px",
            position: "relative",
          }}
        >
          Ready to get in?
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "var(--muted)",
            maxWidth: "400px",
            margin: "0 auto 48px",
            fontWeight: 300,
            position: "relative",
          }}
        >
          Join thousands of event-goers and organizers already on Gatepass.
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <Link
            href="/register"
            style={{
              padding: "16px 36px",
              background: "var(--lime)",
              color: "var(--black)",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
            }}
          >
            Create your account
          </Link>
          <Link
            href="/events"
            style={{
              padding: "16px 36px",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--white)",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
            }}
          >
            Browse events
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "clamp(24px, 3vw, 40px) clamp(24px, 5vw, 48px)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "18px",
            letterSpacing: "-0.5px",
          }}
        >
          Gate<span style={{ color: "var(--lime)" }}>pass</span>
        </span>
        <span style={{ fontSize: "13px", color: "var(--muted)" }}>
          © 2026 Gatepass. Your pass to everything.
        </span>
        <ul style={{ display: "flex", gap: "24px", listStyle: "none" }}>
          {["Privacy", "Terms", "Support"].map((item) => (
            <li key={item}>
              <Link
                href="#"
                style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
