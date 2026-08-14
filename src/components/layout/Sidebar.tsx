"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Play,
  Activity,
  Target,
  LogOut,
  Search,
  Box,
  ChevronLeft,
  ChevronRight,
  Bell,
  MessageCircle,
  Link2,
  Settings,
  Database,
  Sliders,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: "Start New Task", href: "/new-task", icon: Play },
  { name: "Live Dashboard", href: "/live-dashboard", icon: Activity },
  { name: "Method", href: "/methods", icon: Settings },
  { name: "Data Review", href: "/data-review", icon: Database },
  { name: "System Control Hub", href: "/SystemControlHub", icon: Sliders },
  { name: "Admin", href: "/admin", icon: Target },
  { name: "Models", href: "/models", icon: Box },
];

const bottomNavItems = [
  { name: "Notifications", href: "#", icon: Bell },
  { name: "Support", href: "/help-center", icon: MessageCircle },
  { name: "Settings", href: "/Settings", icon: Link2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  return (
    <aside 
      className={`relative h-full flex flex-col bg-white border-r border-zinc-100 overflow-visible shrink-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-[88px]" : "w-[280px]"
      }`}
    >
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-white border border-zinc-200 rounded-full p-1 text-zinc-400 hover:text-zinc-900 shadow-sm z-50 transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="p-5 flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar">
        
        {/* Logo */}
        <div className={`flex items-center mb-8 ${isCollapsed ? "justify-center" : "gap-3"}`}>
          <Link href="/" className="flex items-center justify-center min-w-10 w-10 h-10 rounded-xl bg-[#5E42CD] text-white shadow-sm shrink-0">
            <Box className="w-6 h-6" />
          </Link>
          {!isCollapsed && (
            <Link href="/" className="font-bold text-lg text-zinc-900 whitespace-nowrap">
              Newton
            </Link>
          )}
        </div>

        {/* Search */}
        <div className={`relative mb-6 ${isCollapsed ? "hidden" : "block"}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-zinc-50/80 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5E42CD]/20 transition-all"
          />
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1.5 flex-1 mt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname === "/" && item.href === "/home");
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isCollapsed ? "justify-center px-0" : "px-3"
                } ${
                  isActive 
                    ? "bg-indigo-50/50 text-[#5E42CD]" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-[#5E42CD]" : "text-zinc-400"}`} />
                {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="mt-8 space-y-1.5">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isCollapsed ? "justify-center px-0" : "px-3"
                } ${
                  isActive 
                    ? "bg-indigo-50/50 text-[#5E42CD]" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-[#5E42CD]" : "text-zinc-400"}`} />
                {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* User Profile */}
        <div className={`mt-6 transition-all ${isCollapsed ? "flex justify-center" : ""}`}>
          <div className={`flex items-center gap-3 rounded-xl p-2 transition-all ${isCollapsed ? "bg-transparent p-0" : "bg-zinc-50/80 hover:bg-zinc-100"}`}>
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden flex justify-between items-center pr-1">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-zinc-900 truncate">Anita Cruz</span>
                  <span className="text-xs text-zinc-500 truncate">anita@untitledui.com</span>
                </div>
                <button onClick={handleLogout} className="text-zinc-400 hover:text-rose-500 transition-colors p-1" title="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </aside>
  );
}
