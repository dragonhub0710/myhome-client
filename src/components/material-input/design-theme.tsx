/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

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

const DynamicLottie = dynamic(() => import("react-lottie"), { ssr: false });

interface DesignThemeProps {
  images: string[];
  name: string;
  description: string;
  id: string;
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
  const [prevThemeIndex, setPrevThemeIndex] = useState<number | null>(null);
  const [newThemeIndex, setNewThemeIndex] = useState<number | null>(null);
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
    if (
      designThemeData.list &&
      designThemeData.list.length > 0 &&
      projectData.selectedItem?.design_theme
    ) {
      const currentThemeIndex = designThemeData.list.findIndex(
        (item: any) => item.id === projectData.selectedItem?.design_theme
      );

      setPrevThemeIndex(currentThemeIndex);
      setNewThemeIndex(currentThemeIndex);
    }
  }, [designThemeData, projectData.selectedItem?.design_theme]);

  useEffect(() => {
    if (designThemeData.list && designThemeData.list.length > 0) {
      getDesignThemePrices();
    }
  }, [designThemeData]);

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

  const handleGotoNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSaveThemeImmediately = async (idx: number) => {
    try {
      setIsLoading(true);
      const selectedTheme = designThemeData.list[idx];

      const { error: updateError } = await supabase
        .from("projects")
        .update({ design_theme: selectedTheme.id })
        .eq("id", projectData.selectedItem.id);
      if (updateError) throw updateError;

      const { data: selected } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectData.selectedItem.id);

      const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .eq("user_email", auth.user?.email);

      setProjectData({
        ...projectData,
        list: projects,
        selectedItem: selected?.[0],
      });

      setDesignThemeData({
        ...designThemeData,
        selectedItem: selectedTheme,
      });

      console.log(
        "✅ Selected Design Theme:",
        selectedTheme.name,
        selectedTheme.id
      );

      const themeArrayString = JSON.stringify([selectedTheme.id]);
      const { data: upgrades, error } = await supabase
        .from("upgrades")
        .select("*, locations(name)")
        .filter("themes", "cs", themeArrayString)
        .order("name", { ascending: true });
      if (error) throw error;

      setRoomUpgradeData({ ...roomUpgradeData, list: upgrades });
      toast({ title: `${selectedTheme.name} selected.` });
    } catch (err) {
      console.error("Error saving theme:", err);
      toast({ title: "Failed to save theme.", variant: "destructive" });
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
        </div>

        <div className="w-full relative space-y-2">
          <div className="flex space-x-5">
            {designThemeData.list &&
              designThemeData.list.length > 0 &&
              designThemeData.list.map(
                (item: DesignThemeProps, idx: number) => {
                  const isActive =
                    projectData.selectedItem?.design_theme === item.id;
                  return (
                    <div
                      key={idx}
                      className={`w-[190px] h-auto cursor-pointer relative space-y-2`}
                      onClick={() => {
                        if (newThemeIndex !== idx) {
                          setNewThemeIndex(idx);
                          handleSaveThemeImmediately(idx);
                        }
                      }}
                    >
                      <div
                        className={`relative block w-[178px] h-[254px] overflow-hidden rounded-xl border-2 ${
                          isActive ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <ImageCarousel images={item.images} />
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
          <Button disabled className="bg-primary text-white hover:bg-blue-700">
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
