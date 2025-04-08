"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { authAtom } from "@/src/atoms/authAtom";
import { useToast } from "@/src/hooks/use-toast";
import { supabase } from "@/src/lib/supabase";

const publicRoutes = [
  "/",
  "/blog",
  "/pricing",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/signin",
  "/signup",
  "/forgot-password",
  "/update-password",
  "/not-found",
  "/verification",
];

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const setAuth = useAtom(authAtom)[1];
  const memoizedPublicRoutes = useMemo(() => publicRoutes, []);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (!data.session) {
          router.push("/signin");
          return;
        }

        const userData = data.session.user.user_metadata;
        if (userData) {
          setAuth({
            isAuthenticated: true,
            user: { ...userData, id: data.session.user.id },
          });
        }
      } catch (error) {
        toast({
          title: "Authentication Error",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
        console.error("Auth validation error:", error);
      }
    };

    const basePath = `/${pathName.split("/")[1]}`;
    const isProtectedRoute = !memoizedPublicRoutes.includes(basePath);

    if (isProtectedRoute) {
      validateAuth();
    }
  }, [pathName, memoizedPublicRoutes, router, setAuth, toast]);

  return <>{children}</>;
};

export default AuthProvider;
