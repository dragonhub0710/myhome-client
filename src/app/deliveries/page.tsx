"use client";

import { MainSidebar } from "@/src/components/main-sidebar";

export default function Deliveries() {
  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-y-auto"></main>
    </div>
  );
}
