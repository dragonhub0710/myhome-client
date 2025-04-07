import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Slider } from "@/src/components/ui/slider";

export const Calculator = () => {
  const [firstValue, setFirstValue] = useState([50]);
  const [secondValue, setSecondValue] = useState([500000]);
  const [percentageRate, setPercentageRate] = useState(0.05);

  const calculatedValue = (
    firstValue[0] *
    secondValue[0] *
    percentageRate
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const togglePercentage = () => {
    setPercentageRate(percentageRate === 0.05 ? 0.1 : 0.05);
  };

  return (
    <div className="py-24 bg-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              How Much Are You Leaving On The Table?
            </h2>
            <p className="text-xl text-gray-600">
              Slide to see your potential profit boost with a curated design
              package
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Number of Flips Per Year</span>
                <span>{firstValue[0]}</span>
              </div>
              <Slider
                value={firstValue}
                onValueChange={setFirstValue}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Average Sales Price</span>
                <span>${secondValue[0].toLocaleString()}</span>
              </div>
              <Slider
                value={secondValue}
                onValueChange={setSecondValue}
                max={1000000}
                step={1000}
              />
            </div>

            <div className="pt-8 text-center">
              <p className="text-lg text-gray-600 mb-2">Unrealized Profits</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                {calculatedValue}
              </p>
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-gray-600 max-w-2xl">
                  Industry surveys show top flippers believe good design boosts
                  ARV by at least 5-10%. What you are seeing here is based on a{" "}
                  {percentageRate * 100}% difference. Click to see the
                  unrealized profits from a{" "}
                  {percentageRate === 0.05 ? "10%" : "5%"} value increase.
                </p>
                <Button onClick={togglePercentage} variant="outline">
                  {percentageRate === 0.05 ? "10%" : "5%"} Difference
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center pt-8">
            <Button size="lg">Get Started</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
