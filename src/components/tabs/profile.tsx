"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Lock, XIcon } from "lucide-react";
import { UpdateUser, updateUserSchema } from "@/src/schema/schema";
import { supabase } from "@/src/lib/supabase";
import { useToast } from "@/src/hooks/use-toast";
import { authAtom } from "@/src/atoms/authAtom";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import Loading_Animation from "@/src/components/loading/light_loading.json";
import ResetPasswordContent from "@/src/components/dialog/reset-password";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function ProfileTab() {
  const [auth, setAuth] = useAtom(authAtom);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);

  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const form = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (auth.user) {
      form.reset({
        firstName: auth.user.first_name,
        lastName: auth.user.last_name,
        email: auth.user.email,
        avatar: auth.user.avatar,
      });

      setImageUrl(auth.user.avatar);
    }
  }, [auth.user, form]);

  const isValid =
    form.formState.isValid &&
    form.getValues("firstName") &&
    form.getValues("lastName") &&
    form.getValues("email");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpdateProfile = async (user: UpdateUser) => {
    setIsLoading(true);
    try {
      if (auth.user.avatar) {
        await removeImage(auth.user.avatar);
      }

      const imgLink = await uploadImage();

      const { data, error } = await supabase.auth.updateUser({
        email: user.email,
        data: {
          first_name: user.firstName,
          last_name: user.lastName,
          avatar: imgLink,
        },
      });
      if (error) throw error;

      if (data) {
        const userData = data.user?.user_metadata;
        if (userData) {
          userData.id = data.user?.id;
          setAuth({ isAuthenticated: true, user: userData });
        }
        setIsEditable(false);
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

  const uploadImage = async () => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File size exceeds limit of 5 MB",
        variant: "destructive",
      });
      return;
    }

    const filePath = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      toast({
        title: "Failed uploading image",
        variant: "destructive",
      });
      console.error(error);
      return;
    }

    if (data) {
      const { data: image } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      setImageUrl(image.publicUrl);
      setFile(null);
      return image.publicUrl;
    }
  };

  const removeImage = async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("images")
        .remove([fileName]);
      if (error) throw error;
      if (data) return;
    } catch (err) {
      throw err;
    }
  };

  const handleCancelSetting = () => {
    form.reset({
      firstName: auth.user.first_name,
      lastName: auth.user.last_name,
      email: auth.user.email,
    });
    setImageUrl(auth.user.avatar);
    setIsEditable(false);
  };

  const removeImageChange = () => {
    setImageUrl("");
    setFile(null);
  };

  return (
    <div className="w-full bg-white max-w-[600px] p-10 rounded-xl flex flex-col">
      <form
        onSubmit={form.handleSubmit((data) => handleUpdateProfile(data))}
        className="space-y-10"
      >
        <div className="space-y-4">
          <div className="w-full items-end flex space-x-8">
            <div className="relative w-[100px] h-[100px]">
              {imageUrl ? (
                <Image
                  alt="user"
                  src={imageUrl}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              ) : (
                <div className="rounded-full w-[100px] h-[100px] flex items-center justify-center bg-primary">
                  <p className="text-6xl font-sans text-white">
                    {auth.user &&
                      auth.user.first_name &&
                      auth.user.first_name[0]}
                  </p>
                </div>
              )}
              {isEditable && (
                <label className="absolute cursor-pointer text-white text-base top-0 left-0 w-full h-full opacity-0 hover:opacity-50 hover:bg-black rounded-full flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white">Edit</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="invisible w-0 h-0" // Make the input invisible
                  />
                </label>
              )}
              {isEditable && (
                <div
                  onClick={removeImageChange}
                  className="absolute cursor-pointer text-white text-base top-0 right-0 w-fit h-hit opacity-50 hover:opacity-100 hover:bg-black rounded-full transition-opacity duration-300 bg-[gray]"
                >
                  <XIcon className="text-secondary" />
                </div>
              )}
            </div>
            <div className="flex-1 flex space-x-2 w-full">
              <div className="flex w-full flex-col gap-1">
                <Label className="text-base">First Name</Label>
                {auth.user && (
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    disabled={!isEditable}
                    {...form.register("firstName")}
                    className="h-12 w-full text-base bg-white disabled:!opacity-100 disabled:!cursor-default"
                  />
                )}
                {form.formState.errors.firstName && (
                  <p className="text-sm mt-[4px] text-secondary text-destructive">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex w-full flex-col gap-1">
                <Label className="text-base">Last Name</Label>
                {auth.user && (
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    disabled={!isEditable}
                    {...form.register("lastName")}
                    className="h-12 w-full text-base bg-white disabled:!opacity-100 disabled:!cursor-default"
                  />
                )}
                {form.formState.errors.lastName && (
                  <p className="text-sm mt-[4px] text-secondary text-destructive">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-1">
            <Label className="text-base">Email</Label>
            {auth.user && (
              <Input
                id="email"
                placeholder="Email"
                disabled={!isEditable}
                {...form.register("email")}
                className="h-12 w-full text-base bg-white disabled:!opacity-100 disabled:!cursor-default"
              />
            )}
            {form.formState.errors.email && (
              <p className="text-sm mt-[4px] text-secondary text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                disabled={!isEditable}
                className="flex bg-transparent hover:text-white h-12 hover:shadow items-center rounded-lg cursor-pointer w-full px-4 py-0 justify-between border-[1px]"
              >
                <div className="flex space-x-2">
                  <Lock className="text-primary !w-auto !h-6" />
                  <p className="text-base">Reset Password</p>
                </div>
                <ChevronRight />
              </Button>
            </DialogTrigger>

            <DialogContent className="p-10">
              <DialogHeader className="py-5">
                <DialogTitle className="w-full text-3xl flex justify-center">
                  Reset password
                </DialogTitle>
              </DialogHeader>
              <ResetPasswordContent setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full gap-2 flex flex-col mt-10">
          <div className="w-full flex justify-end">
            {isEditable ? (
              <div className="flex space-x-10">
                <Button
                  type="submit"
                  disabled={isloading || !isValid}
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
                    <div className="w-full flex items-center justify-center text-base">
                      Save
                    </div>
                  )}
                </Button>
                <Button
                  onClick={handleCancelSetting}
                  className="bg-transparent border-[1px] border-primary rounded-lg h-[42px] w-[192px] text-primary hover:bg-[#f0f0f0] flex items-center justify-center text-base"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditable(true)}
                className="bg-primary rounded-lg h-[42px] w-[192px] text-white flex items-center justify-center text-lg"
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
