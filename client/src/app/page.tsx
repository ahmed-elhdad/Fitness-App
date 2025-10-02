"use client";

import React, { use } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { AppContext } from "./contexts/AppContext";
import Loading from "../components/Loading";
const Home = () => {
  const appContext = use(AppContext);
  const isLoaded = appContext?.isLoaded ?? false;

  return (
    <>
      {isLoaded ? (
        <div className="min-h-dvh bg-white text-gray-900">
          <Navbar />
          <main>
            <Hero />
            <Features />
            <CTA />
          </main>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
