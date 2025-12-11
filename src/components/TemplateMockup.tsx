import React from 'react';
import { SAMPLE_DATA } from "@/lib/templates/sampleData";

interface TemplateMockupProps {
    templateId: string;
    category: string;
}

export function TemplateMockup({ templateId, category }: TemplateMockupProps) {
    // Get category-specific colors
    const getCategoryColors = (cat: string) => {
        const colors: Record<string, { bg: string; accent: string; text: string; light: string }> = {
            "Productivity": { bg: "bg-blue-50", accent: "bg-blue-500", text: "text-blue-700", light: "bg-blue-100" },
            "Finance": { bg: "bg-emerald-50", accent: "bg-emerald-500", text: "text-emerald-700", light: "bg-emerald-100" },
            "Health & Fitness": { bg: "bg-pink-50", accent: "bg-pink-500", text: "text-pink-700", light: "bg-pink-100" },
            "Content Creation": { bg: "bg-orange-50", accent: "bg-orange-500", text: "text-orange-700", light: "bg-orange-100" },
            "Business": { bg: "bg-indigo-50", accent: "bg-indigo-500", text: "text-indigo-700", light: "bg-indigo-100" },
            "Personal": { bg: "bg-purple-50", accent: "bg-purple-500", text: "text-purple-700", light: "bg-purple-100" },
            "Education": { bg: "bg-cyan-50", accent: "bg-cyan-500", text: "text-cyan-700", light: "bg-cyan-100" },
            "Travel": { bg: "bg-teal-50", accent: "bg-teal-500", text: "text-teal-700", light: "bg-teal-100" },
            "Development": { bg: "bg-slate-50", accent: "bg-slate-500", text: "text-slate-700", light: "bg-slate-100" },
            "Design": { bg: "bg-fuchsia-50", accent: "bg-fuchsia-500", text: "text-fuchsia-700", light: "bg-fuchsia-100" },
            "Marketing": { bg: "bg-rose-50", accent: "bg-rose-500", text: "text-rose-700", light: "bg-rose-100" }
        };
        return colors[cat] || { bg: "bg-gray-50", accent: "bg-gray-500", text: "text-gray-700", light: "bg-gray-100" };
    };

    const colors = getCategoryColors(category);

    // Generate realistic fallback data based on category
    const generateCategoryMockData = (cat: string) => {
        const defaults: Record<string, { title: string; rows: any[] }> = {
            "Productivity": {
                title: "Task Tracker",
                rows: [
                    { name: "Morning Review", status: "Done", value: "High" },
                    { name: "Deep Work Session", status: "In Progress", value: "High" },
                    { name: "Email Clearing", status: "To Do", value: "Medium" }
                ]
            },
            "Finance": {
                title: "Budget Tracker",
                rows: [
                    { name: "Office Supplies", status: "Expense", value: "$45.00" },
                    { name: "Client Payment", status: "Income", value: "$1,200" },
                    { name: "Software Sub", status: "Expense", value: "$29.00" }
                ]
            },
            "Health & Fitness": {
                title: "Workout Log",
                rows: [
                    { name: "Morning Run", status: "Completed", value: "5km" },
                    { name: "Upper Body", status: "Planned", value: "45m" },
                    { name: "Meal Prep", status: "Done", value: "High" }
                ]
            },
            "Content Creation": {
                title: "Content Calendar",
                rows: [
                    { name: "YouTube Video", status: "Editing", value: "Oct 25" },
                    { name: "Newsletter", status: "Drafting", value: "Oct 28" },
                    { name: "Social Posts", status: "Scheduled", value: "Oct 30" }
                ]
            },
            "Business": {
                title: "CRM",
                rows: [
                    { name: "Acme Corp", status: "Lead", value: "$5k" },
                    { name: "Stark Ind", status: "Client", value: "$12k" },
                    { name: "Wayne Ent", status: "Negotiation", value: "$25k" }
                ]
            },
            "Personal": {
                title: "Journal",
                rows: [
                    { name: "Daily Reflection", status: "Done", value: "Today" },
                    { name: "Book List", status: "Reading", value: "Atomic Habits" },
                    { name: "Weekend Plans", status: "Pending", value: "Sat/Sun" }
                ]
            },
            "Education": {
                title: "Study Plan",
                rows: [
                    { name: "Math Assignment", status: "Due Soon", value: "Ch. 5" },
                    { name: "History Essay", status: "Drafting", value: "50%" },
                    { name: "Physics Lab", status: "Done", value: "A-" }
                ]
            },
            "Travel": {
                title: "Trip Planner",
                rows: [
                    { name: "Flight Booking", status: "Booked", value: "$450" },
                    { name: "Hotel Check", status: "Pending", value: "Paris" },
                    { name: "Itinerary", status: "Drafting", value: "7 Days" }
                ]
            },
            "Development": {
                title: "Bug Tracker",
                rows: [
                    { name: "Fix Login API", status: "In Progress", value: "High" },
                    { name: "Update UI", status: "Review", value: "Medium" },
                    { name: "Database Backup", status: "Done", value: "Low" }
                ]
            },
            "Design": {
                title: "Design Assets",
                rows: [
                    { name: "Logo Concepts", status: "Review", value: "v2.0" },
                    { name: "Brand Guidelines", status: "Done", value: "Final" },
                    { name: "Website Mockup", status: "In Progress", value: "Home" }
                ]
            },
            "Marketing": {
                title: "Campaigns",
                rows: [
                    { name: "Q4 Launch", status: "Active", value: "High" },
                    { name: "Email Sequence", status: "Drafting", value: "Medium" },
                    { name: "Ad Creatives", status: "Review", value: "Low" }
                ]
            }
        };

        return defaults[cat] || {
            title: "Template",
            rows: [
                { name: "Item 1", status: "Active", value: "Value" },
                { name: "Item 2", status: "Pending", value: "Value" },
                { name: "Item 3", status: "Done", value: "Value" }
            ]
        };
    };

    // Get template-specific dummy data
    const getTemplateData = () => {
        // 1. Try to get specific sample data from SAMPLE_DATA
        if (SAMPLE_DATA[templateId]) {
            const dbKeys = Object.keys(SAMPLE_DATA[templateId]);
            if (dbKeys.length > 0) {
                const firstDb = SAMPLE_DATA[templateId][dbKeys[0]];
                if (firstDb && firstDb.length > 0) {
                    // Map the first 3 rows to the expected format
                    return {
                        title: templateId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                        rows: firstDb.slice(0, 3).map(row => {
                            const keys = Object.keys(row);
                            // Heuristic to find relevant columns
                            const nameKey = keys.find(k => k.toLowerCase().includes('name') || k.toLowerCase().includes('task') || k.toLowerCase().includes('habit') || k.toLowerCase().includes('goal') || k.toLowerCase().includes('project') || k.toLowerCase().includes('title')) || keys[0];
                            const statusKey = keys.find(k => k.toLowerCase().includes('status') || k.toLowerCase().includes('priority') || k.toLowerCase().includes('stage')) || keys[1];
                            const valueKey = keys.find(k => k !== nameKey && k !== statusKey && (k.toLowerCase().includes('date') || k.toLowerCase().includes('value') || k.toLowerCase().includes('amount') || k.toLowerCase().includes('progress'))) || keys[2] || keys[1];

                            return {
                                name: String(row[nameKey] || "Item"),
                                status: String(row[statusKey] || "Active"),
                                value: String(row[valueKey] || "")
                            };
                        })
                    };
                }
            }
        }

        // 2. Fallback to category-based mock data
        return generateCategoryMockData(category);
    };

    const templateData = getTemplateData();

    // Render different mockup styles based on template type
    const renderMockup = () => {
        // Database/Table templates
        if (templateId.includes('tracker') || templateId.includes('crm') || templateId.includes('inventory') || templateId.includes('manager') || templateId.includes('log') || templateId.includes('list') || templateId.includes('plan')) {
            return (
                <div className="w-full h-full bg-white p-3 flex flex-col">
                    {/* Notion-style header */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-5 h-5 rounded ${colors.accent} flex items-center justify-center text-white text-xs font-bold`}>
                            {templateData.title.charAt(0)}
                        </div>
                        <div className="text-xs font-bold text-gray-900 truncate">{templateData.title}</div>
                    </div>

                    {/* Table view */}
                    <div className="flex-1 border border-gray-200 rounded-md overflow-hidden">
                        {/* Table header */}
                        <div className="flex border-b border-gray-200 bg-gray-50">
                            <div className="flex-1 px-2 py-1.5 border-r border-gray-200">
                                <div className="text-[10px] font-semibold text-gray-600">Name</div>
                            </div>
                            <div className="w-20 px-2 py-1.5 border-r border-gray-200">
                                <div className="text-[10px] font-semibold text-gray-600">Status</div>
                            </div>
                            <div className="w-16 px-2 py-1.5">
                                <div className="text-[10px] font-semibold text-gray-600">Value</div>
                            </div>
                        </div>

                        {/* Table rows with real data */}
                        {templateData.rows.map((row: any, i: number) => (
                            <div key={i} className="flex border-b border-gray-100 hover:bg-gray-50">
                                <div className="flex-1 px-2 py-1.5 border-r border-gray-100">
                                    <div className="text-[9px] text-gray-900 truncate">{row.name}</div>
                                </div>
                                <div className="w-20 px-2 py-1.5 border-r border-gray-100">
                                    <div className={`text-[9px] px-1.5 py-0.5 rounded ${colors.light} ${colors.text} inline-block truncate max-w-full`}>
                                        {row.status}
                                    </div>
                                </div>
                                <div className="w-16 px-2 py-1.5">
                                    <div className="text-[9px] text-gray-600 truncate">{row.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Dashboard templates
        if (templateId.includes('dashboard') || templateId.includes('hub')) {
            return (
                <div className="w-full h-full bg-white p-3">
                    {/* Title */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-6 h-6 rounded ${colors.accent} flex items-center justify-center text-white text-xs`}>
                            📊
                        </div>
                        <div className="text-xs font-bold text-gray-900">{templateData.title}</div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                            { label: 'Total', value: '24' },
                            { label: 'Active', value: '12' },
                            { label: 'Done', value: '8' }
                        ].map((stat, i) => (
                            <div key={i} className={`${colors.bg} rounded-lg p-2 border border-gray-200`}>
                                <div className="text-[8px] text-gray-600 mb-0.5">{stat.label}</div>
                                <div className="text-sm font-bold text-gray-900">{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Content sections */}
                    <div className="space-y-2">
                        <div className="border border-gray-200 rounded-lg p-2">
                            <div className="text-[9px] font-semibold text-gray-700 mb-1.5">Recent Activity</div>
                            <div className="space-y-1">
                                {templateData.rows.slice(0, 3).map((row: any, i: number) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <div className={`w-1 h-1 rounded-full ${colors.accent}`}></div>
                                        <div className="text-[8px] text-gray-600 truncate">{row.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Default: Simple page mockup
        return (
            <div className="w-full h-full bg-white p-3">
                {/* Page icon and title */}
                <div className="flex items-center gap-2 mb-3">
                    <div className={`w-6 h-6 rounded ${colors.accent} flex items-center justify-center text-white text-xs`}>
                        📄
                    </div>
                    <div className="text-xs font-bold text-gray-900">{templateData.title}</div>
                </div>

                {/* Content blocks */}
                <div className="space-y-2">
                    <div className={`${colors.bg} rounded-lg p-2 border border-gray-200`}>
                        <div className="text-[9px] font-semibold text-gray-700 mb-1">Getting Started</div>
                        <div className="text-[8px] text-gray-600 leading-relaxed">
                            Welcome to your new {templateData.title}. This template helps you track {templateData.rows[0]?.name.toLowerCase()} and more.
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-2">
                        <div className="text-[9px] font-semibold text-gray-700 mb-1.5">Quick Links</div>
                        <div className="space-y-1">
                            {templateData.rows.map((row: any, i: number) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <div className={`w-1 h-1 rounded-full ${colors.accent}`}></div>
                                    <div className="text-[8px] text-gray-600">{row.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden shadow-inner">
            {/* Notion-style browser chrome */}
            <div className="bg-gray-100 px-2 py-1.5 border-b border-gray-200 flex items-center gap-2">
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 text-center">
                    <div className="text-[8px] text-gray-500">Notion</div>
                </div>
            </div>

            {/* Template content */}
            <div className="h-[calc(100%-28px)]">
                {renderMockup()}
            </div>
        </div>
    );
}
