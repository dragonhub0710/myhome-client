/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Palette,
  Package,
  FileText,
  Calculator,
  Bot,
  Truck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: Palette,
    title: "Design Packages",
    description:
      "Choose from curated design packages tailored to your property's ARV and market. Each design package includes everything you could possibly need to buy for the house and was hand picked by a professional interior designer.",
  },
  {
    icon: Package,
    title: "Material Takeoff Sheet",
    description:
      "Input the property information and material needed into our takeoff form. This makes sure you remember all materials needed, their sizes, and quantities so you're not holding up the project. Once this information is inputted, the software creates a list of every item you need to purchase to complete the flip.",
  },
  {
    icon: FileText,
    title: "Contractor Design Guides",
    description:
      "Based on the materials needed, the software will create a contractor design guide for all of your subs and GC/Project Manager. These include electrical, plumbing, tile, finishes/hardware, paint, and accent wall sheets your contractors know exactly where everything goes. No more calling you in the middle of the day or you showing up to the jobsite to see tile in the wrong bathroom.",
  },
  {
    icon: Calculator,
    title: "Instant Material Cost",
    description:
      "Once the takeoff sheet and design package selection are complete, the software will automatically pull up up-to-date pricing on all materials and generate a material cost report. No more waiting until the end of the project to see exactly what everything ended up costing.",
  },
  {
    icon: Bot,
    title: "AI Agent Ordering",
    description:
      "Instead of ordering materials one by one, we created an AI Ordering Agent that adds all of the materials to your cart for you. Simply press a button and see all of your materials appear in your cart. All you have to do is press checkout, and boom, all of your materials for your project have been ordered.",
  },
  {
    icon: Truck,
    title: "Delivery Tracking",
    description:
      "Tired of logging into 4 different websites and navigating 100s of materials to check order status? Tired of your contractors or project manager asking you when a certain material will be at the house? Have all of your delivery dates in one place and be able to share all or certain categories with your team in the click of a button.",
  },
];

export const Features = () => {
  const [selectedDesign, setSelectedDesign] = useState("modern");
  const [materialValue, setMaterialValue] = useState(50);
  const [aiOrderEnabled, setAiOrderEnabled] = useState(false);

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Transform Your Flipping Process
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Everything you need to design, order, and track your flip renovation
          materials in one place.
        </p>
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="flex-1">
                <div className="max-w-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-accent p-4 rounded-xl">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {feature.description}
                  </p>
                  <Link href="/pricing">
                    <Button size="lg">Get Started</Button>
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <Card className="w-full shadow-lg border border-slate-100">
                  <CardContent className="p-6">
                    {/* Design Packages Widget */}
                    {index === 0 && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold mb-4">
                          Select Your Design Style
                        </h4>
                        <Tabs
                          defaultValue="modern"
                          onValueChange={setSelectedDesign}
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="modern">Modern</TabsTrigger>
                            <TabsTrigger value="farmhouse">
                              Farmhouse
                            </TabsTrigger>
                            <TabsTrigger value="traditional">
                              Traditional
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="modern" className="mt-4">
                            <div className="p-4 bg-slate-50 rounded-md">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">
                                  White Quartz Countertops
                                </span>
                                <span className="text-primary">$3,200</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">
                                  Gray Cabinetry
                                </span>
                                <span className="text-primary">$5,800</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">
                                  Subway Tile Backsplash
                                </span>
                                <span className="text-primary">$1,200</span>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="farmhouse" className="mt-4">
                            <div className="p-4 bg-slate-50 rounded-md">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">
                                  Butcher Block Countertops
                                </span>
                                <span className="text-primary">$2,800</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">
                                  White Shaker Cabinetry
                                </span>
                                <span className="text-primary">$6,200</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">
                                  Mosaic Pattern Backsplash
                                </span>
                                <span className="text-primary">$1,500</span>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="traditional" className="mt-4">
                            <div className="p-4 bg-slate-50 rounded-md">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">
                                  Granite Countertops
                                </span>
                                <span className="text-primary">$3,500</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">
                                  Cherry Wood Cabinetry
                                </span>
                                <span className="text-primary">$7,200</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium">
                                  Diamond Pattern Backsplash
                                </span>
                                <span className="text-primary">$1,800</span>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}

                    {/* Material Takeoff Sheet Widget */}
                    {index === 1 && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold mb-4">
                          Material Takeoff Form
                        </h4>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-slate-50 rounded-md">
                              <p className="font-medium text-sm mb-1">
                                Bathroom
                              </p>
                              <p className="text-xs text-gray-500">
                                3 items added
                              </p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-md">
                              <p className="font-medium text-sm mb-1">
                                Kitchen
                              </p>
                              <p className="text-xs text-gray-500">
                                5 items added
                              </p>
                            </div>
                          </div>
                          <Textarea
                            placeholder="Add notes about specific materials needed..."
                            className="h-24"
                          />
                          <div className="flex justify-between items-center text-sm">
                            <span>Materials Added: 8</span>
                            <span className="text-primary font-medium">
                              View List →
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contractor Design Guides Widget */}
                    {index === 2 && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold mb-4">
                          Contractor Design Guide
                        </h4>
                        <div className="border rounded-md overflow-hidden">
                          <div className="bg-slate-100 p-3 font-medium">
                            Tile Installation Guide
                          </div>
                          <div className="p-4 space-y-3">
                            <div className="flex justify-between">
                              <span>Primary Bathroom</span>
                              <span className="text-primary">2 patterns</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Guest Bathroom</span>
                              <span className="text-primary">1 pattern</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Kitchen Backsplash</span>
                              <span className="text-primary">1 pattern</span>
                            </div>
                            <div className="mt-2 p-2 bg-slate-50 rounded text-sm">
                              Each pattern includes precise measurements, layout
                              diagrams, and installation notes
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Instant Material Cost Widget */}
                    {index === 3 && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold mb-4">
                          Material Cost Calculator
                        </h4>
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Project Budget Utilized</span>
                              <span>{materialValue}%</span>
                            </div>
                            <Slider
                              value={[materialValue]}
                              onValueChange={(value) =>
                                setMaterialValue(value[0])
                              }
                              max={100}
                              step={1}
                            />
                          </div>
                          <div className="space-y-2 p-4 bg-slate-50 rounded-md">
                            <div className="flex justify-between">
                              <span>Flooring</span>
                              <span>
                                ${((1200 * materialValue) / 100).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fixtures</span>
                              <span>
                                ${((850 * materialValue) / 100).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Appliances</span>
                              <span>
                                ${((3500 * materialValue) / 100).toFixed(2)}
                              </span>
                            </div>
                            <div className="border-t border-gray-300 mt-2 pt-2 font-medium flex justify-between">
                              <span>Total</span>
                              <span className="text-primary">
                                $
                                {(
                                  ((1200 + 850 + 3500) * materialValue) /
                                  100
                                ).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* AI Agent Ordering Widget */}
                    {index === 4 && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold mb-4">
                          AI Ordering Assistant
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>Enable AI Ordering</span>
                            <Switch
                              checked={aiOrderEnabled}
                              onCheckedChange={setAiOrderEnabled}
                            />
                          </div>
                          <div className="p-4 bg-slate-50 rounded-md space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    aiOrderEnabled
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                                  }`}
                                ></div>
                                <span>15 Bathroom Items</span>
                              </div>
                              <span
                                className={
                                  aiOrderEnabled
                                    ? "text-green-500"
                                    : "text-gray-400"
                                }
                              >
                                Ready
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    aiOrderEnabled
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                                  }`}
                                ></div>
                                <span>23 Kitchen Items</span>
                              </div>
                              <span
                                className={
                                  aiOrderEnabled
                                    ? "text-green-500"
                                    : "text-gray-400"
                                }
                              >
                                Ready
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    aiOrderEnabled
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                                  }`}
                                ></div>
                                <span>8 Lighting Fixtures</span>
                              </div>
                              <span
                                className={
                                  aiOrderEnabled
                                    ? "text-green-500"
                                    : "text-gray-400"
                                }
                              >
                                Ready
                              </span>
                            </div>
                          </div>
                          <Button disabled={!aiOrderEnabled} className="w-full">
                            {aiOrderEnabled
                              ? "Add All to Cart"
                              : "Enable AI Assistant First"}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Delivery Tracking Widget */}
                    {index === 5 && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold mb-4">
                          Delivery Tracker
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 border border-green-100 bg-green-50 rounded-md">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">
                                Kitchen Cabinets
                              </span>
                              <span className="text-green-600 text-sm">
                                Delivered
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">
                              Arrived: Apr 2, 2025
                            </p>
                          </div>
                          <div className="p-3 border border-yellow-100 bg-yellow-50 rounded-md">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">
                                Bathroom Fixtures
                              </span>
                              <span className="text-yellow-600 text-sm">
                                In Transit
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">
                              Expected: Apr 6, 2025
                            </p>
                          </div>
                          <div className="p-3 border border-blue-100 bg-blue-50 rounded-md">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">
                                Hardwood Flooring
                              </span>
                              <span className="text-blue-600 text-sm">
                                Processing
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">
                              Expected: Apr 10, 2025
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
