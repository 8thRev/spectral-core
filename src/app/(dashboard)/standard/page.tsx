"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Check, Pencil } from "lucide-react";

type StandardRow = {
  id: string;
  numId: string;
  std: string;
  concentration: string;
  note: string;
  saved?: boolean;
};

export default function StandardPage() {
  const [rows, setRows] = useState<StandardRow[]>([]);
  useEffect(() => {
    const savedRows = localStorage.getItem("standardRows");
    if (savedRows) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRows(JSON.parse(savedRows));
    } else {
      setRows([{ id: "1", numId: "1", std: "", concentration: "", note: "" }]);
    }
  }, []);

  const addRow = () => {
    const newId = Date.now().toString();
    const newNumId = (rows.length + 1).toString();
    setRows([
      ...rows,
      { id: newId, numId: newNumId, std: "", concentration: "", note: "" }
    ]);
  };

  const deleteRow = (id: string) => {
    const updatedRows = rows.filter(row => row.id !== id).map((row, index) => ({
      ...row,
      numId: (index + 1).toString()
    }));
    setRows(updatedRows);
    localStorage.setItem("standardRows", JSON.stringify(updatedRows.filter(r => r.saved)));
  };

  const saveRow = (id: string) => {
    const updatedRows = rows.map(row => 
      row.id === id ? { ...row, saved: true } : row
    );
    setRows(updatedRows);
    localStorage.setItem("standardRows", JSON.stringify(updatedRows.filter(r => r.saved)));
  };

  const editRow = (id: string) => {
    const updatedRows = rows.map(row => 
      row.id === id ? { ...row, saved: false } : row
    );
    setRows(updatedRows);
    localStorage.setItem("standardRows", JSON.stringify(updatedRows.filter(r => r.saved)));
  };

  const updateRow = (id: string, field: keyof StandardRow, value: string) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <div className="min-h-screen bg-white p-6 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-zinc-900">Standard Page</h1>
        </div>

        {/* Table Area */}
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 uppercase bg-zinc-50/50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Num ID</th>
                  <th className="px-6 py-4 font-semibold">STD</th>
                  <th className="px-6 py-4 font-semibold">Concentration</th>
                  <th className="px-6 py-4 font-semibold">Note</th>
                  <th className="px-6 py-4 font-semibold text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900">
                      {row.numId}
                    </td>
                    <td className="px-6 py-4">
                      {row.saved ? (
                        <span className="text-zinc-700">{row.std}</span>
                      ) : (
                        <Input 
                          value={row.std}
                          onChange={(e) => updateRow(row.id, "std", e.target.value)}
                          placeholder="Enter STD"
                          className="h-9"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {row.saved ? (
                        <span className="text-zinc-700">{row.concentration}</span>
                      ) : (
                        <Input 
                          value={row.concentration}
                          onChange={(e) => updateRow(row.id, "concentration", e.target.value)}
                          placeholder="Enter concentration"
                          className="h-9"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {row.saved ? (
                        <span className="text-zinc-700">{row.note}</span>
                      ) : (
                        <Input 
                          value={row.note}
                          onChange={(e) => updateRow(row.id, "note", e.target.value)}
                          placeholder="Enter notes"
                          className="h-9"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-1">
                        {!row.saved ? (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => saveRow(row.id)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 h-9 w-9"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => editRow(row.id)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-9 w-9"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => deleteRow(row.id)}
                          className="text-zinc-400 hover:text-red-600 hover:bg-red-50 h-9 w-9"
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
                      No rows added yet. Click the button below to add a row.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Row Button */}
        <div className="flex justify-center pt-4">
          <Button 
            onClick={addRow}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add More Rows
          </Button>
        </div>

      </div>
    </div>
  );
}
