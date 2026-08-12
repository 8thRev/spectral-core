"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Settings, Wrench, Target, HelpCircle, ChevronDown, CheckCircle 
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function SystemControlHubPage() {
  const [selectedApp, setSelectedApp] = useState("Processing");
  const [selectedSolvent, setSelectedSolvent] = useState("Ethanol");
  const [selectedDevice, setSelectedDevice] = useState("device-1");
  const [selectedSensor, setSelectedSensor] = useState("sensor-1");
  const [selectedLocation, setSelectedLocation] = useState("loc-1");
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [expandedCheck, setExpandedCheck] = useState<string | null>(null);

  const handleLoadModel = () => {
    setIsModelLoaded(!isModelLoaded);
  };

  const systemChecks = [
    {
      id: 'diagnostic',
      name: 'Diagnostic',
      status: 'ready',
      lastRun: '10 mins ago',
      action: 'Run',
      icon: Settings,
      color: 'text-blue-600',
    },
    {
      id: 'calibration',
      name: 'Calibration',
      status: 'warning',
      lastRun: '5 days ago',
      action: 'Calibrate',
      icon: Wrench,
      color: 'text-amber-600',
    },
    {
      id: 'reference',
      name: 'Reference',
      status: 'ready',
      lastRun: '2 days ago',
      action: 'Set Reference',
      icon: Target,
      color: 'text-purple-600',
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F5] p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-1">System Control Center</h1>
          <p className="text-sm text-zinc-500">Configure hardware, monitor system health, and manage automation settings</p>
        </div>

        {/* 1. Hardware Setup */}
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Hardware, Sensor & Location Setup</h2>
          <Card className="p-6 bg-white border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">Application</label>
                <Select value={selectedApp} onValueChange={(v) => setSelectedApp(v || "")}>
                  <SelectTrigger><SelectValue placeholder="Select app" /></SelectTrigger>
                  <SelectContent><SelectItem value="Processing">Processing</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">Solvent</label>
                <Select value={selectedSolvent} onValueChange={(v) => setSelectedSolvent(v || "")}>
                  <SelectTrigger><SelectValue placeholder="Select solvent" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ethanol">Ethanol</SelectItem>
                    <SelectItem value="Hydrocarbon">Hydrocarbon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">Device</label>
                <Select value={selectedDevice} onValueChange={(v) => setSelectedDevice(v || "")}>
                  <SelectTrigger><SelectValue placeholder="Select device" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="device-1">Extractor Alpha</SelectItem>
                    <SelectItem value="device-2">Extractor Beta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">Sensor</label>
                <Select value={selectedSensor} onValueChange={(v) => setSelectedSensor(v || "")}>
                  <SelectTrigger><SelectValue placeholder="Select sensor" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sensor-1">Flowcell - X100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-700 uppercase tracking-wider flex items-center gap-1">
                  Location <HelpCircle className="w-3 h-3 text-zinc-400" />
                </label>
                <Select value={selectedLocation} onValueChange={(v) => setSelectedLocation(v || "")}>
                  <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loc-1">Main Facility</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                onClick={handleLoadModel}
                variant={isModelLoaded ? "outline" : "default"}
                className={!isModelLoaded ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
              >
                {isModelLoaded ? 'Edit Model Configuration' : 'Load Model Configuration'}
              </Button>
              {isModelLoaded && (
                <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Model Loaded
                </div>
              )}
            </div>
          </Card>
        </section>

        {/* 2. System Health Checks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-zinc-900">System Health Checks</h2>
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <Button size="sm" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white h-7 text-xs px-3">Run Full Check</Button>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-zinc-500">Overall Health Score:</span>
              <span className="text-zinc-900">85%</span>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 uppercase">Warning</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {systemChecks.map((check) => (
              <Card key={check.id} className="p-5 bg-white border-zinc-200 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-50 flex items-center justify-center border border-zinc-100">
                      <check.icon className={`w-5 h-5 ${check.color}`} />
                    </div>
                    <h3 className="font-semibold text-zinc-900">{check.name}</h3>
                  </div>
                  {check.status === 'ready' ? (
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Healthy</Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200">Warning</Badge>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Last run</p>
                  <p className="text-sm font-medium text-zinc-900">{check.lastRun}</p>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={() => setExpandedCheck(expandedCheck === check.id ? null : check.id)}
                    className="flex items-center justify-between w-full p-2 mb-3 rounded hover:bg-zinc-50 transition-colors"
                  >
                    <span className={`text-xs font-semibold ${check.status === 'warning' ? 'text-amber-600' : 'text-blue-600'}`}>
                      {expandedCheck === check.id ? 'Hide details' : 'View details'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedCheck === check.id ? 'rotate-180' : ''} ${check.status === 'warning' ? 'text-amber-600' : 'text-blue-600'}`} />
                  </button>

                  <Button className={`w-full ${check.status === 'ready' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
                    {check.action}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Control Daily Health Checks */}
        <section>
          <Card className="p-6 bg-white border-zinc-200">
            <div className="flex items-start justify-between">
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">Control Daily Health Checks</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Newton runs all three health checks automatically at whatever time you pick — no manual
                  steps, no reminders needed. Pick a time when nothing is running and leave it. Please switch to Automatic and set your preferred time now.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${!isAutomatic ? 'text-blue-600' : 'text-zinc-500'}`}>Manual</span>
                <Switch checked={isAutomatic} onCheckedChange={setIsAutomatic} className="data-[state=checked]:bg-blue-600" />
                <span className={`text-sm font-medium ${isAutomatic ? 'text-blue-600' : 'text-zinc-500'}`}>Automatic</span>
              </div>
            </div>
            {isAutomatic && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-blue-900">Scheduled Time</h4>
                  <p className="text-xs text-blue-700 mt-1">Runs daily at 02:00 AM</p>
                </div>
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-100">
                  Edit Schedule
                </Button>
              </div>
            )}
          </Card>
        </section>

      </div>
    </div>
  );
}
