import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-white font-bold">
              F
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Fitness
            </span>
          </a>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="login"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Log in
            </a>
            <a
              href="/register"
              className="px-4 py-2 text-sm font-semibold rounded-md bg-gray-900 text-white hover:bg-gray-800"
            >
              Sign up
            </a>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
