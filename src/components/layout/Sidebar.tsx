"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home,
  Database,
  Play,
  Activity,
  BarChart3,
  FileText,
  BarChart2,
  Cpu,
  Target,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  CheckSquare,
  Sliders
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Start Extraction Run", href: "/no-sensor-mode/start-run", icon: Play },
  { name: "Live Extraction Dashboard", href: "/ProcessingDashboard", icon: Activity },
  { name: "Post Processing", href: "/post-processing", icon: CheckSquare },
  { name: "Batch History", href: "/batch-history", icon: Database },
  { name: "Performance Analytics", href: "/PerformanceAnalytics", icon: BarChart3 },
  { name: "Manager Dashboard", href: "/managerdashboard", icon: BarChart3 },
  { name: "Run Data", href: "/RunData", icon: FileText },
  { name: "Run Analyzer", href: "/run-analyzer", icon: BarChart2 },
  { name: "Digital Extraction Tools", href: "/simulation/process-type", icon: Cpu },
  { name: "System Control Hub", href: "/SystemControlHub", icon: Sliders },
  { name: "Set Production Targets", href: "/PerformanceAnalytics?tab=goal", icon: Target },
  { name: "Admin Panel", href: "/admin-panel", icon: Target },
];

const bottomNavItems = [
  { name: "Help Center", href: "/help-center", icon: HelpCircle },
  { name: "Settings", href: "/Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  return (
    <aside className="w-[260px] h-full flex flex-col bg-white border-r border-zinc-100 overflow-y-auto shrink-0">
      <div className="p-6">
        {/* Logo and User */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <div className="w-6 h-6 rounded border-2 border-zinc-900 bg-white" />
            <span>Newton</span>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>Otake</AvatarFallback>
          </Avatar>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-200"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100">
            /
          </kbd>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname === "/" && item.href === "/home");
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-zinc-100 text-zinc-900" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-zinc-900" : "text-zinc-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-zinc-100 text-zinc-900" 
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-zinc-900" : "text-zinc-400"}`} />
              {item.name}
            </Link>
          );
        })}
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors mt-2"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
