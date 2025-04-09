"use client";

import { useAtom } from "jotai";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authAtom } from "@/src/atoms/authAtom";
import { supabase } from "@/src/lib/supabase";
import { LogOut, User } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

export const Navbar = () => {
  const router = useRouter();
  const [auth, setAuth] = useAtom(authAtom);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }
    setAuth({
      isAuthenticated: false,
      user: null,
    });
    router.push("/signin");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            flipit.
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-md hover:bg-slate-50 transition-colors inline-block"
            >
              Blog
            </Link>

            <Link
              href="/pricing"
              className="px-4 py-2 rounded-md hover:bg-slate-50 transition-colors inline-block"
            >
              Pricing
            </Link>
            <div>
              {auth.isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="w-full flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full cursor-pointer flex items-center uppercase text-white justify-center text-lg font-bold bg-primary">
                        {auth.user?.avatar ? (
                          <Image
                            alt="user"
                            src={auth.user?.avatar}
                            width={100}
                            height={100}
                            className="rounded-full"
                          />
                        ) : (
                          <User />
                        )}
                      </div>
                      <p className="text-base font-medium text-sidebar-foreground truncate">
                        {auth.user?.first_name}
                      </p>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuContent className="bg-white">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-full flex justify-between px-4"
                        onClick={handleLogout}
                      >
                        Log Out
                        <LogOut className="h-5 w-5" />
                      </Button>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenu>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    href="/signin"
                    className="px-4 py-2 rounded-md hover:bg-slate-50 transition-colors inline-block"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors inline-block"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
