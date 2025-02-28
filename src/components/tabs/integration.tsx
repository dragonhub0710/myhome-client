"use client";

import Image from "next/image";
import { Button } from "@/src/components/ui/button";

export default function IntegrationTab() {
  return (
    <div className="w-full bg-white max-w-[600px] p-10 space-y-8 rounded-xl flex flex-col">
      <p className="text-xl font-semibold mx-1">Available Integrations</p>
      <div className="w-full rounded-xl p-5 h-[128px] border-[1px]">
        <div className="w-full flex justify-between">
          <Image
            alt="amazon"
            src="/img/amazon.png"
            width={86}
            height={26}
            className="!h-[26px]"
          />
          <Button className="text-white text-base bg-[#2365C8] w-[113px] h-10">
            Connect
          </Button>
        </div>
        <p className="w-full text-xl font-medium">Integration with Amazon</p>
        <p className="w-full text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="w-full rounded-xl p-5 h-[128px] border-[1px]">
        <div className="w-full flex justify-between">
          <Image
            alt="amazon"
            src="/img/lowe.png"
            width={86}
            height={26}
            className="!h-[26px]"
          />
          <Button className="text-white text-base bg-[#2365C8] w-[113px] h-10">
            Connect
          </Button>
        </div>
        <p className="w-full text-xl font-medium">Integration with Lowes</p>
        <p className="w-full text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="w-full rounded-xl p-5 h-[128px] border-[1px]">
        <div className="w-full flex justify-between">
          <Image
            alt="amazon"
            src="/img/homedepot.png"
            width={33}
            height={32}
            className="!h-[32px]"
          />
          <Button className="text-white text-base bg-[#2365C8] w-[113px] h-10">
            Connect
          </Button>
        </div>
        <p className="w-full text-xl font-medium">
          Integration with Home Depot
        </p>
        <p className="w-full text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
}
