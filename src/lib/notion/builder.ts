import { Client } from "@notionhq/client";
import { TemplateBlueprint, DatabaseBlueprint, PageBlueprint, BlockBlueprint } from "@/lib/types/blueprint";

export class NotionBuilder {
    private notion: Client;
    private dbKeyToIdMap: Map<string, string> = new Map();

    constructor(accessToken: string) {
        this.notion = new Client({ auth: accessToken });
    }

    async search(query: string = "") {
        // 1. Try to find a specific "Notion Template Architect" page first
        const specificSearch = await this.notion.search({
            query: "Notion Template Architect",
            filter: { value: 'page', property: 'object' },
            page_size: 1
        });

        if (specificSearch.results.length > 0) {
            return specificSearch.results[0].id;
        }

        // 2. Fallback: Find any page, but sort by 'last_edited_time' might cause nesting if we just created one.
        // Let's try to find a top-level page if possible, but the API doesn't easily support "is_root".
        // We'll stick to the query if provided, otherwise just get *a* page.
        const response = await this.notion.search({
            query: query,
            filter: {
                value: 'page',
                property: 'object'
            },
            // Removing sort by last_edited_time to avoid "chaining" builds
            page_size: 1
        });
        return response.results[0]?.id;
    }

    async build(blueprint: TemplateBlueprint, parentPageId: string) {
        console.log(`Starting build for template: ${blueprint.title}`);

        // 1. Create a Root Page for the template
        const rootPage = await this.createPage(parentPageId, {
            title: blueprint.title,
            blocks: [
                { type: "paragraph", content: blueprint.description }
            ]
        });
        const rootPageId = rootPage.id;
        console.log(`Created root page: ${rootPageId}`);

        // 2. Create Databases (Pass 1: Scalar properties only)
        for (const db of blueprint.databases) {
            await this.createDatabase(rootPageId, db);
        }

        // 3. Update Databases with Relations & Rollups (Pass 2)
        for (const db of blueprint.databases) {
            await this.updateDatabaseRelations(db);
        }

        // 4. Add sample data to databases
        await this.populateSampleData(blueprint);

        // 5. Create Pages (Pass 3: Content & Dashboards)
        for (const page of blueprint.pages) {
            await this.createPage(rootPageId, page);
        }

        return rootPageId;
    }

    private async populateSampleData(blueprint: TemplateBlueprint) {
        console.log(`\n🔄 Starting sample data population for: ${blueprint.title}`);

        // ALWAYS create instructional placeholders first for ALL databases
        console.log(`\n📝 Creating instructional placeholders for all databases (MANDATORY)...`);
        try {
            for (const db of blueprint.databases) {
                const dbId = this.dbKeyToIdMap.get(db.key);
                if (!dbId) {
                    console.log(`⚠️  Skipping ${db.title} - no database ID found`);
                    continue;
                }
                console.log(`   → Calling createSingleInstructionalPlaceholder for ${db.title}...`);
                await this.createSingleInstructionalPlaceholder(db, dbId);
            }
            console.log(`✅ Finished creating all instructional placeholders`);
        } catch (error: any) {
            console.error(`❌ CRITICAL ERROR in placeholder creation:`, error.message);
            console.error(`   Stack:`, error.stack);
        }

        // Import sample data dynamically
        const { SAMPLE_DATA } = await import("@/lib/templates/sampleData");

        // Get the template ID from the blueprint title (convert to kebab-case)
        const templateId = blueprint.title.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '');

        console.log(`\n📋 Template ID: "${templateId}"`);
        console.log(`📦 Available sample data keys:`, Object.keys(SAMPLE_DATA));

        const templateSampleData = SAMPLE_DATA[templateId];

        if (!templateSampleData) {
            console.log(`⚠️  No sample data defined for template: ${templateId}`);
            console.log(`✅ Sample data population complete (instructional placeholders only)\n`);
            return;
        }

        console.log(`✅ Found sample data for ${templateId}`);
        console.log(`📊 Databases to populate:`, Object.keys(templateSampleData));

        // Populate each database with sample data (in addition to the instructional placeholder)
        for (const db of blueprint.databases) {
            const dbId = this.dbKeyToIdMap.get(db.key);
            if (!dbId) {
                console.log(`⚠️  No database ID found for ${db.key}`);
                continue;
            }

            const sampleEntries = templateSampleData[db.key];
            if (!sampleEntries || sampleEntries.length === 0) {
                console.log(`⚠️  No sample data for database: ${db.key}`);
                continue;
            }

            console.log(`📝 Populating ${db.title} with ${sampleEntries.length} sample entries...`);

            try {
                // Get the actual database schema
                const database: any = await this.notion.databases.retrieve({ database_id: dbId });

                // Create each sample entry
                for (let i = 0; i < sampleEntries.length; i++) {
                    const entry = sampleEntries[i];
                    console.log(`  → Creating entry ${i + 1}/${sampleEntries.length}:`, Object.values(entry)[0]);

                    const properties = this.mapSampleDataToProperties(entry, database.properties);

                    await this.notion.pages.create({
                        parent: { type: "database_id", database_id: dbId },
                        properties,
                    });
                }

                console.log(`✅ Successfully added ${sampleEntries.length} sample entries to ${db.title}`);
            } catch (error: any) {
                console.error(`❌ Failed to populate ${db.title} with sample data:`, error.message);
            }
        }

        console.log(`\n✅ Sample data population complete for ${blueprint.title}\n`);
    }

    private mapSampleDataToProperties(sampleEntry: any, dbProperties: any): any {
        const properties: any = {};

        for (const [fieldName, fieldValue] of Object.entries(sampleEntry)) {
            // Find matching property in database (case-insensitive)
            const propName = Object.keys(dbProperties).find(
                key => key.toLowerCase() === fieldName.toLowerCase()
            );

            if (!propName) {
                console.log(`⚠️ Property not found: ${fieldName}`);
                continue;
            }

            const propConfig = dbProperties[propName];
            const propType = propConfig.type;

            // Map the value based on property type
            try {
                switch (propType) {
                    case "title":
                        properties[propName] = {
                            title: [{ text: { content: String(fieldValue) } }]
                        };
                        break;

                    case "rich_text":
                        properties[propName] = {
                            rich_text: [{ text: { content: String(fieldValue) } }]
                        };
                        break;

                    case "number":
                        properties[propName] = {
                            number: typeof fieldValue === 'number' ? fieldValue : parseFloat(String(fieldValue))
                        };
                        break;

                    case "select":
                        properties[propName] = {
                            select: { name: String(fieldValue) }
                        };
                        break;

                    case "multi_select":
                        const values = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
                        properties[propName] = {
                            multi_select: values.map(v => ({ name: String(v) }))
                        };
                        break;

                    case "date":
                        if (fieldValue) {
                            properties[propName] = {
                                date: { start: String(fieldValue) }
                            };
                        }
                        break;

                    case "checkbox":
                        properties[propName] = {
                            checkbox: Boolean(fieldValue)
                        };
                        break;

                    case "url":
                        properties[propName] = {
                            url: String(fieldValue)
                        };
                        break;

                    case "email":
                        properties[propName] = {
                            email: String(fieldValue)
                        };
                        break;

                    case "phone_number":
                        properties[propName] = {
                            phone_number: String(fieldValue)
                        };
                        break;

                    case "status":
                        properties[propName] = {
                            status: { name: String(fieldValue) }
                        };
                        break;

                    default:
                        console.log(`⚠️ Unsupported property type: ${propType} for ${propName}`);
                }
            } catch (error: any) {
                console.error(`❌ Error mapping ${propName}:`, error.message);
            }
        }

        return properties;
    }

    private async createSingleInstructionalPlaceholder(db: DatabaseBlueprint, dbId: string) {
        try {
            console.log(`📝 Creating instructional placeholder for ${db.title}...`);

            // Use blueprint properties instead of fetching from API
            // This avoids "no properties returned" errors and saves an API call

            let titlePropName = "Name";
            for (const [propName, propConfig] of Object.entries(db.properties)) {
                if (propConfig.type === "title") {
                    titlePropName = propName;
                    break;
                }
            }

            console.log(`   Title property: ${titlePropName}`);

            const instructionProperties: any = {};
            instructionProperties[titlePropName] = {
                title: [{ text: { content: `👉 Click to see how to use ${db.title}` } }]
            };

            const placeholderContent = this.createPlaceholderContent(db, db.properties);
            console.log(`   Generated ${placeholderContent.length} content blocks`);

            await this.notion.pages.create({
                parent: { type: "database_id", database_id: dbId },
                properties: instructionProperties,
                icon: { emoji: "💡" },
                children: placeholderContent
            });

            console.log(`✅ Added instructional placeholder to ${db.title}`);
        } catch (error: any) {
            console.error(`❌ Failed to create placeholder for ${db.title}:`, error.message);
            console.error(`   Stack trace:`, error.stack);
        }
    }

    private async createInstructionalPlaceholders(blueprint: TemplateBlueprint) {
        // Fallback: Create one instructional entry per database
        console.log(`\n📝 Creating instructional placeholders for all databases...`);
        for (const db of blueprint.databases) {
            const dbId = this.dbKeyToIdMap.get(db.key);
            if (!dbId) {
                console.log(`⚠️  Skipping ${db.title} - no database ID found`);
                continue;
            }

            try {
                console.log(`📝 Creating instructional placeholder for ${db.title}...`);
                const database: any = await this.notion.databases.retrieve({ database_id: dbId });

                if (!database || !database.properties) {
                    console.error(`❌ Database ${db.title} has no properties`);
                    continue;
                }

                let titlePropName = "Name";
                for (const [propName, propConfig] of Object.entries(database.properties)) {
                    if ((propConfig as any).type === "title") {
                        titlePropName = propName;
                        break;
                    }
                }

                console.log(`   Title property: ${titlePropName}`);

                const instructionProperties: any = {};
                instructionProperties[titlePropName] = {
                    title: [{ text: { content: `👉 Click here to see how to use this database` } }]
                };

                const placeholderContent = this.createPlaceholderContent(db, database.properties);
                console.log(`   Generated ${placeholderContent.length} content blocks`);

                await this.notion.pages.create({
                    parent: { type: "database_id", database_id: dbId },
                    properties: instructionProperties,
                    icon: { emoji: "💡" },
                    children: placeholderContent
                });

                console.log(`✅ Added instructional placeholder to ${db.title}`);
            } catch (error: any) {
                console.error(`❌ Failed to create placeholder for ${db.title}:`, error.message);
                console.error(`   Stack trace:`, error.stack);
            }
        }
    }

    private createPlaceholderContent(db: DatabaseBlueprint, properties: any): any[] {
        // Safety check for undefined/null properties
        const propEntries = properties ? Object.entries(properties) : [];

        return [
            {
                object: "block",
                type: "callout",
                callout: {
                    rich_text: [{ text: { content: `This is a placeholder entry to help you get started with the ${db.title} database.` } }],
                    icon: { emoji: "💡" }
                }
            },
            {
                object: "block",
                type: "heading_2",
                heading_2: {
                    rich_text: [{ text: { content: "How to use this database:" } }]
                }
            },
            {
                object: "block",
                type: "numbered_list_item",
                numbered_list_item: {
                    rich_text: [{ text: { content: `Click the "+ New" button to add your first real ${db.title.toLowerCase()} entry` } }]
                }
            },
            {
                object: "block",
                type: "numbered_list_item",
                numbered_list_item: {
                    rich_text: [{ text: { content: "Fill in the properties (columns) with your actual data" } }]
                }
            },
            {
                object: "block",
                type: "divider",
                divider: {}
            },
            {
                object: "block",
                type: "heading_3",
                heading_3: {
                    rich_text: [{ text: { content: "Available Properties:" } }]
                }
            },
            ...propEntries.map(([name, prop]) => ({
                object: "block" as const,
                type: "bulleted_list_item" as const,
                bulleted_list_item: {
                    rich_text: [{
                        text: {
                            content: `${name} (${(prop as any).type})`
                        }
                    }]
                }
            })),
            {
                object: "block",
                type: "divider",
                divider: {}
            },
            {
                object: "block",
                type: "heading_3",
                heading_3: {
                    rich_text: [{ text: { content: "🤖 Use Notion AI (Optional)" } }]
                }
            },
            {
                object: "block",
                type: "quote",
                quote: {
                    rich_text: [{
                        text: {
                            content: `Create 3-5 realistic sample entries for this ${db.title} database. ${db.description || ''} Include varied data for all properties.`
                        }
                    }]
                }
            }
        ];
    }

    private async createDatabase(parentId: string, db: DatabaseBlueprint) {
        // Transform properties to Notion API format
        const properties: Record<string, any> = {};

        // Find the title property name
        let titlePropName = "Name";
        for (const [name, prop] of Object.entries(db.properties)) {
            if (prop.type === "title") {
                titlePropName = name;
                break;
            }
        }

        // Add title property
        properties[titlePropName] = { title: {} };

        // Add other properties (SKIP relations, rollups, formulas in first pass)
        for (const [name, prop] of Object.entries(db.properties)) {
            if (prop.type === "title") continue;
            if (prop.type === "relation") continue;
            if (prop.type === "rollup") continue;
            if (prop.type === "formula") continue;

            if (prop.type === "select" || prop.type === "multi_select") {
                properties[name] = {
                    [prop.type]: {
                        options: prop.options?.map(opt => ({ name: opt })) || []
                    }
                };
            } else {
                properties[name] = { [prop.type]: {} };
            }
        }

        const response = await this.notion.databases.create({
            parent: { type: "page_id", page_id: parentId },
            title: [{ type: "text", text: { content: db.title } }],
            description: db.description ? [{ type: "text", text: { content: db.description } }] : [],
            properties: properties,
        } as any);

        this.dbKeyToIdMap.set(db.key, response.id);
        console.log(`Created database ${db.title} (${response.id})`);
        return response;
    }

    private async updateDatabaseRelations(db: DatabaseBlueprint) {
        const dbId = this.dbKeyToIdMap.get(db.key);
        if (!dbId) return;

        const properties: Record<string, any> = {};
        let hasUpdates = false;

        for (const [name, prop] of Object.entries(db.properties)) {
            // Handle Relations
            if (prop.type === "relation" && prop.relation_target) {
                const targetId = this.dbKeyToIdMap.get(prop.relation_target);
                if (targetId) {
                    properties[name] = {
                        relation: {
                            database_id: targetId,
                            type: "dual_property", // Default to dual for now
                            dual_property: {}
                        }
                    };
                    hasUpdates = true;
                }
            }
            // Handle Rollups
            else if (prop.type === "rollup" && prop.rollup_relation && prop.rollup_target && prop.rollup_function) {
                properties[name] = {
                    rollup: {
                        relation_property_name: prop.rollup_relation,
                        rollup_property_name: prop.rollup_target,
                        function: prop.rollup_function
                    }
                };
                hasUpdates = true;
            }
            // Handle Formulas
            else if (prop.type === "formula" && prop.formula_expression) {
                properties[name] = {
                    formula: {
                        expression: prop.formula_expression
                    }
                };
                hasUpdates = true;
            }
        }

        if (hasUpdates) {
            console.log(`Updating relations/rollups for ${db.title}...`);
            try {
                await this.notion.databases.update({
                    database_id: dbId,
                    properties: properties
                } as any);
            } catch (error: any) {
                console.error(`Failed to update relations for ${db.title}:`, error.message);
            }
        }
    }

    private createBlocks(blocks: BlockBlueprint[]): any[] {
        return blocks.map(block => {
            const blockType = block.type.toLowerCase();
            const baseBlock: any = {
                object: "block",
                type: blockType,
            };

            // Handle specific block types FIRST to initialize properties
            switch (blockType) {
                case "paragraph":
                case "heading_1":
                case "heading_2":
                case "heading_3":
                case "bulleted_list_item":
                case "numbered_list_item":
                case "toggle":
                case "quote":
                case "to_do":
                case "callout":
                    baseBlock[blockType] = {
                        rich_text: block.content
                            ? [{ type: "text", text: { content: block.content } }]
                            : []
                    };
                    if (blockType === "callout") baseBlock.callout.icon = { emoji: block.icon || "💡" };
                    if (blockType === "to_do") baseBlock.to_do.checked = false;
                    break;

                case "divider":
                    baseBlock.divider = {};
                    break;

                case "column_list":
                case "column":
                    // Initialize with empty children array - will be populated below
                    baseBlock[blockType] = {
                        children: []
                    };
                    break;

                case "linked_database":
                    const sourceId = block.linked_database_source ? this.dbKeyToIdMap.get(block.linked_database_source) : null;
                    if (sourceId) {
                        return {
                            object: "block",
                            type: "link_to_page",
                            link_to_page: {
                                type: "database_id",
                                database_id: sourceId
                            }
                        };
                    } else {
                        return {
                            object: "block",
                            type: "paragraph",
                            paragraph: {
                                rich_text: [{ text: { content: `[Missing Link to Database: ${block.linked_database_source}]` } }]
                            }
                        };
                    }
            }

            // NOW handle children recursively
            if (block.children && block.children.length > 0) {
                if (blockType === "column_list") {
                    // Special handling for column_list: Children MUST be columns
                    const validChildren = block.children.map(child => {
                        if (child.type.toLowerCase() !== "column") {
                            // Wrap non-column child in a column
                            return {
                                type: "column",
                                children: [child]
                            } as BlockBlueprint;
                        }
                        return child;
                    });
                    baseBlock[blockType].children = this.createBlocks(validChildren);
                } else if (blockType === "column") {
                    // Column must have children
                    baseBlock[blockType].children = this.createBlocks(block.children);
                } else if (baseBlock[blockType]) {
                    // For other block types that support children
                    baseBlock[blockType].children = this.createBlocks(block.children);
                }
            }

            // Ensure column_list and column always have at least one child
            if ((blockType === "column_list" || blockType === "column") &&
                (!baseBlock[blockType].children || baseBlock[blockType].children.length === 0)) {
                baseBlock[blockType].children = [
                    {
                        object: "block",
                        type: "paragraph",
                        paragraph: {
                            rich_text: [{ text: { content: "" } }]
                        }
                    }
                ];
            }

            return baseBlock;
        });
    }

    private async createPage(parentId: string, page: PageBlueprint) {
        // Log the page structure before processing
        console.log(`\n📄 Creating page: ${page.title}`);
        console.log(`📦 Page has ${page.blocks.length} blocks`);

        // Recursively log block structure
        const logBlockStructure = (blocks: BlockBlueprint[], indent = '   ') => {
            blocks.forEach((b, i) => {
                console.log(`${indent}${i}: ${b.type}${b.children ? ` (${b.children.length} children)` : ''}`);
                if (b.children && b.children.length > 0) {
                    logBlockStructure(b.children, indent + '  ');
                }
            });
        };
        logBlockStructure(page.blocks);

        // Normalize all block types recursively before processing
        const normalizeBlocks = (blocks: BlockBlueprint[]): BlockBlueprint[] => {
            return blocks.map(block => ({
                ...block,
                type: block.type.toLowerCase(),
                children: block.children ? normalizeBlocks(block.children) : undefined
            }));
        };

        const normalizedBlocks = normalizeBlocks(page.blocks);
        const children = this.createBlocks(normalizedBlocks);

        // Add Bartlabs branding footer
        // TEMPORARILY DISABLED TO DEBUG "Nested block depth exceeded" ERROR
        // children.push(
        //     {
        //         object: "block",
        //         type: "divider",
        //         divider: {}
        //     },
        //     {
        //         object: "block",
        //         type: "paragraph",
        //         paragraph: {
        //             rich_text: [
        //                 {
        //                     type: "text",
        //                     text: { content: "Created with " },
        //                     annotations: { color: "gray" }
        //                 },
        //                 {
        //                     type: "text",
        //                     text: { content: "Bartlabs", link: { url: "https://www.bartlabs.in" } },
        //                     annotations: { bold: true, color: "default" }
        //                 }
        //             ]
        //         }
        //     }
        // );

        console.log(`📤 Sending ${children.length} blocks to Notion API...`);
        console.log(`📦 Block structure:`, JSON.stringify(children, null, 2));

        return await this.notion.pages.create({
            parent: { type: "page_id", page_id: parentId },
            icon: page.icon ? { emoji: page.icon } : undefined,
            properties: {
                title: {
                    title: [{ text: { content: page.title } }]
                }
            },
            children: children
        });
    }
}
