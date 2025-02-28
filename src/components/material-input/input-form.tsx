import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Home,
  Info,
  Bath,
  BathIcon as BathShower,
  Bed,
  DoorClosed,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

type MaterialInputProps = {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
};

export function InputForm({ currentStep, setCurrentStep }: MaterialInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    overview: true,
    kitchen: false,
    fullBathroom: false,
    halfBathroom: false,
    masterBedroom: false,
    interiorDoors: false,
  });

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, [expandedSections]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleGototNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative pr-[136px]">
        <div className="flex justify-between items-center p-10 pb-0">
          <div>
            <h1 className="text-2xl font-semibold">Input Form</h1>
            <p className="text-sm text-muted-foreground">STEP 1/3</p>
          </div>
          <Button className="bg-[#2365C8] text-white hover:bg-blue-700">
            Save Changes
          </Button>
        </div>

        <div className="absolute right-6 top-24 bottom-6">
          <div className="w-[136px] flex flex-col items-center">
            <div className="w-full flex items-center justify-end">
              <div className="mt-[-6px] px-5 text-sm text-blue-500">
                STEP 1 / 3
              </div>
              <div
                className="w-1 bg-blue-500 rounded-full justify-end flex items-center relative"
                style={{ height: `${containerHeight / 4}px` }}
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

            <div className="w-full flex items-center justify-end">
              <div
                className="w-1 bg-gray-200 rounded-full mt-4"
                style={{ height: `${containerHeight / 4 - 4}px` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-10 pt-4 relative">
          <div className="mb-4 rounded-lg">
            <button
              className="w-full flex bg-[#F5F8FB] border rounded-lg justify-between items-center p-4"
              onClick={() => toggleSection("overview")}
            >
              <div className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                <span className="font-medium">Overview</span>
              </div>
              {expandedSections.overview ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSections.overview && (
              <div className="">
                <div className="grid border px-4 py-2 rounded-lg bg-white grid-cols-[200px_1fr] gap-4">
                  <div className="flex items-center">
                    <span>Property Address</span>
                    <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input placeholder="Type here..." />
                </div>

                <div className="grid border px-4 py-2 rounded-lg bg-white grid-cols-[200px_1fr] gap-4">
                  <div className="flex items-center">
                    <span>Material Style</span>
                  </div>
                  <Select defaultValue="1078 Maplewood Avenue">
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="1078 Maplewood Avenue">
                        1078 Maplewood Avenue
                      </SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid border px-4 py-2 rounded-lg bg-white grid-cols-[200px_1fr] gap-4">
                  <div className="flex items-center">
                    <span>Full Bathrooms</span>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option here" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid border px-4 py-2 rounded-lg bg-white grid-cols-[200px_1fr] gap-4">
                  <div className="flex items-center">
                    <span>Half Bathrooms</span>
                  </div>
                  <Select defaultValue="1078 Maplewood Avenue">
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="1078 Maplewood Avenue">
                        1078 Maplewood Avenue
                      </SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid border px-4 py-2 rounded-lg bg-white grid-cols-[200px_1fr] gap-4">
                  <div className="flex items-center">
                    <span>No. of Living Rooms</span>
                  </div>
                  <Input value="1078 Maplewood Avenue" readOnly />
                </div>
              </div>
            )}
          </div>

          <div className="border rounded-md">
            <button
              className="w-full flex justify-between items-center p-4"
              onClick={() => toggleSection("kitchen")}
            >
              <div className="flex items-center">
                <span className="mr-2 h-5 w-5 flex items-center justify-center">
                  🍳
                </span>
                <span className="font-medium">Kitchen</span>
              </div>
              {expandedSections.kitchen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSections.kitchen && <div className="p-4 pt-0"></div>}
          </div>

          <div className="border rounded-md">
            <button
              className="w-full flex justify-between items-center p-4"
              onClick={() => toggleSection("fullBathroom")}
            >
              <div className="flex items-center">
                <Bath className="mr-2 h-5 w-5" />
                <span className="font-medium">Full Bathroom 1</span>
              </div>
              {expandedSections.fullBathroom ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSections.fullBathroom && <div className="p-4 pt-0"></div>}
          </div>

          <div className="border rounded-md">
            <button
              className="w-full flex justify-between items-center p-4"
              onClick={() => toggleSection("halfBathroom")}
            >
              <div className="flex items-center">
                <BathShower className="mr-2 h-5 w-5" />
                <span className="font-medium">Half Bathroom 1</span>
              </div>
              {expandedSections.halfBathroom ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSections.halfBathroom && <div className="p-4 pt-0"></div>}
          </div>

          <div className="border rounded-md">
            <button
              className="w-full flex justify-between items-center p-4"
              onClick={() => toggleSection("masterBedroom")}
            >
              <div className="flex items-center">
                <Bed className="mr-2 h-5 w-5" />
                <span className="font-medium">Master Bedroom</span>
              </div>
              {expandedSections.masterBedroom ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSections.masterBedroom && <div className="p-4 pt-0"></div>}
          </div>

          <div className="border rounded-md">
            <button
              className="w-full flex justify-between items-center p-4"
              onClick={() => toggleSection("interiorDoors")}
            >
              <div className="flex items-center">
                <DoorClosed className="mr-2 h-5 w-5" />
                <span className="font-medium">Interior Doors</span>
              </div>
              {expandedSections.interiorDoors ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedSections.interiorDoors && <div className="p-4 pt-0"></div>}
          </div>

          <div className="mt-10">
            <Button
              onClick={handleGototNextStep}
              className="bg-[#2365C8] text-white hover:bg-blue-700"
            >
              Proceed to Step 2
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
