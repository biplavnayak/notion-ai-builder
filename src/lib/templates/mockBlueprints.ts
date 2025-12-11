import { TemplateBlueprint, DatabaseBlueprint, PageBlueprint, DatabaseProperty } from "../types/blueprint";
import { TemplateMetadata } from "./metadata";

// Helper to generate realistic mock blueprints based on category and metadata
export function getPreviewBlueprint(template: TemplateMetadata): TemplateBlueprint {
    const category = template.category;

    // Helper to create a select property safely
    const createSelectProp = (options: string[] = []): DatabaseProperty => ({
        type: "select",
        options
    });

    // Default structure based on category
    const getCategoryStructure = (cat: string): { databases: DatabaseBlueprint[], pages: PageBlueprint[] } => {
        switch (cat) {
            case "Productivity":
                return {
                    databases: [
                        {
                            key: "main_db",
                            title: `${template.name} Database`,
                            description: "Main tracking database",
                            properties: {
                                "Name": { type: "title" },
                                "Status": createSelectProp(["To Do", "In Progress", "Done"]),
                                "Priority": createSelectProp(["High", "Medium", "Low"]),
                                "Due Date": { type: "date" },
                                "Tags": { type: "multi_select", options: ["Work", "Personal"] }
                            }
                        },
                        {
                            key: "archive_db",
                            title: "Archive",
                            description: "Completed items history",
                            properties: {
                                "Name": { type: "title" },
                                "Completion Date": { type: "date" },
                                "Rating": { type: "number" }
                            }
                        }
                    ],
                    pages: [
                        {
                            title: `${template.name} Dashboard`,
                            icon: template.icon,
                            blocks: [
                                { type: "heading_1", content: `Welcome to ${template.name}` },
                                { type: "callout", content: template.description || "Track your productivity." },
                                { type: "divider" },
                                { type: "heading_2", content: "Active Items" },
                                { type: "linked_database", linked_database_source: "main_db" }
                            ]
                        }
                    ]
                };

            case "Finance":
                return {
                    databases: [
                        {
                            key: "transactions_db",
                            title: "Transactions",
                            description: "All income and expenses",
                            properties: {
                                "Description": { type: "title" },
                                "Amount": { type: "number" },
                                "Type": createSelectProp(["Income", "Expense"]),
                                "Category": createSelectProp(["Food", "Transport", "Utilities"]),
                                "Date": { type: "date" }
                            }
                        },
                        {
                            key: "accounts_db",
                            title: "Accounts",
                            description: "Bank accounts and wallets",
                            properties: {
                                "Account Name": { type: "title" },
                                "Balance": { type: "number" },
                                "Type": createSelectProp(["Checking", "Savings", "Credit"])
                            }
                        }
                    ],
                    pages: [
                        {
                            title: "Finance Overview",
                            icon: "💰",
                            blocks: [
                                { type: "heading_1", content: "Financial Dashboard" },
                                { type: "callout", content: template.description || "Track your financial health" },
                                { type: "divider" },
                                { type: "heading_2", content: "Recent Transactions" },
                                { type: "linked_database", linked_database_source: "transactions_db" }
                            ]
                        }
                    ]
                };

            case "Health & Fitness":
                return {
                    databases: [
                        {
                            key: "logs_db",
                            title: "Daily Logs",
                            description: "Track health metrics",
                            properties: {
                                "Date": { type: "title" },
                                "Mood": createSelectProp(["Happy", "Neutral", "Sad"]),
                                "Sleep Hours": { type: "number" },
                                "Water Intake": { type: "number" },
                                "Notes": { type: "rich_text" }
                            }
                        },
                        {
                            key: "routines_db",
                            title: "Routines",
                            description: "Workout and habit routines",
                            properties: {
                                "Routine Name": { type: "title" },
                                "Frequency": createSelectProp(["Daily", "Weekly"]),
                                "Duration": { type: "number" }
                            }
                        }
                    ],
                    pages: [
                        {
                            title: "Health Hub",
                            icon: "💪",
                            blocks: [
                                { type: "heading_1", content: "Health & Fitness Tracker" },
                                { type: "callout", content: template.description || "Stay healthy and active" },
                                { type: "divider" },
                                { type: "heading_2", content: "Today's Log" },
                                { type: "linked_database", linked_database_source: "logs_db" }
                            ]
                        }
                    ]
                };

            default:
                return {
                    databases: [
                        {
                            key: "items_db",
                            title: "Items",
                            description: "Main collection",
                            properties: {
                                "Name": { type: "title" },
                                "Category": createSelectProp(["A", "B", "C"]),
                                "Status": createSelectProp(["New", "Done"]),
                                "Date": { type: "date" },
                                "Notes": { type: "rich_text" }
                            }
                        }
                    ],
                    pages: [
                        {
                            title: `${template.name} Home`,
                            icon: template.icon,
                            blocks: [
                                { type: "heading_1", content: template.name },
                                { type: "callout", content: template.description || "Template description." },
                                { type: "divider" },
                                { type: "heading_2", content: "Overview" },
                                { type: "linked_database", linked_database_source: "items_db" }
                            ]
                        }
                    ]
                };
        }
    };

    const structure = getCategoryStructure(category);

    return {
        title: template.name,
        description: template.description || "",
        databases: structure.databases,
        pages: structure.pages
    };
}
