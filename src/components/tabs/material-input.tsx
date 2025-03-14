/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { supabase } from "@/src/lib/supabase";
import { useToast } from "@/src/hooks/use-toast";
import { InputForm } from "../material-input/input-form";
import { DesignTheme } from "../material-input/design-theme";
import { RoomUpgrade } from "../material-input/room-upgrade";
import { headerAtom } from "@/src/atoms/headerAtom";
import { questionAtom } from "@/src/atoms/questionAtom";
import Loading_Animation from "@/src/components/loading/dark_loading.json";
import { designThemeAtom } from "@/src/atoms/themeAtom";
import { roomUpgradeAtom } from "@/src/atoms/roomupgradeAtom";
const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function MaterialInputTab() {
  const { toast } = useToast();
  const setHeaders = useAtom(headerAtom)[1];
  const setQuestions = useAtom(questionAtom)[1];
  const [designTheme, setDesignTheme] = useAtom(designThemeAtom);
  const [roomUpgrade, setRoomUpgrade] = useAtom(roomUpgradeAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const componentsList = [
    <InputForm
      key={0}
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
    />,
    <DesignTheme
      key={1}
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
    />,
    <RoomUpgrade
      key={2}
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
    />,
  ];

  useEffect(() => {
    getAllHeaders();
    getAllDesignThemes();
    getAllRoomUpgrades();
  }, []);

  const getAllDesignThemes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("themes")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;

      setDesignTheme({ ...designTheme, list: data });
    } catch (err) {
      console.log(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAllRoomUpgrades = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("upgrades")
        .select(`*, locations(name)`)
        .order("name", { ascending: true });

      if (error) throw error;

      setRoomUpgrade({ ...roomUpgrade, list: data });
    } catch (err) {
      console.log(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAllHeaders = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("headers")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;

      getAllQuestions(data);
    } catch (err) {
      console.log(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAllQuestions = async (headers: any) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("order", { ascending: true });
      if (error) throw error;
      setQuestions({ list: data });

      if (data.length > 0 && headers.length > 0) {
        const filteredHeaders = headers.filter((header: any) =>
          data.some((question: any) => question.header === header.id)
        );
        setHeaders({ list: filteredHeaders });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex p-5 bg-white rounded-lg shadow-md">
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <div className="w-24 h-24">
            <DynamicLottie
              options={LoadingOptions}
              isClickToPauseDisabled={true}
            />
          </div>
        </div>
      ) : (
        componentsList[currentStep]
      )}
      <div className="min-w-28 flex flex-col">
        <div className="w-full h-1/3 py-4 gap-5 flex justify-end items-center">
          {currentStep === 0 && (
            <p className="text-sm text-[#2365C8]">STEP 1/3</p>
          )}
          <div
            className={`relative h-full w-[6px] rounded-full ${
              currentStep === 0 ? "bg-[#2365C8]" : "bg-[#C9C9C9]"
            }`}
          >
            {currentStep === 0 && (
              <div className="absolute top-[calc(50%-10px)] right-[-7px] w-5 h-5 rounded-full bg-white border-4 border-[#2365c8] shadow-[0px_1px_10px_10px_#2365C83d]"></div>
            )}
          </div>
        </div>
        <div className="w-full h-1/3 py-4 gap-5 flex justify-end items-center">
          {currentStep === 1 && (
            <p className="text-sm text-[#2365C8]">STEP 2/3</p>
          )}
          <div
            className={`relative h-full w-[6px] rounded-full ${
              currentStep === 1 ? "bg-[#2365C8]" : "bg-[#C9C9C9]"
            }`}
          >
            {currentStep === 1 && (
              <div className="absolute top-[calc(50%-10px)] right-[-7px] w-5 h-5 rounded-full bg-white border-4 border-[#2365c8] shadow-[0px_1px_10px_10px_#2365C83d]"></div>
            )}
          </div>
        </div>
        <div className="w-full h-1/3 py-4 gap-5 flex justify-end items-center">
          {currentStep === 2 && (
            <p className="text-sm text-[#2365C8]">STEP 3/3</p>
          )}
          <div
            className={`relative h-full w-[6px] rounded-full ${
              currentStep === 2 ? "bg-[#2365C8]" : "bg-[#C9C9C9]"
            }`}
          >
            {currentStep === 2 && (
              <div className="absolute top-[calc(50%-10px)] right-[-7px] w-5 h-5 rounded-full bg-white border-4 border-[#2365c8] shadow-[0px_1px_10px_10px_#2365C83d]"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
