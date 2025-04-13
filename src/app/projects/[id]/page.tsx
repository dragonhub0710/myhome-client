/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
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
import { useAtom } from "jotai";
import { projectAtom } from "@/src/atoms/projectAtom";
import { useRouter } from "next/navigation";

const tabValues = [
  "material-input",
  "material-output",
  "design-guides",
  "financials",
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
  const router = useRouter();
  const [projectData, setProjectData] = useAtom(projectAtom);
  const [currentTab, setCurrentTab] = useState(tabValues[0]);

  useEffect(() => {
    const currentUrl = window.location.href;
    const parsedUrl = new URL(currentUrl);
    const tabValue = parsedUrl.searchParams.get("tab");
    if (tabValue && tabValues.includes(tabValue)) {
      setCurrentTab(tabValue);
    }
    const pathList = parsedUrl.pathname.split("/");
    getProjectById(pathList[pathList.length - 1]);
  }, []);

  const getProjectById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id);
      if (error) throw error;
      setProjectData({ ...projectData, selectedItem: data[0] });
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
    router.push(`/projects/${projectData.selectedItem.id}?tab=${value}`);
  };

  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 h-full flex flex-col overflow-auto">
          <div className="flex items-center justify-between border-b-2 pb-5">
            <h1 className="text-3xl font-bold">
              {projectData.selectedItem && projectData.selectedItem.name}
            </h1>
          </div>
          <div className="w-full flex-1 pt-5 overflow-auto">
            <Tabs
              value={currentTab}
              onValueChange={handleChangeTab}
              className="h-full flex flex-col"
            >
              <TabsList className="mb-6 justify-start bg-transparent">
                {tabValues.map((item, idx) => {
                  return (
                    <TabsTrigger
                      key={idx}
                      value={item}
                      className={`rounded-lg px-3 py-2 font-light text-base ${
                        currentTab === item
                          ? "!text-white !bg-primary"
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
                  <TabsContent
                    key={idx}
                    value={tabValues[idx]}
                    className="flex-1 overflow-auto"
                  >
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
