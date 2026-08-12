"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";

export default function MethodPage() {
  const router = useRouter();
  const [fixedWaveModalOpen, setFixedWaveModalOpen] = useState(false);
  const [calibrationModalOpen, setCalibrationModalOpen] = useState(false);
  const [epsilonModalOpen, setEpsilonModalOpen] = useState(false);

  // States for Fixed Wavelength
  const [lambdaVal, setLambdaVal] = useState("");
  const [stepVal, setStepVal] = useState("");
  const [tbdVal, setTbdVal] = useState("");

  // States for Calibration / Epsilon
  const [calWaveVal, setCalWaveVal] = useState("");
  const [epsWaveVal, setEpsWaveVal] = useState("");

  const handleSaveFixedWave = () => {
    // Save logic goes here (mock for now)
    setFixedWaveModalOpen(false);
  };

  const handleSaveCalibration = () => {
    // Save logic goes here (mock for now)
    setCalibrationModalOpen(false);
  };

  const handleSaveEpsilon = () => {
    // Save logic goes here (mock for now)
    setEpsilonModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex justify-end items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => router.push("/standard")}
            className="border-zinc-200 bg-white"
          >
            Standard
          </Button>
          <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">
            Library
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-20">
          <Button 
            onClick={() => setFixedWaveModalOpen(true)}
            className="w-full md:w-64 h-32 text-xl font-bold rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all shadow-sm"
          >
            Fixed Wavelength
          </Button>
          
          <Button 
            onClick={() => setCalibrationModalOpen(true)}
            className="w-full md:w-64 h-32 text-xl font-bold rounded-2xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-all shadow-sm"
          >
            Calibration
          </Button>
          
          <Button 
            onClick={() => setEpsilonModalOpen(true)}
            className="w-full md:w-64 h-32 text-xl font-bold rounded-2xl bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 transition-all shadow-sm flex items-center justify-center"
          >
            ε | E | Cal
          </Button>
        </div>

      </div>

      {/* Fixed Wavelength Modal */}
      <Dialog open={fixedWaveModalOpen} onOpenChange={setFixedWaveModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fixed Wavelength</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lambda" className="text-right text-lg">Λ</Label>
              <Input 
                id="lambda" 
                value={lambdaVal} 
                onChange={(e) => setLambdaVal(e.target.value)} 
                className="col-span-3" 
                placeholder="Enter value"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="step" className="text-right">Step</Label>
              <Input 
                id="step" 
                value={stepVal} 
                onChange={(e) => setStepVal(e.target.value)} 
                className="col-span-3" 
                placeholder="Enter step"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tbd" className="text-right">TBD</Label>
              <Input 
                id="tbd" 
                value={tbdVal} 
                onChange={(e) => setTbdVal(e.target.value)} 
                className="col-span-3" 
                placeholder="Enter TBD"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveFixedWave} className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Calibration Modal */}
      <Dialog open={calibrationModalOpen} onOpenChange={setCalibrationModalOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Calibration</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="calWavelength" className="text-right">Wavelength</Label>
              <Input 
                id="calWavelength" 
                value={calWaveVal} 
                onChange={(e) => setCalWaveVal(e.target.value)} 
                className="col-span-2" 
                placeholder="Enter wavelength"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveCalibration} className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Epsilon Modal */}
      <Dialog open={epsilonModalOpen} onOpenChange={setEpsilonModalOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>ε | E | Cal</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="epsWavelength" className="text-right">Wavelength</Label>
              <Input 
                id="epsWavelength" 
                value={epsWaveVal} 
                onChange={(e) => setEpsWaveVal(e.target.value)} 
                className="col-span-2" 
                placeholder="Enter wavelength"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEpsilon} className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
