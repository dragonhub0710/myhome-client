import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Trash2Icon } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";
import { supabase } from "@/src/lib/supabase";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { projectAtom } from "@/src/atoms/projectAtom";
import Light_Loading_Animation from "@/src/components/loading/light_loading.json";
import Dark_Loading_Animation from "@/src/components/loading/dark_loading.json";
import {
  ARCHIVED_PROJECT_LABEL,
  ARCHIVED_PROJECT_VALUE,
  COMPLETED_PROJECT_LABEL,
  COMPLETED_PROJECT_VALUE,
  IN_PROGRESS_PROJECT_LABEL,
  IN_PROGRESS_PROJECT_VALUE,
} from "@/src/constants/constants";
import { authAtom } from "@/src/atoms/authAtom";
import Link from "next/link";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

interface ProjectCardProps {
  data: {
    id: string;
    name: string;
    status: string;
  };
}

const STATUS_OPTIONS = [
  {
    value: IN_PROGRESS_PROJECT_VALUE,
    label: IN_PROGRESS_PROJECT_LABEL,
    color: "#DB5D02",
  },
  {
    value: COMPLETED_PROJECT_VALUE,
    label: COMPLETED_PROJECT_LABEL,
    color: "#2AA200",
  },
  {
    value: ARCHIVED_PROJECT_VALUE,
    label: ARCHIVED_PROJECT_LABEL,
    color: "#2365C8",
  },
];

export function ProjectCard(props: ProjectCardProps) {
  const { toast } = useToast();
  const auth = useAtomValue(authAtom);
  const [projectData, setProjectData] = useAtom(projectAtom);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const LightLoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Light_Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const DarkLoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Dark_Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleRemoveProject = async () => {
    try {
      setIsRemoveLoading(true);
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", props.data.id);
      if (error) throw error;

      if (projectData.filter == "") {
        const { data: rows, error: getError } = await supabase
          .from("projects")
          .select("*")
          .eq("user_email", auth.user?.email)
          .order(projectData.sortField, {
            ascending: projectData.sortDirection,
          });
        if (getError) throw getError;

        setProjectData((prev) => ({ ...prev, list: rows }));
      } else {
        const { data: rows, error: getError } = await supabase
          .from("projects")
          .select("*")
          .eq("user_email", auth.user?.email)
          .eq("status", projectData.filter)
          .order(projectData.sortField, {
            ascending: projectData.sortDirection,
          });
        if (getError) throw getError;

        setProjectData((prev) => ({ ...prev, list: rows }));
      }
    } catch (err) {
      throw err;
    } finally {
      setIsRemoveLoading(false);
      setOpenDelete(false);
    }
  };

  const handleStatusChange = async (value: string) => {
    try {
      setIsStatusLoading(true);
      const { error } = await supabase
        .from("projects")
        .update({ status: value })
        .eq("id", props.data.id);
      if (error) throw error;

      let rows = [];
      if (projectData.filter == "") {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("user_email", auth.user?.email)
          .order(projectData.sortField, {
            ascending: projectData.sortDirection,
          });

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
          .eq("user_email", auth.user?.email)
          .eq("status", projectData.filter)
          .order(projectData.sortField, {
            ascending: projectData.sortDirection,
          });

        if (error) {
          toast({
            title: "Something wrong!",
            variant: "destructive",
          });
        }
        if (data) rows = data;
      }

      setProjectData({ ...projectData, list: rows });
    } catch (err) {
      console.error(err);
      toast({
        title: "Something wrong",
        variant: "destructive",
      });
    } finally {
      setIsStatusLoading(false);
      setOpenDelete(false);
    }
  };

  const getStatusColor = (status: string) => {
    const statusObj = STATUS_OPTIONS.find((option) => option.value == status);
    const color = statusObj ? statusObj.color : "#000000";
    return color;
  };

  return (
    <div className="w-full">
      <Link href={`/projects/${props.data.id}`}>
        <div className="w-full justify-between rounded-xl cursor-pointer overflow-hidden transition-all duration-200 relative border-[1px] shadow hover:shadow-md flex p-5 bg-white">
          <div className="flex w-full flex-1 gap-4 cursor-pointer">
            <Image
              alt="project"
              src="/img/thumbnail.png"
              width={120}
              height={80}
              className="rounded-xl"
            />
            <div className="h-20 flex flex-1 items-center justify-between">
              <p className="text-lg font-medium">{props.data.name}</p>
              <div
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                className="w-[170px] h-20 flex items-center"
              >
                <Select
                  value={props.data.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger
                    className={`flex gap-2 w-[170px] border-[1px] border-[#00000075] bg-transparent text-[${getStatusColor(
                      props.data.status
                    )}]`}
                  >
                    <SelectValue placeholder="Select a status" />
                    {isStatusLoading && (
                      <div className="w-8 h-8">
                        <DynamicLottie
                          options={DarkLoadingOptions}
                          isClickToPauseDisabled={true}
                        />
                      </div>
                    )}
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem
                      value={IN_PROGRESS_PROJECT_VALUE}
                      className="cursor-pointer text-[#DB5D02] hover:bg-gray-300"
                    >
                      {IN_PROGRESS_PROJECT_LABEL}
                    </SelectItem>
                    <SelectItem
                      value={COMPLETED_PROJECT_VALUE}
                      className="cursor-pointer text-[#2AA200] hover:bg-gray-300"
                    >
                      {COMPLETED_PROJECT_LABEL}
                    </SelectItem>
                    <SelectItem
                      value={ARCHIVED_PROJECT_VALUE}
                      className="cursor-pointer text-primary hover:bg-gray-300"
                    >
                      {ARCHIVED_PROJECT_LABEL}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="h-20 pl-10 items-center cursor-default flex">
            <div className="h-16 border-x-[1px] mx-5"></div>
            <div
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className="h-16 flex items-center"
            >
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
          </div>
        </div>
      </Link>
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the product from your list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveProject}>
              {isRemoveLoading ? (
                <div className="w-8 h-8">
                  <DynamicLottie
                    options={LightLoadingOptions}
                    isClickToPauseDisabled={true}
                  />
                </div>
              ) : (
                "Remove"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
