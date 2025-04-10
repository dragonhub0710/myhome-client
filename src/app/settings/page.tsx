"use client";

import { useEffect, useState } from "react";
import { MainSidebar } from "@/src/components/main-sidebar";
import AssumptionTab from "@/src/components/tabs/assumption";
import ProfileTab from "@/src/components/tabs/profile";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useRouter } from "next/navigation";

const tabValues = ["profile", "assumption"];
const tabLabels = ["Profile", "Assumption Sheet"];
const tabComponents = [
  <ProfileTab key={tabValues[0]} />,
  <AssumptionTab key={tabValues[1]} />,
];

export default function HomePage() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(tabValues[0]);

  useEffect(() => {
    const currentUrl = window.location.href;
    const parsedUrl = new URL(currentUrl);
    const tabValue = parsedUrl.searchParams.get("tab");
    if (tabValue && tabValues.includes(tabValue)) {
      setCurrentTab(tabValue);
    }
  }, []);

  const handleChangeTab = (value: string) => {
    setCurrentTab(value);
    router.push(`/settings?tab=${value}`);
  };

  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 h-full">
          <div className="flex items-center justify-between mb-5 border-b-2 pb-4">
            <h1 className="text-3xl font-bold">Settings</h1>
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
