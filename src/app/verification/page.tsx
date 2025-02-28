/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";

export default function VerificationPage() {
  return (
    <div className="min-h-screen flex flex-col p-4 lg:p-6">
      <div className="w-full p-10 pb-0">
        <Image alt="Flipit" src="/svg/logo.svg" width={72} height={20} />
      </div>
      <div className="relative w-full flex flex-1 items-center justify-center">
        <div className="w-full max-w-md rounded-2xl !bg-[white] p-8 space-y-8"></div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="w-full px-10 py-6 items-center flex justify-between">
            <p className="text-base">Privacy Policy</p>
            <p className="text-base">Copyright 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
