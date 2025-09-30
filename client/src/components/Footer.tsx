import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-white font-bold">F</span>
            <span className="text-base font-semibold tracking-tight text-gray-900">Fitness</span>
          </a>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#programs" className="hover:text-gray-900">Programs</a>
            <a href="#pricing" className="hover:text-gray-900">Pricing</a>
            <a href="#contact" className="hover:text-gray-900">Contact</a>
            <a href="#privacy" className="hover:text-gray-900">Privacy</a>
            <a href="#terms" className="hover:text-gray-900">Terms</a>
          </nav>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Fitness Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-500">
            <a aria-label="Instagram" href="#" className="hover:text-gray-700">
              <span className="h-5 w-5 inline-block">IG</span>
            </a>
            <a aria-label="Twitter" href="#" className="hover:text-gray-700">
              <span className="h-5 w-5 inline-block">TW</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

