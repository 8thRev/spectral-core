"use client";

import React, { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ArrowRight, FileText, Search, Filter, 
  MoreHorizontal, ChevronLeft, ChevronRight, History
} from 'lucide-react';

const MOCK_DATA = Array.from({ length: 42 }).map((_, i) => {
  const methods = ["Ethanol Extraction", "Hydrocarbon", "Solventless"];
  const operators = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "Alex Chen"];
  
  return {
    id: `TSK-${(100 - i).toString().padStart(3, '0')}`,
    operator: operators[i % operators.length],
    method: methods[i % methods.length],
    status: i === 0 || i === 3 ? "In Progress" : i % 7 === 0 ? "Failed" : "Completed",
  };
});

const STATUS_OPTIONS = ["All", "Completed", "In Progress", "Failed"];
const METHOD_OPTIONS = ["All", "Ethanol Extraction", "Hydrocarbon", "Solventless"];

export default function BatchHistoryPage() {
  const [tasks, setTasks] = useState<{id: string, operator: string, method: string, status: string}[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  React.useEffect(() => {
    const stored = localStorage.getItem("batchHistoryTasks");
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTasks(JSON.parse(stored));
    } else {
      setTasks(MOCK_DATA);
      localStorage.setItem("batchHistoryTasks", JSON.stringify(MOCK_DATA));
    }
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Completed</Badge>;
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'Failed':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredData = useMemo(() => {
    return tasks.filter(row => {
      const matchesSearch = 
        row.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        row.operator.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || row.status === statusFilter;
      const matchesMethod = methodFilter === "All" || row.method === methodFilter;
      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [searchQuery, statusFilter, methodFilter, tasks]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Reset page to 1 when filters change
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchQuery, statusFilter, methodFilter]);

  return (
    <div className="min-h-screen bg-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section mimicking the screenshot */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 shrink-0">
            <History className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-1">Data Review</h1>
            <p className="text-sm text-zinc-500">View and manage extraction batch records</p>
          </div>
        </div>

        {/* Toolbar Card */}
        <Card className="bg-white border-zinc-200 shadow-sm p-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Left: Search and Filter */}
          <div className="flex items-center gap-2 flex-1">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input 
                placeholder="Search by task ID, operator..." 
                className="pl-9 bg-zinc-50 border-zinc-200 h-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9 border-zinc-200 text-zinc-500 shrink-0">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Right: Filter Chips & Actions */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
            
            <div className="flex items-center gap-2 border-r border-zinc-200 pr-3">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    statusFilter === status 
                      ? status === 'All' ? 'bg-zinc-800 text-white' 
                        : status === 'Completed' ? 'bg-emerald-600 text-white'
                        : status === 'In Progress' ? 'bg-blue-600 text-white'
                        : 'bg-red-600 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {status} 
                  {status !== 'All' && (
                    <span className="ml-1.5 opacity-70">
                      {tasks.filter(d => d.status === status).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 border-r border-zinc-200 pr-3">
              {METHOD_OPTIONS.map((method) => (
                <button
                  key={method}
                  onClick={() => setMethodFilter(method)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    methodFilter === method 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {method === 'All' ? 'All Methods' : method}
                </button>
              ))}
            </div>

            <Button variant="outline" size="sm" className="h-8 border-zinc-200 text-zinc-700 whitespace-nowrap">
              <MoreHorizontal className="w-4 h-4 mr-1" />
              Actions
            </Button>
          </div>
        </Card>

        {/* Data Table */}
        <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-50 border-b border-zinc-200">
              <TableRow>
                <TableHead className="font-semibold text-zinc-900">Task ID</TableHead>
                <TableHead className="font-semibold text-zinc-900">Operator</TableHead>
                <TableHead className="font-semibold text-zinc-900">Method</TableHead>
                <TableHead className="font-semibold text-zinc-900">Status</TableHead>
                <TableHead className="text-right font-semibold text-zinc-900">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium text-zinc-900">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-zinc-400" />
                        {row.id}
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-600">{row.operator}</TableCell>
                    <TableCell className="text-zinc-600">{row.method}</TableCell>
                    <TableCell>{getStatusBadge(row.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                    No records found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-200 bg-zinc-50/50">
            <div className="text-sm text-zinc-500">
              Showing <span className="font-medium text-zinc-900">{filteredData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}</span> to <span className="font-medium text-zinc-900">{Math.min(currentPage * rowsPerPage, filteredData.length)}</span> of <span className="font-medium text-zinc-900">{filteredData.length}</span> results
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-sm text-zinc-600 font-medium px-2">
                Page {currentPage} of {totalPages}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
