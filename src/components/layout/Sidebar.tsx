"use client";

import React, { useState, useEffect } from "react";
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
  ChevronDown,
  Bell,
  MessageCircle,
  Link2,
  Settings,
  Database,
  Sliders,
  ListTodo,
  PlusCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type NavItem = {
  name: string;
  href?: string;
  icon: React.ElementType;
  color?: string;
  subItems?: { name: string; href: string; icon: React.ElementType; color?: string }[];
};

const navItems: NavItem[] = [
  { 
    name: "Tasks", 
    icon: Play,
    color: "text-blue-500",
    subItems: [
      { name: "All Tasks", href: "/tasks", icon: ListTodo, color: "text-blue-500" },
      { name: "New Task", href: "/new-task", icon: PlusCircle, color: "text-emerald-500" }
    ]
  },
  { name: "Live Dashboard", href: "/live-dashboard", icon: Activity, color: "text-rose-500" },
  { name: "Method", href: "/methods", icon: Settings, color: "text-amber-500" },
  { name: "Data Review", href: "/data-review", icon: Database, color: "text-cyan-500" },
  { name: "System Control Hub", href: "/SystemControlHub", icon: Sliders, color: "text-purple-500" },
  { name: "Admin", href: "/admin", icon: Target, color: "text-orange-500" },
  { name: "Models", href: "/models", icon: Box, color: "text-pink-500" },
];

const bottomNavItems = [
  { name: "Notifications", href: "#", icon: Bell, color: "text-yellow-500" },
  { name: "Support", href: "/help-center", icon: MessageCircle, color: "text-teal-500" },
  { name: "Settings", href: "/Settings", icon: Link2, color: "text-slate-500" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const toggle = () => setIsMobileOpen(prev => !prev);
    
    window.addEventListener('toggleMobileSidebar', toggle);
    
    // Close sidebar on route change for mobile
    return () => {
      window.removeEventListener('toggleMobileSidebar', toggle);
    };
  }, []);

  useEffect(() => {
    // Close mobile sidebar when pathname changes
    Promise.resolve().then(() => {
      setIsMobileOpen(false);
    });
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

      <aside 
        className={`fixed md:relative z-50 h-full flex flex-col bg-white border-r border-zinc-100 overflow-visible shrink-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "md:w-[88px]" : "md:w-[280px]"
        } ${
          isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Collapse Toggle Button (Desktop only) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-20 bg-white border border-zinc-200 rounded-full p-1 text-zinc-400 hover:text-zinc-900 shadow-sm z-50 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

      <div className="p-5 flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* Search */}
        <div className={`relative mb-1 ${isCollapsed ? "hidden" : "block"}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-50/80 border-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5E42CD]/20 transition-all"
          />
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1.5 flex-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            if (item.subItems) {
              const isSubActive = item.subItems.some(sub => pathname === sub.href);
              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => setIsTasksOpen(!isTasksOpen)}
                    className={`w-full flex items-center justify-between py-2 rounded-xl text-sm font-medium cursor-pointer transition-all ${
                      isCollapsed ? "justify-center px-0" : "px-3"
                    } ${
                      isSubActive 
                        ? "bg-indigo-50/50 text-[#5E42CD]" 
                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 shrink-0 transition-colors ${isSubActive ? "text-[#5E42CD]" : item.color || "text-zinc-400"}`} />
                      {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${isTasksOpen ? "rotate-180" : "rotate-0"} ${isSubActive ? "text-[#5E42CD]" : "text-zinc-400"}`} />
                    )}
                  </button>
                  
                  {isTasksOpen && !isCollapsed && (
                    <div className="pl-6 pr-2 space-y-1 mt-1 border-l-2 border-zinc-100 ml-5">
                      {item.subItems.map((subItem) => {
                        const isSubItemActive = pathname === subItem.href;
                        const SubIcon = subItem.icon;
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`flex items-center gap-3 py-2 rounded-lg text-sm font-medium transition-all px-3 ${
                              isSubItemActive 
                                ? "bg-indigo-50/50 text-[#5E42CD]" 
                                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                            }`}
                          >
                            <SubIcon className={`h-4 w-4 shrink-0 transition-colors ${isSubItemActive ? "text-[#5E42CD]" : subItem.color || "text-zinc-400"}`} />
                            <span className="whitespace-nowrap">{subItem.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            
            const isActive = pathname === item.href || (pathname === "/" && item.href === "/home");
            return (
              <Link
                key={item.name}
                href={item.href!}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 py-1 rounded-xl text-sm font-medium transition-all ${
                  isCollapsed ? "justify-center px-0" : "px-3"
                } ${
                  isActive 
                    ? "bg-indigo-50/50 text-[#5E42CD]" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-[#5E42CD]" : item.color || "text-zinc-400"}`} />
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
                className={`flex items-center gap-3 py-1 rounded-xl text-sm font-medium transition-all ${
                  isCollapsed ? "justify-center px-0" : "px-3"
                } ${
                  isActive 
                    ? "bg-indigo-50/50 text-[#5E42CD]" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-[#5E42CD]" : item.color || "text-zinc-400"}`} />
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
    </>
  );
}
