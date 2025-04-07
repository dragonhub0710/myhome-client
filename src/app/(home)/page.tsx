"use client";

import { Calculator } from "@/src/components/Calculator";
import { FAQ } from "@/src/components/FAQ";
import { Features } from "@/src/components/Features";
import { Footer } from "@/src/components/Footer";
import { Hero } from "@/src/components/Hero";
import { Navbar } from "@/src/components/Navbar";
import { Steps } from "@/src/components/Steps";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="bg-white">
          <Hero />
        </div>
        <div className="bg-accent">
          <Steps />
        </div>
        <div className="bg-white">
          <Calculator />
        </div>
        <div className="bg-accent">
          <Features />
        </div>
        <div className="bg-white">
          <FAQ />
        </div>
        <Footer />
      </main>
    </div>
  );
}
