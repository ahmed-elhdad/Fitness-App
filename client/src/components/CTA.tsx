import React from "react";

export default function CTA() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 text-white">
          <div className="px-8 py-12 sm:px-12 sm:py-16">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Ready to start your journey?</h3>
              <p className="mt-3 text-white/80 text-sm sm:text-base">
                Join thousands transforming their lives. Start free, cancel anytime.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a href="#signup" className="px-5 py-3 rounded-md bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100">
                  Get Started
                </a>
                <a href="#pricing" className="px-5 py-3 rounded-md ring-1 ring-inset ring-white/30 text-white text-sm font-medium hover:bg-white/10">
                  See Pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

