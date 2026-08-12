"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Info } from 'lucide-react';

export default function StartRunPage() {
  const router = useRouter();
  const [taskId, setTaskId] = useState('');
  const [method, setMethod] = useState('');
  const [instrument, setInstrument] = useState('');
  const [notes, setNotes] = useState('');

  const isValid = taskId.trim() !== '' && method !== '' && instrument !== '';

  const handleStart = () => {
    if (!isValid) return;

    const newTask = {
      id: taskId,
      operator: "Admin User", 
      method: method,
      status: "In Progress",
      instrument: instrument,
      notes: notes,
      startTime: new Date().toISOString(),
      ipAddress: "192.168.1.100", 
    };

    const existingTasksStr = localStorage.getItem("batchHistoryTasks");
    let tasks = [];
    if (existingTasksStr) {
      tasks = JSON.parse(existingTasksStr);
    }
    tasks.unshift(newTask);
    localStorage.setItem("batchHistoryTasks", JSON.stringify(tasks));

    router.push("/live-dashboard");
  };

  return (
    <div className="min-h-screen bg-white p-6 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Right Action Buttons */}
        <div className="flex justify-end gap-1 mb-4">
          <Button 
            onClick={handleStart}
            disabled={!isValid}
            className={`w-32 bg-blue-600 hover:bg-blue-700 text-white ${!isValid ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            Start
          </Button>
          <Button variant="outline" className="w-32 border-zinc-200 bg-white cursor-pointer">
            Schedule
          </Button>
        </div>

        {/* Main Card */}
        <div className="border border-blue-200 rounded-xl bg-white shadow-sm overflow-hidden">
          
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Play className="w-4 h-4 text-blue-500 ml-0.5" />
              </div>
              <h1 className="text-xl font-bold text-zinc-900">Task Information</h1>
              <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 font-normal hover:bg-zinc-100 border border-zinc-200 shadow-none">
                Creating
              </Badge>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Task ID */}
              <div className="space-y-1.5">
                <Label htmlFor="taskId" className="text-sm font-semibold text-zinc-900 flex items-center gap-1">
                  <span className="text-red-500">*</span> Task ID
                </Label>
                <Input 
                  id="taskId"
                  placeholder="Enter Task ID" 
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                  className="bg-zinc-50 border-zinc-200 h-10"
                />
                <p className="text-xs text-zinc-500">Unique alpha-numeric identifier for this task</p>
              </div>

              {/* Method */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-zinc-900 flex items-center gap-1">
                  <span className="text-red-500">*</span> Method
                  <Info className="w-3.5 h-3.5 text-zinc-400 ml-1" />
                </Label>
                <Select value={method} onValueChange={(v) => setMethod(v || '')}>
                  <SelectTrigger className="w-full bg-zinc-50 border-zinc-200 h-10">
                    <SelectValue placeholder="Select or add method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ethanol Extraction">Ethanol Extraction</SelectItem>
                    <SelectItem value="Hydrocarbon">Hydrocarbon</SelectItem>
                    <SelectItem value="Solventless">Solventless</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-zinc-500">Drives your run log and processes</p>
              </div>

              {/* Instrument */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-zinc-900 flex items-center gap-1">
                  <span className="text-red-500">*</span> Instrument
                  <Info className="w-3.5 h-3.5 text-zinc-400 ml-1" />
                </Label>
                <Select value={instrument} onValueChange={(v) => setInstrument(v || '')}>
                  <SelectTrigger className="w-full bg-zinc-50 border-zinc-200 h-10">
                    <SelectValue placeholder="Select instrument type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Extractor Alpha">Extractor Alpha</SelectItem>
                    <SelectItem value="Extractor Beta">Extractor Beta</SelectItem>
                    <SelectItem value="Flowcell X100">Flowcell X100</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-zinc-500">Where this task will be executed physically</p>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label htmlFor="notes" className="text-sm font-semibold text-zinc-900 flex items-center gap-1">
                  Task Notes
                  <Info className="w-3.5 h-3.5 text-zinc-400 ml-1" />
                </Label>
                <Input 
                  id="notes"
                  placeholder="Add any required context..." 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-zinc-50 border-zinc-200 h-10"
                />
                <p className="text-xs text-zinc-500">Optional internal notes to track details later</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
