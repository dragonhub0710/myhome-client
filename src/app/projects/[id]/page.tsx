/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import { MainSidebar } from "@/src/components/main-sidebar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useToast } from "@/src/hooks/use-toast";
import MaterialInputTab from "@/src/components/tabs/material-input";
import MaterialOutputTab from "@/src/components/tabs/material-output";
import DesignGuideTab from "@/src/components/tabs/design-guide";
import FinancialTab from "@/src/components/tabs/financial";

const tabValues = [
  "materialInput",
  "materialOutput",
  "designGuides",
  "financiala",
];
const tabLabels = [
  "Material Input",
  "Material Output",
  "Design Guides",
  "Financials",
];
const tabComponents = [
  <MaterialInputTab key={tabValues[0]} />,
  <MaterialOutputTab key={tabValues[1]} />,
  <DesignGuideTab key={tabValues[2]} />,
  <FinancialTab key={tabValues[3]} />,
];

export default function ProjectDetailPage() {
  const { toast } = useToast();
  const pathName = usePathname();
  const [project, setProject] = useState<any | null>(null);
  const [currentTab, setCurrentTab] = useState(tabValues[0]);

  useEffect(() => {
    const pathList = pathName.split("/");
    getProjectById(pathList[2]);
  }, []);

  const getProjectById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id);
      if (error) throw error;
      setProject(data[0]);
    } catch (error) {
      toast({
        title: "A network error occurred",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleChangeTab = (value: string) => {
    setCurrentTab(value);
  };

  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-5 border-b-2 pb-4">
            <h1 className="text-3xl font-bold">{project && project.name}</h1>
          </div>
          <div className="w-full">
            <Tabs value={currentTab} onValueChange={handleChangeTab}>
              <TabsList className="mb-6">
                {tabValues.map((item, idx) => {
                  return (
                    <TabsTrigger
                      key={idx}
                      value={item}
                      className={`rounded-lg px-3 py-2 font-light text-base ${
                        currentTab === item
                          ? "!text-white !bg-[#2365C8]"
                          : "!text-[black] !bg-transparent"
                      }`}
                    >
                      {tabLabels[idx]}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {tabComponents.map((item, idx) => {
                return (
                  <TabsContent key={idx} value={tabValues[idx]}>
                    {item}
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
