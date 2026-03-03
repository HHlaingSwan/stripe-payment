"use client";

import { useState } from "react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 9,
    description: "Perfect for individuals and small projects.",
    features: ["1 project", "5 GB storage", "Basic analytics", "Email support"],
    highlight: false,
    badge: null,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    description: "Ideal for growing teams and businesses.",
    features: [
      "10 projects",
      "50 GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
    ],
    highlight: true,
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    description: "For large-scale operations and enterprises.",
    features: [
      "Unlimited projects",
      "500 GB storage",
      "Full analytics suite",
      "24/7 dedicated support",
      "Custom domain",
      "SSO & advanced security",
    ],
    highlight: false,
    badge: "Best Value",
  },
];

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (plan: (typeof plans)[0]) => {
    setLoadingPlan(plan.id);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: plan.name,
          amount: plan.price * 100,
        }),
      });

      const { url, error } = await response.json();

      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please check your Stripe API keys in .env.local");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <main className="h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Simple, Transparent
          </span>
          <br />
          Pricing
        </h1>
        <p className="text-zinc-400 text-lg">
          Choose the plan that fits your needs. Upgrade or cancel anytime.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
              plan.highlight
                ? "bg-linear-to-b from-violet-900/60 to-zinc-900 border-2 border-violet-500/60 shadow-2xl shadow-violet-900/40 scale-105"
                : "bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <div
                className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap ${
                  plan.highlight
                    ? "bg-violet-500 text-white"
                    : "bg-zinc-700 text-zinc-200"
                }`}
              >
                {plan.badge}
              </div>
            )}

            {/* Plan Name & Price */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-zinc-100 mb-1">
                {plan.name}
              </h2>
              <p className="text-zinc-500 text-sm mb-4">{plan.description}</p>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-extrabold text-zinc-100">
                  ${plan.price}
                </span>
                <span className="text-zinc-500 mb-1.5">/month</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm">
                  <span
                    className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.highlight
                        ? "bg-violet-500/20 text-violet-400"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    ✓
                  </span>
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={() => handleCheckout(plan)}
              disabled={loadingPlan !== null}
              className={`w-full font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                plan.highlight
                  ? "bg-violet-500 hover:bg-violet-400 text-white shadow-lg shadow-violet-900/40"
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700"
              }`}
            >
              {loadingPlan === plan.id ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                `Get ${plan.name}`
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-12 text-center text-xs text-zinc-600">
        Powered by <span className="text-zinc-500 font-medium">Stripe</span> ·
        Requires API keys in{" "}
        <code className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
          .env.local
        </code>
      </p>
    </main>
  );
}
