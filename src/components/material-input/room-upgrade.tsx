/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { RoomCard } from "@/src/components/card/room-card";
import { authAtom } from "@/src/atoms/authAtom";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

interface RoomUpgradeProps {
  image: string;
  name: string;
  description: string;
  all_in_price: number;
  locations: { name: string };
}

type MaterialInputProps = {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
};

type RoomUpgrade = {
  id: string;
  image: string;
  name?: string;
  products?: any;
  locations?: {
    name: string;
  };
};

export function RoomUpgrade({
  currentStep,
  setCurrentStep,
}: MaterialInputProps) {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const auth = useAtomValue(authAtom);
  const [projectData, setProjectData] = useAtom(projectAtom);
  const [roomUpgradeData, setRoomUpgradeData] = useAtom(roomUpgradeAtom);
  const [addedUpgrades, setAddedUpgrades] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [prevUpgradeIndex, setPrevUpgradeIndex] = useState(0);
  const [selectedUpgradeIds, setSelectedUpgradeIds] = useState<string[]>([]);
  const [newUpgradeIndex, setNewUpgradeIndex] = useState(0);
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
      roomUpgradeData.list.map((item: { id: string }, idx: number) => {
        if (item.id === projectData.selectedItem.room_upgrade) {
          setPrevUpgradeIndex(idx);
          setNewUpgradeIndex(idx);
        }
      });
    }
  }, [roomUpgradeData, projectData]);

  useEffect(() => {
    const fetchAddedUpgrades = async () => {
      if (!projectData.selectedItem?.id) return;

      const { data, error } = await supabase
        .from("project_upgrades")
        .select("upgrade_id")
        .eq("project_id", projectData.selectedItem.id);

      if (error) {
        console.error("❌ Failed to fetch added upgrades:", error);
      } else {
        setAddedUpgrades(data.map((item) => item.upgrade_id));
      }
    };

    fetchAddedUpgrades();
  }, [projectData.selectedItem?.id]);


  const handleGotoPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const fetchAddedUpgrades = async () => {
    if (!projectData.selectedItem?.id) return;

    const { data, error } = await supabase
      .from("project_upgrades")
      .select("upgrade_id")
      .eq("project_id", projectData.selectedItem.id);

    if (error) {
      console.error("❌ Failed to fetch upgrades:", error);
    } else {
      setAddedUpgrades(data.map((item) => item.upgrade_id));
    }
  };

  const removeUpgradeAndItsProducts = async (upgradeId: string) => {
    try {
      console.log("🔧 Removing upgrade:", upgradeId);

      // 1. Get upgrade data from correct table: upgrades
      const { data: upgradeData, error: upgradeError } = await supabase
        .from("upgrades") // ✅ THIS is the correct table
        .select("products")
        .eq("id", upgradeId)
        .single();

      if (upgradeError) {
        console.error("Upgrade fetch error:", upgradeError.message);
        throw upgradeError;
      }

      console.log("📦 Upgrade products:", upgradeData.products);

      // 2. Parse product IDs
      let productIds: string[] = [];
      try {
        productIds = Array.isArray(upgradeData.products)
          ? upgradeData.products
          : JSON.parse(upgradeData.products || "[]");
      } catch (e) {
        console.error("Failed to parse upgrade products:", e);
      }

      // 3. Remove the upgrade from the project
      const { error: deleteUpgradeError } = await supabase
        .from("project_upgrades")
        .delete()
        .eq("project_id", projectData.selectedItem.id)
        .eq("upgrade_id", upgradeId);

      if (deleteUpgradeError) throw deleteUpgradeError;
      console.log("✅ Removed upgrade link from project.");

      // 4. Remove associated products
      if (productIds.length > 0) {
        const { error: deleteProductsError } = await supabase
          .from("project_products")
          .delete()
          .eq("project_id", projectData.selectedItem.id)
          .in("product_id", productIds);

        if (deleteProductsError) throw deleteProductsError;
        console.log("✅ Removed upgrade's products from project:", productIds);
        fetchAddedUpgrades();
      }

      toast({ title: "Upgrade and its products removed." });
    } catch (err: any) {
      console.error("❌ Error removing upgrade and its products:", err?.message || err);
      toast({
        title: "Error removing upgrade.",
        variant: "destructive",
      });
    }
  };


const handleSaveChanges = async () => {
  if (!roomUpgradeData.list || roomUpgradeData.list.length === 0) return;
  try {
    setIsLoading(true);

    const selectedRoomUpgrade = roomUpgradeData.list[newUpgradeIndex];

    // ✅ Parse product IDs from the upgrade
    let upgradeProductIds: string[] = [];
    try {
      upgradeProductIds = Array.isArray(selectedRoomUpgrade.products)
        ? selectedRoomUpgrade.products
        : JSON.parse(selectedRoomUpgrade.products || "[]");
    } catch (e) {
      console.error("Error parsing product IDs from upgrade:", e);
      upgradeProductIds = [];
    }

    // ✅ Fetch full product records from Supabase
    if (upgradeProductIds.length > 0) {
      console.log("Upgrade Product IDs:", upgradeProductIds);

      const { data: fullProducts, error: productFetchError } = await supabase
        .from("products")
        .select("id, themes")
        .in("id", upgradeProductIds);

      if (productFetchError) throw productFetchError;

      const currentThemeId = projectData.selectedItem.design_theme || null;

      const { data: existingProjectProducts, error: existingFetchError } = await supabase
        .from("project_products")
        .select("product_id, quantity")
        .eq("project_id", projectData.selectedItem.id);

      if (existingFetchError) throw existingFetchError;

      const existingMap = new Map(
        (existingProjectProducts || []).map((p) => [p.product_id, p.quantity])
      );

      const productInserts: {
        product_id: string;
        quantity: number;
        phase: string;
        status: string;
        project_id: string;
      }[] = [];

      fullProducts.forEach((p: any) => {
        const productThemes: string[] = p.themes || [];

        const isThemeCompatible =
          !currentThemeId ||
          productThemes.length === 0 ||
          productThemes.includes(currentThemeId);

        if (!existingMap.has(p.id) && isThemeCompatible) {
          productInserts.push({
            product_id: p.id,
            quantity: 1,
            phase: "1",
            status: "incomplete",
            project_id: projectData.selectedItem.id,
          });
        } else if (!isThemeCompatible) {
          console.log(`🚫 Skipping product ${p.id} due to theme mismatch.`);
        }
      });

      if (productInserts.length > 0) {
        const { error: insertProductsError } = await supabase
          .from("project_products")
          .insert(productInserts);
        if (insertProductsError) throw insertProductsError;
      }
    }

    // ✅ Prevent duplicate upgrade insertion
    const { data: existingUpgrades } = await supabase
      .from("project_upgrades")
      .select("upgrade_id")
      .eq("project_id", projectData.selectedItem.id);

    const alreadyAdded = existingUpgrades?.some(
      (e: any) => e.upgrade_id === selectedRoomUpgrade.id
    );

    if (alreadyAdded) {
      toast({ title: "This upgrade is already added to the project." });
    } else {
      const { error: insertError } = await supabase
        .from("project_upgrades")
        .insert([
          {
            project_id: projectData.selectedItem.id,
            upgrade_id: selectedRoomUpgrade.id,
          },
        ]);
      if (insertError) throw insertError;
    }

    // ✅ Re-fetch upgrades after insert
    const { data: upgradesInProject, error: fetchError } = await supabase
      .from("project_upgrades")
      .select("upgrade_id")
      .eq("project_id", projectData.selectedItem.id);

    if (fetchError) {
      console.error("❌ Fetch error:", fetchError);
    } else {
      setAddedUpgrades(upgradesInProject.map((u) => u.upgrade_id));
    }

    // ✅ Refresh project and room upgrade data
    const { data: selected } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectData.selectedItem.id);

    const { data: projects } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", auth.user?.id);

    setProjectData({
      ...projectData,
      list: projects,
      selectedItem: selected?.[0],
    });

    setRoomUpgradeData({
      ...roomUpgradeData,
      selectedItem: selectedRoomUpgrade,
    });

    setOpen(false);
  } catch (err: any) {
    console.error("Error saving:", err);
    toast({
      title: "Error saving.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};



  const handleSelectRoomUpgrade = async (index: number) => {
    setNewUpgradeIndex(index);
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
      selectedItem.productsLabel = list.join(", ");
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative px-10 py-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Room Upgrades</h1>
            <p className="text-sm text-muted-foreground">STEP 3/3</p>
          </div>
        </div>

        <div className="w-full relative space-y-2">
          <div className="flex gap-5 flex-wrap">
            {roomUpgradeData.list &&
              roomUpgradeData.list.length > 0 &&
              roomUpgradeData.list.map(
                (item: RoomUpgradeProps, idx: number) => {
                  const isPrevUpgrade = prevUpgradeIndex === idx;
                  const isSelected = newUpgradeIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`w-[190px] h-auto cursor-default relative space-y-2`}
                      onClick={() => handleSelectRoomUpgrade(idx)}
                    >
                      <div
                        className={`relative block w-[190px] h-[254px] overflow-hidden rounded-xl hover:border-primary  ${
                          isSelected
                            ? "border-green-500 border-4"
                            : isPrevUpgrade
                            ? "border-primary border-2"
                            : "border-transparent"
                        }`}
                      >
                        <Image
                          alt="theme"
                          src={item.image ? item.image : "/img/card.png"}
                          fill
                          className="object-cover h-auto w-auto"
                        />
                        <div className="absolute bottom-2 right-2">
                          <div className="w-fit rounded-full bg-[#F1F7FB] px-2 py-1">
                            ${item.all_in_price || 0}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm opacity-60">
                        {item.locations?.name}
                      </p>
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  );
                }
              )}
          </div>

         <div className="mt-6 border-t pt-4">
           <h2 className="text-lg font-semibold mb-2">Currently Added Room Upgrades:</h2>
           {addedUpgrades.length === 0 ? (
             <p className="text-sm italic text-muted-foreground">No room upgrades added yet.</p>
           ) : (
             <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
               {roomUpgradeData.list
                 .filter((upgrade: RoomUpgrade) => addedUpgrades.includes(upgrade.id))
                   .map((upgrade: RoomUpgrade, idx: number) => (
                   <li key={idx} className="flex justify-between items-center pr-2">
                     <div>
                       <span className="text-blue-600 font-medium">{upgrade.name}</span>
                       {upgrade.locations?.name && (
                         <> — <span className="italic text-gray-500">{upgrade.locations.name}</span></>
                       )}
                     </div>
                     <Button
                       variant="ghost"
                       className="text-red-600 text-xs hover:bg-red-50"
                       onClick={() => removeUpgradeAndItsProducts(upgrade.id)}
                     >
                       Remove
                     </Button>
                   </li>
                 ))}
             </ul>
           )}
         </div>


        </div>
        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleGotoPrevStep}
            className="bg-primary text-white hover:bg-blue-700"
          >
            Previous Step
          </Button>
          <Button disabled className="bg-primary text-white hover:bg-blue-700">
            Next Step
          </Button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-10 max-w-[730px] bg-white">
          <DialogTitle></DialogTitle>
          <RoomCard data={roomUpgradeData.list[newUpgradeIndex]} />
          <div className="w-full flex justify-end">
            <div className="w-[310px]"></div>
            <Button
              onClick={handleSaveChanges}
              className="w-full flex-1 ml-4 bg-primary cursor-pointer flex items-center justify-center h-[42px] rounded-xl text-white"
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
