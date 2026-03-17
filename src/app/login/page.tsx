"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.username, form.password);
      router.push("/events");
    } catch {
      setError("Invalid username or password.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "var(--black)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Left panel — decorative */}
      <div
        style={{
          flex: 1,
          background: "var(--card)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
        className="hide-mobile"
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(193,255,114,0.07) 0%, transparent 60%)",
          }}
        />

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
            {/*Gate<span style={{ color: "var(--lime)" }}>pass</span>*/}
          </span>
        </Link>

        {/* Center content */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 4vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 0.95,
              marginBottom: "24px",
            }}
          >
            Every event.
            <br />
            <span style={{ color: "var(--lime)" }}>One pass.</span>
          </div>
          <p
            style={{
              fontSize: "16px",
              color: "var(--muted)",
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: "320px",
            }}
          >
            Log in to access your tickets, manage events, and buy on the
            marketplace.
          </p>
        </div>

        {/* Floating ticket card */}
        <div
          style={{
            background: "var(--card2)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "20px 24px",
            maxWidth: "320px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              Afrobeats Night
            </span>
            <span
              style={{
                padding: "3px 10px",
                background: "rgba(193,255,114,0.1)",
                border: "1px solid rgba(193,255,114,0.2)",
                borderRadius: "100px",
                fontSize: "11px",
                color: "var(--lime)",
              }}
            >
              VALID
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {[
              { label: "Date", value: "Dec 14, 2026" },
              { label: "Type", value: "VIP" },
              { label: "Venue", value: "Eko Hotel" },
              { label: "City", value: "Lagos" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--muted)",
                    marginBottom: "2px",
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              height: "1px",
              background:
                "repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 6px, transparent 6px, transparent 10px)",
              marginBottom: "16px",
            }}
          />
          <div style={{ fontSize: "12px", color: "var(--muted)" }}>
            🎫 Your tickets are waiting for you
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(24px, 5vw, 80px)",
          position: "relative",
        }}
      >
        {/* Mobile wordmark */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
          }}
          className="show-mobile"
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "20px",
                letterSpacing: "-0.5px",
                color: "var(--white)",
              }}
            >
              {/*Gate<span style={{ color: "var(--lime)" }}>pass</span>*/}
            </span>
          </Link>
        </div>

        <div style={{ width: "100%", maxWidth: "400px" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: "8px",
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "var(--muted)",
              marginBottom: "40px",
              fontWeight: 300,
            }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              style={{
                color: "var(--lime)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Sign up
            </Link>
          </p>

          {error && (
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(255,68,68,0.08)",
                border: "1px solid rgba(255,68,68,0.2)",
                borderRadius: "10px",
                fontSize: "14px",
                color: "#ff6666",
                marginBottom: "24px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "8px",
                  color: "var(--muted)",
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="your_username"
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "var(--card)",
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

            <div style={{ marginBottom: "32px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "8px",
                  color: "var(--muted)",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%",
                    padding: "14px 48px 14px 16px",
                    background: "var(--card)",
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "var(--muted)",
                    cursor: "pointer",
                    fontSize: "16px",
                    padding: "4px",
                  }}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "16px",
                background: isLoading ? "rgba(193,255,114,0.5)" : "var(--lime)",
                color: "var(--black)",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 500,
                cursor: isLoading ? "not-allowed" : "pointer",
                fontFamily: "var(--font-body)",
                transition: "all 0.2s",
              }}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
