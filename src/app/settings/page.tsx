"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth";

export default function SettingsPage() {
  const router = useRouter();
  const {
    isAuthenticated,
    isLoading: authLoading,
    user,
    fetchUser,
  } = useAuthStore();

  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileError, setProfileError] = useState<Record<string, string>>({});
  const [passwordError, setPasswordError] = useState<Record<string, string>>(
    {},
  );
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        username: user.username || "",
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError({});
    setProfileSuccess(false);

    try {
      await api.patch("/accounts/profile/", profileForm);
      await fetchUser();
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err: any) {
      setProfileError(
        err.response?.data || { detail: "Something went wrong." },
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError({});
    setPasswordSuccess(false);

    if (passwordForm.new_password !== passwordForm.confirm_new_password) {
      setPasswordError({ confirm_new_password: "Passwords do not match." });
      setPasswordLoading(false);
      return;
    }

    try {
      await api.put("/accounts/change-password/", passwordForm);
      setPasswordSuccess(true);
      setPasswordForm({
        old_password: "",
        new_password: "",
        confirm_new_password: "",
      });
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      setPasswordError(
        err.response?.data || { detail: "Something went wrong." },
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "var(--card2)",
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
    color: "var(--muted)",
    marginBottom: "8px",
  };

  const errorStyle = {
    fontSize: "12px",
    color: "#ff6666",
    marginTop: "6px",
  };

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
          maxWidth: "600px",
          margin: "0 auto",
          padding: "clamp(40px, 5vw, 60px) clamp(24px, 5vw, 48px)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
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
            Account
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1,
            }}
          >
            Settings
          </h1>
        </div>

        {/* Profile section */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "28px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              marginBottom: "24px",
            }}
          >
            Profile
          </h2>

          <form onSubmit={handleProfileSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label style={labelStyle}>First name</label>
                  <input
                    type="text"
                    value={profileForm.first_name}
                    onChange={(e) =>
                      setProfileForm((p) => ({
                        ...p,
                        first_name: e.target.value,
                      }))
                    }
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last name</label>
                  <input
                    type="text"
                    value={profileForm.last_name}
                    onChange={(e) =>
                      setProfileForm((p) => ({
                        ...p,
                        last_name: e.target.value,
                      }))
                    }
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Username</label>
                <input
                  type="text"
                  value={profileForm.username}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, username: e.target.value }))
                  }
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                {profileError.username && (
                  <p style={errorStyle}>{profileError.username}</p>
                )}
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm((p) => ({ ...p, email: e.target.value }))
                  }
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                {profileError.email && (
                  <p style={errorStyle}>{profileError.email}</p>
                )}
              </div>

              {profileError.detail && (
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
                  {profileError.detail}
                </div>
              )}

              {profileSuccess && (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "rgba(193,255,114,0.08)",
                    border: "1px solid rgba(193,255,114,0.2)",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "var(--lime)",
                  }}
                >
                  Profile updated successfully.
                </div>
              )}

              <button
                type="submit"
                disabled={profileLoading}
                style={{
                  padding: "14px",
                  background: profileLoading
                    ? "rgba(193,255,114,0.3)"
                    : "var(--lime)",
                  color: "var(--black)",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "15px",
                  fontWeight: 500,
                  cursor: profileLoading ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                  alignSelf: "flex-start",
                  minWidth: "140px",
                }}
              >
                {profileLoading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Password section */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "28px",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              marginBottom: "24px",
            }}
          >
            Change password
          </h2>

          <form onSubmit={handlePasswordSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <label style={labelStyle}>Current password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={passwordForm.old_password}
                    onChange={(e) =>
                      setPasswordForm((p) => ({
                        ...p,
                        old_password: e.target.value,
                      }))
                    }
                    placeholder="••••••••"
                    style={{ ...inputStyle, paddingRight: "48px" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
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
                    {showPasswords ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M2 2l14 14M7.5 7.6a2 2 0 002.9 2.8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M5 4.6C3.3 5.8 2 7.3 2 9c0 3 3.1 6 7 6 1.5 0 2.9-.5 4-1.3M14.7 12.3C16 11.1 17 10 17 9c0-3-3.1-6-7-6-1 0-2 .2-2.9.6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M2 9c0-3 3.1-6 7-6s7 3 7 6-3.1 6-7 6-7-3-7-6z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="9"
                          cy="9"
                          r="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError.old_password && (
                  <p style={errorStyle}>{passwordError.old_password}</p>
                )}
              </div>

              <div>
                <label style={labelStyle}>New password</label>
                <input
                  type={showPasswords ? "text" : "password"}
                  value={passwordForm.new_password}
                  onChange={(e) =>
                    setPasswordForm((p) => ({
                      ...p,
                      new_password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                {passwordError.new_password && (
                  <p style={errorStyle}>
                    {Array.isArray(passwordError.new_password)
                      ? passwordError.new_password[0]
                      : passwordError.new_password}
                  </p>
                )}
              </div>

              <div>
                <label style={labelStyle}>Confirm new password</label>
                <input
                  type={showPasswords ? "text" : "password"}
                  value={passwordForm.confirm_new_password}
                  onChange={(e) =>
                    setPasswordForm((p) => ({
                      ...p,
                      confirm_new_password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                {passwordError.confirm_new_password && (
                  <p style={errorStyle}>{passwordError.confirm_new_password}</p>
                )}
              </div>

              {passwordError.detail && (
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
                  {passwordError.detail}
                </div>
              )}

              {passwordSuccess && (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "rgba(193,255,114,0.08)",
                    border: "1px solid rgba(193,255,114,0.2)",
                    borderRadius: "10px",
                    fontSize: "14px",
                    color: "var(--lime)",
                  }}
                >
                  Password changed successfully.
                </div>
              )}

              <button
                type="submit"
                disabled={
                  !passwordForm.old_password ||
                  !passwordForm.new_password ||
                  !passwordForm.confirm_new_password ||
                  passwordLoading
                }
                style={{
                  padding: "14px",
                  background:
                    !passwordForm.old_password ||
                    !passwordForm.new_password ||
                    !passwordForm.confirm_new_password ||
                    passwordLoading
                      ? "rgba(193,255,114,0.3)"
                      : "var(--lime)",
                  color: "var(--black)",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "15px",
                  fontWeight: 500,
                  cursor: passwordLoading ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                  alignSelf: "flex-start",
                  minWidth: "160px",
                }}
              >
                {passwordLoading ? "Updating..." : "Update password"}
              </button>
            </div>
          </form>
        </div>

        {/* Danger zone */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid rgba(255,68,68,0.2)",
            borderRadius: "20px",
            padding: "28px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              marginBottom: "8px",
              color: "#ff6666",
            }}
          >
            Danger zone
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "var(--muted)",
              marginBottom: "20px",
              lineHeight: 1.5,
            }}
          >
            Once you delete your account all your tickets, events and data will
            be permanently removed. This cannot be undone.
          </p>
          <button
            style={{
              padding: "12px 24px",
              background: "transparent",
              border: "1px solid rgba(255,68,68,0.3)",
              borderRadius: "10px",
              fontSize: "14px",
              color: "#ff6666",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,68,68,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,68,68,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,68,68,0.3)";
            }}
            onClick={() => alert("Account deletion coming in v2.")}
          >
            Delete account
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
