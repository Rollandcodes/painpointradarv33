import { supabase } from "@/lib/supabase";

const ACTIVE_STATUSES = new Set(["active", "trialing"]);

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  if (!userId) return false;

  const { data, error } = await supabase
    .from("subscriptions")
    .select("status, metadata")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return false;

  // Prefer explicit status; fallback to LemonSqueezy metadata if provided.
  if (data.status && ACTIVE_STATUSES.has(data.status)) return true;

  const metaStatus = (data.metadata as Record<string, any> | null)?.lemon_squeezy_status;
  return metaStatus ? ACTIVE_STATUSES.has(String(metaStatus)) : false;
}
