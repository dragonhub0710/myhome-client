import Image from "next/image";

export function RoomCard() {
  return (
    <div className="w-full h-auto flex relative space-x-4">
      <div className="relative w-[310px] h-auto">
        <Image
          alt="project"
          src="/img/room.jpg"
          // src={props.data.thumbnail}
          width={310}
          height={380}
          className="rounded-xl !w-[310px] h-[300px]"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-3">
        <p className="text-lg font-medium">Modern Kitchen</p>
        <div className="flex space-x-2">
          <div className="rounded-full bg-[#FFE0B1] py-2 px-4">Medium</div>
          <div className="rounded-full bg-[#E4FEDB] py-2 px-4">ROI: High</div>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Room</p>
          <p className="text-sm">Living Room</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Materials Needed</p>
          <p className="text-sm">Wood, trim, paint, mounting hardware</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Materials Proce</p>
          <p className="text-sm">$800</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Contractor Quote</p>
          <p className="text-sm">$2,500 - $4,000</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">All-In Price Estimate</p>
          <p className="text-sm">$3,300 - $4,800</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Estimated Time</p>
          <p className="text-sm">2-3 Days</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-sm">Description</p>
          <p className="text-sm">
            German aesthetics, in its finest and most refined form, represents a
            harmonious fusion of functionality and beauty.
          </p>
        </div>
        <div className="w-full bg-[#2365C8] cursor-pointer flex items-center justify-center h-[42px] rounded text-white">
          Add to Project
        </div>
      </div>
    </div>
  );
}
