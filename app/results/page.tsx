"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import PainPointCard from "@/components/PainPointCard";

type Post = {
  title: string;
  text: string;
  upvotes: number;
  comments: number;
  url: string;
};

type Idea = { title: string; desc: string; monetization: string };
type AnalysisItem = { summary: string; rootCause: string; ideas: Idea[]; score: number };

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const sub = useMemo(() => searchParams.get("sub")?.trim() || "", [searchParams]);

  const [posts, setPosts] = useState<Post[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisItem[]>([]);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingAnalyze, setLoadingAnalyze] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sub) {
      setError("Missing ?sub query parameter");
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const run = async () => {
      setError(null);
      setLoadingFetch(true);
      setLoadingAnalyze(false);
      setPosts([]);
      setAnalysis([]);

      try {
        const fetchRes = await fetch("/api/fetch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subreddit: sub, limit: 12 }),
          signal: controller.signal,
        });

        if (!fetchRes.ok) {
          throw new Error(`Fetch failed: ${fetchRes.status} ${fetchRes.statusText}`);
        }

        const fetchJson = await fetchRes.json();
        if (cancelled) return;
        const fetchedPosts: Post[] = fetchJson?.posts ?? [];
        setPosts(fetchedPosts);
        setLoadingFetch(false);

        if (!fetchedPosts.length) {
          setAnalysis([]);
          return;
        }

        setLoadingAnalyze(true);
        const painpoints = fetchedPosts.map((p) => p.title || p.text || "Untitled pain point");
        const analyzeRes = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ painpoints }),
          signal: controller.signal,
        });

        if (!analyzeRes.ok) {
          throw new Error(`Analyze failed: ${analyzeRes.status} ${analyzeRes.statusText}`);
        }

        const analysisJson = await analyzeRes.json();
        if (cancelled) return;
        setAnalysis(Array.isArray(analysisJson) ? analysisJson : []);
        setLoadingAnalyze(false);
      } catch (err) {
        if (cancelled) return;
        setLoadingFetch(false);
        setLoadingAnalyze(false);
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    run();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [sub]);

  const handleSave = async () => {
    if (!posts.length) {
      setSaveMessage("Nothing to save");
      return;
    }
    try {
      setSaving(true);
      setSaveMessage(null);
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subreddit: sub, posts, analysis }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const msg = data?.error || `Save failed: ${res.status} ${res.statusText}`;
        setSaveMessage(msg);
      } else {
        setSaveMessage("Saved");
      }
    } catch (err) {
      setSaveMessage(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const renderPostSkeletons = () => (
    <>
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full rounded bg-slate-100" />
          <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />
          <div className="mt-4 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-slate-200" />
            <div className="h-6 w-24 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </>
  );

  const renderAnalysisSkeletons = () => (
    <>
      {Array.from({ length: 2 }).map((_, idx) => (
        <div key={idx} className="animate-pulse space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="h-4 w-48 rounded bg-slate-200" />
          <div className="h-4 w-64 rounded bg-slate-100" />
          <div className="h-4 w-56 rounded bg-slate-100" />
          <div className="h-4 w-32 rounded bg-slate-200" />
        </div>
      ))}
    </>
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <Container className="py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">Results for</p>
            <h1 className="text-2xl font-semibold text-slate-900">{sub ? `r/${sub}` : "No subreddit"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !posts.length}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-150 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            {saveMessage ? <span className="text-xs text-slate-600">{saveMessage}</span> : null}
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {loadingFetch ? (
              renderPostSkeletons()
            ) : posts.length ? (
              posts.map((post) => (
                <PainPointCard
                  key={post.url + post.title}
                  title={post.title}
                  text={post.text}
                  upvotes={post.upvotes}
                  comments={post.comments}
                  url={post.url}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-600">
                No posts found.
              </div>
            )}
          </div>

          <div className="space-y-4">
            {loadingAnalyze ? (
              renderAnalysisSkeletons()
            ) : analysis.length ? (
              analysis.map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold text-slate-900">Insights</h2>
                    <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
                      Score: {item.score}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{item.summary}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Root cause</p>
                  <p className="text-sm text-slate-700">{item.rootCause}</p>
                  <div className="mt-3 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ideas</p>
                    {item.ideas?.map((idea, ideaIdx) => (
                      <div key={ideaIdx} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-slate-900">{idea.title}</span>
                          <span className="text-[11px] font-semibold text-indigo-700">{idea.monetization}</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-700">{idea.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-600">
                No analysis yet.
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}
