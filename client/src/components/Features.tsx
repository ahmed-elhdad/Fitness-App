import React from "react";

const features = [
  {
    title: "Guided Workouts",
    desc: "Follow expertly curated routines for strength, cardio, and mobility.",
  },
  {
    title: "Meal Plans",
    desc: "Balanced nutrition guidance tailored to your goals and preferences.",
  },
  {
    title: "Progress Tracking",
    desc: "Visualize your improvements with detailed analytics and streaks.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Everything you need</h2>
          <p className="mt-4 text-gray-700">Tools that keep you consistent and motivated, all in one place.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-900 text-white">
                <span className="text-sm font-semibold">{f.title.charAt(0)}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

