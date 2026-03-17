"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M4 10l4 4 8-8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function OnboardingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    isAuthenticated,
    isLoading: authLoading,
    user,
    fetchUser,
  } = useAuthStore();
  const [form, setForm] = useState({
    account_number: "",
    bank_code: "",
    bank_name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const { data: banks = [], isLoading: banksLoading } = useQuery<
    { name: string; code: string }[]
  >({
    queryKey: ["banks"],
    queryFn: async () => {
      const { data } = await api.get("/accounts/banks/");
      return data;
    },
  });

  const handleBankSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = banks.find((b) => b.code === e.target.value);
    if (selected) {
      setForm((prev) => ({
        ...prev,
        bank_code: selected.code,
        bank_name: selected.name,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.account_number || !form.bank_code) return;
    setIsSubmitting(true);
    setError("");

    try {
      await api.post("/accounts/onboarding/", form);
      await fetchUser();
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setSuccess(true);
      setTimeout(() => router.push("/events/create"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const alreadyOnboarded = user?.paystack_subaccount_code;

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
          maxWidth: "520px",
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

        <div style={{ marginBottom: "40px" }}>
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
            Bank details
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1,
              marginBottom: "12px",
            }}
          >
            Get paid for your events
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "var(--muted)",
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            Connect your bank account so ticket revenue goes directly to you.
            Powered by Paystack.
          </p>
        </div>

        {/* Already onboarded */}
        {alreadyOnboarded && !success && (
          <div
            style={{
              padding: "24px",
              background: "rgba(193,255,114,0.06)",
              border: "1px solid rgba(193,255,114,0.2)",
              borderRadius: "16px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(193,255,114,0.15)",
                  border: "1px solid rgba(193,255,114,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--lime)",
                  flexShrink: 0,
                }}
              >
                <CheckIcon />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    fontWeight: 700,
                    marginBottom: "2px",
                  }}
                >
                  Bank account connected
                </div>
                <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                  {user?.bank_name} · {user?.account_number}
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--muted)",
                lineHeight: 1.5,
              }}
            >
              Your bank account is already connected. You can update it below if
              needed.
            </p>
          </div>
        )}

        {/* Success state */}
        {success && (
          <div
            style={{
              textAlign: "center",
              padding: "48px 0",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(193,255,114,0.1)",
                border: "1px solid rgba(193,255,114,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "var(--lime)",
              }}
            >
              <CheckIcon />
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                marginBottom: "8px",
              }}
            >
              Bank account connected
            </div>
            <p style={{ color: "var(--muted)", fontSize: "15px" }}>
              Redirecting you to create your first event...
            </p>
          </div>
        )}

        {/* Form */}
        {!success && (
          <form onSubmit={handleSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--muted)",
                    marginBottom: "8px",
                  }}
                >
                  Bank
                </label>
                <select
                  value={form.bank_code}
                  onChange={handleBankSelect}
                  required
                  disabled={banksLoading}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: form.bank_code ? "var(--white)" : "var(--muted)",
                    fontSize: "15px",
                    fontFamily: "var(--font-body)",
                    outline: "none",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                >
                  <option value="">
                    {banksLoading ? "Loading banks..." : "Select your bank"}
                  </option>
                  {banks.map((bank) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--muted)",
                    marginBottom: "8px",
                  }}
                >
                  Account number
                </label>
                <input
                  type="text"
                  value={form.account_number}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      account_number: e.target.value,
                    }))
                  }
                  placeholder="0123456789"
                  maxLength={10}
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
                    letterSpacing: "2px",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              {error && (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "rgba(255,68,68,0.08)",
                    border: "1px solid rgba(255,68,68,0.2)",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "#ff6666",
                  }}
                >
                  {error}
                </div>
              )}

              {/* What happens next */}
              <div
                style={{
                  padding: "16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  fontSize: "13px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                <div
                  style={{
                    fontWeight: 500,
                    color: "var(--white)",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}
                >
                  What happens next
                </div>
                Your bank account will be registered as a Paystack subaccount.
                When attendees buy tickets for your events, revenue is split
                automatically — your share goes directly to this account.
              </div>

              <button
                type="submit"
                disabled={
                  !form.account_number || !form.bank_code || isSubmitting
                }
                style={{
                  width: "100%",
                  padding: "16px",
                  background:
                    !form.account_number || !form.bank_code || isSubmitting
                      ? "rgba(193,255,114,0.3)"
                      : "var(--lime)",
                  color: "var(--black)",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor:
                    !form.account_number || !form.bank_code || isSubmitting
                      ? "not-allowed"
                      : "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {isSubmitting ? "Connecting..." : "Connect bank account"}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
