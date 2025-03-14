/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import dynamic from "next/dynamic";
import { supabase } from "@/src/lib/supabase";
import { projectAtom } from "@/src/atoms/projectAtom";
import { useToast } from "@/src/hooks/use-toast";
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import Loading_Animation from "@/src/components/loading/light_loading.json";
import { roomUpgradeAtom } from "@/src/atoms/roomupgradeAtom";
import { RoomCard } from "@/src/components/material-input/room-card";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

type MaterialInputProps = {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
};

export function RoomUpgrade({
  currentStep,
  setCurrentStep,
}: MaterialInputProps) {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const projectData = useAtomValue(projectAtom);
  const [roomUpgradeData, setRoomUpgradeData] = useAtom(roomUpgradeAtom);
  const [open, setOpen] = useState(false);
  const [upgradeIndex, setUpgradeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (roomUpgradeData.list && roomUpgradeData.list.length > 0) {
      roomUpgradeData.list.map((item: any, idx: number) => {
        if (item.id === projectData.selectedItem.room_upgrade) {
          setUpgradeIndex(idx);
        }
      });
    }
  }, [roomUpgradeData, projectData]);

  const handleGotoPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSaveChanges = async () => {
    if (!roomUpgradeData.list || roomUpgradeData.list.length === 0) return;

    try {
      setIsLoading(true);
      const { data: row, error } = await supabase
        .from("projects")
        .update({ room_upgrade: roomUpgradeData.list[upgradeIndex].id })
        .eq("id", projectData.selectedItem.id);
      if (error) throw error;

      if (row) {
        setRoomUpgradeData({
          ...roomUpgradeData,
          selectedItem: roomUpgradeData.list[upgradeIndex],
        });
      }
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
  const handleSelectRoomUpgrade = async (index: number) => {
    setUpgradeIndex(index);
    setOpen((prev) => !prev);
    const selectedItem = roomUpgradeData.list[index];
    if (!selectedItem || selectedItem.products == 0) {
      selectedItem.productsLabel = "None";
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .select("id, name")
      .in("id", selectedItem.products);
    if (error) throw error;
    if (data) {
      const list = data.map((row) => row.name);
      console.log({ list });
      selectedItem.productsLabel = list.join(", ");
    }
    setRoomUpgradeData({ ...roomUpgradeData, selectedItem });
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative px-10 py-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Room Upgrades</h1>
            <p className="text-sm text-muted-foreground">STEP 3/3</p>
          </div>
          <Button
            onClick={handleSaveChanges}
            className="w-36 bg-[#2365C8] text-white hover:bg-blue-700"
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
          <div className="flex gap-5 flex-wrap">
            {roomUpgradeData.list &&
              roomUpgradeData.list.length > 0 &&
              roomUpgradeData.list.map((item: any, idx: number) => {
                const isSelected = upgradeIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`w-[190px] h-auto cursor-default relative space-y-2`}
                    onClick={() => handleSelectRoomUpgrade(idx)}
                  >
                    <div
                      className={`relative block w-[190px] h-[254px] overflow-hidden rounded-xl hover:border-[#2365C8]  ${
                        isSelected
                          ? "border-[#2365C8] border-2"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        alt="theme"
                        src={item.image ? item.image : "/img/card.png"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2">
                        <div className="w-fit rounded-full bg-[#F1F7FB] px-2 py-1">
                          $19,000
                        </div>
                      </div>
                    </div>
                    <p className="text-sm opacity-60">{item.locations?.name}</p>
                    <p className="text-lg font-medium">{item.name}</p>
                    <p className="text-sm">{item.description}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleGotoPrevStep}
            className="bg-[#2365C8] text-white hover:bg-blue-700"
          >
            Previous Step
          </Button>
          <Button
            disabled
            className="bg-[#2365C8] text-white hover:bg-blue-700"
          >
            Next Step
          </Button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-10 max-w-[730px] bg-white">
          <DialogTitle></DialogTitle>
          <RoomCard data={roomUpgradeData.list[upgradeIndex]} />
          <div className="w-full flex justify-end">
            <div className="w-[310px]"></div>
            <Button
              onClick={handleSaveChanges}
              className="w-full flex-1 ml-4 bg-[#2365C8] cursor-pointer flex items-center justify-center h-[42px] rounded-xl text-white"
            >
              {isLoading ? (
                <div className="w-12 h-12">
                  <DynamicLottie
                    options={LoadingOptions}
                    isClickToPauseDisabled={true}
                  />
                </div>
              ) : (
                <p>Add to Project</p>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
