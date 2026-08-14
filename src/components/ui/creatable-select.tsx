import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Check, X } from "lucide-react";

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
  const [isAdding, setIsAdding] = useState(false);
  const [newOption, setNewOption] = useState("");

  const handleAdd = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (newOption.trim()) {
      onAddOption(newOption.trim());
      setNewOption("");
      setIsAdding(false);
    }
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
        
        {isAdding ? (
          <div 
            className="flex items-center gap-1 p-2 border-t border-zinc-100 bg-zinc-50"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input 
              autoFocus
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Name..."
              className="h-8 text-xs flex-1 bg-white"
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAdd();
                }
              }}
            />
            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 shrink-0 hover:bg-green-100" onClick={handleAdd}>
              <Check className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-400 shrink-0 hover:bg-zinc-200" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsAdding(false);
              setNewOption("");
            }}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div 
            className="flex items-center p-2 text-sm text-blue-600 cursor-pointer hover:bg-blue-50 mt-1 border-t border-zinc-100 font-medium transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsAdding(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            {addLabel}
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
