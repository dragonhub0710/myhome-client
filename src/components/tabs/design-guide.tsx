/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Download } from "lucide-react";
import { PDFCard } from "../card/pdf-card";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useToast } from "@/src/hooks/use-toast";
import Loading_Animation from "@/src/components/loading/dark_loading.json";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function DesignGuideTab() {
  const { toast } = useToast();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [guideList, setGuideList] = useState<any[]>([]);
  const [guideTypeList, setGuideTypeList] = useState<any[]>([]);

  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getAllGuideTypes();
  }, []);

  const getAllGuideTypes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("design_guide_types")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;

      setGuideTypeList(data);

      const list = await Promise.all(
        data.map(async (item) => {
          const { data, error } = await supabase
            .from("design_guides")
            .select("*")
            .eq("type_id", item.id)
            .order("name", { ascending: true });
          if (error) throw error;

          return data;
        })
      );
      if (!list || list.length == 0) {
        setIsEmpty(true);
      }

      setGuideList(list);
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
    <div className="w-full px-4 flex flex-col">
      {isEmpty ? (
        <div className="w-full mt-20 flex flex-col items-center justify-center">
          <Image src="/svg/guide.svg" alt="guide" width={70} height={70} />
          <p className="my-6 text-3xl font-bold">Complete Material Input</p>
          <p className="text-[#718096] text-base max-w-[280px] text-center">
            Complete Material Input to view Design Guides.
          </p>
          <Button className="my-6 w-[200px] text-white text-base bg-[#2365C8] rounded-lg">
            Begin Material Input
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex space-x-4">
            <p className="text-xl font-semibold">Documents</p>
            <Download />
          </div>
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
            <div>
              {guideTypeList &&
                guideTypeList.length > 0 &&
                guideTypeList.map((item: any, index: number) => {
                  return (
                    <div key={index} className="py-4 space-y-3">
                      <p className="text-sm font-normal uppercase">
                        {item.name}
                      </p>
                      <div>
                        {guideList[index] && guideList[index].length > 0 ? (
                          <div className="w-full flex flex-wrap gap-5">
                            {guideList[index].map((guide: any, idx: number) => {
                              const list = [];
                              for (const type of guideTypeList) {
                                if (guide.type_id === type.id) {
                                  list.push(guide);
                                }
                              }
                              return <PDFCard key={idx} guide={guide} />;
                            })}
                          </div>
                        ) : (
                          <p className="text-sm italic">No data</p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
