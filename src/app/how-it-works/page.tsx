import Link from "next/link";

const sections = [
  {
    audience: "For attendees",
    color: "var(--lime)",
    items: [
      {
        title: "Finding events",
        content:
          "Browse upcoming events on the Discover page. Filter by event type (online or offline), date range, and price. Use the search bar to find specific events by name or description.",
      },
      {
        title: "Buying a ticket",
        content:
          "On any event page, select your ticket type and quantity then click the pay button. You'll be redirected to Paystack's secure payment page. After payment, your ticket is automatically generated and available in My Tickets.",
      },
      {
        title: "Viewing your tickets",
        content:
          'Go to My Tickets from the navbar. Your upcoming tickets show by default — tap any card to flip it and reveal your QR code. Tap "View full ticket" for the full ticket page with a larger QR code.',
      },
      {
        title: "Getting into an event",
        content:
          "Show your QR code to the event staff at the entrance. They'll scan it to check you in. Each QR code is unique to you and can only be used once.",
      },
      {
        title: "Online events",
        content:
          "For online events your join link is shown directly on your ticket after purchase. You can also find it in My Tickets under the event.",
      },
      {
        title: "Reselling a ticket",
        content:
          'If you can\'t make it to an event, go to My Tickets, tap the ticket you want to resell, and click "List for resale". Set your price — up to 130% of the original price. Your ticket will appear on the Marketplace. Once someone buys it, ownership transfers automatically.',
      },
      {
        title: "Buying from the marketplace",
        content:
          "Browse resale tickets on the Marketplace page. Click any listing to see details and buy. Payment goes through Paystack and the ticket transfers to your account immediately after confirmation.",
      },
    ],
  },
  {
    audience: "For organizers",
    color: "var(--orange)",
    items: [
      {
        title: "Before you can create events",
        content:
          "You need to connect your bank account first. Go to Settings → Onboarding and enter your bank details. This creates a Paystack subaccount so ticket revenue goes directly to your account. You only need to do this once.",
      },
      {
        title: "Creating an event",
        content:
          'Click "Host an event" in the navbar or go to your Dashboard. Fill in your event details — title, description, date, venue or join link. Upload a cover image. On the next step add your ticket types with names, prices, and quantities. You can add multiple tiers like General, VIP, and Early Bird.',
      },
      {
        title: "Getting paid",
        content:
          "Revenue is split automatically at the moment of purchase. Your share goes directly to your connected bank account — no manual transfers, no waiting. Gatepass takes a small platform fee from each transaction.",
      },
      {
        title: "Managing your event",
        content:
          "From your Dashboard, click any event to see its dashboard. You can view real-time sales, revenue, ticket type breakdowns, and order history. Filter by date range to see performance over specific periods.",
      },
      {
        title: "Adding staff",
        content:
          "In your event dashboard go to the Staff tab. Enter a username to add them as staff. Staff members can run check-ins at the event but cannot access revenue or order data.",
      },
      {
        title: "Running check-ins",
        content:
          "Staff and organizers can check in attendees by scanning their QR code. When an attendee shows their QR, scan it with your phone — it opens the check-in page showing the ticket holder's details. Press Check In to mark them as entered. Duplicate scans are automatically rejected.",
      },
      {
        title: "Tracking attendance",
        content:
          "The Attendance tab in your event dashboard shows real-time check-in stats — total sold, checked in, remaining, and a live feed of recent scans.",
      },
    ],
  },
  {
    audience: "Common questions",
    color: "#60a5fa",
    items: [
      {
        title: "What payment methods are accepted?",
        content:
          "All payments are processed by Paystack. You can pay with any Nigerian debit or credit card, bank transfer, or USSD.",
      },
      {
        title: "What is the refund policy?",
        content:
          "Gatepass operates a no-refund policy. If you can't attend an event, you can resell your ticket on the Marketplace instead.",
      },
      {
        title: "Is my payment information secure?",
        content:
          "Yes. Gatepass never sees or stores your card details. All payments are handled entirely by Paystack on their secure servers.",
      },
      {
        title: "What happens if I lose my ticket?",
        content:
          "Your tickets are always available in My Tickets as long as you're logged into your account. You cannot lose a digital ticket.",
      },
      {
        title: "Can I transfer a ticket to someone else?",
        content:
          "You can resell your ticket on the Marketplace. Once someone purchases it, ownership transfers to them automatically. Direct transfers without payment are not currently supported.",
      },
      {
        title: "I paid but my ticket didn't arrive",
        content:
          "Tickets are generated automatically after payment confirmation. If your ticket hasn't appeared after a few minutes, check My Tickets and refresh the page. If it's still missing contact support.",
      },
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--black)",
        paddingTop: "80px",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 48px)",
          borderBottom: "1px solid var(--border)",
          background: "var(--card)",
          textAlign: "center",
        }}
      >
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
          Help center
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 0.95,
            marginBottom: "20px",
          }}
        >
          How Gatepass works
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "var(--muted)",
            maxWidth: "480px",
            margin: "0 auto 32px",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Everything you need to know about buying tickets, hosting events, and
          getting paid.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#attendees"
            style={{
              padding: "10px 24px",
              background: "rgba(193,255,114,0.1)",
              border: "1px solid rgba(193,255,114,0.2)",
              borderRadius: "100px",
              color: "var(--lime)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "all 0.2s",
            }}
          >
            For attendees
          </a>
          <a
            href="#organizers"
            style={{
              padding: "10px 24px",
              background: "rgba(255,107,53,0.1)",
              border: "1px solid rgba(255,107,53,0.2)",
              borderRadius: "100px",
              color: "var(--orange)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "all 0.2s",
            }}
          >
            For organizers
          </a>
          <a
            href="#faq"
            style={{
              padding: "10px 24px",
              background: "rgba(96,165,250,0.1)",
              border: "1px solid rgba(96,165,250,0.2)",
              borderRadius: "100px",
              color: "#60a5fa",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "all 0.2s",
            }}
          >
            FAQ
          </a>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "clamp(48px, 6vw, 80px) clamp(24px, 5vw, 48px)",
        }}
      >
        {sections.map((section, si) => (
          <div
            key={section.audience}
            id={si === 0 ? "attendees" : si === 1 ? "organizers" : "faq"}
            style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "32px",
                  background: section.color,
                  borderRadius: "2px",
                  flexShrink: 0,
                }}
              />
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 3vw, 28px)",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  color: section.color,
                }}
              >
                {section.audience}
              </h2>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              {section.items.map((item, i) => (
                <details
                  key={i}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <summary
                    style={{
                      padding: "18px 20px",
                      fontFamily: "var(--font-display)",
                      fontSize: "15px",
                      fontWeight: 700,
                      letterSpacing: "-0.3px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      listStyle: "none",
                      userSelect: "none",
                    }}
                  >
                    {item.title}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ flexShrink: 0, color: "var(--muted)" }}
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <div
                    style={{
                      padding: "0 20px 18px",
                      fontSize: "15px",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                      fontWeight: 300,
                      borderTop: "1px solid var(--border)",
                      paddingTop: "16px",
                    }}
                  >
                    {item.content}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Still need help */}
        <div
          style={{
            padding: "40px",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              marginBottom: "8px",
            }}
          >
            Still need help?
          </h3>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "15px",
              marginBottom: "24px",
              fontWeight: 300,
            }}
          >
            Can&apos;t find what you&apos;re looking for? Reach out directly.
          </p>

          <a
            href="mailto:support@gatepass.com"
            style={{
              padding: "12px 28px",
              background: "var(--lime)",
              color: "var(--black)",
              borderRadius: "100px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "var(--font-body)",
            }}
          >
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
