/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  HIGH_LEVEL_LABEL,
  HIGH_LEVEL_VALUE,
  LOW_LEVEL_LABEL,
  LOW_LEVEL_VALUE,
  MEDIUM_LEVEL_LABEL,
  MEDIUM_LEVEL_VALUE,
} from "@/src/constants/constants";
import Image from "next/image";

export function RoomCard({ data }: { data: any }) {
  return (
    <div className="w-full h-auto flex relative space-x-4">
      <div className="relative w-[310px] h-auto rounded-xl">
        <Image
          alt="upgrade"
          src={data.image ? data.image : "/img/room.jpg"}
          width={310}
          height={310}
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-3">
        <p className="text-lg font-medium">{data.name}</p>
        <div className="flex space-x-2">
          <div
            className={`flex items-center text-sm justify-center font-semibold px-6 py-2 rounded-full ${
              data.difficulty == HIGH_LEVEL_VALUE
                ? "bg-[#E4FEDB]"
                : data.difficulty == MEDIUM_LEVEL_VALUE
                ? "bg-[#FFE0B1]"
                : data.difficulty == LOW_LEVEL_VALUE && "bg-[#db5c0269]"
            }`}
          >
            {data.difficulty == HIGH_LEVEL_VALUE
              ? HIGH_LEVEL_LABEL
              : data.difficulty == MEDIUM_LEVEL_VALUE
              ? MEDIUM_LEVEL_LABEL
              : data.difficulty == LOW_LEVEL_VALUE && LOW_LEVEL_LABEL}
          </div>
          <div
            className={`flex items-center text-sm justify-center font-semibold px-6 py-2 rounded-full ${
              data.roi == HIGH_LEVEL_VALUE
                ? "bg-[#E4FEDB]"
                : data.roi == MEDIUM_LEVEL_VALUE
                ? "bg-[#FFE0B1]"
                : data.roi == LOW_LEVEL_VALUE && "bg-[#db5c0269]"
            }`}
          >
            ROI:&nbsp;
            {data.roi == HIGH_LEVEL_VALUE
              ? HIGH_LEVEL_LABEL
              : data.roi == MEDIUM_LEVEL_VALUE
              ? MEDIUM_LEVEL_LABEL
              : data.roi == LOW_LEVEL_VALUE && LOW_LEVEL_LABEL}
          </div>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Room</p>
          <p className="text-sm">{data.locations.name}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Materials Needed</p>
          <p className="text-sm">{data.productsLabel}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Materials Proce</p>
          <p className="text-sm">${data.material_price}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Contractor Quote</p>
          <p className="text-sm">${data.contractor_quote}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">All-In Price Estimate</p>
          <p className="text-sm">${data.all_in_price}</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Estimated Time</p>
          <p className="text-sm">{data.estimated_time} Days</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Description</p>
          <p className="text-sm">{data.description}</p>
        </div>
      </div>
    </div>
  );
}
