"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { MapPin, Search, Plus, ListFilter, SlidersHorizontal, Settings, MoreHorizontal, Edit2, X, Check } from 'lucide-react';

export default function AdminPage() {
  const [isAutomatic, setIsAutomatic] = useState(false);
  
  const [facilities, setFacilities] = useState<{id: string, name: string, location: string}[]>([]);
  const [facilityName, setFacilityName] = useState("");
  const [facilityLocation, setFacilityLocation] = useState("");
  const [editingFacility, setEditingFacility] = useState<string | null>(null);

  const [instruments, setInstruments] = useState<{id: string, name: string, type: string}[]>([]);
  const [instrumentName, setInstrumentName] = useState("");
  const [instrumentType, setInstrumentType] = useState("");
  const [editingInstrument, setEditingInstrument] = useState<string | null>(null);

  useEffect(() => {
    Promise.resolve().then(() => {
      const savedFacilities = localStorage.getItem("admin_facilities");
      const savedInstruments = localStorage.getItem("admin_instruments");
      if (savedFacilities) setFacilities(JSON.parse(savedFacilities));
      if (savedInstruments) setInstruments(JSON.parse(savedInstruments));
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("admin_facilities", JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem("admin_instruments", JSON.stringify(instruments));
  }, [instruments]);

  const handleAddFacility = () => {
    if (!facilityName.trim()) return;
    if (editingFacility) {
      setFacilities(prev => prev.map(f => f.id === editingFacility ? { ...f, name: facilityName, location: facilityLocation } : f));
      setEditingFacility(null);
    } else {
      setFacilities(prev => [...prev, { id: Date.now().toString(), name: facilityName, location: facilityLocation }]);
    }
    setFacilityName("");
    setFacilityLocation("");
  };

  const handleEditFacility = (f: { id: string; name: string; location: string }) => {
    setFacilityName(f.name);
    setFacilityLocation(f.location);
    setEditingFacility(f.id);
  };
  
  const handleRemoveFacility = (id: string) => {
    setFacilities(prev => prev.filter(f => f.id !== id));
    if (editingFacility === id) {
      setEditingFacility(null);
      setFacilityName("");
      setFacilityLocation("");
    }
  };

  const handleAddInstrument = () => {
    if (!instrumentName.trim()) return;
    if (editingInstrument) {
      setInstruments(prev => prev.map(i => i.id === editingInstrument ? { ...i, name: instrumentName, type: instrumentType } : i));
      setEditingInstrument(null);
    } else {
      setInstruments(prev => [...prev, { id: Date.now().toString(), name: instrumentName, type: instrumentType }]);
    }
    setInstrumentName("");
    setInstrumentType("");
  };

  const handleEditInstrument = (i: { id: string; name: string; type: string }) => {
    setInstrumentName(i.name);
    setInstrumentType(i.type);
    setEditingInstrument(i.id);
  };
  
  const handleRemoveInstrument = (id: string) => {
    setInstruments(prev => prev.filter(i => i.id !== id));
    if (editingInstrument === id) {
      setEditingInstrument(null);
      setInstrumentName("");
      setInstrumentType("");
    }
  };

  // Mock Audit Trail Data
  const auditLogs = [
    { id: 1, date: "2026-08-14", time: "14:30:00", location: "Main Facility", ip: "192.168.1.45", person: "Anita Cruz", action: "Updated System Facility" },
    { id: 2, date: "2026-08-14", time: "10:15:00", location: "Lab 2", ip: "192.168.1.102", person: "John Doe", action: "Added new Instrument (Flowcell - X100)" },
    { id: 3, date: "2026-08-13", time: "16:45:00", location: "Main Facility", ip: "192.168.1.45", person: "Anita Cruz", action: "Changed Control Daily Health Checks schedule" },
    { id: 4, date: "2026-08-13", time: "09:00:00", location: "System", ip: "10.0.0.5", person: "System", action: "Automated Diagnostic Run" },
  ];

  // Mock User Management Data
  const userManagementLogs = [
    { id: 1, name: "Anita Cruz", email: "anita@untitledui.com", role: "Admin", status: "Active", lastActive: "Just now" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "Operator", status: "Active", lastActive: "2 hours ago" },
    { id: 3, name: "Jane Smith", email: "jane@example.com", role: "Viewer", status: "Offline", lastActive: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F5] p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-1">Admin Configuration</h1>
          <p className="text-sm text-zinc-500">Manage facilities, instruments, audit logs, and global settings</p>
        </div>

        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* System Facility Card */}
          <Card className="p-6 bg-white border-zinc-200 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">System Facility</h2>
                <p className="text-xs text-zinc-500">Manage and add physical locations</p>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <Label htmlFor="facility-name" className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">Facility Name</Label>
                <Input 
                  id="facility-name" 
                  placeholder="e.g. Newton Main Lab" 
                  className="bg-zinc-50 border-zinc-200" 
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facility-location" className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">Location / Address</Label>
                <Input 
                  id="facility-location" 
                  placeholder="e.g. Building 4, Floor 2" 
                  className="bg-zinc-50 border-zinc-200" 
                  value={facilityLocation}
                  onChange={(e) => setFacilityLocation(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-auto space-y-4">
              {facilities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {facilities.map((f) => (
                    <Badge key={f.id} variant="secondary" className="pl-3 pr-1 py-1 flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 cursor-pointer">
                      <span className="max-w-[120px] truncate" title={`${f.name} - ${f.location}`}>
                        {f.name}
                      </span>
                      <div className="flex items-center">
                        <button onClick={() => handleEditFacility(f)} className="p-1 text-blue-600 hover:bg-blue-200 rounded-md transition-colors cursor-pointer" title="Edit">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button onClick={() => handleRemoveFacility(f.id)} className="p-1 text-blue-600 hover:bg-blue-200 rounded-md transition-colors cursor-pointer" title="Remove">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </Badge>
                  ))}
                </div>
              )}
              <Button 
                onClick={handleAddFacility} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!facilityName.trim()}
              >
                {editingFacility ? <><Check className="w-4 h-4 mr-2" /> Update Location</> : <><Plus className="w-4 h-4 mr-2" /> Add Location</>}
              </Button>
            </div>
          </Card>

          {/* Instrument Card */}
          <Card className="p-6 bg-white border-zinc-200 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center border border-purple-100">
                <SlidersHorizontal className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">Instrument</h2>
                <p className="text-xs text-zinc-500">Configure connected devices</p>
              </div>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <Label htmlFor="instrument-name" className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">Instrument Name</Label>
                <Input 
                  id="instrument-name" 
                  placeholder="e.g. Extractor Alpha" 
                  className="bg-zinc-50 border-zinc-200" 
                  value={instrumentName}
                  onChange={(e) => setInstrumentName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instrument-type" className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">Type / Model</Label>
                <Input 
                  id="instrument-type" 
                  placeholder="e.g. Flowcell - X100" 
                  className="bg-zinc-50 border-zinc-200" 
                  value={instrumentType}
                  onChange={(e) => setInstrumentType(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-auto space-y-4">
              {instruments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {instruments.map((i) => (
                    <Badge key={i.id} variant="secondary" className="pl-3 pr-1 py-1 flex items-center gap-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 cursor-pointer">
                      <span className="max-w-[120px] truncate" title={`${i.name} - ${i.type}`}>
                        {i.name}
                      </span>
                      <div className="flex items-center">
                        <button onClick={() => handleEditInstrument(i)} className="p-1 text-purple-600 hover:bg-purple-200 rounded-md transition-colors cursor-pointer" title="Edit">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button onClick={() => handleRemoveInstrument(i.id)} className="p-1 text-purple-600 hover:bg-purple-200 rounded-md transition-colors cursor-pointer" title="Remove">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </Badge>
                  ))}
                </div>
              )}
              <Button 
                onClick={handleAddInstrument} 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!instrumentName.trim()}
              >
                {editingInstrument ? <><Check className="w-4 h-4 mr-2" /> Update Instrument</> : <><Plus className="w-4 h-4 mr-2" /> Register Instrument</>}
              </Button>
            </div>
          </Card>

        </div>

        {/* Control Daily Health Checks (Migrated) */}
        <section>
          <Card className="p-6 bg-white border-zinc-200">
            <div className="flex items-start justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-5 h-5 text-zinc-700" />
                    <h3 className="text-lg font-semibold text-zinc-900">Control Daily Health Checks</h3>
                </div>
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

        {/* User Management Table */}
        <section>
          <Card className="bg-white border-zinc-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">User Management</h3>
                <p className="text-xs text-zinc-500 mt-1">Manage team members and roles</p>
              </div>
              <div className="flex items-center gap-2">
                <Button className="h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add User
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader className="bg-zinc-50/50">
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500">Name</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500">Email</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500">Role</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500">Status</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500">Last Active</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userManagementLogs.map((user) => (
                  <TableRow key={user.id} className="hover:bg-zinc-50/50 transition-colors">
                    <TableCell className="text-sm font-medium text-zinc-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                          {user.name.charAt(0)}
                        </div>
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-zinc-600 whitespace-nowrap">{user.email}</TableCell>
                    <TableCell className="text-sm text-zinc-600">{user.role}</TableCell>
                    <TableCell>
                      <Badge className={user.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-100'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-zinc-600">{user.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* Audit Trail Table */}
        <section>
          <Card className="bg-white border-zinc-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">Audit Trail</h3>
                <p className="text-xs text-zinc-500 mt-1">System activity and user actions</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                  <Input 
                    placeholder="Search logs..." 
                    className="pl-9 h-8 text-sm bg-zinc-50 border-zinc-200 w-64"
                  />
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <ListFilter className="w-4 h-4 mr-2" /> Filter
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader className="bg-zinc-50/50">
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500">Date</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500">Time</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500">Location</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500">IP Address</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500">Person</TableHead>
                  <TableHead className="text-xs font-semibold uppercase text-zinc-500">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                    <TableCell className="text-sm font-medium text-zinc-900 whitespace-nowrap">{log.date}</TableCell>
                    <TableCell className="text-sm text-zinc-600 whitespace-nowrap">{log.time}</TableCell>
                    <TableCell className="text-sm text-zinc-600">{log.location}</TableCell>
                    <TableCell className="text-sm font-mono text-zinc-500">{log.ip}</TableCell>
                    <TableCell className="text-sm text-zinc-900 font-medium">
                      <div className="flex items-center gap-2">
                        {log.person !== 'System' && (
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
                            {log.person.charAt(0)}
                          </div>
                        )}
                        {log.person}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-zinc-600">{log.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

      </div>
    </div>
  );
}
