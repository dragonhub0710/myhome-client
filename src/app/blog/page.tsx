"use client";

import { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

const BestMaterials = () => {
  const [selectedTab, setSelectedTab] = useState("lighting");

  // Top lighting fixtures data with updated information from Amazon links
  const lightingFixtures = [
    {
      id: 1,
      title: "DEWENWILS 5-Light Kitchen Island Pendant Light",
      description:
        "Modern kitchen island lighting with industrial black metal frame and clear glass shades that offers multiple installation options for dining rooms, kitchen islands, or foyers.",
      price: "$119.99",
      originalPrice: "$199.99",
      discount: "40% OFF",
      link: "https://amzn.to/4i4opQb",
    },
    {
      id: 2,
      title: "Lepro 6 Inch Ultra-Thin LED Recessed Ceiling Light",
      description:
        "Ultra-thin LED recessed lights with warm white 3000K light that fit in shallow ceilings while providing bright, energy-efficient illumination with a sleek modern look.",
      price: "$38.99",
      originalPrice: "$51.99",
      discount: "25% OFF",
      link: "https://amzn.to/3R2WOnh",
    },
    {
      id: 3,
      title: "SOLFART Modern 4 Lights Bathroom Vanity Light",
      description:
        "Sleek 4-light bathroom vanity fixture with modern brushed nickel finish and elegant glass shades that provides bright, even lighting for bathrooms, hallways, or bedrooms.",
      price: "$43.99",
      originalPrice: "$61.99",
      discount: "29% OFF",
      link: "https://amzn.to/3RwGkDY",
    },
    {
      id: 4,
      title: "SOLFART Modern 4 Lights Bathroom Vanity Light",
      description:
        "Sleek 4-light bathroom vanity fixture with modern brushed nickel finish and elegant glass shades that provides bright, even lighting for bathrooms, hallways, or bedrooms.",
      price: "$43.99",
      originalPrice: "$61.99",
      discount: "29% OFF",
      link: "https://amzn.to/3RwGkDY",
    },
    {
      id: 5,
      title: "XMYX Industrial Kitchen Island Pendant Lighting",
      description:
        "Vintage-inspired pendant lighting with adjustable height and stylish exposed Edison bulbs, perfect for kitchen islands, dining areas, or bars with its rustic industrial charm.",
      price: "$66.99",
      originalPrice: "$89.99",
      discount: "26% OFF",
      link: "https://amzn.to/3G7Ky2o",
    },
  ];

  // Top plumbing fixtures data with updated Amazon links
  const plumbingFixtures = [
    {
      id: 1,
      title: "Modern Bathroom Faucet with Widespread Design",
      description:
        "Upgrade bathrooms instantly with this brushed nickel bathroom faucet that adds contemporary elegance at a reasonable price point.",
      price: "$119.99",
      originalPrice: "$159.99",
      discount: "25% OFF",
      link: "https://amzn.to/4j0Yz0K",
    },
    {
      id: 2,
      title: "Pull-Down Kitchen Faucet with Sprayer",
      description:
        "This functional yet stylish kitchen faucet includes a pull-down sprayer and spot-resistant finish that appeals to modern buyers.",
      price: "$149.99",
      originalPrice: "$189.99",
      discount: "21% OFF",
      link: "https://amzn.to/4iZsW7C",
    },
    {
      id: 3,
      title: "High-Efficiency Toilet with Comfort Height",
      description:
        "Water-saving toilet with comfort height design and powerful flush performance that satisfies both investors and end users.",
      price: "$199.99",
      originalPrice: "$249.99",
      discount: "20% OFF",
      link: "https://amzn.to/4hXdXK0",
    },
    {
      id: 4,
      title: "Rainfall Shower Head with Handheld Combo",
      description:
        "Create a spa-like experience with this dual shower head system that delivers both rainfall and handheld functionality.",
      price: "$89.99",
      originalPrice: "$129.99",
      discount: "31% OFF",
      link: "https://amzn.to/4iRjUcB",
    },
    {
      id: 5,
      title: "Under-Sink Water Filtration System",
      description:
        "Add value with this easy-to-install water filtration system that removes contaminants and improves water taste and smell.",
      price: "$129.99",
      originalPrice: "$169.99",
      discount: "24% OFF",
      link: "https://amzn.to/4hYAWEo",
    },
  ];

  const fixturesList =
    selectedTab === "lighting" ? lightingFixtures : plumbingFixtures;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Affiliate Disclosure Banner */}
        <div className="bg-accent py-3 px-4 text-center text-sm">
          <p>
            As an Amazon Associate, I earn from qualifying purchases. This means
            I receive a small commission when you buy products through links on
            this page, at no extra cost to you.
          </p>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-16 pb-10">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Best Materials for Your Fix and Flip
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              As an Amazon Associate, I earn from qualifying purchases. This
              means I receive a small commission when you buy products through
              links on this page, at no extra cost to you.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto prose">
            <h2 className="text-3xl font-bold mb-6">
              The Right Materials Make All the Difference
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              Whether you&apos;re flipping houses or renovating for rental
              income, choosing the right fixtures and finishes makes all the
              difference in property value and buyer appeal. As experienced
              investors ourselves, we&apos;ve tested hundreds of products to
              bring you honest, practical recommendations that deliver real ROI.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Our reviews focus on durability, style longevity, ease of
              installation, and value perception — the factors that matter most
              when upgrading investment properties. Every product we recommend
              has been personally tested in our own renovation projects or
              vetted through our network of professional investors.
            </p>
          </div>
        </section>

        {/* Materials Tabs */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-10">
              <Tabs
                defaultValue="lighting"
                onValueChange={setSelectedTab}
                className="w-full max-w-md"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="lighting">
                    Top Lighting Fixtures
                  </TabsTrigger>
                  <TabsTrigger value="plumbing">
                    Top Plumbing Fixtures
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-8">
              {fixturesList.map((fixture) => (
                <Card
                  key={fixture.id}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold mb-4">
                        {fixture.title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {fixture.description}
                      </p>

                      <div className="flex items-center mt-6 mb-6">
                        <span className="text-2xl font-bold text-primary">
                          {fixture.price}
                        </span>
                        <span className="ml-3 text-gray-500 line-through text-sm">
                          {fixture.originalPrice}
                        </span>
                        <span className="ml-3 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded">
                          {fixture.discount}
                        </span>
                      </div>

                      <div className="pt-4">
                        <a
                          href={fixture.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="lg">View on Amazon</Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Amazon Associates Disclosure (Bottom) */}
        <div className="bg-accent py-6 px-4 text-center mt-16">
          <p className="text-sm max-w-3xl mx-auto">
            As an Amazon Associate, I earn from qualifying purchases. This means
            I receive a small commission when you buy products through links on
            this page, at no extra cost to you.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BestMaterials;
