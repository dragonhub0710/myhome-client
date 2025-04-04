"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/src/components/ui/button";
import { useAtomValue } from "jotai";
import { useForm } from "react-hook-form";
import { authAtom } from "@/src/atoms/authAtom";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/src/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/src/schema/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import Loading_Animation from "@/src/components/loading/light_loading.json";
import {
  AMAZON_WEBSITE_LABEL,
  HOMEDEPOT_WEBSITE_LABEL,
  LOWES_WEBSITE_LABEL,
} from "@/src/constants/constants";

const DynamicLottie = dynamic(() => import("react-lottie"), {
  ssr: false,
});

export default function IntegrationTab() {
  const [openConnect, setOpenConnect] = useState(false);
  const [openDisconnect, setOpenDisconnect] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [websiteName, setWebsiteName] = useState(AMAZON_WEBSITE_LABEL);
  const userData = useAtomValue(authAtom);
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

  const handleAmazonCredentials = () => {
    setWebsiteName(AMAZON_WEBSITE_LABEL);
    if (userData.user && userData.user.amazon_email) {
      setOpenDisconnect(true);
    } else {
      setOpenConnect(true);
    }
  };

  const handleLowesCredentials = () => {
    // setWebsiteName(LOWES_WEBSITE_LABEL)
    // setOpen(true);
  };

  const handleHomeDepotCredentials = () => {
    // setWebsiteName(HOMEDEPOT_WEBSITE_LABEL)
    // setOpen(true);
  };

  const disconnectWebsite = async () => {
    try {
      const updatedData = userData.user;
      if (websiteName === AMAZON_WEBSITE_LABEL) {
        updatedData.amazon_email = "";
        updatedData.amazon_password = "";
      } else if (websiteName === LOWES_WEBSITE_LABEL) {
        updatedData.lowes_email = "";
        updatedData.lowes_password = "";
      } else if (websiteName === HOMEDEPOT_WEBSITE_LABEL) {
        updatedData.homedepot_email = "";
        updatedData.homedepot_password = "";
      }

      setIsLoading(true);
      await supabase.auth.updateUser({
        data: updatedData,
      });
      setOpenDisconnect(false);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white max-w-[600px] p-10 space-y-8 rounded-xl flex flex-col">
      <p className="text-xl font-semibold mx-1">Available Integrations</p>
      <div className="w-full rounded-xl p-5 border-[1px]">
        <div className="w-full flex justify-between">
          <Image
            alt="amazon"
            src="/img/amazon.png"
            width={86}
            height={26}
            className="!h-[26px]"
          />
          <Button
            onClick={handleAmazonCredentials}
            className="text-white text-base bg-[#2365C8] w-[113px] h-10"
          >
            {userData.user && userData.user.amazon_email
              ? "Disconnect"
              : "Connect"}
          </Button>
        </div>
        {userData.user && userData.user.amazon_email && (
          <p className="w-full flex justify-end text-sm">
            Connected as {userData.user && userData.user.amazon_email}
          </p>
        )}
        <p className="w-full text-xl font-medium">Integration with Amazon</p>
        <p className="w-full text-sm">
          You need to connect your Amazon account for adding Amazon products
          into your cart.
        </p>
      </div>
      <div className="w-full rounded-xl p-5 h-[128px] border-[1px]">
        <div className="w-full flex justify-between">
          <Image
            alt="amazon"
            src="/img/lowe.png"
            width={86}
            height={26}
            className="!h-[26px]"
          />
          <Button
            onClick={handleLowesCredentials}
            className="text-white text-base bg-[#2365C8] w-[113px] h-10"
          >
            {userData.user && userData.user.lowes_email
              ? "Disconnect"
              : "Connect"}
          </Button>
        </div>
        <p className="w-full text-xl font-medium">Integration with Lowes</p>
        <p className="w-full text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="w-full rounded-xl p-5 h-[128px] border-[1px]">
        <div className="w-full flex justify-between">
          <Image
            alt="amazon"
            src="/img/homedepot.png"
            width={33}
            height={32}
            className="!h-[32px]"
          />
          <Button
            onClick={handleHomeDepotCredentials}
            className="text-white text-base bg-[#2365C8] w-[113px] h-10"
          >
            {userData.user && userData.user.homedepot_email
              ? "Disconnect"
              : "Connect"}
          </Button>
        </div>
        <p className="w-full text-xl font-medium">
          Integration with Home Depot
        </p>
        <p className="w-full text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <Dialog open={openConnect} onOpenChange={setOpenConnect}>
        <DialogContent className="w-full max-w-[500px] px-10 py-5">
          <DialogHeader>
            <DialogTitle className="w-full max-w-[300px] text-2xl text-center flex justify-center mx-auto">
              Please enter your {websiteName} credentials
            </DialogTitle>
          </DialogHeader>
          <div className="mt-5">
            <form className="space-y-2">
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
              <div className="flex pt-10 justify-center space-x-4">
                <Button
                  type="submit"
                  className="w-[120px] h-10 rounded-lg bg-[#2365C8] text-base font-medium text-white"
                  disabled={isloading || !isValid}
                >
                  {isloading ? (
                    <div className="w-8 h-8">
                      <DynamicLottie
                        options={LoadingOptions}
                        isClickToPauseDisabled={true}
                      />
                    </div>
                  ) : (
                    "Connect"
                  )}
                </Button>
                <Button
                  onClick={() => setOpenConnect(false)}
                  className="w-[120px] h-10 rounded-lg bg-[#2365C8] text-base font-medium text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openDisconnect} onOpenChange={setOpenDisconnect}>
        <DialogContent className="w-full max-w-[500px] px-10 py-5">
          <DialogHeader>
            <DialogTitle className="w-full max-w-[300px] text-2xl text-center flex justify-center mx-auto">
              Are you really trying to disconnect from {websiteName}?
            </DialogTitle>
          </DialogHeader>
          <div className="mt-5">
            <div className="flex pt-10 justify-center space-x-4">
              <Button
                onClick={disconnectWebsite}
                className="w-[120px] h-10 rounded-lg bg-[#2365C8] text-base font-medium text-white"
                disabled={isloading}
              >
                {isloading ? (
                  <div className="w-8 h-8">
                    <DynamicLottie
                      options={LoadingOptions}
                      isClickToPauseDisabled={true}
                    />
                  </div>
                ) : (
                  "Yes"
                )}
              </Button>
              <Button
                onClick={() => setOpenDisconnect(false)}
                className="w-[120px] h-10 rounded-lg bg-[#2365C8] text-base font-medium text-white"
              >
                No
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
