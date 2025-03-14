/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAtom, useAtomValue } from "jotai";
import { Plus, ArrowUpDown, ChevronDown } from "lucide-react";
import { projectAtom } from "@/src/atoms/projectAtom";
import { authAtom } from "@/src/atoms/authAtom";
import { supabase } from "@/src/lib/supabase";
import { useToast } from "@/src/hooks/use-toast";
import { MainSidebar } from "@/src/components/main-sidebar";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ProjectCard } from "@/src/components/project-card";
import NewProjectContent from "@/src/components/dialog/new-project";
import Loading_Animation from "@/src/components/loading/dark_loading.json";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

const sortLabels = ["Created At", "Project Name", "Status"];
const sortFields = ["created_at", "name", "status"];

export default function HomePage() {
  const auth = useAtomValue(authAtom);
  const { toast } = useToast();
  const [projectList, setProjectList] = useAtom(projectAtom);
  const [openDialog, setOpenDialog] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [sortby, setSortby] = useState(sortLabels[0]);
  const [sortDirection, setSortDirection] = useState(true);

  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (auth.user) {
      const sortField = getSortDirection(sortby);
      getAllProjects(sortField, sortDirection);
    }
  }, [auth.user, sortby, sortDirection]);

  const getAllProjects = async (
    sort: string = sortFields[0],
    direction: boolean = true
  ) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", auth.user?.id)
        .order(sort, { ascending: direction });

      if (error) {
        toast({
          title: "Something wrong!",
          variant: "destructive",
        });
      }
      if (data) {
        setProjectList({
          list: data,
          selectedItem: null,
          sortField: sort,
          sortDirection: direction,
        });
      }
    } catch (error) {
      toast({
        title: "A network error occurred",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSortDirection = (sortby: string) => {
    let sortField = null;
    switch (sortby) {
      case sortLabels[0]:
        sortField = sortFields[0];
        break;
      case sortLabels[1]:
        sortField = sortFields[1];
        break;
      case sortLabels[2]:
        sortField = sortFields[2];
        break;
      default:
        sortField = sortFields[0];
        break;
    }
    return sortField;
  };

  const handleOpenMenu = () => {
    setOpenMenu((open) => !open);
  };

  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8 border-b-2 pb-4">
            <h1 className="text-3xl font-bold">Projects</h1>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button className="bg-[#2365C8] rounded-lg h-[42px] w-[192px] text-white">
                  <div className="w-6 h-6 flex items-center justify-center border-2 border-white rounded-lg">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  Start New Project
                </Button>
              </DialogTrigger>

              <DialogContent className="p-10">
                <DialogHeader className="py-5">
                  <DialogTitle className="w-full text-3xl flex justify-center">
                    Start new project
                  </DialogTitle>
                </DialogHeader>
                <NewProjectContent setOpen={setOpenDialog} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full"></div>
          <div className="w-full flex my-4 justify-between">
            <p className="text-lg font-medium">
              {projectList.list && projectList.list.length}&nbsp;
              {projectList.list && projectList.list.length > 1
                ? "Projects"
                : "Project"}
            </p>
            <div className="flex space-x-2 items-center">
              <DropdownMenu open={openMenu} onOpenChange={handleOpenMenu}>
                <DropdownMenuTrigger>
                  <div className="w-36 flex items-center justify-between border-[1px] rounded-lg px-3 py-2 hover:shadow">
                    <p className="text-sm">{sortby}</p>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openMenu ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent
                    align="start"
                    className="bg-white space-y-1"
                  >
                    {sortLabels.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setSortby(item);
                            setOpenMenu(false);
                          }}
                          className={`rounded-lg cursor-pointer px-4 py-2 hover:bg-[#2365C8] hover:text-[white] ${
                            item === sortby
                              ? "bg-[#2365C8] text-white"
                              : "bg-white text-black"
                          }`}
                        >
                          <p className="text-sm">{item}</p>
                        </div>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
              <div
                onClick={() => setSortDirection((prev) => !prev)}
                className="h-9 w-9 flex items-center justify-center cursor-pointer"
              >
                <ArrowUpDown />
              </div>
            </div>
          </div>
          <div className="w-full space-y-4 flex flex-col">
            {isloading ? (
              <div className="w-full flex items-center justify-center h-64">
                <div className="w-32 h-32">
                  <DynamicLottie
                    options={LoadingOptions}
                    isClickToPauseDisabled={true}
                  />
                </div>
              </div>
            ) : (
              projectList.list &&
              projectList.list.length > 0 &&
              projectList.list.map((item: any, idx: number) => {
                return (
                  <a key={idx} href={`/projects/${item.id}`}>
                    <ProjectCard data={item} />
                  </a>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
