import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const Steps = () => {
  const steps = [
    {
      number: 1,
      title: "Input Property Information",
      description: "Enter your property details to get started",
    },
    {
      number: 2,
      title: "Choose Design",
      description: "Select from our curated design collections",
    },
    {
      number: 3,
      title: "Watch Magic Happen",
      description: "See your vision come to life automatically",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex items-start gap-6 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-primary mt-3 animate-pulse" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/pricing">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
