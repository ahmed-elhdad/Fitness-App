import React from "react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
            Transform Your Body, Elevate Your Life
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-700 max-w-xl">
            Personalized workout plans, progress tracking, and expert guidance to help you reach your goals faster.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#signup" className="px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800">
              Start Free Trial
            </a>
            <a href="#programs" className="px-6 py-3 rounded-md border border-gray-300 text-gray-900 text-sm font-medium hover:bg-gray-100">
              Explore Programs
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span>Over 10k active members</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500"></span>
              <span>Expert coaches</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


