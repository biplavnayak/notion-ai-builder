import { TemplateBlueprint } from "@/lib/types/blueprint";
import { Database, FileText, Layout, ArrowRight, Loader2, Edit2 } from "lucide-react";
import { useState } from "react";

interface PreviewProps {
    blueprint: TemplateBlueprint;
    onConfirm: (finalBlueprint: TemplateBlueprint) => void;
    onCancel: () => void;
    isBuilding: boolean;
    status?: string;
}

export function BlueprintPreview({ blueprint, onConfirm, onCancel, isBuilding, status }: PreviewProps) {
    const [editedBlueprint, setEditedBlueprint] = useState(blueprint);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedBlueprint({ ...editedBlueprint, title: e.target.value });
    };

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedBlueprint({ ...editedBlueprint, description: e.target.value });
    };

    return (
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="bg-background border border-border rounded-xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-between">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Layout className="w-5 h-5 text-accent" />
                        Template Preview
                    </h2>
                    <div className="text-sm text-muted-foreground">
                        Review and edit before building
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    {/* Global Settings */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Template Name</label>
                            <input
                                type="text"
                                value={editedBlueprint.title}
                                onChange={handleTitleChange}
                                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Description</label>
                            <textarea
                                value={editedBlueprint.description}
                                onChange={handleDescChange}
                                rows={2}
                                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                            />
                        </div>
                    </div>

                    {/* Databases Grid */}
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                            <Database className="w-4 h-4" />
                            Databases ({editedBlueprint.databases.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {editedBlueprint.databases.map((db, idx) => (
                                <div key={idx} className="p-4 rounded-lg border border-border bg-muted/10 hover:bg-muted/20 transition-colors">
                                    <div className="font-medium mb-2">{db.title}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(db.properties).map(([name, prop]) => (
                                            <span key={name} className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground border border-border">
                                                {name} <span className="opacity-50">({prop.type})</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pages Grid */}
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Pages ({editedBlueprint.pages.length})
                        </h3>
                        <div className="space-y-2">
                            {editedBlueprint.pages.map((page, idx) => (
                                <div key={idx} className="p-3 rounded-lg border border-border bg-muted/10 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-lg">
                                        📄
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">{page.title}</div>
                                        <div className="text-xs text-muted-foreground">{page.blocks.length} content blocks</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-border bg-muted/30 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isBuilding}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(editedBlueprint)}
                        disabled={isBuilding}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {isBuilding ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm & Build"}
                        {!isBuilding && <ArrowRight className="w-4 h-4" />}
                    </button>
                </div>
                {isBuilding && status && (
                    <div className="px-6 pb-6 text-center text-sm text-muted-foreground animate-pulse">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}
