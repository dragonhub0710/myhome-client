"use client";

import { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { ChevronDown, EllipsisVerticalIcon, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";

const sheetTypeLabels = ["Phase 1", "Phase 2"];
const addTypeLabels = ["Amazon Cart", "Lowes Cart", "Home Depot"];
const addTypeIcons = ["/img/amazon.png", "/img/lowe.png", "/img/homedepot.png"];
const tableData = [
  {
    category: "Category",
    itemName: "Door Knob Oak Wood - Brown Metalic",
    image: "",
    location: ["Rooms", "Doors"],
    status: false,
    needed_date: "February 15, 2025",
    orderby_date: "February 3, 2025",
    quantity: 4,
    price: 1200,
    link: "",
  },
];

export default function MaterialOutputTab() {
  const [sheetTypeLabel, setSheetTypeLabel] = useState("Phase 1");
  const [openSheetMenu, setOpenSheetMenu] = useState(false);
  const [addTypeLabel, setAddTypeLabel] = useState("Add to");
  const [openAddMenu, setOpenAddMenu] = useState(false);

  const handleOpenSheetMenu = () => {
    setOpenSheetMenu((open) => !open);
  };

  const handleSheetLabel = (label: string) => {
    setSheetTypeLabel(label);
    setOpenSheetMenu((open) => !open);
  };

  const handleOpenAddMenu = () => {
    setOpenAddMenu((open) => !open);
  };

  const handleAddLabel = (label: string) => {
    setAddTypeLabel(label);
    setOpenAddMenu((open) => !open);
  };

  return (
    <div className="w-full px-4">
      {tableData.length == 0 ? (
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
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between">
            <DropdownMenu
              open={openSheetMenu}
              onOpenChange={handleOpenSheetMenu}
            >
              <DropdownMenuTrigger>
                <div className="w-28 flex items-center bg-white justify-between border-[1px] rounded-lg px-3 py-2 hover:shadow">
                  <p className="text-sm">{sheetTypeLabel}</p>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openSheetMenu ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent className="bg-white">
                  {sheetTypeLabels.map((item, idx) => {
                    return (
                      <Button
                        variant="ghost"
                        key={idx}
                        onClick={() => handleSheetLabel(item)}
                        className="w-full flex justify-between px-4"
                      >
                        {item}
                      </Button>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
            <div className="space-x-4 flex">
              <Button className="rounded-lg w-10 h-10 bg-[#2365C81A] p-0 flex items-center justify-center">
                <EllipsisVerticalIcon className="w-auto h-8" />
              </Button>
              <Button className="rounded-lg bg-[#2365C81A] flex items-center justify-center">
                Download Pro Sheet
              </Button>
              <DropdownMenu open={openAddMenu} onOpenChange={handleOpenAddMenu}>
                <DropdownMenuTrigger>
                  <div className="w-28 flex items-center bg-[#2365C8] text-white justify-between rounded-lg px-3 py-2 hover:shadow">
                    <p className="text-sm">{addTypeLabel}</p>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openAddMenu ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent className="bg-white">
                    {addTypeLabels.map((item, idx) => {
                      return (
                        <Button
                          variant="ghost"
                          key={idx}
                          onClick={() => handleAddLabel(item)}
                          className="w-full flex justify-start px-4"
                        >
                          <Image
                            alt="addserver"
                            src={addTypeIcons[idx]}
                            width={36}
                            height={12}
                          />
                          {item}
                        </Button>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
            </div>
          </div>
          <Table className="mt-4">
            <TableHeader className="bg-[#EAEFF5]">
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>
                  <p>Delivery Date</p>
                  <p>Needed / Order By</p>
                </TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Item Link</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {tableData.map((item, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        {item.category}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 flex items-center justify-center rounded bg-[#F6F7F8]">
                          <Image
                            alt="product"
                            src={"/svg/product.svg"}
                            width={18}
                            height={12}
                          />
                        </div>
                        <p className="text-sm w-[180px]">{item.itemName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.location &&
                        item.location.map((item, idx) => {
                          return (
                            <div key={idx} className="flex gap-2">
                              <Checkbox
                                className="bg-[green] disabled:!opacity-100 disabled:!cursor-default text-white rounded-full w-5 h-5"
                                checked={true}
                                disabled
                              />
                              <p className="text-sm">{item}</p>
                            </div>
                          );
                        })}
                    </TableCell>
                    <TableCell>
                      <p
                        className={
                          item.status ? "text-[#2AA200]" : "text-[#DB5D02]"
                        }
                      >
                        {item.status ? "● COMPLETED" : "● IN PROGRESS"}
                      </p>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <p>{item.needed_date}</p>
                      <p>{item.orderby_date}</p>
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <p className="cursor-pointer underline text-[#2365C8]">
                          Website Link
                        </p>
                        <Trash2 className="text-[#EA2D38] cursor-pointer" />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
