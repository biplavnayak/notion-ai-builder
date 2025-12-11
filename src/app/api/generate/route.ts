import { NextRequest, NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai/generator";
import { NotionBuilder } from "@/lib/notion/builder";

export async function POST(req: NextRequest) {
    try {
        const { prompt, accessToken, parentPageId } = await req.json();

        if (!prompt || !accessToken) {
            return NextResponse.json({ error: "Missing prompt or access token" }, { status: 400 });
        }

        // 1. Generate Blueprint
        console.log("Generating blueprint...");
        const blueprint = await generateBlueprint(prompt);

        // 2. Build in Notion
        console.log("Building in Notion...");
        const builder = new NotionBuilder(accessToken);
        // If parentPageId is not provided, we might need to search for one or error out.
        // For this MVP, we'll assume the user provides a page ID or we default to the workspace root (which isn't directly possible via API without search).
        // Actually, creating a page requires a parent. 
        // We'll default to searching for the first available page if not provided, or ask the user.
        // For now, let's require it or use a placeholder if we can't find one.

        // TEMPORARY: If no parentPageId, we can't proceed easily without search.
        // We'll assume the client sends one, or we search for a page named "Workspace" or similar.
        // Let's just try to search for *any* page to use as parent if none provided.
        let targetParentId = parentPageId;
        if (!targetParentId) {
            // Simple search to find a valid parent
            // This is a bit risky but works for "Hello World"
            // In production, user should select the parent page.
            return NextResponse.json({ error: "Parent Page ID is required" }, { status: 400 });
        }

        const rootPageId = await builder.build(blueprint, targetParentId);

        return NextResponse.json({ success: true, pageId: rootPageId });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
