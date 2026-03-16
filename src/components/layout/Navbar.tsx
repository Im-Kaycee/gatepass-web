"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, fetchUser } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 48px",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #222" : "1px solid transparent",
        transition: "all 0.3s ease",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Wordmark */}
      <Link href="/" style={{ textDecoration: "none" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "22px",
            letterSpacing: "-0.5px",
            color: "var(--white)",
          }}
        >
          Gate<span style={{ color: "var(--lime)" }}>pass</span>
        </span>
      </Link>

      {/* Desktop nav links */}
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        className="hide-mobile"
      >
        {[
          { label: "Discover", href: "/events" },
          { label: "Marketplace", href: "/marketplace" },
          { label: "Host an event", href: "/events/create" },
        ].map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              style={{
                color: isActive(href) ? "var(--white)" : "var(--muted)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 400,
                transition: "color 0.2s",
                borderBottom: isActive(href) ? "1px solid var(--lime)" : "none",
                paddingBottom: "2px",
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div
        style={{ display: "flex", gap: "12px", alignItems: "center" }}
        className="hide-mobile"
      >
        {isAuthenticated && user ? (
          <>
            <Link
              href="/my-tickets"
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: "14px",
                transition: "color 0.2s",
              }}
            >
              My tickets
            </Link>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "100px",
                  color: "var(--white)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontFamily: "var(--font-body)",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "rgba(193,255,114,0.15)",
                    border: "1px solid rgba(193,255,114,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--lime)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {user.first_name?.[0] || user.username[0].toUpperCase()}
                </div>
                {user.first_name || user.username}
              </button>

              {menuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "8px",
                    minWidth: "180px",
                    zIndex: 200,
                  }}
                >
                  {[
                    { label: "My tickets", href: "/my-tickets" },
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Onboarding", href: "/onboarding" },
                    { label: "Settings", href: "/settings" },
                  ].map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "block",
                        padding: "10px 12px",
                        color: "var(--muted)",
                        textDecoration: "none",
                        fontSize: "14px",
                        borderRadius: "8px",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.background =
                          "rgba(255,255,255,0.05)";
                        (e.target as HTMLElement).style.color = "var(--white)";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.background =
                          "transparent";
                        (e.target as HTMLElement).style.color = "var(--muted)";
                      }}
                    >
                      {label}
                    </Link>
                  ))}
                  <div
                    style={{
                      borderTop: "1px solid var(--border)",
                      margin: "4px 0",
                    }}
                  />
                  <button
                    onClick={logout}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 12px",
                      color: "#ff4444",
                      background: "transparent",
                      border: "none",
                      fontSize: "14px",
                      textAlign: "left",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.background =
                        "rgba(255,68,68,0.08)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.background =
                        "transparent")
                    }
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              style={{
                padding: "10px 20px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--white)",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "100px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Log in
            </Link>
            <Link
              href="/register"
              style={{
                padding: "10px 20px",
                background: "var(--lime)",
                color: "var(--black)",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "100px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Get started
            </Link>
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="show-mobile"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "transparent",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "8px 10px",
          cursor: "pointer",
          color: "var(--white)",
          fontSize: "18px",
        }}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="show-mobile"
          style={{
            position: "fixed",
            top: "65px",
            left: 0,
            right: 0,
            background: "var(--card)",
            borderBottom: "1px solid var(--border)",
            padding: "24px",

            flexDirection: "column",
            gap: "16px",
          }}
        >
          {[
            { label: "Discover", href: "/events" },
            { label: "Marketplace", href: "/marketplace" },
            { label: "My tickets", href: "/my-tickets" },
            { label: "Host an event", href: "/events/create" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "var(--white)",
                textDecoration: "none",
                fontSize: "18px",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
              }}
            >
              {label}
            </Link>
          ))}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "16px",
              display: "flex",
              gap: "12px",
            }}
          >
            {isAuthenticated ? (
              <button
                onClick={logout}
                style={{
                  padding: "12px 24px",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "100px",
                  color: "var(--white)",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{
                    padding: "12px 24px",
                    border: "1px solid var(--border)",
                    borderRadius: "100px",
                    color: "var(--white)",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  style={{
                    padding: "12px 24px",
                    background: "var(--lime)",
                    borderRadius: "100px",
                    color: "var(--black)",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
