/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import { supabase } from "@/src/lib/supabase";
import { designThemeAtom } from "@/src/atoms/themeAtom";
import { projectAtom } from "@/src/atoms/projectAtom";
import { useToast } from "@/src/hooks/use-toast";
import { Button } from "@/src/components/ui/button";
import Loading_Animation from "@/src/components/loading/light_loading.json";
import { roomUpgradeAtom } from "@/src/atoms/roomupgradeAtom";
import { authAtom } from "@/src/atoms/authAtom";
import { ImageCarousel } from "@/src/components/image-gallery";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

interface DesignThemeProps {
  images: string[];
  name: string;
  description: string;
}

type MaterialInputProps = {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
};

export function DesignTheme({
  currentStep,
  setCurrentStep,
}: MaterialInputProps) {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const auth = useAtomValue(authAtom);
  const [projectData, setProjectData] = useAtom(projectAtom);
  const [roomUpgradeData, setRoomUpgradeData] = useAtom(roomUpgradeAtom);
  const [designThemeData, setDesignThemeData] = useAtom(designThemeAtom);
  const [prevThemeIndex, setPrevThemeIndex] = useState(0);
  const [newThemeIndex, setNewThemeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [priceList, setPriceList] = useState<number[]>([]);
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (designThemeData.list && designThemeData.list.length > 0) {
    }
  }, [designThemeData, projectData]);

  useEffect(() => {
    if (designThemeData.list && designThemeData.list.length > 0) {
      getDesignThemePrices();
      if (currentStep === 2) {
      designThemeData.list.map((item: { id: string }, idx: number) => {
        if (item.id === projectData.selectedItem.design_theme) {
          setPrevThemeIndex(idx);
          setNewThemeIndex(idx);
        }
      });
    }
    }
  }, [designThemeData, projectData]);

  const getDesignThemePrices = async () => {
    const promises = designThemeData.list.map(async (item: { id: string }) => {
      const themeArrayString = JSON.stringify([item.id]);
      const { data, error } = await supabase
        .from("products")
        .select("price, quantity")
        .filter("themes", "cs", themeArrayString);
      if (error) throw error;

      let totalPrice = 0;

      if (data && data.length > 0) {
        for (const product of data) {
          const price = product.price || 0;
          const quantity = product.quantity || 0;
          totalPrice += price * quantity;
        }
      }
      return totalPrice;
    });

    try {
      const priceList = await Promise.all(promises);
      setPriceList(priceList);
    } catch (error) {
      console.error("Error fetching design theme prices:", error);
    }
  };

  const handleGotoPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleGotoNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSaveChanges = async () => {
    if (!designThemeData.list || designThemeData.list.length === 0) return;
    try {
      setIsLoading(true);
      const { error: updateError } = await supabase
        .from("projects")
        .update({ design_theme: designThemeData.list[newThemeIndex].id })
        .eq("id", projectData.selectedItem.id);
      if (updateError) throw updateError;

      const { data: selected, error: selectedError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectData.selectedItem.id);
      if (selectedError) throw selectedError;

      const { data: projects, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", auth.user?.id);
      if (projectsError) throw projectsError;

      setProjectData({
        ...projectData,
        list: projects,
        selectedItem: selected[0],
      });

      console.log("Saved design theme:", selected[0].design_theme);

      setDesignThemeData({
        ...designThemeData,
        selectedItem: designThemeData.list[newThemeIndex],
      });



      const themeArrayString = JSON.stringify([
        designThemeData.list[newThemeIndex].id,
      ]);
      const { data: rows, error } = await supabase
        .from("upgrades")
        .select(`*, locations(name)`)
        .filter("themes", "cs", themeArrayString)
        .order("name", { ascending: true });
      if (error) throw error;

      setRoomUpgradeData({ ...roomUpgradeData, list: rows });
    } catch (err) {
      console.error("Error saving theme:", err);
      toast({
        title: "Error saving theme.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative px-10 py-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Design Themes</h1>
            <p className="text-sm text-muted-foreground">STEP 1/3</p>
          </div>
          <Button
            onClick={handleSaveChanges}
            className="w-36 bg-primary text-white hover:bg-blue-700"
          >
            {isLoading ? (
              <div className="w-12 h-12">
                <DynamicLottie
                  options={LoadingOptions}
                  isClickToPauseDisabled={true}
                />
              </div>
            ) : (
              <p>Save Changes</p>
            )}
          </Button>
        </div>

        <div className="w-full relative space-y-2">
          <div className="flex space-x-5">
            {designThemeData.list &&
              designThemeData.list.length > 0 &&
              designThemeData.list.map(
                (item: DesignThemeProps, idx: number) => {
                  const isPrevTheme = prevThemeIndex === idx;
                  const isSelected = newThemeIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`w-[190px] h-auto cursor-default relative space-y-2`}
                      onClick={() => setNewThemeIndex(idx)}
                    >
                      <div
                        className={`relative block w-[178px] h-[254px] overflow-hidden rounded-xl ${
                          isPrevTheme
                            ? "border-primary border-4"
                            : isSelected
                            ? "border-primary border-2"
                            : "border-transparent"
                        }`}
                      >
                        <ImageCarousel images={item.images} />
                        <div className="absolute bottom-2 right-2">
                          <div className="w-fit rounded-full bg-[#F1F7FB] px-2 py-1">                          </div>
                        </div>
                      </div>
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  );
                }
              )}
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <Button
            disabled
            onClick={handleGotoPrevStep}
            className="bg-primary text-white hover:bg-blue-700"
          >
            Previous Step
          </Button>
          <Button
            onClick={handleGotoNextStep}
            className="bg-primary text-white hover:bg-blue-700"
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}
