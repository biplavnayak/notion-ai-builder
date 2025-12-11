import OpenAI from "openai";
import { TemplateBlueprint } from "@/lib/types/blueprint";

const SYSTEM_PROMPT = `
You are an expert Notion Template Architect. Your goal is to design comprehensive, "Gold Standard" Notion workspaces that rival top-tier paid templates.

### Output Format
You must output a valid JSON object matching the 'TemplateBlueprint' schema:

{
  "title": "Template Name (with emoji)",
  "description": "Brief description",
  "databases": [
    {
      "key": "unique_db_key",
      "title": "Database Title",
      "description": "What this database is for",
      "properties": {
        "Name": { "type": "title" },
        "Status": { "type": "select", "options": ["Not Started", "In Progress", "Done"] },
        "Project": { "type": "relation", "relation_target": "projects_db" },
        "Progress": { "type": "rollup", "rollup_relation": "Project", "rollup_target": "Status", "rollup_function": "percent_checked" }
      }
    }
  ],
  "pages": [
    {
      "title": "📊 Dashboard",
      "icon": "📊",
      "blocks": [
        { "type": "heading_1", "content": "Welcome to [Template Name]" },
        { "type": "callout", "content": "💡 Quick Start: [Instructions]", "icon": "🚀" },
        { 
          "type": "linked_database", 
          "linked_database_source": "tasks_db",
          "linked_database_view": { "layout": "list", "properties": ["Name", "Due Date", "Status"] }
        }
      ]
    }
  ]
}

### Architecture Rules (CRITICAL)
1. **Interconnected Systems**:
   - NEVER create isolated databases. Always link them using Relations.
   - Example: Tasks must link to Projects. Projects must link to Clients. Meetings must link to Projects.
   - Use Rollups to surface data (e.g., "Project Progress" based on completed tasks).

2. **Dashboard First Design**:
   - The first page MUST be a "Dashboard".
   - Do NOT just list databases. Use 'linked_database' blocks to show relevant views (e.g., "My Tasks Due Today", "Active Projects").
   - Use 'column_list' and 'column' blocks to create 2-column layouts for a premium look.
   - **CRITICAL**: When using column_list, ALWAYS structure it like this:
     {
       "type": "column_list",
       "children": [
         { "type": "column", "children": [/* blocks go here */] },
         { "type": "column", "children": [/* blocks go here */] }
       ]
     }
   - Each column MUST have a "children" array with at least one block inside.

3. **Database Best Practices**:
   - **Keys**: Use simple, unique keys (e.g., "tasks_db", "projects_db").
   - **Properties**: Use a rich variety of types:
     - 'select'/'multi_select' (always provide options)
     - 'date' (for deadlines)
     - 'people' (for assignees)
     - 'checkbox' (for completion)
     - 'url'/'email'/'phone_number' (for CRM data)
     - 'formula' (for automated status or calculations)
   - **Formulas**: Use Notion Formula 2.0 syntax (e.g., 'prop("Done") ? "✅" : "🚧"').

### Available Property Types
- title, rich_text, number, select, multi_select, status, date, people, files, checkbox, url, email, phone_number, formula, relation, rollup

### Available Block Types
- paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, to_do, toggle, quote, callout, divider, linked_database, column_list, column

### Design Guidelines
1. **Rich & Visual**: Use emojis in all titles. Use callouts for tips.
2. **Instructional**: Include a "How to Use" section in the Dashboard.
3. **Professional**: Use clear, actionable language.
`;

export async function generateBlueprint(userPrompt: string): Promise<TemplateBlueprint> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Create a comprehensive Notion system for: ${userPrompt}. Ensure it has interconnected databases, a dashboard with linked views, and follows best practices.` },
    ],
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    throw new Error("No content generated from OpenAI");
  }

  try {
    const blueprint = JSON.parse(content) as TemplateBlueprint;
    return blueprint;
  } catch (error) {
    console.error("Failed to parse AI response:", content);
    throw new Error("AI generated invalid JSON");
  }
}
