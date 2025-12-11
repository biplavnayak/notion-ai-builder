import { NextResponse } from "next/server";
import { CURATED_TEMPLATES } from "@/lib/templates/metadata";
import { getPreviewBlueprint } from "@/lib/templates/mockBlueprints";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const blueprints: Record<string, any> = {};

        CURATED_TEMPLATES.forEach((template) => {
            // Use the mock generator to create a consistent, realistic blueprint
            // This saves OpenAI costs while ensuring structure exists
            const blueprint = getPreviewBlueprint(template);
            blueprints[template.id] = blueprint;
        });

        // Define path to save the JSON file
        const filePath = path.join(process.cwd(), "src", "lib", "templates", "prebuilt_blueprints.json");

        // Write to file
        fs.writeFileSync(filePath, JSON.stringify(blueprints, null, 2));

        return NextResponse.json({
            success: true,
            count: Object.keys(blueprints).length,
            path: filePath
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
