"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Lock, User } from "lucide-react";
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

export default function DesignGuideTab() {
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

    const filePath = `/images/${file.name}`;
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

  return <div className="w-full p-10 flex flex-1 flex-col"></div>;
}
