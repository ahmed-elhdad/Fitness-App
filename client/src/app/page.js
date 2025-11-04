'use client'
import React,{use, useContext} from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ChallengeContext from "./contexts/challengeContext"
export default function Home() {
  const {isLoaded} = useContext(ChallengeContext)
  return(<>

          <div className="min-h-dvh bg-white text-gray-900">
            <Navbar />
            <main>
              <Hero />
              <Features />
              <CTA />
            </main>
            <Footer />
          </div>

  </>)
}
