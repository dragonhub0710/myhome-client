import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import { useState } from "react";
import { RoomCard } from "./room-card";

export function ThemeCard() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <div
      onClick={handleOpenDialog}
      className="w-[184px] h-auto rounded-xl cursor-default relative space-y-2"
    >
      <div className="relative w-[184px] h-auto">
        <Image
          alt="project"
          src="/img/card.png"
          // src={props.data.thumbnail}
          width={184}
          height={254}
          className="rounded-xl"
        />
        <div className="absolute bottom-2 right-2">
          <div className="w-fit rounded-full bg-[#F1F7FB] px-2 py-1">
            $19,000
          </div>
        </div>
      </div>
      <p className="text-lg font-medium">Modern</p>
      <p>German aesthetics at its best design iteration</p>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="p-10 max-w-[730px]">
          <DialogTitle></DialogTitle>
          <RoomCard />
        </DialogContent>
      </Dialog>
    </div>
  );
}
