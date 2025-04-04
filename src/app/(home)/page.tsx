"use client";

import { MainSidebar } from "@/src/components/main-sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/projects");
  }, [router]);

  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-y-auto"></main>
    </div>
  );
}
