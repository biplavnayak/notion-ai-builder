import { NextRequest, NextResponse } from "next/server";
import { notionAuth } from "@/lib/notion/auth";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");
    const error = req.nextUrl.searchParams.get("error");

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    try {
        const data = await notionAuth.exchangeCodeForToken(code);

        // Set cookie and redirect to home
        const response = NextResponse.redirect(new URL("/", req.url));
        response.cookies.set("notion_access_token", data.access_token, {
            httpOnly: false, // Allow client to read for MVP simplicity
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });
        response.cookies.set("notion_workspace_name", data.workspace_name || "Workspace", {
            path: "/"
        });

        return response;
    } catch (err) {
        return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 });
    }
}
