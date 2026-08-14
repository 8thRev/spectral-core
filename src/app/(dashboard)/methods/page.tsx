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
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Edit } from "lucide-react";
import { CreatableSelect } from "@/components/ui/creatable-select";

export default function MethodPage() {
  const router = useRouter();
  const [fixedWaveModalOpen, setFixedWaveModalOpen] = useState(false);
  const [calibrationModalOpen, setCalibrationModalOpen] = useState(false);
  const [epsilonModalOpen, setEpsilonModalOpen] = useState(false);
  const [libraryModalOpen, setLibraryModalOpen] = useState(false);

  // States for Fixed Wavelength
  const [fixedWaveName, setFixedWaveName] = useState("");
  const [lambdaVal, setLambdaVal] = useState("");
  const [stepVal, setStepVal] = useState("");
  const [tbdVal, setTbdVal] = useState("");

  // States for Calibration / Epsilon
  const [calWaveVal, setCalWaveVal] = useState("");
  const [epsWaveVal, setEpsWaveVal] = useState("");
  const [epsFormulaVal, setEpsFormulaVal] = useState("");
  
  // States for Standards Dropdown
  const [calStandard, setCalStandard] = useState("");

  const [standardsList, setStandardsList] = useState([
    { id: "std-1", name: "Standard A", wavelength: "450" },
    { id: "std-2", name: "Standard B", wavelength: "600" },
  ]);

  const handleStandardSelect = (val: string | null) => {
    const safeVal = val || "";
    setCalStandard(safeVal);
    if (safeVal !== "") {
      const found = standardsList.find(s => s.id === safeVal);
      if (found) {
        setCalWaveVal(found.wavelength);
      }
    } else {
      setCalWaveVal("");
    }
  };

  const handleAddStandard = (newStandardName: string) => {
    const newId = `std-${Date.now()}`;
    setStandardsList([
      ...standardsList,
      {
        id: newId,
        name: newStandardName,
        wavelength: ""
      }
    ]);
    setCalStandard(newId);
    setCalWaveVal(""); // New standard starts empty, user fills it
  };

  const handleSaveCalibration = () => {
    // If the currently selected standard exists, we might want to update its wavelength.
    // Since mock list isn't updating properly for edits, we'll just save and close.
    // The addition already happens inline in the dropdown.
    setCalibrationModalOpen(false);
  };

  // Saved Library Items
  const [libraryItems, setLibraryItems] = useState([
    { id: 1, name: "Fixed 1", type: "Fixed Wavelength", lambda: "400", step: "2", integration: "100" }
  ]);

  const handleSaveFixedWave = () => {
    setLibraryItems([
      ...libraryItems, 
      { 
        id: Date.now(), 
        name: fixedWaveName || "Untitled Method", 
        type: "Fixed Wavelength", 
        lambda: lambdaVal, 
        step: stepVal, 
        integration: tbdVal 
      }
    ]);
    setFixedWaveName("");
    setLambdaVal("");
    setStepVal("");
    setTbdVal("");
    setFixedWaveModalOpen(false);
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
          <Button 
            className="bg-zinc-900 hover:bg-zinc-800 text-white"
            onClick={() => setLibraryModalOpen(true)}
          >
            Library
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="mt-20">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-zinc-900 mb-10">
            Create Parameters for Instrument Execution
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
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
            ε | E | Calc | C
          </Button>
        </div>
        </div>

      </div>

      {/* Fixed Wavelength Modal */}
      <Dialog open={fixedWaveModalOpen} onOpenChange={setFixedWaveModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fixed Wavelength</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="method-name" className="text-right whitespace-nowrap">File Name</Label>
              <Input 
                id="method-name" 
                value={fixedWaveName} 
                onChange={(e) => setFixedWaveName(e.target.value)} 
                className="col-span-2" 
                placeholder='e.g. "Bryan Fixed 1"'
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="lambda" className="text-right text-lg font-serif italic whitespace-nowrap">λ</Label>
              <Input 
                id="lambda" 
                value={lambdaVal} 
                onChange={(e) => setLambdaVal(e.target.value)} 
                className="col-span-2" 
                placeholder="Enter λ value"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="step" className="text-right whitespace-nowrap">Step (nm)</Label>
              <Input 
                id="step" 
                value={stepVal} 
                onChange={(e) => setStepVal(e.target.value)} 
                className="col-span-2" 
                placeholder="Enter step (nm)"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="integration" className="text-right whitespace-nowrap">Integration (s/ms)</Label>
              <Input 
                id="integration" 
                value={tbdVal} 
                onChange={(e) => setTbdVal(e.target.value)} 
                className="col-span-2" 
                placeholder="Enter integration time (s/ms)"
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
              <Label htmlFor="calStandard" className="text-right">Standard</Label>
              <div className="col-span-2">
                <CreatableSelect 
                  options={standardsList.map(s => ({ value: s.id, label: s.name }))}
                  value={calStandard}
                  onValueChange={handleStandardSelect}
                  onAddOption={handleAddStandard}
                  placeholder="Select standard"
                  addLabel="Add New Standard"
                />
              </div>
            </div>

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
            <DialogTitle>ε | E | Calc | C</DialogTitle>
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
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="epsFormula" className="text-right">Formula</Label>
              <Input 
                id="epsFormula" 
                value={epsFormulaVal} 
                onChange={(e) => setEpsFormulaVal(e.target.value)} 
                className="col-span-2" 
                placeholder="Enter formula"
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

      {/* Library Modal */}
      <Dialog open={libraryModalOpen} onOpenChange={setLibraryModalOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Method Library</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Items (Fixed Wavelength, E/Calc)</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {libraryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      {item.type === "Fixed Wavelength" && (
                        <div className="text-sm text-zinc-600">
                          <strong>Type:</strong> Fixed Wavelength <br/>
                          <strong>λ:</strong> {item.lambda || '—'} | <strong>Step:</strong> {item.step || '—'} nm | <strong>Integration:</strong> {item.integration || '—'}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-blue-600">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
