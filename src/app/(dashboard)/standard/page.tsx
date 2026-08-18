"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Pencil } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { StandardDialog, StandardRowData } from "@/components/shared/StandardDialog";

type StandardRow = {
  id: string;
  std: string;
  concentration: string;
  note: string;
  fileName: string;
};

export default function StandardPage() {
  const [rows, setRows] = useState<StandardRow[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // To store the initial data for the form when editing
  const [initialData, setInitialData] = useState<Partial<StandardRowData>>({});

  useEffect(() => {
    const savedRowsStr = localStorage.getItem("standardRows");
    let initialRows = savedRowsStr ? JSON.parse(savedRowsStr) : [];

    const predefined = [
      { id: "pre-1", std: "Standard 1", concentration: "", note: "", fileName: "" },
      { id: "pre-2", std: "Standard 2", concentration: "", note: "", fileName: "" },
      { id: "pre-3", std: "Standard 3", concentration: "", note: "", fileName: "" },
      { id: "pre-4", std: "Standard 4", concentration: "", note: "", fileName: "" },
    ];

    if (initialRows.length === 0) {
      initialRows = predefined;
    } else {
      // If they don't have the predefined standards, prepend them
      const hasPredefined = initialRows.some((r: StandardRow) => r.std?.includes("Standard 1"));
      if (!hasPredefined) {
        initialRows = [...predefined, ...initialRows];
      }
    }

    Promise.resolve().then(() => {
      setRows(initialRows);
    });
  }, []);

  const saveRowsToLocal = (newRows: StandardRow[]) => {
    setRows(newRows);
    localStorage.setItem("standardRows", JSON.stringify(newRows));
  };

  const deleteRow = (id: string) => {
    saveRowsToLocal(rows.filter(row => row.id !== id));
  };

  const openAddDialog = () => {
    setEditingId(null);
    setInitialData({});
    setIsDialogOpen(true);
  };

  const openEditDialog = (row: StandardRow) => {
    setEditingId(row.id);
    setInitialData({
      std: row.std,
      concentration: row.concentration,
      note: row.note,
      fileName: row.fileName
    });
    setIsDialogOpen(true);
  };

  const handleSaveStandard = (data: StandardRowData) => {
    if (editingId) {
      const updatedRows = rows.map(r => 
        r.id === editingId ? { ...r, ...data } : r
      );
      saveRowsToLocal(updatedRows);
    } else {
      const newRow: StandardRow = {
        id: Date.now().toString(),
        ...data
      };
      saveRowsToLocal([...rows, newRow]);
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-white p-6 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-zinc-900">Standard Page</h1>
          
          <StandardDialog 
            open={isDialogOpen} 
            onOpenChange={setIsDialogOpen}
            initialData={initialData}
            isEditing={!!editingId}
            onSave={handleSaveStandard}
            trigger={
              <DialogTrigger 
                render={<Button onClick={openAddDialog} className="bg-[#5E42CD] hover:bg-[#4d36a8] text-white shadow-sm" />}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Standard
              </DialogTrigger>
            }
          />
        </div>

        {/* Table Area */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-2 font-semibold">Num ID</th>
                  <th className="px-6 py-2 font-semibold">STD</th>
                  <th className="px-6 py-2 font-semibold">Concentration</th>
                  <th className="px-6 py-2 font-semibold">Note</th>
                  <th className="px-6 py-2 font-semibold text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {rows.map((row, index) => (
                  <tr key={row.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 font-medium text-zinc-900">
                      {index + 1}
                    </td>
                    <td className="px-6 text-zinc-700">
                      {row.std}
                    </td>
                    <td className="px-6 text-zinc-700">
                      {row.concentration}
                    </td>
                    <td className="px-6 text-zinc-700">
                      {row.note}
                    </td>
                    <td className="px-6 py-1">
                      <div className="flex justify-center items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(row)}
                          className="text-zinc-400 hover:text-blue-600 hover:bg-blue-50 h-9 w-9 cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => deleteRow(row.id)}
                          className="text-zinc-400 hover:text-red-600 hover:bg-red-50 h-9 w-9 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                      No rows added yet. Click &quot;Add Standard&quot; to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
