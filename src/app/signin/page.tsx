/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/src/hooks/use-toast";
import { signinSchema } from "@/src/schema/schema";
import { supabase } from "@/src/lib/supabase";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Checkbox } from "@/src/components/ui/checkbox";
import Loading_Animation from "@/src/components/loading/light_loading.json";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
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
    resolver: zodResolver(signinSchema.pick({ email: true, password: true })),
    mode: "onChange",
  });

  const isValid =
    form.formState.isValid &&
    form.getValues("email") &&
    form.getValues("password");

  const handleSignIn = async (user: any) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if (error) {
        toast({
          title: "Invalid login credentials",
          variant: "destructive",
        });
      }
      if (data) {
        router.push("/");
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

  const handleSignInByGoogle = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/auth/callback`,
        },
      });
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col items-center p-2 lg:p-6 relative">
        <div className="w-full p-10">
          <Image alt="Flipit" src="/svg/logo.svg" width={72} height={20} />
        </div>
        <div className="w-full max-w-sm lg:max-w-md flex flex-col gap-8">
          <div className="w-full flex flex-col items-center gap-3 justify-center">
            <p className="text-3xl font-semibold">Sign in to Flipit</p>
            <p className="text-base font-normal text-[#4D4D4D]">
              Flip houses like a pro!
            </p>
          </div>
          <div className="w-full flex justify-between gap-3">
            <Button
              onClick={() => handleSignInByGoogle()}
              variant="outline"
              className="w-[205px] h-14 bg-white rounded-xl text-sm lg:text-base font-medium"
            >
              <Image
                alt="google"
                src="/svg/google.svg"
                width={22}
                height={22}
              />
              Sign In With Google
            </Button>
            <Button
              variant="outline"
              className="w-[200px] h-14 bg-white rounded-xl text-sm lg:text-base font-medium"
            >
              <Image alt="apple" src="/svg/apple.svg" width={22} height={22} />
              Sign In With Apple
            </Button>
          </div>
          <div className="w-full h-6 flex items-center justify-between">
            <div className="border-[1px] border-[#E2E8F0] w-32 lg:w-36"></div>
            <p className="text-[#4D4D4D]">Or with email</p>
            <div className="border-[1px] border-[#E2E8F0] w-32 lg:w-36"></div>
          </div>

          <div>
            <form
              onSubmit={form.handleSubmit((data) => handleSignIn(data))}
              className="space-y-10"
            >
              <div className="space-y-4">
                <div className="flex flex-col">
                  <Input
                    id="email"
                    placeholder="Email address"
                    {...form.register("email")}
                    className="h-14 w-full bg-white rounded-lg text-base"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm mt-[4px] text-[#EA2D38] text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      {...form.register("password")}
                      className="h-14 w-full text-base bg-white pr-14"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute w-6 p-0 right-4 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="!h-5 !w-5" />
                      ) : (
                        <Eye className="!h-5 !w-5" />
                      )}
                    </Button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-sm mt-[4px] text-destructive text-[#EA2D38]">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      className="bg-[#2365C8] text-white rounded-full w-5 h-5"
                    />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-[#2365C8] text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-14 mt-20 rounded-xl bg-[#2365C8] text-lg font-medium text-white"
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
                  "Sign In"
                )}
              </Button>

              <div className="flex justify-center text-sm">
                Don’t have an account?
                <Link
                  href="/signup"
                  className="text-primary ml-2 font-medium hover:text-[#2365C8]"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 bg-image items-center justify-center p-8"></div>
    </div>
  );
}
