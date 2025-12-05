import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  painpoints: z.array(z.string().trim().min(1)).min(1),
});

// Simple in-memory rate limiter (per runtime instance)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;
const rateLimiter = new Map<string, { count: number; resetAt: number }>();

function getClientId(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
  if (!forwarded) return "anonymous";
  return forwarded.split(",")[0]!.trim();
}

function isRateLimited(clientId: string) {
  const now = Date.now();
  const entry = rateLimiter.get(clientId);
  if (!entry || entry.resetAt < now) {
    rateLimiter.set(clientId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  rateLimiter.set(clientId, entry);
  return false;
}

type Idea = { title: string; desc: string; monetization: string };
type AnalysisItem = { summary: string; rootCause: string; ideas: Idea[]; score: number };

type OpenAIResponse = {
  results: AnalysisItem[];
};

export async function POST(req: Request) {
  try {
    const clientId = getClientId(req);
    if (isRateLimited(clientId)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body", issues: parsed.error.issues }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY is not configured" }, { status: 500 });
    }

    const prompt = `You are a product strategist. Given a list of pain points, do the following for the set as a whole:\n- Summarize the recurring pain points succinctly.\n- Identify the likely root cause(s).\n- Propose exactly 3 SaaS ideas, each with a title, description, and monetization approach.\n- Provide a difficulty/monetization score from 1-10 (higher means more promising).\nReturn JSON only in the shape: { "results": [ { "summary": string, "rootCause": string, "ideas": [ { "title": string, "desc": string, "monetization": string } ], "score": number } ] }.`;

    const userContent = JSON.stringify({ painpoints: parsed.data.painpoints }, null, 2);

    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userContent },
        ],
        temperature: 0.4,
        response_format: { type: "json_object" },
      }),
    });

    if (!completion.ok) {
      return NextResponse.json(
        { error: "OpenAI request failed", status: completion.status, statusText: completion.statusText },
        { status: 502 }
      );
    }

    const data = await completion.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "No content returned from OpenAI" }, { status: 502 });
    }

    let parsedContent: OpenAIResponse;
    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to parse OpenAI response", message: error instanceof Error ? error.message : String(error) },
        { status: 502 }
      );
    }

    return NextResponse.json(parsedContent.results ?? []);
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected server error", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
