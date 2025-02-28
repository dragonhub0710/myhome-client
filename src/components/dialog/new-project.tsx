/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useAtom, useAtomValue } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectAtom } from "@/src/atoms/projectAtom";
import { authAtom } from "@/src/atoms/authAtom";
import { supabase } from "@/src/lib/supabase";
import { useToast } from "@/src/hooks/use-toast";
import { CreateProject, createProjectSchema } from "@/src/schema/schema";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Loading_Animation from "@/src/components/loading/light_loading.json";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

type NewProjectProps = {
  setOpen: (open: boolean) => void;
};

export default function NewProjectContent({ setOpen }: NewProjectProps) {
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

  const form = useForm<CreateProject>({
    resolver: zodResolver(createProjectSchema),
    mode: "onChange",
  });

  const isValid =
    form.formState.isValid &&
    form.getValues("name") &&
    form.getValues("fullBathrooms") &&
    form.getValues("halfBathrooms") &&
    form.getValues("livingRooms") &&
    form.getValues("squareFeet");

  const handleCreateProject = async (project: CreateProject) => {
    setIsLoading(true);
    try {
      const { data, error: createError } = await supabase
        .from("projects")
        .insert({
          user_id: auth.user?.id,
          name: project.name,
          full_bathrooms: project.fullBathrooms,
          half_bathrooms: project.halfBathrooms,
          living_rooms: project.livingRooms,
          square_feet: project.squareFeet,
          status: false,
          input_form: false,
          phase1: false,
          phase2: false,
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
        .eq("user_id", auth.user?.id)
        .order(projectList.sortField, {
          ascending: projectList.sortDirection,
        });
      if (error) throw error;

      setProjectList({
        list: rows,
        sortField: projectList.sortField,
        sortDirection: projectList.sortDirection,
      });
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
            <div className="w-full flex-col flex space-y-4">
              <div className="flex flex-col">
                <Input
                  id="name"
                  placeholder="Project Name"
                  {...form.register("name")}
                  className="h-14 w-full bg-white text-base"
                />
                {form.formState.errors.name && (
                  <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex space-x-4">
                <div className="gap-2">
                  <Input
                    id="fullBathrooms"
                    placeholder="# of Full Bathrooms"
                    {...form.register("fullBathrooms")}
                    className="h-14 w-full bg-white text-base"
                  />
                  {form.formState.errors.fullBathrooms && (
                    <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                      {form.formState.errors.fullBathrooms.message}
                    </p>
                  )}
                </div>
                <div className="gap-2">
                  <Input
                    id="halfBathrooms"
                    placeholder="# of Half Bathrooms"
                    {...form.register("halfBathrooms")}
                    className="h-14 w-full bg-white text-base"
                  />
                  {form.formState.errors.halfBathrooms && (
                    <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                      {form.formState.errors.halfBathrooms.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="gap-2">
                  <Input
                    id="livingRooms"
                    placeholder="# of Living Rooms"
                    {...form.register("livingRooms")}
                    className="h-14 w-full bg-white text-base"
                  />
                  {form.formState.errors.livingRooms && (
                    <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                      {form.formState.errors.livingRooms.message}
                    </p>
                  )}
                </div>
                <div className="gap-2">
                  <Input
                    id="squareFeet"
                    placeholder="Square Feet"
                    {...form.register("squareFeet")}
                    className="h-14 w-full bg-white text-base"
                  />
                  {form.formState.errors.squareFeet && (
                    <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                      {form.formState.errors.squareFeet.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full gap-2 flex flex-col mt-10">
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                disabled={isloading || !isValid}
                className="bg-[#2365C8] rounded-lg h-[42px] w-[192px] text-white"
              >
                {isloading ? (
                  <div className="w-16 h-16">
                    <DynamicLottie
                      options={LoadingOptions}
                      isClickToPauseDisabled={true}
                    />
                  </div>
                ) : (
                  <div className="w-full flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center border-2 border-white rounded-lg">
                      <Plus className="h-4 w-4 text-white" />
                    </div>
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
