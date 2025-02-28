/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Download } from "lucide-react";
import { PDFCard } from "../pdf-card";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function DesignGuideTab() {
  const [isEmpty, setIsEmpty] = useState(false);
  const subContractorPDFs = [
    { title: "SubContractor Guidelines 1.pdf", size: "2.8 MB" },
    { title: "SubContractor Guidelines 2.pdf", size: "2.8 MB" },
    { title: "SubContractor Guidelines 3.pdf", size: "2.8 MB" },
    { title: "SubContractor Guidelines 4.pdf", size: "2.8 MB" },
  ];

  const mockupPDFs = [
    { title: "SubContractor Guidelines 1.pdf", size: "2.8 MB" },
    { title: "SubContractor Guidelines 2.pdf", size: "2.8 MB" },
    { title: "SubContractor Guidelines 3.pdf", size: "2.8 MB" },
    { title: "SubContractor Guidelines 4.pdf", size: "2.8 MB" },
  ];

  const localVendorDesignPDFs = [
    { title: "SubContractor Guidelines 1.pdf", size: "2.8 MB" },
  ];

  const roomUpgradeDesignPDFs = [
    { title: "SubContractor Guidelines 1.pdf", size: "2.8 MB" },
  ];

  useEffect(() => {
    if (
      subContractorPDFs.length == 0 &&
      mockupPDFs.length == 0 &&
      localVendorDesignPDFs.length == 0 &&
      roomUpgradeDesignPDFs.length == 0
    ) {
      setIsEmpty(true);
    }
  }, []);

  return (
    <div className="w-full px-4 flex flex-col">
      {isEmpty ? (
        <div className="w-full mt-20 flex flex-col items-center justify-center">
          <Image src="/svg/guide.svg" alt="guide" width={70} height={70} />
          <p className="my-6 text-3xl font-bold">Complete Material Input</p>
          <p className="text-[#718096] text-base max-w-[280px] text-center">
            Complete Material Input to view Design Guides.
          </p>
          <Button className="my-6 w-[200px] text-white text-base bg-[#2365C8] rounded-lg">
            Begin Material Input
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex space-x-4">
            <p className="text-xl font-semibold">Documents</p>
            <Download />
          </div>
          {subContractorPDFs && subContractorPDFs.length > 0 && (
            <div className="py-4 space-y-3">
              <p className="text-sm font-normal uppercase">
                Subcontractor Design Guides
              </p>
              <div className="w-full flex flex-wrap gap-5">
                {subContractorPDFs.map((item, idx) => {
                  return (
                    <PDFCard key={idx} title={item.title} size={item.size} />
                  );
                })}
              </div>
            </div>
          )}

          {mockupPDFs && mockupPDFs.length > 0 && (
            <div className="py-4 space-y-3">
              <p className="text-sm font-normal uppercase">2D Mockups</p>
              <div className="w-full flex flex-wrap gap-5">
                {mockupPDFs.map((item, idx) => {
                  return (
                    <PDFCard key={idx} title={item.title} size={item.size} />
                  );
                })}
              </div>
            </div>
          )}

          {localVendorDesignPDFs && localVendorDesignPDFs.length > 0 && (
            <div className="py-4 space-y-3">
              <p className="text-sm font-normal uppercase">
                Local Vendor Design Guides
              </p>
              <div className="w-full flex flex-wrap gap-5">
                {localVendorDesignPDFs.map((item, idx) => {
                  return (
                    <PDFCard key={idx} title={item.title} size={item.size} />
                  );
                })}
              </div>
            </div>
          )}

          {roomUpgradeDesignPDFs && roomUpgradeDesignPDFs.length > 0 && (
            <div className="py-4 space-y-3">
              <p className="text-sm font-normal uppercase">
                Room Upgrade Design Guides
              </p>
              <div className="w-full flex flex-wrap gap-5">
                {roomUpgradeDesignPDFs.map((item, idx) => {
                  return (
                    <PDFCard key={idx} title={item.title} size={item.size} />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
