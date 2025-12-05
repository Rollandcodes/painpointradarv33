// Simple reference schema for Supabase tables
export const createTablesSql = `
create table if not exists public.searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  subreddit text not null,
  posts jsonb not null,
  analysis jsonb not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.pain_points (
  id uuid primary key default gen_random_uuid(),
  search_id uuid references public.searches(id) on delete cascade,
  title text not null,
  text text,
  upvotes integer default 0,
  comments integer default 0,
  url text,
  created_at timestamp with time zone default now()
);
`;

export type SearchRow = {
  id: string;
  user_id: string | null;
  subreddit: string;
  posts: unknown;
  analysis: unknown;
  created_at: string;
};

export type PainPointRow = {
  id: string;
  search_id: string;
  title: string;
  text: string | null;
  upvotes: number;
  comments: number;
  url: string | null;
  created_at: string;
};
