/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/src/lib/supabase";
import { useToast } from "@/src/hooks/use-toast";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Loading_Animation from "@/src/components/loading/light_loading.json";
import { ResetPassword, resetPasswordSchema } from "@/src/schema/schema";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading_Animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const form = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const isValid =
    form.formState.isValid &&
    form.getValues("newPassword") &&
    form.getValues("confirmPassword");

  const handleSubmit = async (user: any) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: user.newPassword,
      });
      if (error) {
        toast({
          title: "Invalid credentials",
          variant: "destructive",
        });
        console.error(error);
      }
      if (data) {
        router.push("/signin");
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

  return (
    <div className="min-h-screen flex flex-col p-4 lg:p-6">
      <div className="w-full p-10 pb-0">
        <Image alt="Flipit" src="/svg/logo.svg" width={72} height={20} />
      </div>
      <div className="relative w-full flex flex-1 items-center justify-center">
        <div className="w-full max-w-md rounded-2xl !bg-[white] p-8 space-y-8">
          <p className="text-3xl text-center font-semibold">
            Update Your Password
          </p>
          <p className="text-sm text-center">
            Fill in the required fields to update your password.
          </p>
          <form
            onSubmit={form.handleSubmit((data) => handleSubmit(data))}
            className="space-y-10"
          >
            <div className="w-full flex-col flex space-y-4">
              <div className="flex flex-col">
                <div className="relative">
                  <Input
                    id="newPassword"
                    placeholder="New Password"
                    type={showNewPassword ? "text" : "password"}
                    {...form.register("newPassword")}
                    className="h-14 w-full bg-white text-base pr-14"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute w-6 p-0 right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="!h-5 !w-5" />
                    ) : (
                      <Eye className="!h-5 !w-5" />
                    )}
                  </Button>
                </div>
                {form.formState.errors.newPassword && (
                  <p className="text-sm mt-[4px] text-destructive text-[#EA2D38]">
                    {form.formState.errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    placeholder="Repeat Password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...form.register("confirmPassword")}
                    className="h-14 w-full bg-white text-base pr-14"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute w-6 p-0 right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="!h-5 !w-5" />
                    ) : (
                      <Eye className="!h-5 !w-5" />
                    )}
                  </Button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm mt-[4px] text-destructive text-[#EA2D38]">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
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
                    <div className="w-full justify-center flex items-center gap-2">
                      Reset Password
                    </div>
                  )}
                </Button>
              </div>
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
