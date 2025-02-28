/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/src/lib/supabase";
import { useToast } from "@/src/hooks/use-toast";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Loading_Animation from "@/src/components/loading/light_loading.json";
import { ResetPassword, resetPasswordSchema } from "@/src/schema/schema";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

type ResetPasswordProps = {
  setOpen: (open: boolean) => void;
};

export default function ResetPasswordContent({ setOpen }: ResetPasswordProps) {
  const { toast } = useToast();
  const [isloading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordRequired, setOldPasswordRequired] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
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

  const handleChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setOldPasswordRequired(true);
    }
    setOldPassword(e.target.value);
  };

  const handleResetPassword = async (passwords: ResetPassword) => {
    if (oldPasswordRequired) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: passwords.newPassword,
      });
      if (error) {
        toast({
          title: "Invalid credentials",
          variant: "destructive",
        });
        console.error(error);
      }
      if (data) {
        setOpen(false);
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
    <div className="w-full flex flex-col space-y-8">
      <div>
        <form
          onSubmit={form.handleSubmit((data) => handleResetPassword(data))}
          className="space-y-10"
        >
          <div className="w-full flex-col flex space-y-4">
            <div className="flex flex-col">
              <div className="relative">
                <Input
                  placeholder="Old Password"
                  onChange={handleChangeOldPassword}
                  type={showOldPassword ? "text" : "password"}
                  className="h-14 w-full bg-white text-base pr-14"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute w-6 p-0 right-4 top-1/2 -translate-y-1/2"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <EyeOff className="!h-5 !w-5" />
                  ) : (
                    <Eye className="!h-5 !w-5" />
                  )}
                </Button>
              </div>
              {oldPasswordRequired && (
                <p className="text-sm mt-[4px] text-destructive text-[#EA2D38]">
                  Old Password is required
                </p>
              )}
            </div>
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
    </div>
  );
}
