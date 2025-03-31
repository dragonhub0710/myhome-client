/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Download, Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { supabase } from "@/src/lib/supabase";
import { jsPDF } from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import { autoTable } from "jspdf-autotable";

type GuidePDFProps = {
  guide: any;
};

export function PDFCard({ guide }: GuidePDFProps) {
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

  const handleDownloadPDF = async () => {
    try {
      const { data: guideItems, error } = await supabase
        .from("design_guide_items")
        .select(
          `
            *, locations(name), categories(name), design_guides(name), design_guide_types(name)
          `
        )
        .eq("guide_id", guide.id);
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
        "Group",
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
          item.group,
          "",
        ]),
        didParseCell: (data) => {
          if (data.section === "body") {
            data.cell.styles.fillColor = [255, 255, 255]; // Light gray for body
          }
        },
        columnStyles: {
          6: { cellWidth: 25 }, // Fixed width for image column
        },
        didDrawCell: (data) => {
          // Only handle image column (index 6)
          if (data.column.index === 6 && data.cell.section === "body") {
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
          if (data.column.index === 6 && data.cell.section === "body") {
            data.row.height = Math.max(data.row.height, 40); // 40px min height
          }
        },
      });

      doc.save(`${Date.now()}.pdf`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-[380px] h-[70px] justify-between items-center rounded-xl cursor-pointer hover:shadow-md flex p-5 bg-white">
      <div className="flex gap-4">
        <Image alt="pdf" src={"/svg/pdf.svg"} width={40} height={40} />
        <div>
          <p className="text-base text-[#4D4D4D]">{guide.name}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className="bg-white">
            {/* <Button
              variant="ghost"
              size="icon"
              className="w-full flex justify-start px-4"
            >
              <Pencil />
              Rename
            </Button>
            <DropdownMenuSeparator className="m-[5px] h-px bg-[#0000001A]" /> */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownloadPDF}
              className="w-full flex justify-start px-4"
            >
              <Download />
              Download
            </Button>
            {/* <DropdownMenuSeparator className="m-[5px] h-px bg-[#0000001A]" />
            <Button
              variant="ghost"
              size="icon"
              className="w-full flex justify-start px-4"
            >
              <Link />
              Share a link
            </Button>
            <DropdownMenuSeparator className="m-[5px] h-px bg-[#0000001A]" />
            <Button
              variant="ghost"
              size="icon"
              className="w-full flex justify-start px-4"
            >
              <Trash2 className="text-[#EA2D38]" />
              Delete
            </Button> */}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
}
