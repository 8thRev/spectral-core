"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    BarChart3,
    ArrowRight,
    Clock,
    Check,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data
const MOCK_DATA = {
    user: { name: "Otake" },
    biomass_weight_yesterday: 125.5,
    socks_run_yesterday: 4,
    socks_run_7days: 28,
    socks_run_trend: 'up',
    socks_run_change_absolute: 5,
    biomass_weight_7days: 850.2,
    biomass_weight_trend: 'up',
    biomass_weight_change_absolute: 120.5,
    active_extraction_batches: ["Batch A-102", "Batch B-405"],
    active_post_processing_batches: ["Batch C-992"],
    recently_completed_batches: ["Batch X-111", "Batch Y-222", "Batch Z-333"],
    recent_activity: [
        { id: 1, title: "Batch X-111 — SOUR DIESEL", subtitle: "Batch fully closed", time: "2:45 PM", type: "fully_closed" },
        { id: 2, title: "Batch C-992 — BLUE DREAM", subtitle: "Moved to post-processing", time: "1:15 PM", type: "post_processing" },
        { id: 3, title: "Batch Y-222 — OG KUSH", subtitle: "Hydrocarbon extraction completed", time: "11:30 AM", type: "extraction" },
        { id: 4, title: "Batch Z-333 — PINEAPPLE EXPRESS", subtitle: "Ethanol extraction completed", time: "9:00 AM", type: "extraction_eth" },
    ]
};

export default function DashboardPage() {

    const getActivityDotClass = (type: string) => {
        if (type === 'fully_closed') return 'bg-emerald-500';
        if (type === 'extraction') return 'bg-orange-500';
        if (type === 'extraction_eth') return 'bg-blue-500';
        return 'bg-gray-400';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-zinc-100">
            <main className="w-full max-w-7xl mx-auto py-8 px-6 lg:px-8">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="mb-4">
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                                <h1 className="text-2xl lg:text-3xl font-semibold text-zinc-900 mb-1 tracking-tight">
                                    Good morning, {MOCK_DATA.user.name}.
                                </h1>
                                <div className="text-sm text-zinc-500">
                                    <div className="mb-1">
                                        Yesterday you ran {MOCK_DATA.biomass_weight_yesterday} lbs across {MOCK_DATA.socks_run_yesterday} runs
                                    </div>
                                    <div className="mb-1">
                                        <Badge variant="outline" className="align-middle font-medium bg-green-100 text-green-700 border-green-200 mr-2">
                                            Healthy
                                        </Badge>
                                        Active Run: <span className="text-gray-600 font-medium">No</span>
                                    </div>
                                    <div className="mb-1">
                                        Last 7 days: Socks Run {MOCK_DATA.socks_run_7days}
                                        <span className="text-green-600 font-medium ml-1">(↑+{MOCK_DATA.socks_run_change_absolute})</span>
                                        {' · '}Biomass {MOCK_DATA.biomass_weight_7days} lbs
                                        <span className="text-green-600 font-medium ml-1">(↑+{MOCK_DATA.biomass_weight_change_absolute} lbs)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Process Stability Graph Mock */}
                    <div className="mb-6">
                        <div className="bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-xl p-5 shadow-sm">
                            <p className="text-lg font-semibold text-zinc-900 mb-3">Extraction Process Stability</p>
                            <div className="w-full h-48 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center flex-col text-zinc-400">
                                <BarChart3 className="w-8 h-8 mb-2 opacity-50" />
                                <span className="text-sm font-medium">Stability Graph Visualization</span>
                            </div>
                        </div>
                    </div>

                    {/* 3 Column Stats */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                        {/* Active Extraction */}
                        <section className="bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-xl p-5 shadow-sm">
                            <h3 className="text-sm font-semibold text-zinc-900 mb-4">Active in Extraction</h3>
                            <div className="space-y-2 min-h-[92px]">
                                {MOCK_DATA.active_extraction_batches.map((batchName) => (
                                    <div key={batchName} className="text-sm text-zinc-700 font-medium">
                                        • {batchName}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-zinc-500 mt-3 border-t border-zinc-100 pt-3">
                                {MOCK_DATA.active_extraction_batches.length} batches
                            </p>
                        </section>

                        {/* Active Post-Processing */}
                        <section className="bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-xl p-5 shadow-sm">
                            <h3 className="text-sm font-semibold text-zinc-900 mb-4">Active in Post-Processing</h3>
                            <div className="space-y-2 min-h-[92px]">
                                {MOCK_DATA.active_post_processing_batches.map((batchName) => (
                                    <div key={batchName} className="text-sm text-zinc-700 font-medium">
                                        • {batchName}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-zinc-500 mt-3 border-t border-zinc-100 pt-3">
                                {MOCK_DATA.active_post_processing_batches.length} batch
                            </p>
                        </section>

                        {/* Recently Completed */}
                        <section className="bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-xl p-5 shadow-sm">
                            <h3 className="text-sm font-semibold text-zinc-900 mb-4">Recently Completed</h3>
                            <div className="space-y-2 min-h-[92px]">
                                {MOCK_DATA.recently_completed_batches.map((batchName) => (
                                    <div key={batchName} className="text-sm text-zinc-700 font-medium flex items-center">
                                        • {batchName} <Check className="w-3.5 h-3.5 text-emerald-500 ml-1.5" strokeWidth={3} />
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-zinc-500 mt-3 border-t border-zinc-100 pt-3">Last 7 days</p>
                        </section>
                    </div>

                    {/* Run Analyzer Section Mock */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-4 mb-6">
                        <section className="bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-xl p-5 flex flex-col gap-3 shadow-sm">
                            <div className="flex flex-col items-center justify-center text-center gap-2 py-10">
                                <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-bold">Compare Runs</p>
                                <h3 className="text-xl font-semibold text-zinc-900">Standardize Consistency</h3>
                                <p className="text-sm text-zinc-500 max-w-md">Find hidden differences across each run easily.</p>
                                <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto mt-2 font-medium">
                                    Open Run Analyzer <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </section>
                        
                        <section className="bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-xl p-5 flex flex-col shadow-sm">
                            <div className="mb-4">
                                <h3 className="text-base font-semibold text-zinc-900 mb-1">Yesterday&apos;s Top Drivers</h3>
                                <p className="text-xs text-zinc-500">Compare biomass, time, and temperature.</p>
                            </div>
                            <div className="flex-1 rounded-lg border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 flex flex-col items-center justify-center gap-4 bg-zinc-50/50">
                                <p>No completed runs in the last 24 hours. Log a run to unlock insights.</p>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-8 px-4 text-xs">
                                    Open Run Analyzer <ArrowRight className="w-3 h-3 ml-1.5" />
                                </Button>
                            </div>
                        </section>
                    </div>
                </motion.div>

                {/* Recent Activity List */}
                <div className="mx-auto w-full max-w-3xl bg-white/70 backdrop-blur-sm border border-zinc-200/60 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                            <Clock className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-zinc-900">Recent Activity</h3>
                            <p className="text-xs text-zinc-500">Facility last active 2 hours ago</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-zinc-100/50 px-3 py-1.5 text-xs font-mono font-medium tracking-wider text-zinc-500 uppercase rounded">
                            Today
                        </div>
                        <div className="border border-zinc-100 rounded-lg overflow-hidden bg-white">
                            {MOCK_DATA.recent_activity.map((activity) => (
                                <div key={activity.id} className="flex w-full items-start gap-4 px-4 py-3.5 border-b border-zinc-100 last:border-b-0 hover:bg-zinc-50 transition-colors cursor-pointer">
                                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${getActivityDotClass(activity.type)} shadow-sm`} />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-zinc-900 truncate">{activity.title}</p>
                                        <p className="text-xs text-zinc-500 truncate mt-0.5">{activity.subtitle}</p>
                                    </div>
                                    <span className="shrink-0 text-xs font-medium text-zinc-400">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
