"use client";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to bottom right, #f8fafc, #e0e7ff, #f8fafc)" }}>
      <div style={{ maxWidth: "64rem", width: "100%", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div style={{ maxWidth: "48rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", letterSpacing: "-0.025em", color: "#0f172a" }}>
            Discover Pain Points,<br />
            <span style={{ background: "linear-gradient(to right, #4f46e5, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Build SaaS Ideas</span>
          </h1>
          <p style={{ marginTop: "1.5rem", fontSize: "1.125rem", lineHeight: "2rem", color: "#475569" }}>
            PainPointRadar analyzes Reddit discussions to uncover real problems people face. Get AI-powered insights and validated SaaS ideas in minutes.
          </p>

          <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <a
              href="/dashboard"
              style={{ padding: "0.75rem 1.5rem", fontSize: "0.875rem", fontWeight: "600", color: "white", background: "#4f46e5", borderRadius: "0.75rem", textDecoration: "none", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", transition: "background 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#4338ca"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#4f46e5"}
            >
              View Dashboard
            </a>
          </div>
        </div>

        <div id="how-it-works" style={{ marginTop: "6rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))", gap: "2rem" }}>
          <div style={{ borderRadius: "1rem", border: "1px solid #e2e8f0", background: "white", padding: "1.5rem", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
            <div style={{ width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", background: "#e0e7ff" }}>
              <svg style={{ width: "1.5rem", height: "1.5rem", color: "#4f46e5" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 style={{ marginTop: "1rem", fontSize: "1.125rem", fontWeight: "600", color: "#0f172a" }}>Search Subreddits</h3>
            <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#64748b" }}>Enter any subreddit to discover trending discussions and pain points.</p>
          </div>

          <div style={{ borderRadius: "1rem", border: "1px solid #e2e8f0", background: "white", padding: "1.5rem", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
            <div style={{ width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", background: "#ede9fe" }}>
              <svg style={{ width: "1.5rem", height: "1.5rem", color: "#7c3aed" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 style={{ marginTop: "1rem", fontSize: "1.125rem", fontWeight: "600", color: "#0f172a" }}>AI Analysis</h3>
            <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#64748b" }}>Our AI identifies patterns, root causes, and generates actionable SaaS ideas.</p>
          </div>

          <div style={{ borderRadius: "1rem", border: "1px solid #e2e8f0", background: "white", padding: "1.5rem", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
            <div style={{ width: "2.5rem", height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", background: "#d1fae5" }}>
              <svg style={{ width: "1.5rem", height: "1.5rem", color: "#059669" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </div>
            <h3 style={{ marginTop: "1rem", fontSize: "1.125rem", fontWeight: "600", color: "#0f172a" }}>Save & Track</h3>
            <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#64748b" }}>Save your searches and track pain points over time to validate demand.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
