"use client";

import { MainSidebar } from "@/src/components/main-sidebar";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
        </div>
      </main>
    </div>
  );
}
