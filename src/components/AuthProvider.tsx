/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { authAtom } from "@/src/atoms/authAtom";
import { useToast } from "@/src/hooks/use-toast";
import { supabase } from "@/src/lib/supabase";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const setAuth = useAtom(authAtom)[1];
  const routes = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/update-password",
    "/not-found",
    "/verification",
  ];

  useEffect(() => {
    const pathList = pathName.split("/");
    const currentPage = `/${pathList[1]}`;
    if (!routes.includes(currentPage)) loadUser();
  }, [pathName]);

  const loadUser = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (data) {
        const userData = data.session?.user.user_metadata;
        if (userData) {
          userData.id = data.session?.user.id;
          setAuth({ isAuthenticated: true, user: userData });
        }
        if (!data.session) {
          router.push("/signin");
        }
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      toast({
        title: "A network error occurred",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return children;
};

export default AuthProvider;
