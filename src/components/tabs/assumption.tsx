"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Loading_Animation from "@/src/components/loading/light_loading.json";
import { Label } from "@/src/components/ui/label";
import { AssumptionSheet, assumptionSheetSchema } from "@/src/schema/schema";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function AssumptionTab() {
  const [isloading, setIsLoading] = useState(false);

  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const form = useForm<AssumptionSheet>({
    resolver: zodResolver(assumptionSheetSchema),
    mode: "onChange",
  });

  const isValid =
    form.formState.isValid &&
    form.getValues("vendorWindows") &&
    form.getValues("vendorLVP") &&
    form.getValues("vendorStairTreads") &&
    form.getValues("vendorDoors") &&
    form.getValues("vendorCabinets") &&
    form.getValues("materialTile") &&
    form.getValues("materialLVP");

  const handleUpdateSheet = async (data: AssumptionSheet) => {
    console.log(data);
    setIsLoading(false);
  };

  return (
    <div className="w-full bg-white max-w-[600px] space-y-4 p-10 rounded-xl flex flex-col">
      <p className="text-xl font-semibold mx-1">Local Vendor Pricing</p>
      <p className="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <form
        onSubmit={form.handleSubmit((data) => handleUpdateSheet(data))}
        className="space-y-10"
      >
        <div className="space-y-3">
          <div className="flex space-x-2 w-full">
            <div className="flex w-full flex-col gap-1">
              <Label className="text-base">Windows</Label>
              <div className="relative">
                <Input
                  id="vendorWindows"
                  placeholder="Windows"
                  {...form.register("vendorWindows")}
                  className="h-12 w-full pr-[82px] text-base bg-white"
                />
                <div className="absolute w-[70px] p-0 right-2 top-1/2 -translate-y-1/2">
                  / window
                </div>
              </div>
              {form.formState.errors.vendorWindows && (
                <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                  {form.formState.errors.vendorWindows.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col gap-1">
              <Label className="text-base">LVP</Label>
              <div className="relative">
                <Input
                  id="lvp"
                  placeholder="LVP"
                  {...form.register("vendorLVP")}
                  className="h-12 w-full pr-[52px] text-base bg-white"
                />
                <div className="absolute w-[40px] p-0 right-2 top-1/2 -translate-y-1/2">
                  / sqft
                </div>
              </div>
              {form.formState.errors.vendorLVP && (
                <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                  {form.formState.errors.vendorLVP.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2 w-full">
            <div className="flex w-full flex-col gap-1">
              <Label className="text-base">Stair Treads</Label>
              <div className="relative">
                <Input
                  id="stairTreads"
                  placeholder="Stair Treads"
                  {...form.register("vendorStairTreads")}
                  className="h-12 w-full pr-[62px] text-base bg-white"
                />
                <div className="absolute w-[50px] p-0 right-2 top-1/2 -translate-y-1/2">
                  / tread
                </div>
              </div>
              {form.formState.errors.vendorStairTreads && (
                <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                  {form.formState.errors.vendorStairTreads.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col gap-1">
              <Label className="text-base">Interior Doors</Label>
              <div className="relative">
                <Input
                  id="interiorDoors"
                  placeholder="Interior Doors"
                  {...form.register("vendorDoors")}
                  className="h-12 w-full pr-[58px] text-base bg-white"
                />
                <div className="absolute w-[46px] p-0 right-2 top-1/2 -translate-y-1/2">
                  / door
                </div>
              </div>
              {form.formState.errors.vendorDoors && (
                <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                  {form.formState.errors.vendorDoors.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2 w-full">
            <div className="flex w-full flex-col gap-1">
              <Label className="text-base">Cabinets</Label>
              <div className="relative">
                <Input
                  id="cabinets"
                  placeholder="Cabinets"
                  {...form.register("vendorCabinets")}
                  className="h-12 w-full pr-[100px] text-base bg-white"
                />
                <div className="absolute w-[87px] p-0 right-2 top-1/2 -translate-y-1/2">
                  / linear foot
                </div>
              </div>
              {form.formState.errors.vendorCabinets && (
                <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                  {form.formState.errors.vendorCabinets.message}
                </p>
              )}
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
                  id="tile"
                  placeholder="Tile"
                  {...form.register("materialTile")}
                  className="h-12 w-full pr-[25px] text-base bg-white"
                />
                <div className="absolute w-[13px] p-0 right-2 top-1/2 -translate-y-1/2">
                  %
                </div>
              </div>
              {form.formState.errors.materialTile && (
                <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                  {form.formState.errors.materialTile.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col gap-1">
              <Label className="text-base">LVP</Label>
              <div className="relative">
                <Input
                  id="lvp"
                  placeholder="LVP"
                  {...form.register("materialLVP")}
                  className="h-12 w-full pr-[25px] text-base bg-white"
                />
                <div className="absolute w-[13px] p-0 right-2 top-1/2 -translate-y-1/2">
                  %
                </div>
              </div>
              {form.formState.errors.materialLVP && (
                <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                  {form.formState.errors.materialLVP.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full gap-2 flex flex-col mt-10">
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              disabled={isloading || !isValid}
              className="bg-[#2365C8] rounded-lg h-[42px] w-[192px] text-white"
            >
              {isloading ? (
                <div className="w-16 h-16">
                  <DynamicLottie
                    options={LoadingOptions}
                    isClickToPauseDisabled={true}
                  />
                </div>
              ) : (
                <div className="w-full flex items-center justify-center text-lg">
                  Save
                </div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
