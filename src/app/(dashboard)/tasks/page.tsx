"use client";

import React, { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";

const tabs = ["Mine", "Scheduled", "Team"];

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("Mine");

  return (
    <div className="flex flex-col h-full bg-zinc-50">
      {/* Header section */}
      <div className="bg-white border-b border-zinc-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Tasks</h1>
            <p className="text-sm text-zinc-500 mt-1">Manage and track all your tasks across the team.</p>
          </div>
          <Link 
            href="/new-task" 
            className="flex items-center gap-2 bg-[#5E42CD] text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:bg-[#4d36a8] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Task
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-zinc-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-all relative ${
                activeTab === tab
                  ? "text-[#5E42CD]"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5E42CD] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab.toLowerCase()} tasks...`} 
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E42CD]/20 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Empty State */}
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-indigo-50 text-[#5E42CD] rounded-2xl flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 opacity-50" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-1">No tasks found</h3>
            <p className="text-sm text-zinc-500 max-w-sm mb-6">
              You don&apos;t have any {activeTab.toLowerCase()} tasks yet. Create a new task to get started.
            </p>
            <Link 
              href="/new-task" 
              className="flex items-center gap-2 bg-white text-zinc-900 border border-zinc-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create Task
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
