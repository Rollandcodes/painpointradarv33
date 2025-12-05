import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { hasActiveSubscription } from "@/lib/subscription";

const bodySchema = z.object({
  query: z.string().trim().min(1),
  painpoints: z.array(z.any()).min(1),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAllowed = await hasActiveSubscription(session.user.id);
    if (!isAllowed) {
      return NextResponse.json({ error: "Payment Required" }, { status: 402 });
    }

    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body", issues: parsed.error.issues }, { status: 400 });
    }

    const { query, painpoints } = parsed.data;

    const { error } = await supabase.from("searches").insert({
      user_id: session.user.id,
      query,
      painpoints,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected server error", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
