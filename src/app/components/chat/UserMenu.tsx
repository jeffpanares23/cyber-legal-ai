"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  Bell,
  Bookmark,
  Home,
  FileText,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

interface UserMenuProps {
  userName: string;
}

export default function UserMenu({ userName }: UserMenuProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-white/10 transition">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.png" alt={userName} />
            <AvatarFallback className="bg-pink-500 text-white">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-white hidden sm:inline">
            {userName}
          </span>
          <ChevronDown className="w-4 h-4 text-white hidden sm:inline" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 mt-2 bg-[#1F1F2B] text-white rounded-xl shadow-lg z-50"
      >
        <DropdownMenuItem
          onClick={() => router.push("/chatbot")}
          className="cursor-pointer"
        >
          <Home className="mr-2 h-4 w-4" /> Home
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/bookmarks")}
          className="cursor-pointer"
        >
          <Bookmark className="mr-2 h-4 w-4" /> Bookmarks
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/drafts")}
          className="cursor-pointer"
        >
          <FileText className="mr-2 h-4 w-4" /> Drafts & Templates
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/alerts")}
          className="cursor-pointer"
        >
          <Bell className="mr-2 h-4 w-4" /> Alerts
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10 my-2" />

        <DropdownMenuItem
          onClick={logout}
          className="text-red-500 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
