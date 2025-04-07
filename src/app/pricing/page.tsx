import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Check } from "lucide-react";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for your renovation project. Get
              access to powerful tools to make your renovation journey smoother.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Standard Plan */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Standard</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-2">
                  Essential tools for renovation planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Material input sheet</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Design theme selection</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Material output sheet with:</span>
                  </li>
                  <ul className="pl-7 space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Price tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Website links</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Quantity calculator</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Location assignment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>Category organization</span>
                    </li>
                  </ul>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 border-primary hover:border-primary transition-all duration-200 hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                POPULAR
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$499</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-2">
                  Complete renovation toolkit with AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Material input sheet</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Design theme selection</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Material output sheet with all features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>AI click to order</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>AI material input assistant</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Contractor design guides</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Room Upgrades Selection</strong>
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" variant="default">
                  Get Premium
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              For larger renovations or specialized contractor needs, we offer
              custom plans. Contact us to discuss your specific requirements.
            </p>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
