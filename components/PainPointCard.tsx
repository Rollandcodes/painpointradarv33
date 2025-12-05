import Link from "next/link";

type PainPointCardProps = {
  title: string;
  text: string;
  upvotes: number;
  comments: number;
  url: string;
};

export default function PainPointCard({ title, text, upvotes, comments, url }: PainPointCardProps) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-indigo-700">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">{text}</p>
        </div>
        <Link
          href={url}
          className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
        >
          View
        </Link>
      </div>

      <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5 5 5M7 17l5-5 5 5" />
          </svg>
          {upvotes}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 8h10M7 12h6m-6 4h4M5 6a2 2 0 00-2 2v8.586a1 1 0 001.707.707L7 15h10a2 2 0 002-2V8a2 2 0 00-2-2H5z"
            />
          </svg>
          {comments} comments
        </span>
      </div>
    </article>
  );
}
