/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useAtom, useAtomValue } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectAtom } from "@/src/atoms/projectAtom";
import { authAtom } from "@/src/atoms/authAtom";
import { supabase } from "@/src/lib/supabase";
import { useToast } from "@/src/hooks/use-toast";
import { CreateProjectType, createProjectSchema } from "@/src/schema/schema";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Loading_Animation from "@/src/components/loading/light_loading.json";
import { IN_PROGRESS_PROJECT_VALUE } from "@/src/constants/constants";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

type NewProjectProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewProjectDialog({ open, setOpen }: NewProjectProps) {
  const { toast } = useToast();
  const auth = useAtomValue(authAtom);
  const [projectList, setProjectList] = useAtom(projectAtom);
  const [isloading, setIsLoading] = useState(false);

  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const form = useForm<CreateProjectType>({
    resolver: zodResolver(createProjectSchema),
    mode: "onChange",
  });

  useEffect(() => {
    form.setValue("name", "");
    form.setValue("fullBathrooms", 0);
    form.setValue("halfBathrooms", 0);
    form.setValue("livingRooms", 0);
    form.setValue("squareFeet", 0);
  }, [open]);

  const handleCreateProject = async (project: CreateProjectType) => {
    setIsLoading(true);
    try {
      const { error: createError } = await supabase.from("projects").insert({
        user_email: auth.user?.email,
        name: project.name,
        full_bathrooms: project.fullBathrooms,
        half_bathrooms: project.halfBathrooms,
        living_rooms: project.livingRooms,
        square_feet: project.squareFeet,
        design_theme: null,
        answers: null,
        status: IN_PROGRESS_PROJECT_VALUE,
      });

      if (createError) {
        toast({
          title: "Project creation failed",
          variant: "destructive",
        });
        console.log(createError);
        return;
      }

      const { data: rows, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_email", auth.user?.email)
        .order(projectList.sortField, {
          ascending: projectList.sortDirection,
        });
      if (error) throw error;

      setProjectList({ ...projectList, list: rows });
      setOpen(false);
    } catch (error) {
      toast({
        title: "A network error occurred",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-8">
      <div>
        <form
          onSubmit={form.handleSubmit((data) => handleCreateProject(data))}
          className="space-y-10"
        >
          <div className="space-y-4">
            <div className="w-full flex-col flex space-y-5">
              <div className="flex flex-col px-2 space-y-1">
                <div className="flex items-center">
                  <label className="w-[150px] text-base flex">
                    Project Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Please enter project name"
                    {...form.register("name")}
                    className="h-12 w-full bg-white text-base"
                  />
                </div>
                <div className="w-full flex justify-end">
                  {form.formState.errors.name && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex w-full space-x-4">
                <div className="w-1/2 px-2 space-y-3">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <label className="w-[130px] text-base flex justify-end">
                        Full Bathrooms
                      </label>
                      <Input
                        id="fullBathrooms"
                        type="number"
                        placeholder="# of Full Bathrooms"
                        {...form.register("fullBathrooms", {
                          valueAsNumber: true,
                        })}
                        className="h-12 w-full flex-1 bg-white text-base"
                      />
                    </div>
                    <div className="w-full flex justify-end">
                      {form.formState.errors.fullBathrooms && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.fullBathrooms.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <label className="w-[130px] text-base flex justify-end">
                        Living Rooms
                      </label>
                      <Input
                        id="livingRooms"
                        type="number"
                        placeholder="# of Living Rooms"
                        {...form.register("livingRooms", {
                          valueAsNumber: true,
                        })}
                        className="h-12 w-full flex-1 bg-white text-base"
                      />
                    </div>
                    <div className="w-full flex justify-end">
                      {form.formState.errors.livingRooms && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.livingRooms.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-1/2 px-2 space-y-3">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <label className="w-[130px] text-base flex justify-end">
                        Half Bathrooms
                      </label>
                      <Input
                        id="fullBathrooms"
                        type="number"
                        placeholder="# of Full Bathrooms"
                        {...form.register("fullBathrooms", {
                          valueAsNumber: true,
                        })}
                        className="h-12 w-full flex-1 bg-white text-base"
                      />
                    </div>
                    <div className="w-full flex justify-end">
                      {form.formState.errors.fullBathrooms && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.fullBathrooms.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <label className="w-[130px] text-base flex justify-end">
                        Square Feet
                      </label>
                      <Input
                        id="squareFeet"
                        type="number"
                        placeholder="Square Feet"
                        {...form.register("squareFeet", {
                          valueAsNumber: true,
                        })}
                        className="h-12 w-full flex-1 bg-white text-base"
                      />
                    </div>
                    <div className="w-full flex justify-end">
                      {form.formState.errors.squareFeet && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.squareFeet.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full gap-2 flex flex-col mt-10">
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                disabled={isloading}
                className="bg-primary rounded-lg h-[42px] w-[192px] text-white"
              >
                {isloading ? (
                  <div className="w-16 h-16">
                    <DynamicLottie
                      options={LoadingOptions}
                      isClickToPauseDisabled={true}
                    />
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-center">
                    Start New Project
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
