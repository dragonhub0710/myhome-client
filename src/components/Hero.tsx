import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="min-h-[90vh] flex items-center bg-gradient-to-b from-accent to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Material & Design Automation Software
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-600 leading-relaxed">
            Flippers and Rehabbers: We built a software to implement world-class
            designs, order materials instantly, and communicate plans with
            contractors in minutes
          </p>
          <div className="flex justify-center">
            <Link href="/pricing">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 transition-all transform hover:scale-105">
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
