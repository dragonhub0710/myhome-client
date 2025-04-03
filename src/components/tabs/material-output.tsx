"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { useAtomValue } from "jotai";
import { projectAtom } from "@/src/atoms/projectAtom";
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
  AMAZON_WEBSITE_LABEL,
  LOWES_WEBSITE_LABEL,
  HOMEDEPOT_WEBSITE_LABEL,
} from "@/src/constants/constants";
import Loading_Animation from "@/src/components/loading/dark_loading.json";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

const STATUS_OPTIONS = [
  {
    value: STATUS_INCOMPLETE_VALUE,
    label: STATUS_INCOMPLETE_LABEL,
    color: "#DB5D02",
  },
  { value: STATUS_READY_VALUE, label: STATUS_READY_LABEL, color: "#2365C8" },
  {
    value: STATUS_ORDERED_VALUE,
    label: STATUS_ORDERED_LABEL,
    color: "#2AA200",
  },
];

interface ProductProps {
  image: string;
  link: string;
  lead_time: number;
  name: string;
  price: number;
  categories: { name: string };
  locations: { name: string };
  websites: { name: string };
}

interface ProjectProductProps {
  id: string;
  phase: string;
  product_id: string;
  project_id: string;
  quantity: number;
  status: string;
  products: ProductProps;
}

interface ExcelProductProps {
  No: number;
  "Product Name": string;
  Category: string;
  Location: string;
  Status: string;
  Quantity: number;
  Price: number;
  "Total Price": number;
  Image: string;
  Link: string;
}

export default function MaterialOutputTab() {
  const { toast } = useToast();
  const projectData = useAtomValue(projectAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isPahseLoading, setIsPhaseLoading] = useState(false);
  const [phase, setPhase] = useState(PHASE_1);
  const [openMovePhaseMenu, setOpenMovePhaseMenu] = useState(false);
  const [productList, setProductList] = useState<ProjectProductProps[]>([]);
  const [sortField, setSortField] = useState("products(name)");
  const [sortDirection, setSortDirection] = useState(true);
  const [checkboxValues, setCheckboxValues] = useState<boolean[]>([]);
  const [movePhaseDisabled, setMovePhaseDisabled] = useState(true);
  const [updateStatusDisabled, setUpdateStatusDisabled] = useState(true);
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

  const toggleDropdown = (id: string) => {
    setDropdownOpenStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const getAllProjectProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("project_products")
        .select(
          `*, products(name, image, price, lead_time, link, websites(name), categories(name), locations(name))`
        )
        .eq("project_id", projectData.selectedItem.id)
        .eq("phase", phase)
        .order(sortField, { ascending: sortDirection });

      if (error) throw error;
      if (data) {
        setProductList(data);
        setCheckboxValues(new Array(data.length).fill(false));
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [projectData.selectedItem, phase, sortField, sortDirection, toast]);

  useEffect(() => {
    if (projectData.selectedItem) {
      getAllProjectProducts();
    }
  }, [projectData.selectedItem, getAllProjectProducts]);

  const handleMovePhase = () => {
    try {
      setIsPhaseLoading(true);
      checkboxValues.map(async (item, index) => {
        if (item) {
          const { error } = await supabase
            .from("project_products")
            .update({
              phase: productList[index].phase === PHASE_1 ? PHASE_2 : PHASE_1,
            })
            .eq("id", productList[index].id);
          if (error) throw error;
        }
      });
      getAllProjectProducts();
      setOpenMovePhaseMenu(false);
      setMovePhaseDisabled(true);
      setUpdateStatusDisabled(true);
      setCheckboxValues(new Array(productList.length).fill(false));
    } catch (err) {
      console.error(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsPhaseLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const statusObj = STATUS_OPTIONS.find((option) => option.value === status);
    return statusObj ? statusObj.color : "#000000";
  };

  const handleStatusChange = (index: number, value: string) => {
    const list = [...productList];
    list[index].status = value;
    setProductList(list);
  };

  const handleUpdateStatus = () => {
    try {
      setIsStatusLoading(true);
      checkboxValues.map(async (item: boolean, idx: number) => {
        if (item) {
          const { error } = await supabase
            .from("project_products")
            .update({
              status: productList[idx].status,
            })
            .eq("id", productList[idx].id);
          if (error) throw error;
          getAllProjectProducts();
          setOpenMovePhaseMenu(false);
          setMovePhaseDisabled(true);
          setUpdateStatusDisabled(true);
          setCheckboxValues(new Array(productList.length).fill(false));
        }
      });
    } catch (err) {
      throw err;
    } finally {
      setIsStatusLoading(false);
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
    setMovePhaseDisabled(updatedValues.every((value) => !value));
    setUpdateStatusDisabled(updatedValues.every((value) => !value));
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

  const exportToExcel = (website: string) => {
    if (!productList || productList.length == 0) return;

    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const filename = `${String(Date.now())}_phase_${phase}`;
    const amazonList: ExcelProductProps[] = [];
    const lowesList: ExcelProductProps[] = [];
    const homedepotList: ExcelProductProps[] = [];

    productList.map((item, idx) => {
      const data = {
        No: idx + 1,
        "Product Name": item.products.name || "",
        Category: item.products.categories.name || "",
        Location: item.products.locations.name || "",
        Status:
          item.status === STATUS_INCOMPLETE_VALUE
            ? STATUS_INCOMPLETE_LABEL
            : item.status === STATUS_ORDERED_VALUE
            ? STATUS_ORDERED_LABEL
            : item.status === STATUS_READY_VALUE
            ? STATUS_READY_LABEL
            : "",
        Quantity: item.quantity || 0,
        Price: item.products.price || 0,
        "Total Price": item.quantity * item.products.price || 0,
        Image: item.products.image || "",
        Link: item.products.link || "",
      };

      if (item.products.websites.name == AMAZON_WEBSITE_LABEL) {
        amazonList.push(data);
      }
      if (item.products.websites.name == LOWES_WEBSITE_LABEL) {
        lowesList.push(data);
      }
      if (item.products.websites.name === HOMEDEPOT_WEBSITE_LABEL) {
        homedepotList.push(data);
      }
    });
    let outputList: ExcelProductProps[] = [];
    if (website === AMAZON_WEBSITE_LABEL) {
      outputList = [...amazonList];
    }
    if (website === LOWES_WEBSITE_LABEL) {
      outputList = [...lowesList];
    }
    if (website === HOMEDEPOT_WEBSITE_LABEL) {
      outputList = [...homedepotList];
    }
    const ws = XLSX.utils.json_to_sheet(outputList);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, filename + fileExtension);
  };

  const handleAddtoCart = async () => {
    let count = 0;
    let redirectLink = `https://www.amazon.com/gp/aws/cart/add.html?AssociateTag=${process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG}`;
    checkboxValues.map((item: boolean, index: number) => {
      if (
        item &&
        productList[index].products.websites.name === AMAZON_WEBSITE_LABEL
      ) {
        redirectLink += `&ASIN.${count + 1}=${getASINFromURL(
          productList[index].products.link
        )}&Quantity.${count + 1}=${productList[index].quantity}`;
        count++;
      }
    });
    window.open(redirectLink, "_blank");
  };

  function getASINFromURL(url: string) {
    const asinRegex = /(?:dp|gp\/product)\/([A-Z0-9]{10})/;
    const match = url.match(asinRegex);

    return match ? match[1] : null;
  }

  return (
    <div className="w-full h-full px-4">
      <div className="w-full h-full flex flex-col">
        {productList.length > 0 && (
          <div className="w-full flex justify-between py-3">
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
                    <Button
                      disabled={movePhaseDisabled}
                      onClick={handleMovePhase}
                      className="w-full flex justify-between px-4 bg-white hover:bg-gray-300"
                    >
                      {isPahseLoading ? (
                        <div className="w-full flex items-center justify-center">
                          <div className="w-12 h-12">
                            <DynamicLottie
                              options={LoadingOptions}
                              isClickToPauseDisabled={true}
                            />
                          </div>
                        </div>
                      ) : (
                        <p>
                          Move to Phase {phase === PHASE_1 ? PHASE_2 : PHASE_1}
                        </p>
                      )}
                    </Button>
                    <Button
                      disabled={updateStatusDisabled}
                      onClick={() => handleUpdateStatus()}
                      className="w-full flex justify-between px-4 bg-white hover:bg-gray-300"
                    >
                      {isStatusLoading ? (
                        <div className="w-full flex items-center justify-center">
                          <div className="w-12 h-12">
                            <DynamicLottie
                              options={LoadingOptions}
                              isClickToPauseDisabled={true}
                            />
                          </div>
                        </div>
                      ) : (
                        <p>Update Status</p>
                      )}
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-lg px-4 text-sm font-medium bg-[#2365C81A] flex items-center justify-center">
                  Download Pro Sheet
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent className="bg-white">
                    <Button
                      onClick={() => exportToExcel(AMAZON_WEBSITE_LABEL)}
                      className="w-36 flex justify-between px-4 bg-white hover:bg-gray-300"
                    >
                      {AMAZON_WEBSITE_LABEL}
                    </Button>
                    <Button
                      onClick={() => exportToExcel(LOWES_WEBSITE_LABEL)}
                      className="w-36 flex justify-between px-4 bg-white hover:bg-gray-300"
                    >
                      {LOWES_WEBSITE_LABEL}
                    </Button>
                    <Button
                      onClick={() => exportToExcel(HOMEDEPOT_WEBSITE_LABEL)}
                      className="w-36 flex justify-between px-4 bg-white hover:bg-gray-300"
                    >
                      {HOMEDEPOT_WEBSITE_LABEL}
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-24 flex items-center bg-primary text-sm font-medium text-white rounded-lg px-4 py-2 hover:shadow">
                  Add to
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent className="bg-white">
                    <Button
                      onClick={handleAddtoCart}
                      className="w-48 flex justify-between px-4 bg-white hover:bg-gray-300"
                    >
                      <p>{AMAZON_WEBSITE_LABEL} Cart</p>
                    </Button>
                    <Button className="w-48 flex justify-between px-4 bg-white hover:bg-gray-300">
                      {LOWES_WEBSITE_LABEL} Cart
                    </Button>
                    <Button className="w-48 flex justify-between px-4 bg-white hover:bg-gray-300">
                      {HOMEDEPOT_WEBSITE_LABEL} Cart
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
            </div>
          </div>
        )}
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
          <div className="w-full flex flex-1 overflow-auto">
            {productList.length > 0 ? (
              <Table>
                <TableHeader className="bg-[#EAEFF5] rounded">
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell className="cursor-default hover:bg-[#ced2d8]">
                      Category
                    </TableCell>
                    <TableCell
                      onClick={() => handleSetSortField("products(name)")}
                      className="cursor-pointer hover:bg-[#ced2d8]"
                    >
                      Item
                    </TableCell>
                    <TableCell className="cursor-default hover:bg-[#ced2d8]">
                      Location
                    </TableCell>
                    <TableCell
                      onClick={() => handleSetSortField("status")}
                      className="cursor-pointer hover:bg-[#ced2d8]"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      onClick={() => handleSetSortField("products(lead_time)")}
                      className="cursor-default min-w-[120px] hover:bg-[#ced2d8]"
                    >
                      Lead Time
                    </TableCell>
                    <TableCell
                      onClick={() => handleSetSortField("quantity")}
                      className="cursor-pointer hover:bg-[#ced2d8]"
                    >
                      Quantity($)
                    </TableCell>
                    <TableCell
                      onClick={() => handleSetSortField("products(price)")}
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
                              {item.products.categories.name || ""}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <div className="w-7 h-7 flex items-center justify-center rounded bg-[#F6F7F8]">
                                {item.products.image ? (
                                  <Image
                                    alt="image"
                                    src={item.products.image}
                                    width={40}
                                    height={40}
                                  />
                                ) : (
                                  <div className="rounded min-w-10 w-10 h-10 flex items-center justify-center bg-primary">
                                    <Store className="w-8 h-8 text-white" />
                                  </div>
                                )}
                              </div>
                              <p className="text-sm w-[120px]">
                                {item.products.name || ""}
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
                              <p className="text-sm">
                                {item.products.locations.name || ""}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={item.status}
                              onValueChange={(value) =>
                                handleStatusChange(idx, value)
                              }
                            >
                              <SelectTrigger
                                className={`w-[170px] bg-transparent border-none text-[${getStatusColor(
                                  item.status
                                )}]`}
                              >
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem
                                  value={STATUS_INCOMPLETE_VALUE}
                                  className="cursor-pointer text-[#DB5D02] hover:bg-gray-300"
                                >
                                  {STATUS_INCOMPLETE_LABEL}
                                </SelectItem>
                                <SelectItem
                                  value={STATUS_READY_VALUE}
                                  className="cursor-pointer text-primary hover:bg-gray-300"
                                >
                                  {STATUS_READY_LABEL}
                                </SelectItem>
                                <SelectItem
                                  value={STATUS_ORDERED_VALUE}
                                  className="cursor-pointer text-[#2AA200] hover:bg-gray-300"
                                >
                                  {STATUS_ORDERED_LABEL}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>{item.products.lead_time}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>
                            {(
                              item.quantity * (item.products.price || 0)
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <a
                              href={item.products.link || ""}
                              target="_blank"
                              className="cursor-pointer underline text-primary"
                            >
                              Website Link
                            </a>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu
                              open={dropdownOpenStates[item.id] || false}
                              onOpenChange={() => toggleDropdown(item.id)}
                            >
                              <DropdownMenuTrigger
                                onClick={() => toggleDropdown(item.id)}
                              >
                                <Trash2 className="text-secondary w-5 h-5" />
                              </DropdownMenuTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuContent
                                  align="start"
                                  className="bg-white space-y-1"
                                >
                                  <div className="flex justify-between gap-2 px-2">
                                    <div
                                      onClick={() => handleDelete(item.id)}
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
                                      onClick={() => toggleDropdown(item.id)}
                                      className="bg-secondary text-white cursor-pointer py-1 px-3 rounded text-sm"
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
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <Image
                  src="/svg/guide.svg"
                  alt="guide"
                  width={70}
                  height={70}
                />
                <p className="my-6 text-3xl font-bold">
                  Complete Material Input
                </p>
                <p className="text-[#718096] text-base max-w-[280px] text-center">
                  Complete Material Input to view Design Guides.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="my-6 w-[200px] text-white text-base bg-primary rounded-lg"
                >
                  Begin Material Input
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
