/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import dynamic from "next/dynamic";
import { supabase } from "@/src/lib/supabase";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { PanelTopOpen, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { projectAtom } from "@/src/atoms/projectAtom";
import Loading_Animation from "@/src/components/loading/light_loading.json";
import { ARCHIVED_PROJECT_VALUE } from "@/src/constants/constants";
import { authAtom } from "@/src/atoms/authAtom";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export function ProjectCard(props: any) {
  const auth = useAtomValue(authAtom);
  const [projectData, setProjectData] = useAtom(projectAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [openArchive, setOpenArchive] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleUpdateProject = async (status: boolean | null) => {
    try {
      setIsLoading(true);
      if (status == null) {
        const { error } = await supabase
          .from("projects")
          .delete()
          .eq("id", props.data.id);
        if (error) throw error;
      }

      if (status == ARCHIVED_PROJECT_VALUE) {
        const { error } = await supabase
          .from("projects")
          .update({ status })
          .eq("id", props.data.id);
        if (error) throw error;
      }

      if (projectData.filter == null) {
        const { data: rows, error: getError } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", auth.user?.id)
          .order(projectData.sortField, {
            ascending: projectData.sortDirection,
          });
        if (getError) throw getError;

        setProjectData((prev) => ({
          ...prev,
          list: rows,
        }));
      } else {
        const { data: rows, error: getError } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", auth.user?.id)
          .eq("status", projectData.filter)
          .order(projectData.sortField, {
            ascending: projectData.sortDirection,
          });
        if (getError) throw getError;

        setProjectData((prev) => ({
          ...prev,
          list: rows,
        }));
      }
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
      setOpenArchive(false);
      setOpenDelete(false);
    }
  };

  return (
    <div className="w-full justify-between rounded-xl cursor-pointer hover:shadow-md flex p-5 bg-white">
      <a href={`/projects/${props.data.id}`} className="w-full flex-1">
        <div className="flex gap-4 cursor-pointer">
          <Image
            alt="project"
            src="/img/thumbnail.png"
            width={120}
            height={80}
            className="rounded-xl"
          />
          <div className="h-20 flex items-center">
            <div className="flex h-16 flex-col justify-between">
              <p className="text-lg font-medium">{props.data.name}</p>
              <p
                className={
                  props.data.status ? "text-[#2AA200]" : "text-[#DB5D02]"
                }
              >
                {props.data.status ? "● COMPLETED" : "● IN PROGRESS"}
              </p>
            </div>
          </div>
        </div>
      </a>
      <div className="h-20 px-10 items-center cursor-default flex">
        <div className="h-16 border-x-[1px] mx-5"></div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              disabled={!props.data.status}
              onClick={() => setOpenArchive(true)}
              className="w-10 flex justify-center items-center cursor-pointer"
            >
              <PanelTopOpen className="!h-6 !w-6" />
            </TooltipTrigger>
            <TooltipContent
              className="select-none rounded bg-[#000000a9] !text-white font-medium px-[15px] py-2.5 text-[15px] leading-none text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
              sideOffset={5}
            >
              Archive
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => setOpenDelete(true)}
              className="w-10 flex justify-center items-center cursor-pointer"
            >
              <Trash2Icon className="!h-6 !w-6" />
            </TooltipTrigger>
            <TooltipContent
              className="select-none rounded bg-[#000000a9] !text-white font-medium px-[15px] py-2.5 text-[15px] leading-none text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
              sideOffset={5}
            >
              Delete
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Dialog open={openArchive} onOpenChange={setOpenArchive}>
        <DialogContent className="w-full max-w-[400px] px-10 py-5">
          <DialogHeader>
            <DialogTitle className="w-full"></DialogTitle>
          </DialogHeader>
          <div className="space-y-6 flex flex-col items-center justify-center">
            <Trash2Icon className="w-20 h-auto text-secondary" />
            <p className="text-2xl font-bold w-[272px]">
              Are you sure you want to archive the project?
            </p>
            <div className="w-full space-y-3">
              <Button
                onClick={() => handleUpdateProject(ARCHIVED_PROJECT_VALUE)}
                className="bg-secondary hover:bg-[#ea2d36dc] text-white w-full h-10"
              >
                {isLoading ? (
                  <div className="w-16 h-16">
                    <DynamicLottie
                      options={LoadingOptions}
                      isClickToPauseDisabled={true}
                    />
                  </div>
                ) : (
                  "Archive Item"
                )}
              </Button>
              <Button
                onClick={() => setOpenArchive(false)}
                className="border-secondary bg-transparent hover:bg-transparent border-[1px] w-full h-10"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="w-full max-w-[400px] px-10 py-5">
          <DialogHeader>
            <DialogTitle className="w-full"></DialogTitle>
          </DialogHeader>
          <div className="space-y-6 flex flex-col items-center justify-center">
            <Trash2Icon className="w-20 h-auto text-secondary" />
            <p className="text-2xl font-bold w-[272px]">
              Are you sure you want to delete the project?
            </p>
            <div className="w-full space-y-3">
              <Button
                onClick={() => handleUpdateProject(null)}
                className="bg-secondary hover:bg-[#ea2d36dc] text-white w-full h-10"
              >
                {isLoading ? (
                  <div className="w-16 h-16">
                    <DynamicLottie
                      options={LoadingOptions}
                      isClickToPauseDisabled={true}
                    />
                  </div>
                ) : (
                  "Delete Item"
                )}
              </Button>
              <Button
                onClick={() => setOpenDelete(false)}
                className="border-secondary bg-transparent hover:bg-transparent border-[1px] w-full h-10"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
