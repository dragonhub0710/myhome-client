/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { supabase } from "@/src/lib/supabase";
import { useToast } from "@/src/hooks/use-toast";
import { EllipsisVerticalIcon, Store, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  PHASE_1,
  PHASE_2,
  STATUS_ORDERED_LABEL,
  STATUS_INCOMPLETE_LABEL,
  STATUS_READY_VALUE,
  STATUS_INCOMPLETE_VALUE,
  STATUS_ORDERED_VALUE,
  STATUS_READY_LABEL,
} from "@/src/constants/constants";
import Loading_Animation from "@/src/components/loading/dark_loading.json";
const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function MaterialOutputTab() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState(PHASE_1);
  const [website, setWebsite] = useState("");
  const [openMovePhaseMenu, setOpenMovePhaseMenu] = useState(false);
  const [productList, setProductList] = useState<any[]>([]);
  const [websiteList, setWebsiteList] = useState<any[]>([]);
  const [sortField, setSortField] = useState("product_name");
  const [sortDirection, setSortDirection] = useState(true);
  const [checkboxValues, setCheckboxValues] = useState<boolean[]>([]);
  const [moveDisabled, setMoveDisabled] = useState(true);
  const [dropdownOpenStates, setDropdownOpenStates] = useState<{
    [key: string]: boolean;
  }>({});
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    getAllWebsites();
  }, []);

  useEffect(() => {
    getAllProjectProducts();
  }, [phase, sortField, sortDirection]);

  const toggleDropdown = (id: string) => {
    setDropdownOpenStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const getAllProjectProducts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.rpc(
        "get_project_products_by_phase",
        { phase, sort: sortField, direction: sortDirection ? "ASC" : "DESC" }
      );
      if (error) throw error;
      if (data) {
        setProductList(data);
        setCheckboxValues(new Array(data.length).fill(false));
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAllWebsites = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("websites")
        .select(`*`)
        .order("name", { ascending: true });
      if (error) throw error;
      if (data) {
        setWebsiteList(data);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovePhase = () => {
    try {
      setIsLoading(true);
      checkboxValues.map(async (item, index) => {
        if (item) {
          const { data, error } = await supabase
            .from("project_products")
            .update({
              phase:
                productList[index].product_phase === PHASE_1
                  ? PHASE_2
                  : PHASE_1,
            })
            .eq("product_id", productList[index].product_id);
          if (error) throw error;
        }
      });
      getAllProjectProducts();
      setOpenMovePhaseMenu(false);
      setMoveDisabled(true);
      setCheckboxValues(new Array(productList.length).fill(false));
    } catch (err) {
      console.error(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetSortField = (field: string) => {
    setSortField(field);
    setSortDirection((prev) => !prev);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedValues = [...checkboxValues];
    updatedValues[index] = !updatedValues[index];
    setCheckboxValues(updatedValues);
    setMoveDisabled(updatedValues.every((value) => !value));
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("project_products")
        .delete()
        .eq("id", id);
      if (error) throw error;
      if (data) {
        getAllProjectProducts();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToExcel = () => {
    if (!productList || productList.length == 0) return;

    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const filename = `${String(Date.now())}_phase_${phase}`;

    const outputList = productList.map((item, idx) => {
      const data = {
        No: idx + 1,
        "Product Name": item.product_name,
        Category: item.category_name,
        Location: item.location_name,
        Status:
          item.product_status === STATUS_INCOMPLETE_VALUE
            ? STATUS_INCOMPLETE_LABEL
            : item.product_status === STATUS_ORDERED_VALUE
            ? STATUS_ORDERED_LABEL
            : item.product_status === STATUS_READY_VALUE && STATUS_READY_LABEL,
        Quantity: item.product_quantity,
        Price: item.product_price,
        "Total Price": item.product_quantity * item.product_price,
        Image: item.product_image,
        Link: item.product_link,
      };
      return data;
    });

    const ws = XLSX.utils.json_to_sheet(outputList);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, filename + fileExtension);
  };

  return (
    <div className="w-full px-4">
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between">
          <Select value={phase} onValueChange={setPhase}>
            <SelectTrigger className="w-28 flex items-center bg-white justify-between border-[1px] rounded-lg px-3 py-2 hover:shadow">
              <SelectValue placeholder="Select a phase" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                value={PHASE_1}
                className="cursor-pointer hover:bg-gray-300"
              >
                Phase {PHASE_1}
              </SelectItem>
              <SelectItem
                value={PHASE_2}
                className="cursor-pointer hover:bg-gray-300"
              >
                Phase {PHASE_2}
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="space-x-4 flex">
            <DropdownMenu
              open={openMovePhaseMenu}
              onOpenChange={setOpenMovePhaseMenu}
            >
              <DropdownMenuTrigger className="rounded-lg w-10 h-10 bg-[#2365C81A] p-0 flex items-center justify-center">
                <EllipsisVerticalIcon className="w-auto h-6" />
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent className="bg-white">
                  {isLoading ? (
                    <div className="w-full flex items-center justify-center">
                      <div className="w-12 h-12">
                        <DynamicLottie
                          options={LoadingOptions}
                          isClickToPauseDisabled={true}
                        />
                      </div>
                    </div>
                  ) : (
                    <Button
                      disabled={moveDisabled}
                      onClick={handleMovePhase}
                      className="w-full flex justify-between px-4"
                    >
                      Move to Phase {phase === PHASE_1 ? PHASE_2 : PHASE_1}
                    </Button>
                  )}
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
            <Button
              onClick={exportToExcel}
              className="rounded-lg bg-[#2365C81A] flex items-center justify-center"
            >
              Download Pro Sheet
            </Button>
            <Select value={website} onValueChange={setWebsite}>
              <SelectTrigger className="w-48 flex items-center bg-[#2365C8] text-white justify-between rounded-lg px-4 py-2 hover:shadow">
                <SelectValue placeholder="Select a Website" />
              </SelectTrigger>
              <SelectContent className="bg-white w-48">
                {websiteList &&
                  websiteList.length > 0 &&
                  websiteList.map((item: any, idx: number) => {
                    return (
                      <SelectItem
                        key={idx}
                        value={item.id}
                        className="flex gap-4 hover:bg-gray-300"
                      >
                        <div className="flex cursor-pointer gap-2 items-center">
                          {item.image ? (
                            <Image
                              alt="image"
                              src={item.image}
                              width={32}
                              height={32}
                              className="rounded"
                            />
                          ) : (
                            <div className="rounded w-8 h-8 flex items-center justify-center bg-[#2365C8]">
                              <Store className="w-6 h-6 text-white" />
                            </div>
                          )}
                          <p>{item.name}</p>
                        </div>
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-48 flex justify-center items-center">
            <div className="w-24 h-24">
              <DynamicLottie
                options={LoadingOptions}
                isClickToPauseDisabled={true}
              />
            </div>
          </div>
        ) : (
          <Table className="mt-4">
            <TableHeader className="bg-[#EAEFF5] rounded">
              <TableRow>
                <TableCell></TableCell>
                <TableCell
                  onClick={() => handleSetSortField("category_name")}
                  className="cursor-pointer hover:bg-[#ced2d8]"
                >
                  Category
                </TableCell>
                <TableCell
                  onClick={() => handleSetSortField("product_name")}
                  className="cursor-pointer hover:bg-[#ced2d8]"
                >
                  Item
                </TableCell>
                <TableCell
                  onClick={() => handleSetSortField("location_name")}
                  className="cursor-pointer hover:bg-[#ced2d8]"
                >
                  Location
                </TableCell>
                <TableCell
                  onClick={() => handleSetSortField("status")}
                  className="cursor-pointer hover:bg-[#ced2d8]"
                >
                  Status
                </TableCell>
                <TableCell className="cursor-default min-w-[120px] hover:bg-[#ced2d8]">
                  <p>Delivery Date</p>
                  <p>Needed / Order By</p>
                </TableCell>
                <TableCell
                  onClick={() => handleSetSortField("quantity")}
                  className="cursor-pointer hover:bg-[#ced2d8]"
                >
                  Quantity($)
                </TableCell>
                <TableCell
                  onClick={() => handleSetSortField("product_price")}
                  className="cursor-pointer hover:bg-[#ced2d8]"
                >
                  Price
                </TableCell>
                <TableCell className="cursor-default hover:bg-[#ced2d8]">
                  Item Link
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {productList &&
                productList.length > 0 &&
                productList.map((item, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={checkboxValues[idx]}
                            onChange={() => handleCheckboxChange(idx)}
                            className="rounded w-4 h-4"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.category_name || ""}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="w-7 h-7 flex items-center justify-center rounded bg-[#F6F7F8]">
                            {item.product_image ? (
                              <Image
                                alt="image"
                                src={item.product_image}
                                width={40}
                                height={40}
                              />
                            ) : (
                              <div className="rounded min-w-10 w-10 h-10 flex items-center justify-center bg-[#2365C8]">
                                <Store className="w-8 h-8 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm w-[120px]">
                            {item.product_name || ""}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div key={idx} className="flex gap-2">
                          <Checkbox
                            className="bg-[green] disabled:!opacity-100 disabled:!cursor-default text-white rounded-full w-5 h-5"
                            checked={true}
                            disabled
                          />
                          <p className="text-sm">{item.location_name || ""}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`flex items-center uppercase text-xs w-[120px] ${
                            item.product_status == STATUS_INCOMPLETE_VALUE
                              ? "text-[#DB5D02]"
                              : item.product_status == STATUS_READY_VALUE
                              ? "text-[#2365C8]"
                              : item.product_status == STATUS_ORDERED_VALUE &&
                                "text-[#2AA200]"
                          }`}
                        >
                          ●&nbsp;
                          {item.product_status == STATUS_INCOMPLETE_VALUE
                            ? STATUS_INCOMPLETE_LABEL
                            : item.product_status == STATUS_READY_VALUE
                            ? STATUS_READY_LABEL
                            : item.product_status == STATUS_ORDERED_VALUE &&
                              STATUS_ORDERED_LABEL}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p>{item.needed_date}</p>
                        <p>{item.orderby_date}</p>
                      </TableCell>
                      <TableCell>{item.product_quantity}</TableCell>
                      <TableCell>
                        {item.product_quantity * item.product_price}
                      </TableCell>
                      <TableCell>
                        <a
                          href={item.product_link || ""}
                          className="cursor-pointer underline text-[#2365C8]"
                        >
                          Website Link
                        </a>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu
                          open={dropdownOpenStates[item.product_id] || false}
                          onOpenChange={() => toggleDropdown(item.product_id)}
                        >
                          <DropdownMenuTrigger
                            onClick={() => toggleDropdown(item.product_id)}
                          >
                            <Trash2 className="text-[#EA2D38] w-5 h-5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuContent
                              align="start"
                              className="bg-white space-y-1"
                            >
                              <div className="flex justify-between gap-2 px-2">
                                <div
                                  onClick={() => handleDelete(item.product_id)}
                                  className="bg-[#2AA200] flex items-center cursor-pointer text-white py-1 px-3 rounded text-sm"
                                >
                                  {isLoading ? (
                                    <div className="w-5 h-5">
                                      <DynamicLottie
                                        options={LoadingOptions}
                                        isClickToPauseDisabled={true}
                                      />
                                    </div>
                                  ) : (
                                    <p>Yes</p>
                                  )}
                                </div>
                                <div
                                  onClick={() =>
                                    toggleDropdown(item.product_id)
                                  }
                                  className="bg-[#EA2D38] text-white cursor-pointer py-1 px-3 rounded text-sm"
                                >
                                  No
                                </div>
                              </div>
                            </DropdownMenuContent>
                          </DropdownMenuPortal>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
        {!productList ||
          (productList.length == 0 && (
            <div className="w-full mt-20 flex flex-col items-center justify-center">
              <Image src="/svg/guide.svg" alt="guide" width={70} height={70} />
              <p className="my-6 text-3xl font-bold">Complete Material Input</p>
              <p className="text-[#718096] text-base max-w-[280px] text-center">
                Complete Material Input to view Design Guides.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="my-6 w-[200px] text-white text-base bg-[#2365C8] rounded-lg"
              >
                Begin Material Input
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
