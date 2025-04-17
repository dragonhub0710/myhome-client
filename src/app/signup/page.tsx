"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/src/hooks/use-toast";
import { insertUserSchema, InsertUser } from "@/src/schema/schema";
import { supabase } from "@/src/lib/supabase";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Loading_Animation from "@/src/components/loading/light_loading.json";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function SignUpPage() {
  const { toast } = useToast();
  const router = useRouter();
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

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    mode: "onChange",
  });

  const isValid =
    form.formState.isValid &&
    form.getValues("firstName") &&
    form.getValues("lastName") &&
    form.getValues("email") &&
    form.getValues("password");

  const handleRegister = async (user: InsertUser) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            first_name: user.firstName,
            last_name: user.lastName,
            account_status: true,
            avatar: "",
          },
        },
      });
      if (error) {
        toast.error({
          title: "Something went wrong",
          description: "Please check your internet connection and try again.",
        });
      }
      if (data) {
        router.push("/");
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
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col items-center p-2 lg:p-6 relative">
        <div className="w-full p-10">
          <Image alt="Flipit" src="/svg/logo.svg" width={72} height={20} />
        </div>
        <div className="w-full max-w-sm lg:max-w-md flex flex-col gap-8">
          <div className="w-full flex flex-col items-center gap-3 justify-center">
            <p className="text-3xl font-semibold">Sign up for an account</p>
            <p className="text-base font-normal text-[#4D4D4D]">
              Flip houses like a pro!
            </p>
          </div>
          <div className="w-full flex justify-between gap-3">
            <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}>
              <Button
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
            </a>
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
              onSubmit={form.handleSubmit((data) => handleRegister(data))}
              className="space-y-10"
            >
              <div className="space-y-4">
                <div className="w-full flex gap-3">
                  <div className="flex flex-col">
                    <Input
                      id="firstName"
                      placeholder="First Name"
                      {...form.register("firstName")}
                      className="h-14 w-full bg-white text-base"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm mt-[4px] text-destructive">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Input
                      id="lastName"
                      placeholder="Last Name"
                      {...form.register("lastName")}
                      className="h-14 w-full bg-white text-base"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm mt-[4px] text-destructive">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <Input
                    id="email"
                    placeholder="Email address"
                    {...form.register("email")}
                    className="h-14 w-full bg-white text-base"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm mt-[4px] text-destructive">
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
                      className="h-14 w-full bg-white text-base pr-14"
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
                    <p className="text-sm mt-[4px] text-destructive">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex w-full items-center text-sm space-x-2">
                  <p className="text-[#718096]">
                    By creating an account, you are agreeing to our{" "}
                    <strong>Privacy Policy</strong> and{" "}
                    <strong>Terms of Use</strong>.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 mt-10 rounded-xl bg-primary text-lg font-medium text-white"
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
                  "Sign Up"
                )}
              </Button>

              <div className="flex justify-center text-sm">
                Already have an account?
                <Link
                  href="/signin"
                  className="text-primary ml-2 font-medium hover:text-primary"
                >
                  Sign In
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
