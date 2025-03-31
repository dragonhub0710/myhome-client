"use client";

import { useEffect, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { supabase } from "@/src/lib/supabase";
import {
  LOCAL_CABINETS,
  LOCAL_INTERIOR_DOORS,
  LOCAL_LVP,
  LOCAL_STAIR_TREADS,
  LOCAL_WINDOWS,
  OVERAGE_LVP,
  OVERAGE_TILE,
} from "@/src/constants/constants";

export default function AssumptionTab() {
  const [localWindows, setLocalWindows] = useState(0);
  const [localLVP, setLocalLVP] = useState(0);
  const [localInteriorDoors, setLocalInteriorDoors] = useState(0);
  const [localStairTreads, setLocalStairTreads] = useState(0);
  const [localCabinets, setLocalCabinets] = useState(0);
  const [overageTile, setOverageTile] = useState(0);
  const [overageLVP, setOverageLVP] = useState(0);

  useEffect(() => {
    getAllAssumptions();
  }, []);

  const getAllAssumptions = async () => {
    const { data, error } = await supabase.from("assumptions").select("*");
    if (error) throw error;

    if (data && data.length > 0) {
      for (const item of data) {
        switch (item.name) {
          case LOCAL_WINDOWS:
            setLocalWindows(item.value);
            break;
          case LOCAL_LVP:
            setLocalLVP(item.value);
            break;
          case LOCAL_STAIR_TREADS:
            setLocalStairTreads(0);
            break;
          case LOCAL_INTERIOR_DOORS:
            setLocalInteriorDoors(0);
            break;
          case LOCAL_CABINETS:
            setLocalCabinets(0);
            break;
          case OVERAGE_TILE:
            setOverageTile(0);
            break;
          case OVERAGE_LVP:
            setOverageLVP(0);
            break;
        }
      }
    }
  };

  return (
    <div className="w-full bg-white max-w-[600px] space-y-4 p-10 rounded-xl flex flex-col">
      <p className="text-xl font-semibold mx-1">Local Vendor Pricing</p>
      <p className="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div className="space-y-3">
        <div className="flex space-x-2 w-full">
          <div className="flex w-full flex-col gap-1">
            <Label className="text-base">Windows</Label>
            <div className="relative">
              <Input
                disabled
                id="localWindows"
                placeholder="Windows"
                value={localWindows}
                className="h-12 w-full pr-[82px] text-base bg-white"
              />
              <div className="absolute w-[70px] p-0 right-2 top-1/2 -translate-y-1/2">
                / window
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <Label className="text-base">LVP</Label>
            <div className="relative">
              <Input
                disabled
                id="localLVP"
                placeholder="LVP"
                value={localLVP}
                className="h-12 w-full pr-[52px] text-base bg-white"
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
                disabled
                id="localStairTreads"
                placeholder="Stair Treads"
                value={localStairTreads}
                className="h-12 w-full pr-[62px] text-base bg-white"
              />
              <div className="absolute w-[50px] p-0 right-2 top-1/2 -translate-y-1/2">
                / tread
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <Label className="text-base">Interior Doors</Label>
            <div className="relative">
              <Input
                disabled
                id="interiorDoors"
                placeholder="Interior Doors"
                value={localInteriorDoors}
                className="h-12 w-full pr-[58px] text-base bg-white"
              />
              <div className="absolute w-[46px] p-0 right-2 top-1/2 -translate-y-1/2">
                / door
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 w-full">
          <div className="flex w-full flex-col gap-1">
            <Label className="text-base">Cabinets</Label>
            <div className="relative">
              <Input
                disabled
                id="localCabinets"
                placeholder="Cabinets"
                value={localCabinets}
                className="h-12 w-full pr-[100px] text-base bg-white"
              />
              <div className="absolute w-[87px] p-0 right-2 top-1/2 -translate-y-1/2">
                / linear foot
              </div>
            </div>
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
                disabled
                id="overageTile"
                placeholder="Tile"
                value={overageTile}
                className="h-12 w-full pr-[25px] text-base bg-white"
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
                disabled
                id="overageLVP"
                placeholder="LVP"
                value={overageLVP}
                className="h-12 w-full pr-[25px] text-base bg-white"
              />
              <div className="absolute w-[13px] p-0 right-2 top-1/2 -translate-y-1/2">
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
