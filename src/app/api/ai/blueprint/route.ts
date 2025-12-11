import { NextRequest, NextResponse } from "next/server";
import { generateBlueprint } from "@/lib/ai/generator";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
        }

        console.log("Generating blueprint for:", prompt);
        const blueprint = await generateBlueprint(prompt);

        return NextResponse.json({ success: true, blueprint });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
