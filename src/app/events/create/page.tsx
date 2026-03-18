"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 3.5h10M5.5 3.5V2.5a1 1 0 011-1h1a1 1 0 011 1v1M6 6.5v3M8 6.5v3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 3.5l.7 7a1 1 0 001 .9h4.6a1 1 0 001-.9l.7-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

interface TicketTypeInput {
  name: string;
  price: string;
  quantity: string;
}

export default function CreateEventPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    event_type: "OFFLINE",
    venue: "",
    online_link: "",
    event_date: "",
    duration_hours: "4",
  });

  const [ticketTypes, setTicketTypes] = useState<TicketTypeInput[]>([
    { name: "General", price: "", quantity: "" },
  ]);

  const [eventErrors, setEventErrors] = useState<Record<string, string>>({});
  const [ticketErrors, setTicketErrors] = useState<
    Record<number, Record<string, string>>
  >({});

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (
      !authLoading &&
      isAuthenticated &&
      user &&
      !user.paystack_subaccount_code
    ) {
      router.push("/onboarding");
    }
  }, [isAuthenticated, authLoading, user]);

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setEventErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const addTicketType = () => {
    setTicketTypes((prev) => [...prev, { name: "", price: "", quantity: "" }]);
  };

  const removeTicketType = (index: number) => {
    if (ticketTypes.length === 1) return;
    setTicketTypes((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTicketType = (index: number, key: string, value: string) => {
    setTicketTypes((prev) =>
      prev.map((tt, i) => (i === index ? { ...tt, [key]: value } : tt)),
    );
    setTicketErrors((prev) => ({
      ...prev,
      [index]: { ...prev[index], [key]: "" },
    }));
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.description.trim())
      errors.description = "Description is required";
    if (!form.event_date) errors.event_date = "Event date is required";
    if (!form.duration_hours) errors.duration_hours = "Duration is required";
    if (form.event_type === "OFFLINE" && !form.venue.trim())
      errors.venue = "Venue is required for offline events";
    if (form.event_type === "ONLINE" && !form.online_link.trim())
      errors.online_link = "Join link is required for online events";
    setEventErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<number, Record<string, string>> = {};
    let valid = true;
    ticketTypes.forEach((tt, i) => {
      const e: Record<string, string> = {};
      if (!tt.name.trim()) {
        e.name = "Name is required";
        valid = false;
      }
      if (!tt.price || Number(tt.price) < 500) {
        e.price = "Price must be at least ₦500";
        valid = false;
      }
      if (!tt.quantity || Number(tt.quantity) < 1) {
        e.quantity = "Quantity must be at least 1";
        valid = false;
      }
      if (Object.keys(e).length > 0) errors[i] = e;
    });
    setTicketErrors(errors);
    return valid;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setIsSubmitting(true);
    setError("");

    try {
      // Use FormData so the image file travels with the event data
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("event_type", form.event_type);
      formData.append("venue", form.venue);
      formData.append("online_link", form.online_link);
      formData.append("event_date", form.event_date);
      formData.append("duration_hours", form.duration_hours);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const { data: event } = await api.post("/events/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await api.post(`/events/${event.id}/ticket-types/`, {
        ticket_types: ticketTypes.map((tt) => ({
          name: tt.name,
          price: Number(tt.price),
          quantity: Number(tt.quantity),
        })),
      });

      router.push(`/events/${event.id}`);
    } catch (err: any) {
      const data = err.response?.data;
      if (data?.detail) {
        setError(data.detail);
      } else if (data?.image) {
        setError(data.image);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
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
        <Link
          href="/events"
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
          <BackIcon /> Events
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
            New event
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1,
              marginBottom: "24px",
            }}
          >
            Create an event
          </h1>

          {/* Step indicator */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {[1, 2].map((s) => (
              <div
                key={s}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: step >= s ? "var(--lime)" : "var(--card)",
                    border: `1px solid ${step >= s ? "var(--lime)" : "var(--border)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: step >= s ? "var(--black)" : "var(--muted)",
                    transition: "all 0.3s",
                  }}
                >
                  {s}
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    color: step >= s ? "var(--white)" : "var(--muted)",
                  }}
                >
                  {s === 1 ? "Event details" : "Ticket types"}
                </span>
                {s < 2 && (
                  <div
                    style={{
                      width: "32px",
                      height: "1px",
                      background: step > s ? "var(--lime)" : "var(--border)",
                      transition: "background 0.3s",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
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
              marginBottom: "24px",
            }}
          >
            {error}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <label style={labelStyle}>Event title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="Afrobeats Night 2027"
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                }
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
              {eventErrors.title && (
                <p style={errorStyle}>{eventErrors.title}</p>
              )}
            </div>

            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Tell people what your event is about..."
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical" as const,
                  lineHeight: 1.6,
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                }
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
              {eventErrors.description && (
                <p style={errorStyle}>{eventErrors.description}</p>
              )}
            </div>

            {/* Event type toggle */}
            <div>
              <label style={labelStyle}>Event type</label>
              <div
                style={{
                  display: "flex",
                  gap: "2px",
                  padding: "4px",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                }}
              >
                {["OFFLINE", "ONLINE"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateForm("event_type", type)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background:
                        form.event_type === type
                          ? "var(--border)"
                          : "transparent",
                      border: "none",
                      borderRadius: "9px",
                      color:
                        form.event_type === type
                          ? "var(--white)"
                          : "var(--muted)",
                      fontSize: "14px",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      transition: "all 0.2s",
                    }}
                  >
                    {type === "OFFLINE" ? "In-person" : "Online"}
                  </button>
                ))}
              </div>
            </div>

            {form.event_type === "OFFLINE" && (
              <div>
                <label style={labelStyle}>Venue</label>
                <input
                  type="text"
                  value={form.venue}
                  onChange={(e) => updateForm("venue", e.target.value)}
                  placeholder="Eko Hotel, Victoria Island, Lagos"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                {eventErrors.venue && (
                  <p style={errorStyle}>{eventErrors.venue}</p>
                )}
              </div>
            )}

            {form.event_type === "ONLINE" && (
              <div>
                <label style={labelStyle}>Join link</label>
                <input
                  type="url"
                  value={form.online_link}
                  onChange={(e) => updateForm("online_link", e.target.value)}
                  placeholder="https://zoom.us/j/123456789"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                {eventErrors.online_link && (
                  <p style={errorStyle}>{eventErrors.online_link}</p>
                )}
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label style={labelStyle}>Date and time</label>
                <input
                  type="datetime-local"
                  value={form.event_date}
                  onChange={(e) => updateForm("event_date", e.target.value)}
                  style={{ ...inputStyle, colorScheme: "dark" }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                {eventErrors.event_date && (
                  <p style={errorStyle}>{eventErrors.event_date}</p>
                )}
              </div>
              <div>
                <label style={labelStyle}>Duration (hours)</label>
                <input
                  type="number"
                  value={form.duration_hours}
                  onChange={(e) => updateForm("duration_hours", e.target.value)}
                  placeholder="4"
                  min={1}
                  max={72}
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                {eventErrors.duration_hours && (
                  <p style={errorStyle}>{eventErrors.duration_hours}</p>
                )}
              </div>
            </div>

            {/* Image upload */}
            <div>
              <label style={labelStyle}>
                Cover image
                <span
                  style={{
                    color: "var(--muted)",
                    marginLeft: "6px",
                    fontWeight: 400,
                  }}
                >
                  (optional)
                </span>
              </label>

              {imagePreview ? (
                <div style={{ position: "relative" }}>
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      borderRadius: "12px",
                      border: "1px solid var(--border)",
                      display: "block",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setImageFile(null);
                    }}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      padding: "6px 12px",
                      background: "rgba(0,0,0,0.7)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      color: "var(--white)",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    padding: "40px",
                    background: "var(--card)",
                    border: "1px dashed var(--border)",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(193,255,114,0.4)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "var(--border)")
                  }
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(193,255,114,0.08)",
                      border: "1px solid rgba(193,255,114,0.2)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 13V4M6 7l4-4 4 4"
                        stroke="var(--lime)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1"
                        stroke="var(--lime)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        marginBottom: "4px",
                      }}
                    >
                      Click to upload cover image
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                      JPEG, PNG or WebP · Max 5MB
                    </div>
                  </div>
                </label>
              )}
            </div>

            <button
              type="button"
              onClick={handleNext}
              style={{
                width: "100%",
                padding: "16px",
                background: "var(--lime)",
                color: "var(--black)",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "all 0.2s",
                marginTop: "8px",
              }}
            >
              Next — Add ticket types
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {ticketTypes.map((tt, index) => (
                <div
                  key={index}
                  style={{
                    padding: "20px",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
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
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "var(--muted)",
                      }}
                    >
                      Ticket type {index + 1}
                    </span>
                    {ticketTypes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTicketType(index)}
                        style={{
                          background: "transparent",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                          padding: "6px",
                          color: "#ff6666",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s",
                        }}
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Name</label>
                      <input
                        type="text"
                        value={tt.name}
                        onChange={(e) =>
                          updateTicketType(index, "name", e.target.value)
                        }
                        placeholder="General, VIP, Early Bird..."
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "rgba(193,255,114,0.4)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "var(--border)")
                        }
                      />
                      {ticketErrors[index]?.name && (
                        <p style={errorStyle}>{ticketErrors[index].name}</p>
                      )}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <label style={labelStyle}>Price (₦)</label>
                        <input
                          type="number"
                          value={tt.price}
                          onChange={(e) =>
                            updateTicketType(index, "price", e.target.value)
                          }
                          placeholder="5000"
                          min={500}
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor =
                              "rgba(193,255,114,0.4)")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "var(--border)")
                          }
                        />
                        {ticketErrors[index]?.price && (
                          <p style={errorStyle}>{ticketErrors[index].price}</p>
                        )}
                      </div>
                      <div>
                        <label style={labelStyle}>Quantity</label>
                        <input
                          type="number"
                          value={tt.quantity}
                          onChange={(e) =>
                            updateTicketType(index, "quantity", e.target.value)
                          }
                          placeholder="100"
                          min={1}
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor =
                              "rgba(193,255,114,0.4)")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "var(--border)")
                          }
                        />
                        {ticketErrors[index]?.quantity && (
                          <p style={errorStyle}>
                            {ticketErrors[index].quantity}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addTicketType}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "transparent",
                  border: "1px dashed var(--border)",
                  borderRadius: "12px",
                  color: "var(--muted)",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(193,255,114,0.4)";
                  (e.currentTarget as HTMLElement).style.color = "var(--lime)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                }}
              >
                <PlusIcon /> Add another ticket type
              </button>

              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1,
                    padding: "16px",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--white)",
                    fontSize: "16px",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.2s",
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: 2,
                    padding: "16px",
                    background: isSubmitting
                      ? "rgba(193,255,114,0.5)"
                      : "var(--lime)",
                    color: "var(--black)",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 500,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.2s",
                  }}
                >
                  {isSubmitting ? "Creating event..." : "Create event"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
