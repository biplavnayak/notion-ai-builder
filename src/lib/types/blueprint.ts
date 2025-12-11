export type PropertyType =
    | "title"
    | "rich_text"
    | "number"
    | "select"
    | "multi_select"
    | "status"
    | "date"
    | "people"
    | "files"
    | "checkbox"
    | "url"
    | "email"
    | "phone_number"
    | "formula"
    | "relation"
    | "rollup"
    | "created_time"
    | "created_by"
    | "last_edited_time"
    | "last_edited_by";

export interface DatabaseProperty {
    type: PropertyType;
    options?: string[]; // For select/multi_select/status

    // Relation
    relation_target?: string; // Key of the target database for relations

    // Rollup
    rollup_relation?: string; // Name of the relation property in this database
    rollup_target?: string;   // Name of the property in the target database
    rollup_function?: string; // e.g., "sum", "average", "count"

    // Formula
    formula_expression?: string; // The formula string
}

export interface DatabaseBlueprint {
    key: string; // Unique identifier for internal linking (e.g., "clients_db")
    title: string;
    description?: string;
    properties: Record<string, DatabaseProperty>;
}

export interface LinkedDatabaseView {
    layout: "table" | "board" | "gallery" | "list" | "calendar" | "timeline";
    properties?: string[]; // Names of properties to show
    sort?: { property: string; direction: "ascending" | "descending" }[];
    // filters can be complex, we'll start simple or add later
}

export interface BlockBlueprint {
    type: string;
    content?: string;
    children?: BlockBlueprint[];

    // Linked Database
    linked_database_source?: string; // Key of the source database
    linked_database_view?: LinkedDatabaseView;

    // Callout/Quote/etc
    icon?: string;
    color?: string;
}

export interface PageBlueprint {
    title: string;
    icon?: string; // Emoji
    cover?: string; // URL
    blocks: BlockBlueprint[];
}

export interface TemplateBlueprint {
    title: string;
    description: string;
    databases: DatabaseBlueprint[];
    pages: PageBlueprint[];
}
