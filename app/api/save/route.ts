import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { mockUser } from "@/lib/auth";

const bodySchema = z.object({
  query: z.string().trim().min(1),
  painpoints: z.array(z.any()).min(1),
});

export async function POST(req: Request) {
  try {
    // Using mock user for development (auth disabled)
    const user = mockUser;

    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body", issues: parsed.error.issues }, { status: 400 });
    }

    const { query, painpoints } = parsed.data;

    // Using mock user (auth disabled for development)
    const { error } = await supabase.from("searches").insert({
      user_id: user.id,
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
