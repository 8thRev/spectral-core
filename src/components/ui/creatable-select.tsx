import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface CreatableSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onValueChange: (value: string | null) => void;
  onAddOption: (label: string) => void;
  placeholder?: string;
  addLabel?: string;
}

export function CreatableSelect({
  options,
  value,
  onValueChange,
  onAddOption,
  placeholder = "Select...",
  addLabel = "Add new"
}: CreatableSelectProps) {
  const handleAdd = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onAddOption("");
  };

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="max-h-[250px] overflow-y-auto">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </div>
        
        <div 
          className="flex items-center p-2 text-sm text-blue-600 cursor-pointer hover:bg-blue-50 mt-1 border-t border-zinc-100 font-medium transition-colors"
          onClick={handleAdd}
        >
          <Plus className="w-4 h-4 mr-2" />
          {addLabel}
        </div>
      </SelectContent>
    </Select>
  );
}
