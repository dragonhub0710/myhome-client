import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Folder, HardDrive, LogOut, Settings, User } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { authAtom } from "@/src/atoms/authAtom";
import { supabase } from "@/src/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";

const navigation = [
  { name: "Projects", href: "/projects", icon: <Folder /> },
  { name: "Settings", href: "/settings", icon: <Settings /> },
  { name: "Deliveries", href: "/deliveries", icon: <HardDrive /> },
];

export function MainSidebar() {
  const router = useRouter();
  const pathName = usePathname();
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
    <div className="flex h-full w-60 p-5 bg-sidebar">
      <div className="flex h-full w-full flex-col p-5 rounded-xl bg-white">
        <div className="flex h-16 items-center px-6">
          <Image alt="Flipit" src="/svg/logo.svg" width={72} height={20} />
        </div>

        <div className="flex flex-1 flex-col gap-1">
          {navigation.map((item) => {
            const pathList = pathName.split("/");
            const currentTab = `/${pathList[1]}`;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3",
                    currentTab === item.href &&
                      "bg-primary rounded-full text-white"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </div>
  );
}
