import { NextRequest, NextResponse } from "next/server";
import { NotionBuilder } from "@/lib/notion/builder";

export async function POST(req: NextRequest) {
    try {
        const { blueprint, parentPageId } = await req.json();
        const accessToken = process.env.NOTION_TOKEN;

        if (!accessToken) {
            return NextResponse.json({ error: "Server configuration error: Missing NOTION_TOKEN" }, { status: 500 });
        }

        if (!blueprint || !parentPageId) {
            return NextResponse.json({ error: "Missing blueprint or parentPageId" }, { status: 400 });
        }

        console.log(`Building template: ${blueprint.title} under parent: ${parentPageId}`);
        const builder = new NotionBuilder(accessToken);
        const rootPageId = await builder.build(blueprint, parentPageId);

        return NextResponse.json({ success: true, pageId: rootPageId });
    } catch (error: any) {
        console.error("Build error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
