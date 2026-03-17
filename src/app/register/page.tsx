"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { fetchUser } = useAuthStore();
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    setIsLoading(true);

    try {
      const { data } = await api.post("/accounts/register/", form);
      localStorage.setItem("access_token", data.token.access);
      localStorage.setItem("refresh_token", data.token.refresh);
      await fetchUser();
      router.push("/events");
    } catch (err: any) {
      setError(err.response?.data || { detail: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
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
  };

  const labelStyle = {
    display: "block" as const,
    fontSize: "13px",
    fontWeight: 500,
    marginBottom: "8px",
    color: "var(--muted)",
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
      {/* Left panel */}
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(255,107,53,0.07) 0%, transparent 60%)",
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
            Your first event
            <br />
            is one step
            <br />
            <span style={{ color: "var(--orange)" }}>away.</span>
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
            Create your account and start discovering events, buying tickets,
            and hosting your own.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          {[
            { number: "12k+", label: "Tickets sold" },
            { number: "400+", label: "Events hosted" },
            { number: "₦0", label: "Hidden fees" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                }}
              >
                {s.number}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--muted)",
                  marginTop: "2px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
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
          padding:
            "clamp(80px, 5vw, 80px) clamp(24px, 5vw, 80px) clamp(24px, 5vw, 80px)",
          position: "relative",
        }}
      >
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

        <div style={{ width: "100%", maxWidth: "440px" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: "8px",
            }}
          >
            Create account
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "var(--muted)",
              marginBottom: "32px",
              fontWeight: 300,
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "var(--lime)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Log in
            </Link>
          </p>

          {error.detail && (
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
              {error.detail}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label style={labelStyle}>First name</label>
                <input
                  type="text"
                  value={form.first_name}
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                  placeholder="Kelechi"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
              <div>
                <label style={labelStyle}>Last name</label>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                  placeholder="Adeyemi"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="kelechi_a"
                required
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                }
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
              {error.username && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#ff6666",
                    marginTop: "6px",
                  }}
                >
                  {error.username}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="kelechi@example.com"
                required
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                }
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
              {error.email && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#ff6666",
                    marginTop: "6px",
                  }}
                >
                  {error.email}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  style={{ ...inputStyle, paddingRight: "48px" }}
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
                  }}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
              {error.password && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#ff6666",
                    marginTop: "6px",
                  }}
                >
                  {Array.isArray(error.password)
                    ? error.password[0]
                    : error.password}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label style={labelStyle}>Confirm password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password2}
                onChange={(e) =>
                  setForm({ ...form, password2: e.target.value })
                }
                placeholder="••••••••"
                required
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                }
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
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
              {isLoading ? "Creating account..." : "Create account"}
            </button>

            <p
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                textAlign: "center",
                marginTop: "16px",
                lineHeight: 1.5,
              }}
            >
              By creating an account you agree to our{" "}
              <Link
                href="/terms"
                style={{ color: "var(--white)", textDecoration: "none" }}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                style={{ color: "var(--white)", textDecoration: "none" }}
              >
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
