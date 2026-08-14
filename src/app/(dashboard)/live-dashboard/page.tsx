"use client";

import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';
import { CheckCircle } from 'lucide-react';

// Mock Data for charts
const mockDataTab1 = Array.from({ length: 20 }).map((_, i) => ({
  x: 400 + i * 20, // Wavelength
  y: Math.sin(i / 3) * 2 + 3, // Attenuation
}));

const mockDataTab2 = Array.from({ length: 20 }).map((_, i) => ({
  x: i, // Time
  y: 400 + Math.random() * 50, // Wavelength
}));

export default function LiveDashboardPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleToggleRun = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="min-h-screen bg-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <span className="text-xl font-bold text-zinc-900">Live Task Dashboard</span>
          </div>
          
          <Button 
            onClick={handleToggleRun}
            className={`w-32 text-white cursor-pointer ${isRunning ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isRunning ? "End" : "Start"}
          </Button>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main Chart Area (Left) */}
          <div className="flex-1 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
            
            {/* Chart Header */}
            <div className="p-6 border-b border-zinc-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Tabs */}
              <div className="flex items-center gap-2 bg-zinc-50 p-1 rounded-lg border border-zinc-200 w-full sm:w-auto">
                {["Attenuation x Wavelength", "Attenuation x Time", "Calculations"].map((tab, idx) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex-1 sm:flex-none ${
                      activeTab === idx ? "bg-white shadow-sm text-blue-600 border border-zinc-200/50" : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Area */}
            <div className="p-6 flex-1 min-h-[400px] flex flex-col">
              <div className="flex-1 min-h-[400px]">
                {activeTab === 2 ? (
                  <div className="h-full flex items-center justify-center text-zinc-400">
                    Calculations view coming soon
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activeTab === 0 ? mockDataTab1 : mockDataTab2}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />
                      <XAxis 
                        dataKey="x" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#71717A', fontSize: 12 }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#71717A', fontSize: 12 }}
                        dx={-10}
                        label={{ 
                          value: (activeTab === 0 || activeTab === 1) ? 'Attenuation' : '', 
                          angle: -90, 
                          position: 'insideLeft',
                          fill: '#71717A',
                          style: { textAnchor: 'middle' }
                        }}
                      />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #E4E4E7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="y" 
                        stroke="#2563EB" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: '#FFFFFF', stroke: '#2563EB', strokeWidth: 2 }}
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
              
              <div className="text-sm font-medium text-zinc-900 mt-2 text-center w-full">
                  {activeTab === 0 ? "Wavelength" : activeTab === 1 ? "Time" : ""}
              </div>



            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full xl:w-80 flex flex-col gap-6">
            
            {/* Instrument Health Panel */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm flex flex-col items-center">
              <h3 className="text-sm font-semibold text-zinc-700 w-full mb-6">Instrument Health</h3>
              
              {/* Circular Gauge */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#F4F4F5" 
                    strokeWidth="10" 
                  />
                  {/* Progress Circle (e.g. 92%) */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#22C55E" 
                    strokeWidth="10" 
                    strokeDasharray="283" 
                    strokeDashoffset="22" 
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-zinc-900">92%</span>
                  <span className="text-xs font-medium text-green-600 flex items-center mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Optimal
                  </span>
                </div>
              </div>
              
              <div className="mt-8 w-full space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Sensor Status</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Last Calibrated</span>
                  <span className="font-medium text-zinc-900">2 hrs ago</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
