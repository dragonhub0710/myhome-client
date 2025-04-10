/* eslint-disable react-hooks/exhaustive-deps */
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
import { ProjectCard } from "@/src/components/card/project-card";
import NewProjectDialog from "@/src/components/dialog/new-project";
import Loading_Animation from "@/src/components/loading/dark_loading.json";
import {
  IN_PROGRESS_PROJECT_LABEL,
  IN_PROGRESS_PROJECT_VALUE,
  COMPLETED_PROJECT_LABEL,
  COMPLETED_PROJECT_VALUE,
  ARCHIVED_PROJECT_LABEL,
  ARCHIVED_PROJECT_VALUE,
  CREATED_AT_LABEL,
  CREATED_AT_VALUE,
  PROJECT_NAME_LABEL,
  PROJECT_NAME_VALUE,
} from "@/src/constants/constants";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

interface ProjectCardProps {
  id: string;
  name: string;
  status: string;
}

const sortLabels = [CREATED_AT_LABEL, PROJECT_NAME_LABEL];
const sortFields = [CREATED_AT_VALUE, PROJECT_NAME_VALUE];

const filterLabels = [
  "All",
  IN_PROGRESS_PROJECT_LABEL,
  COMPLETED_PROJECT_LABEL,
  ARCHIVED_PROJECT_LABEL,
];
const filterFields = [
  "",
  IN_PROGRESS_PROJECT_VALUE,
  COMPLETED_PROJECT_VALUE,
  ARCHIVED_PROJECT_VALUE,
];

export default function ProjectsPage() {
  const { toast } = useToast();
  const auth = useAtomValue(authAtom);
  const [projectData, setProjectData] = useAtom(projectAtom);
  const [openDialog, setOpenDialog] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [sortby, setSortby] = useState(CREATED_AT_VALUE);
  const [sortDirection, setSortDirection] = useState(true);
  const [filter, setFilter] = useState("");

  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (auth.user) getAllProjects();
  }, [auth.user, filter, sortby, sortDirection]);

  const getAllProjects = async () => {
    setIsLoading(true);
    try {
      let rows = [];
      if (filter == "") {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", auth.user?.id)
          .order(sortby, { ascending: sortDirection });

        if (error) {
          toast({
            title: "Something wrong!",
            variant: "destructive",
          });
        }
        if (data) rows = data;
      } else {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", auth.user?.id)
          .eq("status", filter)
          .order(sortby, { ascending: sortDirection });

        if (error) {
          toast({
            title: "Something wrong!",
            variant: "destructive",
          });
        }
        if (data) rows = data;
      }

      setProjectData({
        list: rows,
        selectedItem: null,
        sortField: sortby,
        sortDirection: sortDirection,
        filter: filter,
      });
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

  const getSortFieldLabel = () => {
    let sortFieldLabel = "";
    switch (sortby) {
      case CREATED_AT_VALUE:
        sortFieldLabel = CREATED_AT_LABEL;
        break;
      case PROJECT_NAME_VALUE:
        sortFieldLabel = PROJECT_NAME_LABEL;
        break;
      default:
        break;
    }
    return sortFieldLabel;
  };

  const getFilterLabel = () => {
    let filterLabel = "";
    switch (filter) {
      case "":
        filterLabel = "All";
        break;
      case IN_PROGRESS_PROJECT_VALUE:
        filterLabel = IN_PROGRESS_PROJECT_LABEL;
        break;
      case COMPLETED_PROJECT_VALUE:
        filterLabel = COMPLETED_PROJECT_LABEL;
        break;
      case ARCHIVED_PROJECT_VALUE:
        filterLabel = ARCHIVED_PROJECT_LABEL;
        break;
      default:
        break;
    }
    return filterLabel;
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
                <Button className="bg-primary rounded-lg h-[42px] w-[192px] text-white">
                  <div className="w-6 h-6 flex items-center justify-center border-2 border-white rounded-lg">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  Start New Project
                </Button>
              </DialogTrigger>

              <DialogContent className="w-full max-w-[800px] px-10 py-5">
                <DialogHeader>
                  <DialogTitle className="w-full text-3xl mb-10 flex justify-center">
                    Start new project
                  </DialogTitle>
                </DialogHeader>
                <NewProjectDialog setOpen={setOpenDialog} open={openDialog} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full"></div>
          <div className="w-full flex my-4 justify-between">
            <p className="text-lg font-medium">
              {projectData.list && projectData.list.length}&nbsp;
              {projectData.list && projectData.list.length > 1
                ? "Projects"
                : "Project"}
            </p>
            <div className="flex space-x-2 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="w-36 flex items-center justify-between border-[1px] rounded-lg px-3 py-2 hover:shadow">
                    <p className="text-sm">{getFilterLabel()}</p>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent
                    align="start"
                    className="bg-white space-y-1"
                  >
                    {filterLabels.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          onClick={() => setFilter(filterFields[idx])}
                          className={`rounded-lg cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-[white] ${
                            filterFields[idx] === filter
                              ? "bg-primary text-white"
                              : "bg-white text-black"
                          }`}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="w-36 flex items-center justify-between border-[1px] rounded-lg px-3 py-2 hover:shadow">
                    <p className="text-sm">{getSortFieldLabel()}</p>
                    <ChevronDown className="w-4 h-4" />
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
                            setSortby(sortFields[idx]);
                          }}
                          className={`rounded-lg cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-[white] ${
                            sortFields[idx] === sortby
                              ? "bg-primary text-white"
                              : "bg-white text-black"
                          }`}
                        >
                          {item}
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
              projectData.list &&
              projectData.list.length > 0 &&
              projectData.list.map((item: ProjectCardProps, idx: number) => {
                return <ProjectCard key={idx} data={item} />;
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
