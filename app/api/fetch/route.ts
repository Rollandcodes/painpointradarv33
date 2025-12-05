import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  subreddit: z.string().trim().min(1, "subreddit is required"),
  limit: z.number().int().min(1).max(50).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body", issues: parsed.error.issues }, { status: 400 });
    }

    const { subreddit, limit } = parsed.data;
    const count = limit ?? 10;
    const url = `https://www.reddit.com/r/${encodeURIComponent(subreddit)}/top.json?limit=${count}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "painpointradar/1.0 (contact: site-owner)",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Upstream Reddit request failed", status: response.status, statusText: response.statusText },
        { status: 502 }
      );
    }

    const data = await response.json();
    const children = Array.isArray(data?.data?.children) ? data.data.children : [];

    const posts = children.map((child: any) => {
      const item = child?.data ?? {};
      return {
        title: item.title ?? "",
        text: item.selftext ?? "",
        upvotes: item.ups ?? 0,
        comments: item.num_comments ?? 0,
        url: item.url ?? "",
      };
    });

    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected server error", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
