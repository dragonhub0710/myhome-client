import { useEffect, useRef, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { ThemeCard } from "./theme-card";

type MaterialInputProps = {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
};

export function DesignTheme({
  currentStep,
  setCurrentStep,
}: MaterialInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, []);

  const handleGototNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative pr-[136px]">
        <div className="flex justify-between items-center p-10 pb-0">
          <div>
            <h1 className="text-2xl font-semibold">Input Form</h1>
            <p className="text-sm text-muted-foreground">STEP 2/3</p>
          </div>
          <Button className="bg-[#2365C8] text-white hover:bg-blue-700">
            Save Changes
          </Button>
        </div>

        <div className="absolute right-6 top-24 bottom-6">
          <div className="w-[136px] flex flex-col items-center">
            <div className="w-full flex items-center justify-end">
              <div
                className="w-1 bg-gray-200 rounded-full mt-4"
                style={{ height: `${containerHeight / 4}px` }}
              ></div>
            </div>
            <div className="w-full flex items-center justify-end">
              <div className="mt-[-6px] px-5 text-sm text-blue-500">
                STEP 2 / 3
              </div>
              <div
                className="w-1 bg-blue-500 rounded-full justify-end flex items-center relative"
                style={{ height: `${containerHeight / 4 - 4}px` }}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2">
                  <div className="bg-white rounded-full p-2 border border-blue-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-end">
              <div
                className="w-1 bg-gray-200 rounded-full mt-4"
                style={{ height: `${containerHeight / 4 - 4}px` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-10 pt-4 relative">
          <div className="flex space-x-5">
            <ThemeCard />
            <ThemeCard />
            <ThemeCard />
          </div>
          <div className="mt-10">
            <Button
              onClick={handleGototNextStep}
              className="bg-[#2365C8] text-white hover:bg-blue-700"
            >
              Proceed to Step 3
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
