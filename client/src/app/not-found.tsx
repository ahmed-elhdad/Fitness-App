"use client";

import React from "react";
import Link from "next/link";
import { use } from "react";
import { AppContext } from "../app/contexts/AppContext";
import Loading from "@/components/Loading";
export default function NotFound() {
  const appContext = use(AppContext);
  const isLoaded = appContext?.isLoaded ?? false;
  Loading();
  return (
    <>
      {isLoaded ? (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
          <div className="flex flex-col items-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-white font-bold text-4xl mb-4 shadow-lg">
              F
            </span>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-2">404</h1>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-500 mb-8 text-center max-w-md">
              Sorry, the page you are looking for does not exist or may have
              been moved.
              <br />
              You can return to the homepage or browse other sections of the
              site.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gray-900 text-white rounded-md font-semibold shadow hover:bg-gray-800 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
