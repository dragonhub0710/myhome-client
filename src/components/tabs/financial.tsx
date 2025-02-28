"use client";
import Image from "next/image";
import { Button } from "../ui/button";

export default function DesignGuideTab() {
  return (
    <div className="w-full px-4 flex flex-col">
      <div className="w-full mt-20 flex flex-col items-center justify-center">
        <Image src="/svg/clock.svg" alt="clock" width={70} height={70} />
        <p className="my-6 text-3xl font-bold">Financials Coming Soon</p>
        <p className="text-[#718096] text-base max-w-[280px] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
        <Button className="my-6 w-[200px] text-white text-base bg-[#2365C8] rounded-lg">
          Remind me
        </Button>
      </div>
    </div>
  );
}
