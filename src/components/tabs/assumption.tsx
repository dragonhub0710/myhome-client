/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { supabase } from "@/src/lib/supabase";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { useAtomValue } from "jotai";
import { useToast } from "@/src/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authAtom } from "@/src/atoms/authAtom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import Loading_Animation from "@/src/components/loading/light_loading.json";
import { assumptionSchema, AssumptionType } from "@/src/schema/schema";
import {
  LARGE_KITCHEN_ASSUMPTION,
  MEDIUM_KITCHEN_ASSUMPTION,
  SMALL_KITCHEN_ASSUMPTION,
} from "@/src/constants/constants";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function AssumptionTab() {
  const { toast } = useToast();
  const auth = useAtomValue(authAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [localLVP, setLocalLVP] = useState(0);
  const [localKitchen, setLocalKitchen] = useState(SMALL_KITCHEN_ASSUMPTION);
  const [overageLVP, setOverageLVP] = useState(0);
  const [overageTile, setOverageTile] = useState(0);
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const form = useForm<AssumptionType>({
    resolver: zodResolver(assumptionSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (auth.user) {
      getAllAssumptions();
    }
  }, [auth]);

  const getAllAssumptions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("assumptions")
        .select("*")
        .eq("user_id", auth.user.id);
      if (error) throw error;

      if (data && data.length > 0) {
        form.setValue("localWindows", data[0].local_windows || 0);
        form.setValue("localStairTreads", data[0].local_stair_treads || 0);
        form.setValue("localInteriorDoors", data[0].local_interior_doors || 0);
        setLocalLVP(data[0].local_lvp || 0);
        setLocalKitchen(data[0].local_kitchen || SMALL_KITCHEN_ASSUMPTION);
        setOverageLVP(data[0].overage_lvp || 0);
        setOverageTile(data[0].overage_tile || 0);
      } else {
        form.setValue("localWindows", 0);
        form.setValue("localStairTreads", 0);
        form.setValue("localInteriorDoors", 0);
        setLocalLVP(0);
        setLocalKitchen(SMALL_KITCHEN_ASSUMPTION);
        setOverageLVP(0);
        setOverageTile(0);
      }
    } catch (err) {
      console.error("Error fetching assumptions:", err);
      toast.error({
        title: "Something went wrong",
        description: "Please check your internet connection and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAssumtion = async (data: AssumptionType) => {
    try {
      setIsLoading(true);
      const assumptions = {
        user_id: auth.user.id,
        local_windows: data.localWindows,
        local_lvp: localLVP,
        local_stair_treads: data.localStairTreads,
        local_interior_doors: data.localInteriorDoors,
        local_kitchen: localKitchen,
        overage_tile: overageTile,
        overage_lvp: overageLVP,
      };

      const { error } = await supabase
        .from("assumptions")
        .upsert(assumptions, { onConflict: "user_id" });

      if (error) throw error;

      setIsEditable(false);
    } catch (err) {
      console.error("Error saving assumptions:", err);
      toast.error({
        title: "Something went wrong",
        description: "Please check your internet connection and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocalLVPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(parseFloat(e.target.value).toFixed(2));
    if (!isNaN(value)) {
      setLocalLVP(value);
    } else {
      setLocalLVP(0);
    }
  };

  const handleOverageTileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(parseFloat(e.target.value).toFixed(2));
    if (!isNaN(value)) {
      setOverageTile(value);
    } else {
      setOverageTile(0);
    }
  };

  const handleOverageLVPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(parseFloat(e.target.value).toFixed(2));
    if (!isNaN(value)) {
      setOverageLVP(value);
    } else {
      setOverageLVP(0);
    }
  };

  return (
    <div className="w-full bg-white max-w-[600px] border-[1px] shadow p-10 rounded-xl">
      <form onSubmit={form.handleSubmit((data) => handleSaveAssumtion(data))}>
        <div className="space-y-4 flex flex-col">
          <p className="text-xl font-semibold mx-1">Local Vendor Pricing</p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="space-y-3">
            <div className="flex space-x-2 w-full">
              <div className="flex w-full flex-col gap-1">
                <Label className="text-base">Windows</Label>
                <div className="relative">
                  <Input
                    id="localWindows"
                    type="number"
                    disabled={!isEditable}
                    {...form.register("localWindows", {
                      valueAsNumber: true,
                    })}
                    placeholder="Windows"
                    className="h-12 w-full pr-[82px] text-base bg-white disabled:opacity-100 disabled:cursor-default"
                  />
                  <div className="absolute w-[70px] p-0 right-2 top-1/2 -translate-y-1/2">
                    / window
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  {form.formState.errors.localWindows && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.localWindows.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <Label className="text-base">LVP</Label>
                <div className="relative">
                  <Input
                    id="localLVP"
                    placeholder="LVP"
                    type="number"
                    disabled={!isEditable}
                    value={localLVP}
                    onChange={handleLocalLVPChange}
                    className="h-12 w-full pr-[52px] text-base bg-white disabled:opacity-100 disabled:cursor-default"
                  />
                  <div className="absolute w-[40px] p-0 right-2 top-1/2 -translate-y-1/2">
                    / sqft
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 w-full">
              <div className="flex w-full flex-col gap-1">
                <Label className="text-base">Stair Treads</Label>
                <div className="relative">
                  <Input
                    id="localStairTreads"
                    placeholder="Stair Treads"
                    type="number"
                    disabled={!isEditable}
                    {...form.register("localStairTreads", {
                      valueAsNumber: true,
                    })}
                    className="h-12 w-full pr-[62px] text-base bg-white disabled:opacity-100 disabled:cursor-default"
                  />
                  <div className="absolute w-[50px] p-0 right-2 top-1/2 -translate-y-1/2">
                    / tread
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  {form.formState.errors.localStairTreads && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.localStairTreads.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <Label className="text-base">Interior Doors</Label>
                <div className="relative">
                  <Input
                    id="localInteriorDoors"
                    placeholder="Interior Doors"
                    type="number"
                    disabled={!isEditable}
                    {...form.register("localInteriorDoors", {
                      valueAsNumber: true,
                    })}
                    className="h-12 w-full pr-[58px] text-base bg-white disabled:opacity-100 disabled:cursor-default"
                  />
                  <div className="absolute w-[46px] p-0 right-2 top-1/2 -translate-y-1/2">
                    / door
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  {form.formState.errors.localInteriorDoors && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.localInteriorDoors.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-2 w-full">
              <div className="flex w-full flex-col gap-1">
                <Label className="text-base">Kitchen</Label>
                <Select value={localKitchen} onValueChange={setLocalKitchen}>
                  <SelectTrigger
                    disabled={!isEditable}
                    className="w-full flex items-center capitalize bg-white disabled:opacity-100 disabled:cursor-default justify-between border rounded-lg px-3 py-2 hover:shadow"
                  >
                    <SelectValue placeholder="Select kitchen size" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem
                      value={SMALL_KITCHEN_ASSUMPTION}
                      className="cursor-pointer hover:bg-gray-300 capitalize"
                    >
                      {SMALL_KITCHEN_ASSUMPTION}
                    </SelectItem>
                    <SelectItem
                      value={MEDIUM_KITCHEN_ASSUMPTION}
                      className="cursor-pointer hover:bg-gray-300 capitalize"
                    >
                      {MEDIUM_KITCHEN_ASSUMPTION}
                    </SelectItem>
                    <SelectItem
                      value={LARGE_KITCHEN_ASSUMPTION}
                      className="cursor-pointer hover:bg-gray-300 capitalize"
                    >
                      {LARGE_KITCHEN_ASSUMPTION}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-full flex-col gap-1"></div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xl font-semibold mx-1">Material Overage</p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex space-x-2 w-full">
              <div className="flex w-full flex-col gap-1">
                <Label className="text-base">Tile</Label>
                <div className="relative">
                  <Input
                    id="overageTile"
                    placeholder="Tile"
                    type="number"
                    disabled={!isEditable}
                    value={overageTile}
                    onChange={handleOverageTileChange}
                    className="h-12 w-full pr-[25px] text-base bg-white disabled:opacity-100 disabled:cursor-default"
                  />
                  <div className="absolute w-[13px] p-0 right-2 top-1/2 -translate-y-1/2">
                    %
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <Label className="text-base">LVP</Label>
                <div className="relative">
                  <Input
                    id="overageLVP"
                    placeholder="LVP"
                    type="number"
                    disabled={!isEditable}
                    value={overageLVP}
                    onChange={handleOverageLVPChange}
                    className="h-12 w-full pr-[25px] text-base bg-white disabled:opacity-100 disabled:cursor-default"
                  />
                  <div className="absolute w-[13px] p-0 right-2 top-1/2 -translate-y-1/2">
                    %
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 w-full justify-end">
              {isEditable ? (
                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-[120px]"
                  >
                    {isLoading ? (
                      <div className="w-16 h-16">
                        <DynamicLottie
                          options={LoadingOptions}
                          isClickToPauseDisabled={true}
                        />
                      </div>
                    ) : (
                      <p>Save</p>
                    )}
                  </Button>
                  <Button
                    onClick={() => setIsEditable(false)}
                    className="w-[120px] border-primary bg-white text-primary hover:bg-primary hover:text-white"
                    variant="outline"
                  >
                    <p>Cancel</p>
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEditable(true)}
                  className="w-[120px]"
                >
                  <p>Edit</p>
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
