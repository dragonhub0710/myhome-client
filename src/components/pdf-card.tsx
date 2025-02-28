import Image from "next/image";
import { Download, Ellipsis, Link, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";

type GuidePDFProps = {
  title: string;
  size: string;
};

export function PDFCard({ title, size }: GuidePDFProps) {
  return (
    <div className="w-full max-w-[380px] h-[70px] justify-between items-center rounded-xl cursor-pointer hover:shadow-md flex p-5 bg-white">
      <div className="flex gap-4">
        <Image alt="pdf" src={"/svg/pdf.svg"} width={40} height={40} />
        <div>
          <p className="text-base text-[#4D4D4D]">{title}</p>
          <p className="text-base text-[#2365C8]">{size}</p>
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
              className="w-full flex justify-start px-4"
            >
              <Pencil />
              Rename
            </Button>
            <DropdownMenuSeparator className="m-[5px] h-px bg-[#0000001A]" />
            <Button
              variant="ghost"
              size="icon"
              className="w-full flex justify-start px-4"
            >
              <Download />
              Download
            </Button>
            <DropdownMenuSeparator className="m-[5px] h-px bg-[#0000001A]" />
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
            </Button>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
}
