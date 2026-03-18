import Link from "next/link";

export default function TermsPage() {
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
            Terms of Service
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
              1. Acceptance of terms
            </h2>
            <p>
              By creating an account or using Gatepass you agree to these Terms
              of Service. If you do not agree, do not use the platform. These
              terms apply to all users including attendees, event organizers,
              and visitors.
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
              2. The Gatepass platform
            </h2>
            <p>
              Gatepass provides a platform for event organizers to create and
              sell tickets, and for attendees to discover and purchase them.
              Gatepass is not an event organizer and is not responsible for the
              events listed on the platform. The relationship for any event is
              between the attendee and the organizer.
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
              3. Accounts
            </h2>
            <p>
              You must provide accurate information when creating an account.
              You are responsible for maintaining the security of your account
              and password. You must notify us immediately of any unauthorized
              access to your account. Gatepass is not liable for any loss
              resulting from unauthorized use of your account.
            </p>
            <p style={{ marginTop: "12px" }}>
              You must be at least 18 years old to create an account and
              purchase tickets.
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
              4. Purchasing tickets
            </h2>
            <p>
              All ticket purchases are final. Gatepass operates a no-refund
              policy. If you are unable to attend an event you may resell your
              ticket on the Gatepass Marketplace subject to the resale terms
              below.
            </p>
            <p style={{ marginTop: "12px" }}>
              Payments are processed by Paystack. By making a purchase you agree
              to Paystack&apos;s terms of service. Gatepass does not store your
              payment card information.
            </p>
            <p style={{ marginTop: "12px" }}>
              Each ticket contains a unique QR code. Tickets are
              non-transferable except through the Gatepass Marketplace. Sharing
              or duplicating your QR code may result in denied entry.
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
              5. Marketplace and resale
            </h2>
            <p>
              Tickets may be resold on the Gatepass Marketplace at a price not
              exceeding 130% of the original ticket price. Gatepass takes a
              platform fee on all resale transactions. Once a resale purchase is
              completed, ownership of the ticket transfers automatically and the
              transaction is final.
            </p>
            <p style={{ marginTop: "12px" }}>
              Gatepass is not responsible for disputes between buyers and
              sellers on the Marketplace.
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
              6. Event organizers
            </h2>
            <p>By creating an event on Gatepass you agree to:</p>
            <ul
              style={{
                paddingLeft: "20px",
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <li>Provide accurate and complete event information</li>
              <li>Deliver the event as described to ticket holders</li>
              <li>Connect a valid Nigerian bank account to receive payouts</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not list events that are illegal, fraudulent, or harmful</li>
            </ul>
            <p style={{ marginTop: "12px" }}>
              Gatepass takes a platform fee on all ticket sales as displayed at
              the time of event creation. Payouts are processed automatically by
              Paystack after each transaction.
            </p>
            <p style={{ marginTop: "12px" }}>
              Gatepass reserves the right to remove events that violate these
              terms or that we determine in our sole discretion to be
              inappropriate.
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
              7. Prohibited conduct
            </h2>
            <p>You may not use Gatepass to:</p>
            <ul
              style={{
                paddingLeft: "20px",
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <li>Create fraudulent or misleading events</li>
              <li>Sell counterfeit or invalid tickets</li>
              <li>Use automated means to purchase tickets in bulk</li>
              <li>Circumvent our platform fees</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Violate any applicable law or regulation</li>
            </ul>
            <p style={{ marginTop: "12px" }}>
              Violation of these terms may result in immediate account
              suspension and legal action where appropriate.
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
              8. Limitation of liability
            </h2>
            <p>
              Gatepass is a platform and is not liable for the actions of event
              organizers or the quality of events. To the maximum extent
              permitted by law, Gatepass shall not be liable for any indirect,
              incidental, or consequential damages arising from your use of the
              platform.
            </p>
            <p style={{ marginTop: "12px" }}>
              Our total liability for any claim arising from your use of
              Gatepass shall not exceed the amount you paid in platform fees in
              the 12 months preceding the claim.
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
              9. Governing law
            </h2>
            <p>
              These terms are governed by the laws of the Federal Republic of
              Nigeria. Any disputes shall be resolved in Nigerian courts.
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
              10. Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. Continued use of
              Gatepass after changes are posted constitutes acceptance of the
              updated terms. We will notify you of significant changes by email.
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
              11. Contact
            </h2>
            <p>
              For questions about these terms contact us at{" "}
              <a
                href="mailto:support@gatepass.app"
                style={{ color: "var(--lime)", textDecoration: "none" }}
              >
                support@gatepass.app
              </a>
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
            href="/privacy"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s",
            }}
          >
            Privacy Policy
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
