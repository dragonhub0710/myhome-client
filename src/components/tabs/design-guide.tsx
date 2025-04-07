/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useToast } from "@/src/hooks/use-toast";
import { Download, Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { jsPDF } from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import { autoTable } from "jspdf-autotable";
import Loading_Animation from "@/src/components/loading/dark_loading.json";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function DesignGuideTab() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [subcontractorGuides, setSubcontractorGuides] = useState<any[]>([]);
  const [upgradePdfs, setUpgradePdfs] = useState<any[]>([]);

  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getAllSubcontractorGuides();
    getAllRoomUpgradePdfs();
  }, []);

  const getAllRoomUpgradePdfs = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("upgrades")
        .select("id, name, pdf")
        .neq("pdf", "")
        .order("name", { ascending: true });
      if (error) throw error;

      setUpgradePdfs(data);
    } catch (err) {
      console.log(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAllSubcontractorGuides = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("design_guides")
        .select("id, name")
        .order("name", { ascending: true });
      if (error) throw error;

      setSubcontractorGuides(data);
    } catch (err) {
      console.log(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadRoomUpgradePDF = async (guide: any) => {
    try {
      setIsDownloadLoading(true);
      // Append ?download to the public URL for automatic download
      const downloadUrl = `${guide.pdf}?download`;

      // Fetch the file
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      // Create a blob from the response
      const blob = await response.blob();

      // Generate a URL for the blob
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor element to trigger download
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      const url = new URL(guide.pdf);
      let fileName = decodeURIComponent(
        url.pathname.split("/storage/v1/object/public/pdfs/")[1]
      );
      fileName = fileName.replace(/^\d{13}-/, "");
      anchor.download = `${guide.name}-${fileName}`;
      anchor.click();

      // Clean up and revoke the blob URL
      URL.revokeObjectURL(blobUrl);

      console.log("File downloaded successfully");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast({
        title: "PDF Download is Failed",
        variant: "destructive",
      });
    } finally {
      setIsDownloadLoading(false);
    }
  };

  const handleDownloadSubcontractorPDF = async (guide: any) => {
    try {
      setIsDownloadLoading(true);
      const guideArrayString = JSON.stringify([guide.id]);
      const { data: guideItems, error } = await supabase
        .from("products")
        .select(`*, categories(name), locations(name)`)
        .filter("guides", "cs", guideArrayString)
        .order("name", { ascending: true });
      if (error) throw error;

      applyPlugin(jsPDF);
      const doc = new jsPDF();

      const dataWithImages = await Promise.all(
        guideItems.map(async (item) => ({
          ...item,
          base64Image: await convertImageToBase64(item.image),
        }))
      );

      doc.setFontSize(16);
      doc.text(guide.name, 10, 10);

      doc.setFontSize(12);
      const tableColumn = [
        "No",
        "Item",
        "Special Notes",
        "Location",
        "Category",
        "Image",
      ];

      autoTable(doc, {
        startY: 20,
        head: [tableColumn],
        body: dataWithImages.map((item, index) => [
          index + 1,
          item.name,
          item.note,
          item.locations.name,
          item.categories.name,
          "", // Placeholder for image
        ]),
        didParseCell: (data) => {
          if (data.section === "body") {
            data.cell.styles.fillColor = [255, 255, 255]; // Light gray for body
          }
        },
        columnStyles: {
          5: { cellWidth: 25 }, // Fixed width for image column
        },
        didDrawCell: (data) => {
          // Only handle image column (index 5)
          if (data.column.index === 5 && data.cell.section === "body") {
            const imgData = dataWithImages[data.row.index].base64Image;
            if (!imgData) return;

            const imgWidth = 15;
            const imgHeight = 15;

            doc.addImage(
              imgData,
              "JPEG",
              data.cell.x + 2,
              data.cell.y + 2,
              imgWidth,
              imgHeight
            );
          }
        },
        willDrawCell: (data) => {
          // Enforce minimum row height for image rows
          if (data.column.index === 5 && data.cell.section === "body") {
            data.row.height = Math.max(data.row.height, 40); // 40px min height
          }
        },
      });

      doc.save(`${guide.name}.pdf`);
    } catch (error) {
      console.error("Error downloading file:", error);
      toast({
        title: "PDF Download is Failed",
        variant: "destructive",
      });
    } finally {
      setIsDownloadLoading(false);
    }
  };

  const convertImageToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="w-full px-4 flex flex-col">
      <div>
        <div className="flex space-x-4">
          <p className="text-xl font-semibold">Documents</p>
          <Download />
        </div>
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <div className="w-24 h-24">
              <DynamicLottie
                options={LoadingOptions}
                isClickToPauseDisabled={true}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="py-4 space-y-3">
              <p className="text-sm font-normal uppercase">
                Room Upgrade Design guide
              </p>
              <div>
                {upgradePdfs && upgradePdfs.length > 0 ? (
                  <div className="w-full flex flex-wrap gap-5">
                    {upgradePdfs.map((item: any, idx: number) => {
                      return (
                        <div
                          key={idx}
                          className="w-full max-w-[380px] h-[70px] justify-between items-center rounded-xl cursor-pointer hover:shadow-md flex p-5 bg-white"
                        >
                          <div className="flex gap-4">
                            <Image
                              alt="pdf"
                              src={"/svg/pdf.svg"}
                              width={40}
                              height={40}
                            />
                            <div>
                              <p className="text-base text-[#4D4D4D]">
                                {item.name}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Ellipsis />
                            </DropdownMenuTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuContent className="bg-white">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleDownloadRoomUpgradePDF(item)
                                  }
                                  className="w-full flex justify-start px-4"
                                >
                                  <Download />
                                  Download
                                  {isDownloadLoading && (
                                    <div className="w-8 h-8">
                                      <DynamicLottie
                                        options={LoadingOptions}
                                        isClickToPauseDisabled={true}
                                      />
                                    </div>
                                  )}
                                </Button>
                              </DropdownMenuContent>
                            </DropdownMenuPortal>
                          </DropdownMenu>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm italic">No data</p>
                )}
              </div>
            </div>
            <div className="py-4 space-y-3">
              <p className="text-sm font-normal uppercase">
                Subcontractor Design Guide
              </p>
              <div className="w-full flex flex-wrap gap-5">
                {subcontractorGuides &&
                  subcontractorGuides.length > 0 &&
                  subcontractorGuides.map((item: any, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className="w-full max-w-[380px] h-[70px] justify-between items-center rounded-xl cursor-pointer hover:shadow-md flex p-5 bg-white"
                      >
                        <div className="flex gap-4">
                          <Image
                            alt="pdf"
                            src={"/svg/pdf.svg"}
                            width={40}
                            height={40}
                          />
                          <div>
                            <p className="text-base text-[#4D4D4D]">
                              {item.name}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Ellipsis />
                          </DropdownMenuTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuContent className="bg-white">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleDownloadSubcontractorPDF(item)
                                }
                                className="w-full flex justify-start px-4"
                              >
                                <Download />
                                Download
                                {isDownloadLoading && (
                                  <div className="w-8 h-8">
                                    <DynamicLottie
                                      options={LoadingOptions}
                                      isClickToPauseDisabled={true}
                                    />
                                  </div>
                                )}
                              </Button>
                            </DropdownMenuContent>
                          </DropdownMenuPortal>
                        </DropdownMenu>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
