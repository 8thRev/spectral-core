"use client";

import React from 'react';
import { 
  Search, 
  Box, 
  Home, 
  Play, 
  Activity, 
  Settings, 
  Database, 
  Sliders, 
  Target,
  Folder,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function GlobalHeader() {
  const pathname = usePathname();
  
  // Split pathname and filter out empty strings
  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];

  // Helper to format breadcrumb names (e.g. "live-dashboard" -> "Live Dashboard")
  const formatSegment = (segment: string) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getIconForSegment = (segment: string) => {
    switch (segment.toLowerCase()) {
      case 'new-task': return Play;
      case 'tasks': return Play;
      case 'live-dashboard': return Activity;
      case 'methods': return Settings;
      case 'data-review': return Database;
      case 'systemcontrolhub': return Sliders;
      case 'admin': return Target;
      case 'models': return Box;
      default: return Folder;
    }
  };

  return (
    <header className="h-14 border-b border-zinc-200 bg-white flex items-center justify-between px-4 shrink-0 overflow-hidden">
      <div className="flex items-center gap-2 md:gap-6 min-w-0">
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button 
            className="md:hidden p-1.5 -ml-1.5 text-zinc-500 hover:text-zinc-900 transition-colors rounded-md hover:bg-zinc-100"
            onClick={() => window.dispatchEvent(new Event('toggleMobileSidebar'))}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Logo matching Sidebar */}
          <Link href="/" className="flex items-center justify-center min-w-8 w-8 h-8 rounded-lg bg-[#5E42CD] text-white shadow-sm shrink-0">
            <Box className="w-4 h-4" />
          </Link>
          
          {/* Breadcrumbs */}
          <nav className="text-sm text-zinc-500 font-medium hidden sm:block truncate">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-zinc-900 transition-colors flex items-center gap-1.5">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </li>
              
              {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                const isLast = index === pathSegments.length - 1;
                const Icon = getIconForSegment(segment);
                
                return (
                  <React.Fragment key={href}>
                    <li className="text-zinc-400">/</li>
                    <li>
                      {isLast ? (
                        <span className="text-zinc-900 flex items-center gap-1.5">
                          <Icon className="w-4 h-4" />
                          {formatSegment(segment)}
                        </span>
                      ) : (
                        <Link href={href} className="hover:text-zinc-900 transition-colors flex items-center gap-1.5">
                          <Icon className="w-4 h-4" />
                          {formatSegment(segment)}
                        </Link>
                      )}
                    </li>
                  </React.Fragment>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-[150px] md:max-w-xs md:w-74 ml-0 md:ml-2">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5E42CD]/20 transition-all"
          />
        </div>
      </div>
    </header>
  );
}
