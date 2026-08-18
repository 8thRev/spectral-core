import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export type StandardRowData = {
  std: string;
  concentration: string;
  note: string;
  fileName: string;
};

interface StandardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<StandardRowData>;
  isEditing?: boolean;
  onSave: (data: StandardRowData) => void;
  trigger?: React.ReactNode;
}

export function StandardDialog({
  open,
  onOpenChange,
  initialData,
  isEditing = false,
  onSave,
  trigger
}: StandardDialogProps) {
  const [std, setStd] = useState("");
  const [concentration, setConcentration] = useState("");
  const [note, setNote] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (open) {
      Promise.resolve().then(() => {
        setStd(initialData?.std || "");
        setConcentration(initialData?.concentration || "");
        setNote(initialData?.note || "");
        setFileName(initialData?.fileName || "");
      });
    }
  }, [open, initialData]);

  const handleSave = () => {
    onSave({ std, concentration, note, fileName });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Standard" : "Add New Standard"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-1">
          <div className="space-y-1">
            <Label htmlFor="std">STD</Label>
            <Input id="std" value={std} onChange={(e) => setStd(e.target.value)} placeholder="Enter STD" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="concentration">Concentration</Label>
            <Input id="concentration" value={concentration} onChange={(e) => setConcentration(e.target.value)} placeholder="Enter concentration" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="note">Note</Label>
            <Input id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Enter note" />
          </div>
          
          <div className="border-b border-zinc-200 my-2" />
          
          <div className="space-y-1">
            <Label htmlFor="fileName">File Name</Label>
            <Input id="fileName" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="Enter file name" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="bg-[#5E42CD] hover:bg-[#4d36a8] text-white">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
