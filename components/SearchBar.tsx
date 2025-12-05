"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = value.trim();
    if (!query) return;
    router.push(`/results?sub=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:gap-2"
    >
      <div className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 focus-within:border-indigo-500 focus-within:bg-white">
        <svg
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5 text-slate-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.5 15.5 19 19m-3.5-3.5a5.5 5.5 0 1 0-7.778-7.778 5.5 5.5 0 0 0 7.778 7.778Z"
          />
        </svg>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="search"
          name="subreddit"
          placeholder="Search a subreddit (e.g., startups)"
          className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          aria-label="Search subreddit"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-150 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Search
      </button>
    </form>
  );
}
