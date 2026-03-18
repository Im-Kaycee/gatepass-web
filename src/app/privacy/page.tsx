import Link from "next/link";

export default function PrivacyPage() {
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
          maxWidth: "720px",
          margin: "0 auto",
          padding: "clamp(48px, 6vw, 80px) clamp(24px, 5vw, 48px)",
        }}
      >
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
            Legal
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1,
              marginBottom: "16px",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ fontSize: "14px", color: "var(--muted)" }}>
            Last updated: March 2026
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            fontSize: "15px",
            lineHeight: 1.8,
            color: "var(--muted)",
            fontWeight: 300,
          }}
        >
          <section>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "var(--white)",
                marginBottom: "16px",
              }}
            >
              1. Who we are
            </h2>
            <p>
              Gatepass is an online ticketing platform that enables event
              organizers to sell tickets and attendees to discover and purchase
              them. When this policy refers to &quot;Gatepass&quot;,
              &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;, it means the
              Gatepass platform and its operator.
            </p>
            <p style={{ marginTop: "12px" }}>
              If you have questions about this policy, contact us at{" "}
              <a
                href="mailto:support@gatepass.app"
                style={{ color: "var(--lime)", textDecoration: "none" }}
              >
                support@gatepass.app
              </a>
            </p>
          </section>

          <section>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "var(--white)",
                marginBottom: "16px",
              }}
            >
              2. What information we collect
            </h2>
            <p>We collect the following information when you use Gatepass:</p>
            <ul
              style={{
                paddingLeft: "20px",
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <li>
                <strong style={{ color: "var(--white)", fontWeight: 500 }}>
                  Account information
                </strong>{" "}
                — your name, email address, and username when you register.
              </li>
              <li>
                <strong style={{ color: "var(--white)", fontWeight: 500 }}>
                  Payment information
                </strong>{" "}
                — we do not store your card details. All payments are processed
                by Paystack. We store your bank account details if you register
                as an organizer.
              </li>
              <li>
                <strong style={{ color: "var(--white)", fontWeight: 500 }}>
                  Transaction data
                </strong>{" "}
                — records of tickets purchased, events attended, and payments
                made.
              </li>
              <li>
                <strong style={{ color: "var(--white)", fontWeight: 500 }}>
                  Usage data
                </strong>{" "}
                — how you interact with the platform, including pages visited
                and actions taken.
              </li>
              <li>
                <strong style={{ color: "var(--white)", fontWeight: 500 }}>
                  Device information
                </strong>{" "}
                — browser type, IP address, and device identifiers for security
                purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "var(--white)",
                marginBottom: "16px",
              }}
            >
              3. How we use your information
            </h2>
            <p>We use your information to:</p>
            <ul
              style={{
                paddingLeft: "20px",
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <li>Create and manage your account</li>
              <li>Process ticket purchases and payouts</li>
              <li>Send you tickets and transaction confirmations by email</li>
              <li>Enable event check-in via QR code</li>
              <li>Provide customer support</li>
              <li>Detect and prevent fraud</li>
              <li>Improve the platform</li>
            </ul>
            <p style={{ marginTop: "12px" }}>
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "var(--white)",
                marginBottom: "16px",
              }}
            >
              4. Information shared with third parties
            </h2>
            <p>
              We share your information only with the following parties and only
              as necessary:
            </p>
            <ul
              style={{
                paddingLeft: "20px",
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <li>
                <strong style={{ color: "var(--white)", fontWeight: 500 }}>
                  Paystack
                </strong>{" "}
                — to process payments. Your payment data is governed by
                Paystack&apos;s privacy policy.
              </li>
              <li>
                <strong style={{ color: "var(--white)", fontWeight: 500 }}>
                  Resend
                </strong>{" "}
                — to send transactional emails. Your email address is shared
                only for delivery purposes.
              </li>
              <li>
                <strong style={{ color: "var(--white)", fontWeight: 500 }}>
                  Event organizers
                </strong>{" "}
                — organizers can see the name and email of attendees who
                purchased tickets for their events.
              </li>
            </ul>
          </section>

          <section>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "var(--white)",
                marginBottom: "16px",
              }}
            >
              5. Data retention
            </h2>
            <p>
              We retain your account information for as long as your account is
              active. Transaction records are retained for a minimum of 7 years
              for financial compliance purposes. If you delete your account,
              your personal information is removed except where retention is
              required by law.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "var(--white)",
                marginBottom: "16px",
              }}
            >
              6. Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information. Payment processing is handled
              entirely by Paystack on their PCI-compliant infrastructure. We
              never store card numbers or CVV codes.
            </p>
            <p style={{ marginTop: "12px" }}>
              Authentication tokens are stored in your browser. You can log out
              at any time to invalidate your session.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "var(--white)",
                marginBottom: "16px",
              }}
            >
              7. Your rights
            </h2>
            <p>You have the right to:</p>
            <ul
              style={{
                paddingLeft: "20px",
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information via your account settings</li>
              <li>Request deletion of your account and personal data</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            <p style={{ marginTop: "12px" }}>
              To exercise any of these rights contact us at{" "}
              <a
                href="mailto:support@gatepass.app"
                style={{ color: "var(--lime)", textDecoration: "none" }}
              >
                support@gatepass.app
              </a>
            </p>
          </section>

          <section>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                color: "var(--white)",
                marginBottom: "16px",
              }}
            >
              8. Changes to this policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of significant changes by email or by posting a notice
              on the platform. Continued use of Gatepass after changes are
              posted constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>

        <div
          style={{
            marginTop: "64px",
            paddingTop: "32px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/terms"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
          >
            Terms of Service
          </Link>
          <Link
            href="/how-it-works"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
          >
            How it works
          </Link>
          <Link
            href="/"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
          >
            Back to Gatepass
          </Link>
        </div>
      </div>
    </div>
  );
}
