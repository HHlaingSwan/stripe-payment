import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        {/* Animated checkmark */}
        <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-8 animate-pulse">
          <svg
            className="w-12 h-12 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Payment Successful!
        </h1>
        <p className="text-zinc-400 mb-2 text-lg">
          Thank you for your purchase.
        </p>
        <p className="text-zinc-500 text-sm mb-10">
          You&apos;ll receive a confirmation email shortly. Your access has been
          activated.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 font-medium px-6 py-3 rounded-xl transition-all duration-200"
        >
          ← Back to Plans
        </Link>
      </div>
    </main>
  );
}
