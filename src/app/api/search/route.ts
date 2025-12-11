import { NextRequest, NextResponse } from "next/server";
import { NotionBuilder } from "@/lib/notion/builder";

export async function POST(req: NextRequest) {
    try {
        const accessToken = process.env.NOTION_TOKEN;

        if (!accessToken) {
            return NextResponse.json({ error: "Server configuration error: Missing NOTION_TOKEN" }, { status: 500 });
        }

        const builder = new NotionBuilder(accessToken);

        // Search for a suitable parent page (e.g., "Documents" or just the first page)
        // We'll search for nothing to get the most recently edited page, which is usually a good candidate for a parent
        // or the user's workspace root if they have access.
        const pageId = await builder.search("");

        if (!pageId) {
            return NextResponse.json({ error: "No suitable parent page found. Please ensure the integration has access to at least one page." }, { status: 404 });
        }

        return NextResponse.json({ success: true, pageId });
    } catch (error: any) {
        console.error("Search error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
