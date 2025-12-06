import Link from "next/link";
import Container from "@/components/Container";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
      <Container className="flex min-h-screen flex-col items-center justify-center py-12">
        <div className="max-w-3xl text-center">
          {/* Hero */}
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Discover Pain Points,
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Build SaaS Ideas
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            PainPointRadar analyzes Reddit discussions to uncover real problems people face. 
            Get AI-powered insights and validated SaaS ideas in minutes.
          </p>

          {/* Search */}
          <div className="mt-10">
            <SearchBar />
            <p className="mt-3 text-sm text-slate-500">
              Try: <span className="font-medium">webdev</span>, <span className="font-medium">SaaS</span>, <span className="font-medium">entrepreneur</span>
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              View Dashboard
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Features */}
        <div id="how-it-works" className="mt-24 grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Search Subreddits</h3>
            <p className="mt-2 text-sm text-slate-600">
              Enter any subreddit to discover trending discussions and pain points.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
              <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">AI Analysis</h3>
            <p className="mt-2 text-sm text-slate-600">
              Our AI identifies patterns, root causes, and generates actionable SaaS ideas.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Save & Track</h3>
            <p className="mt-2 text-sm text-slate-600">
              Save your searches and track pain points over time to validate demand.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
