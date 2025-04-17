"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/src/lib/supabase";
import { useToast } from "@/src/hooks/use-toast";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Loading_Animation from "@/src/components/loading/light_loading.json";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

interface UserProps {
  email: string;
}

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isloading, setIsLoading] = useState(false);
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const isValid = form.formState.isValid && form.getValues("email");

  const handleSubmit = async (user: UserProps) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/update-password`,
      });
      if (error) {
        toast.error({
          title: "Invalid login credentials",
          description: "The email you entered is incorrect.",
        });
        console.error(error);
      }
    } catch (error) {
      toast.error({
        title: "Something went wrong",
        description: "Please check your internet connection and try again.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 lg:p-6">
      <div className="w-full p-10 pb-0">
        <Image alt="Flipit" src="/svg/logo.svg" width={72} height={20} />
      </div>
      <div className="w-full relative flex flex-1 items-center justify-center">
        <div className="w-full max-w-md rounded-2xl !bg-[white] p-8 space-y-8">
          <p className="text-3xl text-center font-semibold">
            Need help with your account?
          </p>
          <p className="text-sm text-center">
            Enter the email address associated with your account and we will
            send you a link to reset your password.
          </p>
          <form
            onSubmit={form.handleSubmit((data) => handleSubmit(data))}
            className="space-y-8"
          >
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              {...form.register("email")}
              className="h-14 text-base"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}

            <div className="w-full gap-2 flex flex-col">
              <Button
                type="submit"
                className="w-full h-14  rounded-xl bg-[#2365C8] text-lg font-medium text-white"
                disabled={isloading || !isValid}
              >
                {isloading ? (
                  <div className="w-16 h-16">
                    <DynamicLottie
                      options={LoadingOptions}
                      isClickToPauseDisabled={true}
                    />
                  </div>
                ) : (
                  "Send Link"
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="w-full px-10 py-6 items-center flex justify-between">
            <p className="text-base">Privacy Policy</p>
            <p className="text-base">Copyright 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
